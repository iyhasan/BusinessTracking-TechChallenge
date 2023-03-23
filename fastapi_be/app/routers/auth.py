from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from app import crud, schemas, db
import app.models.user as models
from app.utils import  authentication
from datetime import datetime, timedelta
from app.form_types.login_form  import LoginForm

router = APIRouter()

@router.post("/user", response_model=schemas.Token)
async def login_for_access_token(form_data: LoginForm = Body(...), db: Session = Depends(db.get_db)):
    user = await authentication.authenticate_user(db, form_data.email, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=authentication.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = authentication.create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer", "user": user.__dict__}

@router.post("/admin", response_model=schemas.Token)
async def admin_login(form_data: LoginForm = Body(...), db: Session = Depends(db.get_db)):
    user = await authentication.authenticate_user(db, form_data.email, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not user.admin:
        raise HTTPException(status_code=400, detail="User is not an admin")
    if not user.admin.is_active:
        raise HTTPException(status_code=400, detail="Admin account disabled")
    
    access_token_expires = timedelta(minutes=authentication.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = authentication.create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer", "user": user.__dict__}