# main.py
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
import pandas as pd
from io import StringIO
from datetime import datetime
from .ai_models.demand_forcasting import DemandForecaster 

# Local imports
from .routers import user_router  # Register router
from .utils.db import Base, engine  # Create tables

# Initialize FastAPI
app = FastAPI()

# CORS — allow your React app to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Basic test route
@app.get("/")
async def root():
    return {"message": "Backend is live but not fully functional yet."}

# CSV Upload endpoint
@app.post("/upload-csv/")
async def upload_csv(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(StringIO(contents.decode('utf-8')))
    return {"message": "CSV file uploaded successfully", "columns": df.columns.tolist()}

# Include user router (e.g., /register/)
app.include_router(user_router.router)

# Initialize forecaster
forecaster = DemandForecaster("dummy_sme_clothing_data_bd_festivals.csv")

@app.get("/skus")
def get_skus():
    return forecaster.get_skus()

@app.get("/forecast/{sku}")
def forecast_sku(sku: str):
    try:
        return forecaster.forecast(sku)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/inventory-optimize")
def inventory_recommendations(db: Session = Depends(get_db)):
    inventory = db.query(Inventory).all()
    return [
        {"sku": inv.sku, **calculate_inventory_threshold(inv.current_stock, 50, inv.lead_time_days)}
        for inv in inventory
    ]

@app.get("/supplier-analytics")
def supplier_scores(db: Session = Depends(get_db)):
    suppliers = db.query(Supplier).all()
    return score_suppliers(suppliers)

@app.get("/route-optimization")
def best_route(db: Session = Depends(get_db)):
    routes = db.query(Route).all()
    return optimize_route(routes)

@app.get("/purchase-orders")
def get_po_suggestions(db: Session = Depends(get_db)):
    inventories = db.query(Inventory).all()
    # Example static sales data
    sales_data = {inv.sku: [30, 35, 28, 33] for inv in inventories}
    return suggest_purchase_orders(inventories, sales_data)

@app.get("/dynamic-pricing")
def pricing_recommendations(db: Session = Depends(get_db)):
    prices = db.query(PriceData).all()
    return recommend_price(prices)
