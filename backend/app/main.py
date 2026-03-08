import datetime
import uuid

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import admin, chat, context, analytics
from app.core.database import get_database

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin.router)
app.include_router(chat.router)
app.include_router(context.router)
app.include_router(analytics.router)


import datetime
import uuid

@app.post("/api/lead")
async def create_lead(lead_data: dict):

    print("Creating lead with data:", lead_data)

    db = await get_database("Advyay")

    lead_document = {
        "_id": str(uuid.uuid4()),

        "name": lead_data.get("name"),
        "email": lead_data.get("email"),
        "company": lead_data.get("company"),
        "phone": lead_data.get("phone"),

        "use_case": lead_data.get("use_case", lead_data.get("message", "")),
        "role": lead_data.get("role", "Unknown"),
        "decision_maker": lead_data.get("decision_maker", False),
        "budget_range": lead_data.get("budget_range", ""),
        "timeline": lead_data.get("timeline", ""),
        "phone": lead_data.get("phone", ""),
        "session_id": lead_data.get("sessionId"),
        "intent_stage": lead_data.get("intent_stage", "awareness"),
        "readiness_score": lead_data.get("readiness_score", 0),
        "lead_summary": lead_data.get(
            "lead_summary",
            lead_data.get("message", "")
        ),
        "created_at": datetime.datetime.utcnow(),
        "status": "new"
    }

    await db.leads.insert_one(lead_document)

    return {
        "message": "Lead created",
        "lead_id": lead_document["_id"]
    }