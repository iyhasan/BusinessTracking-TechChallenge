from pydantic import BaseModel
from datetime import date
from typing import Optional
from uuid import UUID

class MetricSnapshotBase(BaseModel):
    entry_date: Optional[str]
    next_estimated_fundraise_date: Optional[str]

class MetricEntryBase(BaseModel):
    metric_type_id: int
    value: Optional[float]
    value_type: Optional[str]

class CreateMetricEntry(MetricEntryBase):
    metric_snapshot_id: str
