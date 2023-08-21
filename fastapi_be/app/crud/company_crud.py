from sqlalchemy.orm import Session, joinedload
from passlib.context import CryptContext
from app import models, schemas
from uuid import UUID
from typing import Optional, List
from sqlalchemy import desc, asc, String, func, and_

def get_company_by_id(db: Session, company_id: UUID):
    return (
        db.query(models.company.Company)
        .options(
            joinedload(models.company.Company.industries),
            joinedload(models.company.Company.business_models)
        )
        .filter(models.company.Company.id == company_id)
        .first()
    )


def get_companies(
    db: Session,
    sort_by: str = "name",
    is_asc: bool = True,
    offset: int =  0,
    limit: int =  20,
    search_name: Optional[str] = None,
):
    
    order_func = asc if is_asc else desc
    
    query =  db.query(models.company.Company)

    if search_name:
        query = query.filter(models.company.Company.name.ilike(f"%{search_name}%"))
    
    db_companies = (
        query
        .order_by(order_func(getattr(models.company.Company, sort_by)))
        .offset(offset).limit(limit)
        .all()
    )

    return db_companies 


def get_business_models(db: Session, ids: List[int]=None):
    query = db.query(models.company.BusinessModel)
    
    if (ids):
        query = query.filter(models.company.BusinessModel.id.in_(ids))
    
    return query.all()

def get_industries(db: Session, ids: List[int]=None):
    query = db.query(models.company.Industry)
    
    if (ids):
        query = query.filter(models.company.Industry.id.in_(ids))
    
    return query.all()


def update_industries_for_company(db: Session, company_id: UUID, db_industries: List[models.company.Industry]):

    db_company_industries = list(map(
        lambda db_i: models.company.CompanyIndustry(company_id=company_id, industry_id=db_i.id)
        , db_industries
    ))

    # Start a transaction
    try:

        # Delete existing associations
        db.query(models.company.CompanyIndustry).filter_by(company_id=company_id).delete()

        # Add new associations
        db.add_all(db_company_industries)
        db.commit()
    
    except Exception as e:
        db.rollback()  # Roll back the changes in case of error
        raise e       # Re-raise the caught exception
    
    
    return db_company_industries

def get_industries_for_company(db: Session, company_id: UUID):
    return (
        db.query(models.company.Industry)
        .join(models.company.CompanyIndustry, models.company.CompanyIndustry.industry_id == models.company.Industry.id)
        .filter(models.company.CompanyIndustry.company_id == company_id)
        .all()
    )

def update_business_models_for_company(db: Session, company_id: UUID, db_business_models: models.company.BusinessModel):
    db_company_business_models = list(map(
        lambda db_i: models.company.CompanyBusinessModel(company_id=company_id, business_model_id=db_i.id)
        , db_business_models
    ))

    # Start a transaction
    try:

        # Delete existing associations
        db.query(models.company.CompanyBusinessModel).filter_by(company_id=company_id).delete()

        # Add new associations
        db.add_all(db_company_business_models)
        db.commit()
    
    except Exception as e:
        db.rollback()  # Roll back the changes in case of error
        raise e       # Re-raise the caught exception
    
    
    return db_company_business_models


def get_business_models_for_company(db: Session, company_id: UUID):
    return (
        db.query(models.company.BusinessModel)
        .join(models.company.CompanyBusinessModel, models.company.CompanyBusinessModel.business_model_id == models.company.BusinessModel.id)
        .filter(models.company.CompanyBusinessModel.company_id == company_id)
        .all()
    )