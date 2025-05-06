from tortoise import fields
from tortoise.models import Model

class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=255)
    email = fields.CharField(max_length=255, unique=True)
    password = fields.CharField(max_length=255, null=True)  # If not used, can be None

    def __str__(self):
        return f'{self.username} ({self.email})'

class ProductData(Model):
    id = fields.IntField(pk=True)
    date = fields.DateField()
    sku = fields.CharField(max_length=100)
    sales = fields.IntField()
    stock_level = fields.IntField()
    supplier_lead_time_days = fields.IntField()
    supplier_rating = fields.FloatField()
    competitor_price_usd = fields.FloatField()
    our_price_usd = fields.FloatField()