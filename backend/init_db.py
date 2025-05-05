import logging
from tortoise.contrib.fastapi import register_tortoise
from fastapi import FastAPI
from dotenv import load_dotenv

# Initialize logging
logger = logging.getLogger("uvicorn")
logger.setLevel(logging.DEBUG)

# Load environment variables
load_dotenv()

# Create FastAPI app instance
app = FastAPI()

@app.on_event("startup")
async def init_db():
    try:
        logger.info("Initializing database...")

        # Register the Tortoise ORM with FastAPI
        await register_tortoise(
            app,
            db_url="sqlite://db.sqlite3",  # SQLite connection
            modules={"models": ["models.py"]},  # Correct models module
            generate_schemas=True,  # Auto-create tables
            add_exception_handlers=True,
        )

        logger.info("Database initialized successfully.")
    except Exception as e:
        logger.error(f"Error during database initialization: {e}")
        raise e
