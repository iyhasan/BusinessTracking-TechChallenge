from fastapi import APIRouter, Depends, HTTPException,  Body
from sqlalchemy.orm import Session
from app import crud, schemas, db
import app.models.user as models
from app.utils import  authentication
from datetime import datetime, timedelta
from app.form_types.login_form  import LoginForm

router = APIRouter()

@router.get("/me/", response_model=schemas.AdminUser)
async def read_users_me(current_user: models.User = Depends(authentication.get_current_admin)):
    return schemas.user_to_admin_user(current_user)

@router.post("/metrics")
async def table_metrics(form_data: LoginForm = Body(...), db: Session = Depends(db.get_db)):
    return {
        'user_count': 1
    }