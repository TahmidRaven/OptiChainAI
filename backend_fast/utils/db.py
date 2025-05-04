# utils/db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "sqlite:///./optisme.db"  # SQLite database URL for simplicity
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# This is the base class for all ORM models
Base = declarative_base()

# SessionLocal to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables (only once during setup)
Base.metadata.create_all(bind=engine)

def load_csv_to_db(db: Session, csv_path: str):
    df = pd.read_csv(csv_path)
    for _, row in df.iterrows():
        db.add(SalesData(sku=row["sku"], date=row["date"], quantity=row["quantity"]))
    db.commit()
