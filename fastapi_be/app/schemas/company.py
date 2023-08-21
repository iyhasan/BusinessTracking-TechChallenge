from pydantic import BaseModel
from typing import Optional

class CompanyBase(BaseModel):
    name: str
    city: str
    country: str
    logo_url: Optional[str]
    linkedin_url: Optional[str]

class Company(CompanyBase):
    id: str
    class Config:
        orm_mode=True


class Industry(BaseModel):
    id: int
    name: str


class BusinessModel(BaseModel):
    id: int
    name: str
    description: str