from sqlalchemy import Column, String, UniqueConstraint, Boolean, ForeignKey
from sqlalchemy.orm import relationship
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

    admin = relationship("Admin", back_populates="user", uselist=False)

    def __repr__(self):
        s = f"<User id={self.id} email='{self.email}' first_name='{self.first_name}' last_name='{self.last_name}'>"
        if self.admin:
            s += f"\n\t<Admin is_active'{self.admin.is_active}'>"
        return s
    
class Admin(Base, TimeStamps):
    __tablename__ = 'admins'

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True, nullable=False)
    is_active = Column(Boolean, default=True)

    user = relationship("User", back_populates="admin")

