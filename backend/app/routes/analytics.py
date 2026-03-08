from fastapi import APIRouter, Request
from app.core.database import get_database
from datetime import datetime
import httpx
import uuid

router = APIRouter(prefix="/analytics")

IP_API_URL = "https://ipapi.co/{}/json/"

# ---------------------------
# TRACK VISITOR EVENT
# ---------------------------

@router.post("/events")
async def track_event(data: dict, request: Request):    

    print("Tracking event:", data.get("type"), "from page:", data.get("page"))

    db = await get_database('Advyay')  # Explicitly specify DB name

    session_id = data.get("session_id") or str(uuid.uuid4())

    ip = (
        request.headers.get("x-forwarded-for", "").split(",")[0]
        or request.headers.get("x-real-ip")
        or request.client.host
    )

    user_agent = request.headers.get("user-agent", "unknown")

    # Geo lookup
    geo = {"country": "unknown"}
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

    event_doc = {
        "session_id": session_id,
        "type": data.get("type"),
        "page": data.get("page"),
        "metadata": data.get("metadata"),
        "scroll_depth": data.get("scrollDepth"),
        "time_on_page": data.get("timeOnPage"),
        "utm": data.get("utm"),
        "referrer": data.get("referrer"),
        "ip": ip,
        "user_agent": user_agent,
        "geo": geo,
        "created_at": datetime.utcnow()
    }

    await db.events.insert_one(event_doc)

    # Upsert visitor summary
    await db.visitors.update_one(
        {"session_id": session_id},
        {
            "$setOnInsert": {
                "session_id": session_id,
                "first_seen": datetime.utcnow(),
                "geo": geo,
                "ip": ip,
                "user_agent": user_agent
            },
            "$set": {
                "last_seen": datetime.utcnow()
            },
            "$inc": {
                "event_count": 1
            }
        },
        upsert=True
    )

    return {"success": True, "session_id": session_id}