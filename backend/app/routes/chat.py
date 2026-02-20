from fastapi import APIRouter

router = APIRouter()

@router.post("/chat")
async def chat(data: dict):
    return {"reply": f"AI Response to: {data['message']}"}