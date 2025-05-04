# backend_fast/models/user.py
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from ..utils.db import Base
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

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

class Inventory(Base):
    __tablename__ = "inventory"
    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String, index=True)
    current_stock = Column(Integer)
    lead_time_days = Column(Integer)

class Supplier(Base):
    __tablename__ = "suppliers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    avg_delivery_days = Column(Float)
    order_accuracy = Column(Float)
    price_rating = Column(Float)

class Route(Base):
    __tablename__ = "routes"
    id = Column(Integer, primary_key=True, index=True)
    origin = Column(String)
    destination = Column(String)
    distance_km = Column(Float)
    traffic_level = Column(Float)  # 0 to 1

class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"
    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String)
    quantity = Column(Integer)
    supplier_id = Column(Integer, ForeignKey('suppliers.id'))
    status = Column(String)
    supplier = relationship("Supplier")

class PriceData(Base):
    __tablename__ = "price_data"
    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String)
    competitor_price = Column(Float)
    demand_score = Column(Float)
    cost = Column(Float)
