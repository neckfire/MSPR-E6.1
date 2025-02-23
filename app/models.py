from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime, timezone

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_botanist = Column(Boolean, default=False)
    plants = relationship("Plant", back_populates="owner")


class Plant(Base):
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)
    care_instructions = Column(String)
    photo_url = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    owner = relationship("User", back_populates="plants")
    care_requests = relationship("CareRequest", back_populates="plant")


class CareRequest(Base):
    __tablename__ = "care_requests"

    id = Column(Integer, primary_key=True, index=True)
    plant_id = Column(Integer, ForeignKey("plants.id"))
    botanist_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    status = Column(String)  # pending, accepted, completed
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    plant = relationship("Plant", back_populates="care_requests")