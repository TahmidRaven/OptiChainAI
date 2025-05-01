# backend_fast/models/user.py
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from ..utils.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

from sqlalchemy import Column, Integer, String, Date, Float
from database import Base

class SalesData(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, index=True)
    date = Column(Date)
    quantity_sold = Column(Float)
