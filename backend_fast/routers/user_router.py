from fastapi import APIRouter, HTTPException, Depends
from ..models.user import models
from ..schemas.user import models
from ..models.user import schemas
from ..utils.db import utils
from sqlalchemy.orm import Session

router = APIRouter()

def get_db():
    db = utils.db.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register/")
async def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = models.User(name=user.name, email=user.email, hashed_password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
