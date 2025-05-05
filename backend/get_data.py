from models import SalesData
import pandas as pd

async def import_sales_data_from_csv(df: pd.DataFrame):
    records = []
    for _, row in df.iterrows():
        sales_data = {
            "date": row['date'],
            "sku": row['sku'],
            "sales": row['sales'],
            "stock_level": row['stock_level'],
            "supplier_lead_time_days": row['supplier_lead_time_days'],
            "supplier_rating": row['supplier_rating'],
            "competitor_price_usd": row['competitor_price_usd'],
            "our_price_usd": row['our_price_usd']
        }
        records.append(sales_data)

    # Bulk create records
    await SalesData.bulk_create([SalesData(**item) for item in records])

    return {"message": f"Imported {len(df)} records successfully"}

async def get_sales_data(skip: int = 0, limit: int = 100):
    return await SalesData.all().offset(skip).limit(limit)

async def get_sales_data_by_sku(sku: str):
    return await SalesData.filter(sku=sku)
