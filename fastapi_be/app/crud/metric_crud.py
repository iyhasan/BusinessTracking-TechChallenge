from sqlalchemy.orm import Session, joinedload
from passlib.context import CryptContext
from app import models, schemas
from uuid import UUID
from typing import Optional
from sqlalchemy import desc, asc, String, func
from traceback import print_exc

def get_metric_types(db: Session):
    return db.query(models.metric.MetricType).all()

def get_latest_metric_for_company(db: Session, company_id: UUID):
    return (
        db.query(models.metric.MetricSnapshot)
        .options(
            joinedload(models.metric.MetricSnapshot.entries),
            joinedload(models.metric.MetricSnapshot.created_by)
        )
        
        .filter(
            models.metric.MetricSnapshot.company_id == company_id
        )
        .order_by(models.metric.MetricSnapshot.entry_date.desc())
        .first()
    )

def get_metric_snapshot_by_id(db: Session, metric_snapshot_id: UUID):
    return (
        db.query(models.metric.MetricSnapshot)
        .options(
            joinedload(models.metric.MetricSnapshot.entries),
            joinedload(models.metric.MetricSnapshot.created_by)
        )
        .filter(models.metric.MetricSnapshot.id == metric_snapshot_id)
        .first()
    )

def create_metric_snapshot(
    db: Session,
    created_by_id: UUID,
    company_id: UUID,
):
    db_metric_snapshot = models.metric.MetricSnapshot(company_id=company_id, created_by_id=created_by_id)
    db.add(db_metric_snapshot)
    db.commit()
    db.refresh(db_metric_snapshot)
    return db_metric_snapshot


def update_snapshot(
    db: Session,
    db_metric_snapshot: models.metric.MetricSnapshot,
    payload: schemas.metric.MetricSnapshotBase
):
    
    db_metric_snapshot.entry_date = payload['entry_date']
    db_metric_snapshot.next_estimated_fundraise_date = payload['next_estimated_fundraise_date']
    
    db.commit()
    db.refresh(db_metric_snapshot)
    return db_metric_snapshot