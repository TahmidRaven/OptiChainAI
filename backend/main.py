import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from tortoise.contrib.fastapi import register_tortoise

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Configure logging
logger = logging.getLogger("uvicorn")
logger.setLevel(logging.INFO)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL", "http://localhost:5173"),
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database configuration
DB_CONFIG = {
    "connections": {"default": os.getenv("DB_URL", "sqlite://db.sqlite3")},
    "apps": {
        "models": {
            "models": ["models"],
            "default_connection": "default",
        }
    },
}

# Register Tortoise ORM
register_tortoise(
    app,
    config=DB_CONFIG,
    generate_schemas=True,
    add_exception_handlers=True,
)

# Include routers
from auth import router as auth_router
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])

# Basic endpoints
@app.get("/")
async def root():
    return {"message": "Welcome to OptiChain API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}