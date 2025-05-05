from fastapi import APIRouter, UploadFile, File, Depends
from app.services.database_service import get_sales_data, get_sales_data_by_sku, import_sales_data_from_csv
from app.services.forecasting_service import DemandForecaster
import pandas as pd
from io import StringIO

router = APIRouter()

@router.post("/sales/upload/")
async def upload_sales_data(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(StringIO(contents.decode('utf-8')))
    result = await import_sales_data_from_csv(df)
    return result

@router.get("/sales/")
async def read_sales(skip: int = 0, limit: int = 100):
    sales = await get_sales_data(skip, limit)
    return sales

@router.get("/sales/{sku}")
async def read_sales_by_sku(sku: str):
    sales = await get_sales_data_by_sku(sku)
    return sales

@router.get("/forecast/{sku}")
async def forecast_demand(sku: str):
    sales_data = await get_sales_data(skip=0, limit=100000)
    sales_df = pd.DataFrame([{
        'date': item.date,
        'sku': item.sku,
        'sales': item.sales,
        'stock_level': item.stock_level,
        'supplier_lead_time_days': item.supplier_lead_time_days,
        'supplier_rating': item.supplier_rating,
        'competitor_price_usd': item.competitor_price_usd,
        'our_price_usd': item.our_price_usd
    } for item in sales_data])

    forecaster = DemandForecaster()
    forecast = await forecaster.forecast_demand(sales_df, sku)

    return forecast
