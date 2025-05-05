from fastapi import FastAPI
from db import init_db
from users import router as user_router
from auth import router as auth_router

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await init_db()

app.include_router(user_router, prefix="/users")
app.include_router(auth_router, prefix="/auth")

@app.get("/")
def root():
    return {"message": "Backend is running"}
