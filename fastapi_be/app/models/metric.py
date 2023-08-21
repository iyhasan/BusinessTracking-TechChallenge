from sqlalchemy import Column, String, ForeignKey, Integer, Date, Float
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from .base import Base, TimeStamps

class MetricSnapshot(Base, TimeStamps):
    __tablename__ = "metric_snapshot"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    company_id = Column(UUID(as_uuid=True), ForeignKey('company.id'))
    next_estimated_fundraise_date = Column(Date)
    created_by_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    entry_date = Column(Date, default=func.now())

    entries = relationship('MetricEntry')
    created_by = relationship('User')


class MetricType(Base):
    __tablename__ = 'metric_type'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200))
    label = Column(String(200))


class MetricEntry(Base, TimeStamps):
    __tablename__ = 'metric_entry'

    metric_snapshot_id = Column(UUID(as_uuid=True), ForeignKey('metric_snapshot.id'), primary_key=True)
    metric_type_id = Column(Integer, ForeignKey('metric_type.id'), primary_key=True)
    value = Column(Float)
    value_type = Column(String(100))
    created_by_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))

    metric_type = relationship('MetricType')
    created_by = relationship('User')