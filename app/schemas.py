from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    is_botanist: bool = False

class UserDelete(UserBase):
    id: str


class User(UserBase):
    id: int
    is_active: bool
    is_botanist: bool

    class Config:
        from_attributes = True

class PlantBase(BaseModel):
    name: str
    location: str
    care_instructions: Optional[str] = None

class PlantCreate(PlantBase):
    pass

class Plant(PlantBase):
    id: int
    photo_url: Optional[str]
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class CareRequestBase(BaseModel):
    plant_id: int
    start_date: datetime
    end_date: datetime

class CareRequestCreate(CareRequestBase):
    pass

class CareRequest(CareRequestBase):
    id: int
    botanist_id: Optional[int]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True