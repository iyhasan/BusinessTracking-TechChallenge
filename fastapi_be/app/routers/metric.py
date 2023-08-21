from fastapi import APIRouter, Depends, HTTPException,  Body
from sqlalchemy.orm import Session
from app import crud, schemas, db
import app.models.user as models
from app.utils import  authentication, helper
from datetime import datetime, timedelta
from app.form_types.login_form  import LoginForm
from app.exception.client_error import InvalidPayloadException, ResourceNotFoundException
from app.exception.server_error import ErrorCreatingResource, ErrorUpdatingResource
from typing import List, Optional
from uuid import UUID

router = APIRouter()

@router.get("/types")
async def get_metric_types(
    db: Session = Depends(db.get_db)
):
    types = crud.metric.get_metric_types(db)
    return types


@router.get("/latest/company/{company_id}")
async def get_metrics_for_company(
    company_id: UUID,
    db: Session = Depends(db.get_db)
):
    latest_metric = crud.metric.get_latest_metric_for_company(db, company_id)

    if not latest_metric:
        raise ResourceNotFoundException('No metrics for company')

    return latest_metric

@router.get("/company/{company_id}")
async def get_metric_snapshots_for_company(
    company_id: UUID,
    db: Session = Depends(db.get_db)
):
    return crud.metric.get_metrics_for_company(db, company_id)

@router.post("/company/{company_id}")
async def create_metric_snapshot_for_company(
    company_id: UUID,
    current_user = Depends(authentication.get_current_user),
    db: Session = Depends(db.get_db)
):
    new_metric = crud.metric.create_metric_snapshot(db, current_user.id, company_id)
    db_metric_snapshot = crud.metric.get_metric_snapshot_by_id(db, new_metric.id)

    if not db_metric_snapshot:
        raise ErrorCreatingResource

    return db_metric_snapshot


@router.get('/snapshot/{snapshot_id}')
async def get_snapshot_by_id(
    snapshot_id: UUID,
    db: Session = Depends(db.get_db),
):
    db_snapshot = crud.metric.get_metric_snapshot_by_id(db, snapshot_id)

    if not db_snapshot:
        raise ResourceNotFoundException
    
    return db_snapshot

@router.put("/snapshot/{snapshot_id}")
async def update_metric_snapshot_by_id(
    snapshot_id: UUID,
    payload: schemas.metric.MetricSnapshotBase,
    current_user = Depends(authentication.get_current_user),
    db: Session = Depends(db.get_db)
):

    db_snapshot = crud.metric.get_metric_snapshot_by_id(db, snapshot_id)

    if not db_snapshot:
        raise ResourceNotFoundException

    db_updated_snapshot = crud.metric.update_snapshot(db, db_snapshot, dict(payload))

    if not db_snapshot:
        raise ErrorUpdatingResource
    
    return db_updated_snapshot


@router.get("/entries/by-snapshot/{snapshot_id}")
async def get_entries_for_snapshot(
    snapshot_id: UUID,
    db: Session = Depends(db.get_db)
):
    db_entries = crud.metric.get_entries_by_snapshot_id(db, snapshot_id)

    return db_entries

@router.post("/entries/")
async def create_entry_for_snapshot(
    payload: schemas.metric.CreateMetricEntry,
    current_user = Depends(authentication.get_current_user),
    db: Session = Depends(db.get_db)
):
    db_entry = crud.metric.get_metric_entry_by_id(db, payload.metric_snapshot_id, payload.metric_type_id)

    if db_entry:
        raise InvalidPayloadException
    
    db_entry = crud.metric.create_metric_entry(
        db, current_user.id, payload
    )

    return db_entry

@router.put("/entries/{snapshot_id}/{metric_type_id}")
async def update_value_for_entry(
    snapshot_id: UUID,
    metric_type_id: int,
    payload: schemas.metric.MetricEntryBase,
    current_user = Depends(authentication.get_current_user),
    db: Session = Depends(db.get_db)
):

    db_entry = crud.metric.get_metric_entry_by_id(db, snapshot_id, metric_type_id)

    if not db_entry:
        raise ResourceNotFoundException
    
    db_updated_entry = crud.metric.update_metric_entry(db, current_user.id, db_entry, payload)

    if not db_updated_entry:
        raise ErrorUpdatingResource
    
    return db_updated_entry