from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .base import Base, TimeStamps

class Company(Base, TimeStamps):
    __tablename__ = "company"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String(200))
    logo_url = Column(String)
    city = Column(String(50))
    country = Column(String(50))
    linkedin_url = Column(String)

    industries = relationship('Industry', secondary='company_industry', back_populates='companies')
    business_models = relationship('BusinessModel', secondary='company_business_model', back_populates='companies')


class Industry(Base):
    __tablename__ = 'industry'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))
    main_industry = Column(String(100))

    companies = relationship('Company', secondary='company_industry', back_populates='industries')


class BusinessModel(Base):
    __tablename__ = 'business_model'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200))
    description = Column(String)

    companies = relationship('Company', secondary='company_business_model', back_populates='business_models')


class CompanyIndustry(Base, TimeStamps):
    __tablename__ = 'company_industry'

    company_id = Column(UUID(as_uuid=True), ForeignKey('company.id'), primary_key=True)
    industry_id = Column(Integer, ForeignKey('industry.id'), primary_key=True)


class CompanyBusinessModel(Base, TimeStamps):
    __tablename__ = 'company_business_model'

    company_id = Column(UUID(as_uuid=True), ForeignKey('company.id'), primary_key=True)
    business_model_id = Column(Integer, ForeignKey('business_model.id'), primary_key=True)