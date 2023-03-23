from fastapi import APIRouter, Depends, HTTPException,  Body
from sqlalchemy.orm import Session
from app import crud, schemas, db
import app.models.user as models
from app.utils import  authentication
from datetime import datetime, timedelta
from app.form_types.login_form  import LoginForm

router = APIRouter()

@router.post("/metrics")
async def table_metrics(form_data: LoginForm = Body(...), db: Session = Depends(db.get_db)):
    return {
        'user_count': 1
    }