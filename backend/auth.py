from fastapi import APIRouter, Request

router = APIRouter()

@router.get("/auth/google")
async def google_login():
    return {"msg": "Google OAuth endpoint (to be implemented)"}
