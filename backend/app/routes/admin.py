from bson import ObjectId
from fastapi import APIRouter, HTTPException, Response, Request, Depends
from datetime import datetime, timedelta
from app.core.security import verify_password, create_access_token, verify_token
import random

from app.core.database import get_database

router = APIRouter(prefix="/admin")

# =========================
# FIXED ADMIN CREDENTIALS
# =========================

ADMIN_EMAIL = "advyay0280@advyay.com"

# Pre-hashed password for "Advaitron54321!"
# Generate once using bcrypt and hardcode it
ADMIN_PASSWORD_HASH = "$2b$12$FWGrZrPZYfkrj6QHhjReyubJVjnnaLMkYswFtldmBnlEVLinU9hpu"
# If verification fails, I’ll give you generator script below.

# Temporary OTP store (memory)
CURRENT_OTP = None
OTP_EXPIRES_AT = None


# =========================
# STEP 1: LOGIN
# =========================

@router.post("/login")
async def login(data: dict, response: Response):

    email = data.get("email")
    password = data.get("password")

    if email != ADMIN_EMAIL:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(password, ADMIN_PASSWORD_HASH):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "email": ADMIN_EMAIL,
        "role": "admin"
    })

    response.set_cookie(
        key="admin_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=86400
    )

    return {"message": "Login successful"}
# =========================
# STEP 2: VERIFY OTP
# =========================

@router.post("/verify-otp")
async def verify_otp(data: dict, response: Response):
    global CURRENT_OTP, OTP_EXPIRES_AT

    otp = data.get("otp")

    if not CURRENT_OTP or otp != CURRENT_OTP:
        raise HTTPException(status_code=401, detail="Invalid OTP")

    if datetime.utcnow() > OTP_EXPIRES_AT:
        raise HTTPException(status_code=401, detail="OTP expired")

    token = create_access_token({
        "email": ADMIN_EMAIL,
        "role": "admin"
    })

    response.set_cookie(
        key="admin_token",
        value=token,
        httponly=True,
        secure=False,  # Set True in production
        samesite="lax"
    )

    CURRENT_OTP = None

    return {"message": "Login successful"}


# =========================
# AUTH DEPENDENCY
# =========================

async def get_current_admin(request: Request):
    token = request.cookies.get("admin_token")

    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        payload = verify_token(token)
        if payload.get("role") != "admin":
            raise HTTPException(status_code=401, detail="Invalid role")
        return payload
    except:
        raise HTTPException(status_code=401, detail="Invalid token")


# =========================
# TEST PROTECTED ROUTE
# =========================

@router.get("/me")
async def get_me(admin=Depends(get_current_admin)):
    return {
        "email": admin["email"],
        "role": admin["role"]
    }


@router.get("/leads")
async def get_leads():
    db = await get_database('Advyay')  # Explicitly specify DB name
    print("Fetching leads from database...", db)

    leads = await db.leads.find().sort("created_at", -1).to_list(100)

    for lead in leads:
        lead["_id"] = str(lead["_id"])

    return leads

@router.patch("/leads/{lead_id}")
async def update_lead_status(lead_id: str, data: dict):
    db = await get_database('Advyay')  # Explicitly specify DB name

    await db.leads.update_one(
        {"_id": ObjectId(lead_id)},
        {"$set": {
            "status": data.get("status"),
            "last_updated": datetime.utcnow()
        }}
    )

    return {"message": "Lead updated"}

@router.get("/events")
async def get_events():
    db = await get_database('Advyay')  # Explicitly specify DB name
    events = await db.events.find().sort("created_at", -1).to_list(200)

    for e in events:
        e["_id"] = str(e["_id"])

    return events

@router.get("/visitors")
async def get_visitors():
    db = await get_database()
    visitors = await db.visitors.find().sort("last_seen", -1).to_list(200)

    for v in visitors:
        v["_id"] = str(v["_id"])

    return visitors

@router.get("/stats")
async def get_dashboard_stats():
    db = await get_database("Advyay")

    total_visitors = await db.visitors.count_documents({})
    total_leads = await db.leads.count_documents({})
    high_intent = await db.leads.count_documents({"readiness_score": {"$gte": 70}})
    converted = await db.leads.count_documents({"status": "converted"})

    return {
        "total_visitors": total_visitors,
        "total_leads": total_leads,
        "high_intent": high_intent,
        "converted": converted
    }