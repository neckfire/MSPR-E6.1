from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List, Optional
from app import schemas, auth, models
from app.database import engine, get_db
from app.config import settings

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="A_rosa_je API")


@app.post("/token")
async def login(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/users/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, is_botanist=user.is_botanist)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/users/", response_model=schemas.User)
async def delete_user(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_user = db.query(models.User).filter(models.User.id == id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return db_user

@app.post("/plants/", response_model=schemas.Plant)
async def create_plant(
        plant: schemas.PlantCreate,
        photo: Optional[UploadFile] = File(None),
        current_user: models.User = Depends(auth.get_current_user),
        db: Session = Depends(get_db)
):
    db_plant = models.Plant(**plant.dict(), owner_id=current_user.id)
    if photo:
        # Save photo logic here
        photo_path = f"photos/{current_user.id}_{photo.filename}"
        with open(photo_path, "wb") as buffer:
            content = await photo.read()
            buffer.write(content)
        db_plant.photo_url = photo_path

    db.add(db_plant)
    db.commit()
    db.refresh(db_plant)
    return db_plant


@app.get("/plants/", response_model=List[schemas.Plant])
async def list_plants(
        current_user: models.User = Depends(auth.get_current_user),
        db: Session = Depends(get_db)
):
    plants = db.query(models.Plant).filter(models.Plant.owner_id == current_user.id).all()
    return plants


@app.post("/care-requests/", response_model=schemas.CareRequest)
async def create_care_request(
        care_request: schemas.CareRequestCreate,
        current_user: models.User = Depends(auth.get_current_user),
        db: Session = Depends(get_db)
):
    plant = db.query(models.Plant).filter(models.Plant.id == care_request.plant_id).first()
    if not plant or plant.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Plant not found or not owned by user")

    db_care_request = models.CareRequest(
        **care_request.dict(),
        status="pending"
    )
    db.add(db_care_request)
    db.commit()
    db.refresh(db_care_request)
    return db_care_request


@app.get("/care-requests/", response_model=List[schemas.CareRequest])
async def list_care_requests(
        current_user: models.User = Depends(auth.get_current_user),
        db: Session = Depends(get_db)
):
    if current_user.is_botanist:
        care_requests = db.query(models.CareRequest).filter(
            models.CareRequest.status == "pending"
        ).all()
    else:
        care_requests = db.query(models.CareRequest).join(models.Plant).filter(
            models.Plant.owner_id == current_user.id
        ).all()
    return care_requests