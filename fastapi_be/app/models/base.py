from sqlalchemy import DateTime, Column
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base

class TimeStamps(object):
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now())

Base = declarative_base()