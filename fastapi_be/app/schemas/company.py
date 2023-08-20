from pydantic import BaseModel

class CompanyBase(BaseModel):
    name: str
    logo_url: str

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