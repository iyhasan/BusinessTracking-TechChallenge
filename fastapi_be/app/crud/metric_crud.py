from sqlalchemy.orm import Session, joinedload
from passlib.context import CryptContext
from app import models, schemas
from uuid import UUID
from typing import Optional
from sqlalchemy import desc, asc, String, func
from traceback import print_exc
from app.exception.client_error import ResourceNotFoundException

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

def get_entries_by_snapshot_id(
    db: Session,
    snapshot_id: UUID,
):
    return (
        db.query(models.metric.MetricEntry)
        .options(
            joinedload(models.metric.MetricEntry.metric_type),
            joinedload(models.metric.MetricEntry.created_by)
        )
        .filter(models.metric.MetricEntry.metric_snapshot_id == snapshot_id).all()
    )

def get_metric_entry_by_id(
    db: Session,
    snapshot_id: UUID,
    metric_type_id: UUID,
):
    return (
        db.query(models.metric.MetricEntry)
        .options(
            joinedload(models.metric.MetricEntry.metric_type),
            joinedload(models.metric.MetricEntry.created_by))
        .filter(models.metric.MetricEntry.metric_snapshot_id == snapshot_id)
        .filter(models.metric.MetricEntry.metric_type_id == metric_type_id)
        .first()
    )


def update_metric_entry(
    db: Session,
    current_user_id: UUID,
    db_entry: models.metric.MetricEntry,
    payload: schemas.metric.MetricEntryBase
):
    
    db_entry.metric_type_id = payload.metric_type_id
    db_entry.value = payload.value
    db_entry.value_type = payload.value_type
    db_entry.created_by_id = current_user_id

    db.commit()
    db.refresh(db_entry)
    return db_entry


def create_metric_entry(
    db: Session,
    current_user_id: UUID,
    payload: schemas.metric.CreateMetricEntry
):
    
    db_snapshot = get_metric_snapshot_by_id(db, payload.metric_snapshot_id)

    if not db_snapshot:
        raise ResourceNotFoundException('Invalid snapshot ID')

    db_entry = models.metric.MetricEntry(
        metric_snapshot_id = payload.metric_snapshot_id,
        metric_type_id = payload.metric_type_id,
        value = payload.value,
        value_type = payload.value_type,
        created_by_id = current_user_id
    )

    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return get_metric_entry_by_id(db, db_entry.metric_snapshot_id, db_entry.metric_type_id)


def get_metrics_for_company(db: Session, company_id: UUID):

    return (
        db.query(models.metric.MetricSnapshot)
        .options(joinedload(models.metric.MetricSnapshot.entries))
        .filter(models.metric.MetricSnapshot.company_id == company_id)
        .order_by(models.metric.MetricSnapshot.entry_date.desc())
        .all()
    )