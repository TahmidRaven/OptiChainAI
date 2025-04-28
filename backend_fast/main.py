# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import File, UploadFile
from fastapi.responses import JSONResponse
from typing import List
import pandas as pd
from prophet import Prophet
import io
from datetime import datetime

app = FastAPI()

# CORS — Allow your React app to call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For now allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Basic API test route
@app.get("/")
async def root():
    return {"message":"Backend is live but not fully functional yet."}
