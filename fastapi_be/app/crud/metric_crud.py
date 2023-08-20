from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app import models, schemas
from uuid import UUID
from typing import Optional
from sqlalchemy import desc, asc, String, func

def get_metric_types(db: Session):
    return db.query(models.metric.MetricType).all()