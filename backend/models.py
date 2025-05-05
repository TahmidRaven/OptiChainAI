from tortoise import fields
from tortoise.models import Model

class User(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    email = fields.CharField(max_length=255, unique=True)
    password = fields.CharField(max_length=128)  # Optional if using Google auth only
    created_at = fields.DatetimeField(auto_now_add=True)

class SalesData(Base):
    __tablename__ = "sales_data"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    sku = Column(String)
    sales = Column(Integer)
    stock_level = Column(Integer)
    supplier_lead_time_days = Column(Integer)
    supplier_rating = Column(Float)
    competitor_price_usd = Column(Float)
    our_price_usd = Column(Float)

class ForecastResult(Model):
    id = fields.IntField(pk=True)
    sku = fields.CharField(max_length=255)
    forecast_date = fields.DateField()
    yhat = fields.FloatField()
    yhat_lower = fields.FloatField()
    yhat_upper = fields.FloatField()
