from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from app import crud, schemas, db
import app.models.user as models
from app.utils import  authentication
from datetime import datetime, timedelta
from app.form_types.login_form  import LoginForm
from app.exception.client_error import InvalidCredentialsException, NotAuthorizedException, DeactivatedAdminAccount, InvalidPayloadException

router = APIRouter()

@router.post("/create-user", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(db.get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise InvalidPayloadException('Email is already registered')
    return crud.create_user(db=db, user=user)

@router.post("/user", response_model=schemas.Token)
async def login_for_access_token(form_data: LoginForm = Body(...), db: Session = Depends(db.get_db)):
    user = await authentication.authenticate_user(db, form_data.email, form_data.password)
    if not user:
        raise InvalidCredentialsException('Email and/or Password is invalid')
    access_token_expires = timedelta(minutes=authentication.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = authentication.create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer", "user": user.__dict__}

@router.post("/admin", response_model=schemas.Token)
async def admin_login(form_data: LoginForm = Body(...), db: Session = Depends(db.get_db)):
    user = await authentication.authenticate_user(db, form_data.email, form_data.password)
    if not user:
        raise InvalidCredentialsException()
    if not user.admin:
        raise NotAuthorizedException('User is not admin')
    if not user.admin.is_active:
        raise DeactivatedAdminAccount()
    
    access_token_expires = timedelta(minutes=authentication.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = authentication.create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer", "user": user.__dict__}