from tortoise import Tortoise
from config import DATABASE_URL

async def init_db():
    await Tortoise.init(
        db_url=DATABASE_URL,
        modules={"models": ["models"]}
    )
    await Tortoise.generate_schemas()
