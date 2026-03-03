from fastapi import APIRouter
from app.core.database import get_database
from app.core.config import get_settings
from app.routes.context import vector_search

import httpx
import logging
import json
import re
from datetime import datetime

router = APIRouter()
settings = get_settings()

logger = logging.getLogger("deal_engine")
logger.setLevel(logging.INFO)

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
# LLM CALL
# =========================================================

async def call_llm(messages, temperature=0.3, max_tokens=400):
    async with httpx.AsyncClient(timeout=60) as client:
        r = await client.post(
            OPENROUTER_URL,
            json={
                "model": LLM_MODEL,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens,
            },
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Advyay AI"
            }
        )

        if r.status_code != 200:
            logger.error(r.text)
            return ""

        return r.json()["choices"][0]["message"]["content"]

def safe_json_parse(text):
    try:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        return json.loads(match.group(0)) if match else {}
    except:
        return {}

# =========================================================
# MAIN ENGINE
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

    # =====================================================
    # LOAD / INIT
    # =====================================================

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

    # =====================================================
    # APPEND USER MESSAGE
    # =====================================================

    conversation["messages"].append({
        "role": "user",
        "content": user_message,
        "timestamp": datetime.utcnow()
    })

    conversation["exchange_count"] += 1

    full_history = conversation["messages"]
    last_12 = full_history[-12:]

    role_last_12 = "\n".join(
        [f"{m['role'].upper()}: {m['content']}" for m in last_12]
    )

    # =====================================================
    # STRUCTURED EXTRACTION
    # =====================================================

    extraction_prompt = f"""
Extract explicitly mentioned structured lead data.

Return STRICT JSON with null for missing values.

Fields:
{json.dumps({k: "value or null" for k in REQUIRED_FIELDS}, indent=2)}

Conversation:
{role_last_12}
"""

    extraction_response = await call_llm(
        [{"role": "system", "content": extraction_prompt}],
        temperature=0,
        max_tokens=250
    )

    extracted = safe_json_parse(extraction_response)

    for k, v in extracted.items():
        if v and isinstance(v, str):
            conversation["working_lead_data"][k] = v.strip()

    # =====================================================
    # INTENT (MONOTONIC)
    # =====================================================

    intent_prompt = f"""
Classify buyer stage:
awareness | exploration | consideration | evaluation | decision

Conversation:
{role_last_12}

Return JSON:
{{"intent_stage": "..."}}
"""

    intent_resp = await call_llm(
        [{"role": "system", "content": intent_prompt}],
        temperature=0.2,
        max_tokens=100
    )

    detected_intent = safe_json_parse(intent_resp).get("intent_stage", "awareness")
    print(f"[{session_id}] Detected intent stage: {detected_intent}")
    prev_intent = conversation.get("intent_stage", "awareness")

    intent_stage = max(prev_intent, detected_intent, key=lambda x: INTENT_ORDER.index(x))
    conversation["intent_stage"] = intent_stage

    # =====================================================
    # READINESS (MONOTONIC)
    # =====================================================

    readiness_prompt = f"""
Score readiness 0-100.

Conversation:
{role_last_12}

Return JSON:
{{"readiness_score": 0-100}}
"""

    readiness_resp = await call_llm(
        [{"role": "system", "content": readiness_prompt}],
        temperature=0.2,
        max_tokens=100
    )

    new_readiness = safe_json_parse(readiness_resp).get("readiness_score", 0)

    conversation["readiness_score"] = max(
        conversation.get("readiness_score", 0),
        new_readiness
    )

    readiness_score = conversation["readiness_score"]

    # =====================================================
    # RAG CONTEXT (RESTORED)
    # =====================================================

    context_chunks = await vector_search(user_message, db, top_k=5)
    context_text = "\n\n".join([c["content"] for c in context_chunks]) if context_chunks else ""

    # =====================================================
    # DEAL BRAIN
    # =====================================================

    deal_brain_prompt = f"""
You are the strategic convergence engine of Advyay.

Knowledge Context:
{context_text}

Conversation:
{role_last_12}

Working Lead Data:
{json.dumps(conversation["working_lead_data"], indent=2)}

Intent: {intent_stage}
Readiness: {readiness_score}
Exchange Count: {conversation["exchange_count"]}

Required Fields:
{REQUIRED_FIELDS}

Decide next action:

1. If early stage → provide intelligent solution framing.
2. If mid stage → clarify architecture.
3. If high intent but missing key fields → ask naturally.
4. If ready to close → return {{"action": "close"}}

Otherwise return:
{{"action": "continue", "message": "<natural response>"}}

Rules:
- Ask at most ONE question.
- Do NOT interrogate.
- Do NOT behave like a form.
- Do NOT close if email or phone missing.
- Use Knowledge Context.

Return STRICT JSON only.
"""

    brain_resp = await call_llm(
        [{"role": "system", "content": deal_brain_prompt}],
        temperature=0.3,
        max_tokens=300
    )
    print(f"[{session_id}] Deal brain response: {brain_resp}")

    decision = safe_json_parse(brain_resp)

    # =====================================================
    # BACKEND CLOSE GUARDRAILS
    # =====================================================

    missing_close_fields = [
        f for f in HARD_CLOSE_REQUIRED
        if not conversation["working_lead_data"].get(f)
    ]

    can_hard_close = (
        intent_stage in ["evaluation", "decision"]
        and readiness_score >= 70
        and conversation["exchange_count"] >= 5
        and not missing_close_fields
    )

    if decision.get("action") == "close" and not can_hard_close:
        decision = {
            "action": "continue",
            "message": "Before we move forward, could you share your best work email and contact number so we can coordinate next steps?"
        }

    # =====================================================
    # HANDLE CLOSE
    # =====================================================

    if decision.get("action") == "close" and can_hard_close:

        role_full = "\n".join(
            [f"{m['role'].upper()}: {m['content']}" for m in full_history]
        )

        summary_prompt = f"""
Create a professional executive summary.

Based on FULL conversation.
Include requirements, integration stack, constraints, urgency.
5–6 concise business lines.
No fluff.

Conversation:
{role_full}

Structured:
{json.dumps(conversation["working_lead_data"], indent=2)}
"""

        summary = await call_llm(
            [{"role": "system", "content": summary_prompt}],
            temperature=0.2,
            max_tokens=300
        )

        await db.leads.insert_one({
            **conversation["working_lead_data"],
            "session_id": session_id,
            "lead_summary": summary,
            "intent_stage": intent_stage,
            "readiness_score": readiness_score,
            "created_at": datetime.utcnow()
        })

        conversation["is_closed"] = True
        conversation["closed_at"] = datetime.utcnow()

        await db.conversations.update_one(
            {"session_id": session_id},
            {"$set": conversation}
        )

        return {
            "content": f"""
Thank you for the detailed discussion.

Here is a summary of your requirements:

{summary}

Someone from Advyay will connect with you shortly to move forward.
""",
            "lead_created": True,
            "session_id": session_id
        }

    # =====================================================
    # CONTINUE CONVERSATION
    # =====================================================

    response_text = decision.get("message", "Could you elaborate a bit more?")

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