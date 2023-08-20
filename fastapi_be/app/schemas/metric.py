from pydantic import BaseModel
from datetime import date
from typing import Optional

class MetricSnapshotBase(BaseModel):
    entry_date: Optional[str]
    next_estimated_fundraise_date: Optional[str]