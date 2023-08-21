from typing import Any, Dict, List, Optional, Union
import jwt
from jwt import PyJWTError
from datetime import datetime, timedelta
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.param_functions import Form
from sqlalchemy.orm import Session
from app import crud, schemas, db
import os
from dotenv import load_dotenv
import app.exception.client_error as ce

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def authenticate_user(db: Session, email: str, password: str):
    user = crud.get_user_by_email(db, email)
    if not user:
        return None
    if not crud.verify_password(password, user.hashed_password):
        return None
    return user

async def get_current_user(db: Session = Depends(db.get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = ce.InvalidCredentialsException()
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except PyJWTError:
        raise credentials_exception
    user = crud.get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

async def get_current_admin(db: Session = Depends(db.get_db), token: str = Depends(oauth2_scheme)):
    user = await get_current_user(db, token)

    if not user.admin:
        raise ce.NotAuthorizedException()
    if not user.admin.is_active:
        raise ce.DeactivatedAdminAccount()
    
    print(user)

    return user
