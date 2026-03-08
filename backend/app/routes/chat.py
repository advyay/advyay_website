from fastapi import APIRouter
from app.core.database import get_database
from app.core.config import get_settings
from app.routes.context import vector_search

import httpx
import json
import re
from datetime import datetime

router = APIRouter()
settings = get_settings()

OPENROUTER_API_KEY = settings.OPENROUTER_API_KEY
OPENROUTER_URL = settings.OPENROUTER_URL
LLM_MODEL = settings.LLM_MODEL

INTENT_ORDER = [
    "awareness",
    "exploration",
    "consideration",
    "evaluation",
    "decision"
]

REQUIRED_FIELDS = [
    "name",
    "company",
    "role",
    "use_case",
    "budget_range",
    "timeline",
    "decision_maker",
    "email",
    "phone"
]

HARD_CLOSE_REQUIRED = [
    "name",
    "company",
    "role",
    "use_case",
    "email",
    "phone"
]

# =========================================================
# UTILITIES
# =========================================================

def extract_phone(text):
    m = re.search(r'(\+?\d{10,15})', text)
    return m.group(1) if m else None


def extract_email(text):
    m = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
    return m.group(0) if m else None


def safe_json_parse(text):
    try:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        return json.loads(match.group(0)) if match else {}
    except:
        return {}


async def call_llm(messages, temperature=0.2, max_tokens=600):

    async with httpx.AsyncClient(timeout=60) as client:

        r = await client.post(
            OPENROUTER_URL,
            json={
                "model": LLM_MODEL,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens
            },
            headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}"}
        )

        if r.status_code != 200:
            print("LLM ERROR:", r.text)
            return ""

        return r.json()["choices"][0]["message"]["content"]


# =========================================================
# MAIN CHAT ENGINE
# =========================================================

