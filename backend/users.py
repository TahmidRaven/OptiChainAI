from fastapi import APIRouter, HTTPException
from models import User

router = APIRouter()

@router.post("/register")
async def register_user(name: str, email: str, password: str):
    existing = await User.get_or_none(email=email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = await User.create(name=name, email=email, password=password)
    return {"id": user.id, "email": user.email}
