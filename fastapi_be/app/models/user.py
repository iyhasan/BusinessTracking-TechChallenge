from sqlalchemy import Column, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import text
import uuid
from .base import Base, TimeStamps

class User(Base, TimeStamps):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    first_name = Column(String)
    last_name  = Column(String)

