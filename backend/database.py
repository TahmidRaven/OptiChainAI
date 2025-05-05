from tortoise import Tortoise
from fastapi import FastAPI

DATABASE_URL = "sqlite://db.sqlite3"  # SQLite database URL

# Initialize Tortoise ORM
async def init():
    await Tortoise.init(
        db_url=DATABASE_URL,
        modules={"models": ["app.models.sales_data", "app.models.forecast_result"]},
    )
    await Tortoise.generate_schemas()

# Create the FastAPI app
app = FastAPI()

# Initialize Tortoise ORM with FastAPI
@app.on_event("startup")
async def startup():
    await init()

@app.on_event("shutdown")
async def shutdown():
    await Tortoise.close_connections()
