import os  
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Debugging log for environment variables
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
print(f"GOOGLE_CLIENT_ID: {GOOGLE_CLIENT_ID}")  # Debugging log

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to the API!"}

# CORS setup for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the auth router with prefix "/auth"
app.include_router(auth_router, prefix="/auth")
