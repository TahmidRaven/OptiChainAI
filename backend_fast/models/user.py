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
    __tablename__ = "sales_data"
    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String, index=True)
    date = Column(Date)
    quantity = Column(Integer)

class ForecastResult(Base):
    __tablename__ = "forecast_result"
    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String, index=True)
    forecast_date = Column(Date)
    yhat = Column(Float)
    yhat_lower = Column(Float)
    yhat_upper = Column(Float)
