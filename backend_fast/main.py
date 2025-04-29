# main.py
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
import pandas as pd
from io import StringIO
from datetime import datetime

# Local imports
from .routers import user_router  # Register router
from .utils.db import Base, engine  # Create tables

# Initialize FastAPI
app = FastAPI()

# CORS — allow your React app to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Basic test route
@app.get("/")
async def root():
    return {"message": "Backend is live but not fully functional yet."}

# CSV Upload endpoint
@app.post("/upload-csv/")
async def upload_csv(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(StringIO(contents.decode('utf-8')))
    return {"message": "CSV file uploaded successfully", "columns": df.columns.tolist()}

# Include user router (e.g., /register/)
app.include_router(user_router.router)
