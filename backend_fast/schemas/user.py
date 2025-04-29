# backend_fast/schemas/user.py
from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

    class Config:
        orm_mode = True
