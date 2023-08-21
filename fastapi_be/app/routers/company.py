from fastapi import APIRouter, Depends, HTTPException,  Body
from sqlalchemy.orm import Session
from app import crud, schemas, db
import app.models.user as models
from app.utils import  authentication, helper
from datetime import datetime, timedelta
from app.form_types.login_form  import LoginForm
from app.exception.client_error import InvalidPayloadException, ResourceNotFoundException
from typing import List, Optional
from uuid import UUID


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
    companies = crud.company.get_companies(db, sort_by, ascending, name_search)
    return companies


@router.post("/")
async def create_new_company(
    payload: schemas.company.CompanyBase,
    current_user = Depends(authentication.get_current_user),
    db = Depends(db.get_db)
):
    db_company = crud.company.create_new_company(db, current_user, payload)

    return db_company


@router.get("/industries")
async def get_industries(
    db: Session = Depends(db.get_db)
):
    db_industries = crud.company.get_industries(db)
    return db_industries


@router.post("/industries/{company_id}")
async def update_industries_for_company(
    payload: List[int],
    company_id: UUID,
    db: Session = Depends(db.get_db),
    current_user = Depends(authentication.get_current_user),
):
    db_industries = crud.company.get_industries(db, payload)
    
    crud.company.update_industries_for_company(db, company_id, db_industries)

    return crud.company.get_industries_for_company(db, company_id)


@router.get("/business-models")
async def get_industries(
    db: Session = Depends(db.get_db)
):
    db_business_models = crud.company.get_business_models(db)
    return db_business_models


@router.post("/business-models/{company_id}")
async def update_business_models_for_company(
    payload: List[int],
    company_id: UUID,
    db: Session = Depends(db.get_db),
    current_user = Depends(authentication.get_current_user),
):
    db_business_models = crud.company.get_business_models(db, payload)

    
    crud.company.update_business_models_for_company(db, company_id, db_business_models)

    return crud.company.get_business_models_for_company(db, company_id)


@router.get("/{company_id}")
async def get_company_by_id(
    company_id: UUID,
    db: Session = Depends(db.get_db),
):
    company = crud.company.get_company_by_id(db, company_id)

    if not company:
        raise ResourceNotFoundException('Company Not Found')
    
    return company