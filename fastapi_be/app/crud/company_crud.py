from sqlalchemy.orm import Session, joinedload
from passlib.context import CryptContext
from app import models, schemas
from uuid import UUID
from typing import Optional
from sqlalchemy import desc, asc, String, func

def get_company_by_id(db: Session, company_id: UUID):
    return db.query(models.company.Company).options(joinedload(models.company.Company.industries)).filter(models.company.Company.id == company_id).first()


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