@router.post("/chat")
async def chat(data: dict):

    db = await get_database("Advyay")

    session_id = data.get("session_id")
    user_message = data.get("message")

    if not session_id or not user_message:
        return {"error": "session_id and message required"}

    user_message = user_message.strip()

    print(f"[{session_id}] USER → {user_message}")

    # -----------------------------------------------------
    # LOAD SESSION
    # -----------------------------------------------------

    conversation = await db.conversations.find_one({"session_id": session_id})

    if not conversation:
        conversation = {
            "session_id": session_id,
            "messages": [],
            "working_lead_data": {},
            "intent_stage": "awareness",
            "readiness_score": 0,
            "exchange_count": 0,
            "is_closed": False,
            "created_at": datetime.utcnow()
        }

    if conversation.get("is_closed"):
        return {
            "content": "Our team will connect with you shortly.",
            "lead_created": True,
            "session_id": session_id
        }

    # -----------------------------------------------------
    # DETECT EMAIL / PHONE BEFORE LLM
    # -----------------------------------------------------

    email = extract_email(user_message)
    phone = extract_phone(user_message)

    if email:
        conversation["working_lead_data"]["email"] = email

    if phone:
        conversation["working_lead_data"]["phone"] = phone

    # -----------------------------------------------------
    # APPEND USER MESSAGE
    # -----------------------------------------------------

    conversation["messages"].append({
        "role": "user",
        "content": user_message,
        "timestamp": datetime.utcnow()
    })

    conversation["exchange_count"] += 1

    full_history = conversation["messages"][-15:]

    history_text = "\n".join(
        [f"{m['role'].upper()}: {m['content']}" for m in full_history]
    )

    # -----------------------------------------------------
    # RAG CONTEXT
    # -----------------------------------------------------

    context_chunks = await vector_search(user_message, db, top_k=5)
    context_text = "\n\n".join([c["content"] for c in context_chunks]) if context_chunks else ""

    # -----------------------------------------------------
    # SINGLE LLM INTELLIGENCE CALL
    # -----------------------------------------------------

    intelligence_prompt = f"""
You are an enterprise AI deal qualification engine.

Analyze the conversation and return structured intelligence.

Return STRICT JSON:

{{
 "intent_stage":"awareness|exploration|consideration|evaluation|decision",
 "readiness_score":0-100,
 "extracted_fields":{{
    "name": "...",
    "company": "...",
    "role": "...",
    "use_case": "...",
    "budget_range": "...",
    "timeline": "...",
    "decision_maker": true/false,
    "email": "...",
    "phone": "..."
 }},
 "response":"natural conversational reply asking at most one question"
}}

Rules:
- Extract only explicitly mentioned fields
- If CEO/Founder → decision_maker=true
- Do not ask for fields already collected
- If intent ≥ evaluation and contact missing → request contact
- Be concise and professional
- End conversation if intent=decision, readiness≥70, and all hard fields collected
- Say a thank you and summarize requirements when closing
- Unless closing, ask follow up question to gather more info in your response

Knowledge Context:
{context_text}

Existing Data:
{json.dumps(conversation["working_lead_data"], indent=2)}

Conversation:
{history_text}
"""

    intelligence_response = await call_llm(
        [{"role": "system", "content": intelligence_prompt}]
    )

    print(f"[{session_id}] Intelligence response:", intelligence_response)

    intelligence = safe_json_parse(intelligence_response)

    # -----------------------------------------------------
    # UPDATE FIELDS
    # -----------------------------------------------------

    extracted = intelligence.get("extracted_fields", {})

    for k, v in extracted.items():

        if v in [None, "", "null", "None"]:
            continue

        conversation["working_lead_data"][k] = v

    # -----------------------------------------------------
    # MONOTONIC INTENT
    # -----------------------------------------------------

    detected_intent = intelligence.get("intent_stage", "awareness")

    prev_intent = conversation["intent_stage"]

    intent_stage = max(prev_intent, detected_intent,
                       key=lambda x: INTENT_ORDER.index(x))

    conversation["intent_stage"] = intent_stage

    # -----------------------------------------------------
    # MONOTONIC READINESS
    # -----------------------------------------------------

    readiness = intelligence.get("readiness_score", 0)

    conversation["readiness_score"] = max(
        conversation["readiness_score"],
        readiness
    )

    readiness_score = conversation["readiness_score"]

    # -----------------------------------------------------
    # CHECK CLOSE CONDITIONS
    # -----------------------------------------------------

    missing_close_fields = [
        f for f in HARD_CLOSE_REQUIRED
        if not conversation["working_lead_data"].get(f)
    ]

    can_close = (
        intent_stage in ["evaluation", "decision"]
        and readiness_score >= 70
        and conversation["exchange_count"] >= 5
        and not missing_close_fields
    )

    print(f"can_close: {can_close} (intent: {intent_stage}, readiness: {readiness_score}, missing_fields: {missing_close_fields})")

    # -----------------------------------------------------
    # CLOSE DEAL
    # -----------------------------------------------------

    if can_close:

        summary_prompt = f"""
Write a concise executive summary (5 lines).

Conversation:
{history_text}

Structured Data:
{json.dumps(conversation["working_lead_data"], indent=2)}
"""

        summary = await call_llm(
            [{"role": "system", "content": summary_prompt}]
        )

        await db.leads.insert_one({
            **conversation["working_lead_data"],
            "session_id": session_id,
            "intent_stage": intent_stage,
            "readiness_score": readiness_score,
            "lead_summary": summary,
            "created_at": datetime.utcnow(),
            "status": "new"
        })

        conversation["is_closed"] = True

        await db.conversations.update_one(
            {"session_id": session_id},
            {"$set": conversation},
            upsert=True
        )

        return {
            "content": f"""
Thank you for the discussion.

Summary of requirements:

{summary}

Our team will contact you shortly.
""",
            "lead_created": True,
            "session_id": session_id
        }

    # -----------------------------------------------------
    # NORMAL RESPONSE
    # -----------------------------------------------------

    response_text = intelligence.get("response", "Could you elaborate a bit more?")

    conversation["messages"].append({
        "role": "assistant",
        "content": response_text,
        "timestamp": datetime.utcnow()
    })

    await db.conversations.update_one(
        {"session_id": session_id},
        {"$set": conversation},
        upsert=True
    )

    return {
        "content": response_text,
        "lead_created": False,
        "session_id": session_id
    }