from fastapi import APIRouter, Depends, HTTPException,  Body
from sqlalchemy.orm import Session
from app import crud, schemas, db
import app.models as models
from app.utils import  authentication
from datetime import datetime, timedelta
from app.form_types.login_form  import LoginForm

router = APIRouter()

@router.get("/me/", response_model=schemas.AdminUser)
async def read_users_me(current_user: models.User = Depends(authentication.get_current_admin)):
    return schemas.user_to_admin_user(current_user)

@router.get("/count-metrics")
async def table_metrics(db: Session = Depends(db.get_db)):
    return {
        'user_count': db.query(models.User).count(),
        'admin_count': db.query(models.Admin).count(),
        'active_admin_count': db.query(models.Admin).filter(models.Admin.is_active == True).count(),
        'inactive_admin_count': db.query(models.Admin).filter(models.Admin.is_active == False).count(),
    }