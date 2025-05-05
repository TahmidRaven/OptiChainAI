import os
import httpx
from fastapi import APIRouter, Request, HTTPException
from models import User
from tortoise.exceptions import DoesNotExist
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET") 

@router.post("/google")
async def google_login(request: Request):
    data = await request.json()
    print("Received data:", data)  # Debugging log
    token = data.get("token")
    username = data.get("username")
    email = data.get("email")

    if not token:
        raise HTTPException(status_code=400, detail="Missing token")
    if not email:
        raise HTTPException(status_code=400, detail="Missing email")

    async with httpx.AsyncClient() as client:
        res = await client.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={token}")
        print(f"Token validation response: {res.status_code}")  # Debugging log

    if res.status_code != 200:
        raise HTTPException(status_code=400, detail="Invalid token")

    payload = res.json()

    if payload["aud"] != GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=400, detail="Token audience mismatch")

    # Check if user exists or create new one
    try:
        user = await User.get(email=email)
    except DoesNotExist:
        print(f"Creating new user: {username} - {email}")  # Debugging log
        user = await User.create(username=username, email=email, password=None)  # No password in OAuth

    return {
        "message": "Login successful",
        "user": {
            "username": user.username,
            "email": user.email
        }
    }
