from fastapi import APIRouter, Depends, HTTPException,  Body
from sqlalchemy.orm import Session
from app import crud, schemas, db
import app.models.user as models
from app.utils import  authentication, helper
from datetime import datetime, timedelta
from app.form_types.login_form  import LoginForm
from app.exception.client_error import InvalidPayloadException
from typing import List, Optional

router = APIRouter()

@router.get("/types")
async def get_metric_types(
    db: Session = Depends(db.get_db)
):
    types = crud.metric.get_metric_types(db)
    return types