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

@router.get("/")
async def get_companies(
    page_num: int = 1,
    page_size: int = 20,
    name_search: Optional[str] = None,
    sort_by: str = 'name',
    ascending: bool = True,
    db: Session = Depends(db.get_db)
):
    companies = crud.company.get_companies(db, sort_by, ascending, helper.get_offset(page_num, page_size), page_size, name_search)
    return companies
