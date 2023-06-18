from fastapi import APIRouter, Depends, HTTPException,  Body
from sqlalchemy.orm import Session
from app import crud, schemas, db
import app.models.user as models
from app.utils import  authentication
from datetime import datetime, timedelta
from app.form_types.login_form  import LoginForm
from app.exception.client_error import InvalidPayloadException

router = APIRouter()

@router.get("/me/", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(authentication.get_current_user)):
    return current_user
