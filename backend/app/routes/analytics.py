from fastapi import APIRouter, Request
from app.core.database import get_database
from datetime import datetime
import httpx
import uuid

router = APIRouter(prefix="/analytics")

IP_API_URL = "https://ipapi.co/{}/json/"


@router.post("/events")
async def track_event(data: dict, request: Request):

    db = await get_database("Advyay")

    session_id = data.get("session_id") or str(uuid.uuid4())
    visitor_id = data.get("visitor_id")

    ip = (
        request.headers.get("x-forwarded-for", "").split(",")[0]
        or request.client.host
    )

    user_agent = request.headers.get("user-agent")

    geo = {}

    try:

        async with httpx.AsyncClient(timeout=5) as client:

            r = await client.get(IP_API_URL.format(ip))

            if r.status_code == 200:

                g = r.json()

                geo = {
                    "country": g.get("country_name"),
                    "city": g.get("city"),
                    "region": g.get("region")
                }

    except:
        geo = {"country": "unknown"}

    event_doc = {

        "session_id": session_id,
        "visitor_id": visitor_id,

        "type": data.get("type"),
        "page": data.get("page"),

        "scroll_depth": data.get("scrollDepth"),
        "time_on_page": data.get("timeOnPage"),

        "metadata": data.get("metadata"),

        "device": data.get("device"),

        "utm": data.get("utm"),
        "referrer": data.get("referrer"),

        "ip": ip,
        "geo": geo,
        "user_agent": user_agent,

        "created_at": datetime.utcnow()

    }

    await db.events.insert_one(event_doc)

    await db.visitors.update_one(

        {"visitor_id": visitor_id},

        {

            "$setOnInsert": {

                "visitor_id": visitor_id,
                "first_seen": datetime.utcnow()

            },

            "$set": {

                "last_seen": datetime.utcnow(),
                "geo": geo

            },

            "$inc": {

                "event_count": 1

            }

        },

        upsert=True

    )

    return {

        "success": True,
        "session_id": session_id

    }