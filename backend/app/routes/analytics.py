from fastapi import APIRouter, Request
from app.core.database import get_database
from datetime import datetime
import uuid
import httpx

router = APIRouter(prefix="/analytics")

IP_API_URL = "https://ipapi.co/{}/json/"


@router.post("/events")
async def track_event(data: dict, request: Request):

    db = await get_database("Advyay")

    visitor_id = data.get("visitor_id")
    session_id = data.get("session_id")

    if not visitor_id:
        visitor_id = str(uuid.uuid4())

    if not session_id:
        session_id = str(uuid.uuid4())

    ip = (
        request.headers.get("x-forwarded-for", "").split(",")[0]
        or request.headers.get("x-real-ip")
        or request.client.host
    )

    geo = {}

    try:

        async with httpx.AsyncClient(timeout=5) as client:

            r = await client.get(IP_API_URL.format(ip))

            if r.status_code == 200:
                g = r.json()
                geo = {
                    "country": g.get("country_name"),
                    "region": g.get("region"),
                    "city": g.get("city")
                }

    except:
        pass

    event = {
        "type": data.get("type"),
        "page": data.get("page"),
        "metadata": data.get("metadata"),
        "created_at": datetime.utcnow()
    }

    # create visitor if not exists
    await db.visitors.update_one(
        {"visitor_id": visitor_id},
        {
            "$setOnInsert": {
                "visitor_id": visitor_id,
                "first_seen": datetime.utcnow(),
                "ip": ip,
                "geo": geo,
                "device": data.get("device"),
                "sessions": []
            },
            "$set": {
                "last_seen": datetime.utcnow()
            }
        },
        upsert=True
    )

    visitor = await db.visitors.find_one({"visitor_id": visitor_id})

    session_exists = False

    for s in visitor.get("sessions", []):
        if s["session_id"] == session_id:
            session_exists = True
            break

    if not session_exists:

        session_doc = {
            "session_id": session_id,
            "started_at": datetime.utcnow(),
            "last_activity": datetime.utcnow(),
            "entry_page": data.get("page"),
            "exit_page": data.get("page"),
            "pages": [data.get("page")],
            "events": [event]
        }

        await db.visitors.update_one(
            {"visitor_id": visitor_id},
            {"$push": {"sessions": session_doc}}
        )

    else:

        await db.visitors.update_one(
            {
                "visitor_id": visitor_id,
                "sessions.session_id": session_id
            },
            {
                "$push": {"sessions.$.events": event},
                "$set": {
                    "sessions.$.last_activity": datetime.utcnow(),
                    "sessions.$.exit_page": data.get("page")
                },
                "$addToSet": {
                    "sessions.$.pages": data.get("page")
                }
            }
        )

    return {
        "success": True,
        "visitor_id": visitor_id,
        "session_id": session_id
    }