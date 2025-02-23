import fastapi.responses
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List
from app import schemas, auth, models
from app.database import engine, get_db
from app.config import settings

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="A_rosa_je API", )

app.add_middleware(
    CORSMiddleware,
     allow_origins=["http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"]
)

@app.options("/{rest_of_path:path}")
async def preflight_handler():
    return fastapi.responses.Response(status_code=204)


@app.post("/token")
async def login(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    """
        Authenticate a user and return a JWT token.

        Parameters:
        - form_data: OAuth2 password request form containing:
            - username: User's email
            - password: User's password

        Returns:
        - access_token: JWT token for authentication
        - token_type: Type of token (bearer)

        Raises:
        - 401: If email or password is incorrect
        """
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
    """
        Create a new user account.

        Parameters:
        - user: User creation schema containing:
            - email: User's email address
            - password: User's password
            - is_botanist: Boolean indicating if user is a botanist

        Returns:
        - User object with created user details

        Raises:
        - 400: If email is already registered
    """
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, is_botanist=user.is_botanist)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/me/", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    """
    Get details of the currently authenticated user.

    Returns:
    - User object with current user's details

    Requires:
    - Valid JWT token in Authorization header
    """
    return current_user

@app.delete("/users/", response_model=schemas.User)
async def delete_user(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
        Delete a user account.

        Parameters:
        - id: ID of the user to delete

        Returns:
        - Deleted user object

        Raises:
        - 404: If user is not found

        Requires:
        - Valid JWT token in Authorization header
    """
    db_user = db.query(models.User).filter(models.User.id == id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return db_user


@app.post("/plants/", response_model=schemas.Plant)
async def create_plant(
        name: str,
        location: str,
        care_instructions: str | None = None,
        photo: UploadFile = File(None),
        current_user: models.User = Depends(auth.get_current_user),
        db: Session = Depends(get_db)
):
    """
       Create a new plant entry.

       Parameters:
       - name: Name of the plant
       - location: Location of the plant
       - care_instructions: Optional care instructions
       - photo: Optional photo file of the plant

       Returns:
       - Created plant object

       Requires:
       - Valid JWT token in Authorization header
   """
    plant_data = {
        "name": name,
        "location": location,
        "care_instructions": care_instructions,
        "owner_id": current_user.id
    }

    db_plant = models.Plant(**plant_data)
    if photo:
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
    """
       List all plants owned by the current user.

       Returns:
       - List of plant objects owned by the authenticated user

       Requires:
       - Valid JWT token in Authorization header
   """
    plants = db.query(models.Plant).filter(models.Plant.owner == current_user).all()
    return plants


@app.put("/plants/{plant_id}/start-care", response_model=schemas.Plant)
async def start_plant_care(
        plant_id: int,
        botanist_id: int,
        current_user: models.User = Depends(auth.get_current_user),
        db: Session = Depends(get_db)
):
    """
        Start plant care by assigning a botanist.

        Parameters:
        - plant_id: ID of the plant to be cared for
        - botanist_id: ID of the botanist who will care for the plant

        Returns:
        - Updated plant object

        Raises:
        - 404: If plant is not found or not owned by user
        - 404: If botanist is not found

        Requires:
        - Valid JWT token in Authorization header
    """
    plant = db.query(models.Plant).filter(models.Plant.id == plant_id).first()
    if not plant or plant.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Plant not found or not owned by user")

    botanist = db.query(models.User).filter(
        models.User.id == botanist_id,
        models.User.is_botanist == True
    ).first()
    if not botanist:
        raise HTTPException(status_code=404, detail="Botanist not found")

    plant.in_care = True
    plant.plant_sitting = botanist_id
    db.commit()
    db.refresh(plant)
    return plant


@app.put("/plants/{plant_id}/end-care", response_model=schemas.Plant)
async def end_plant_care(
        plant_id: int,
        current_user: models.User = Depends(auth.get_current_user),
        db: Session = Depends(get_db)
):
    plant = db.query(models.Plant).filter(models.Plant.id == plant_id).first()
    if not plant or plant.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Plant not found or not owned by user")

    plant.in_care = False
    plant.plant_sitting = None
    db.commit()
    db.refresh(plant)
    return plant


@app.get("/care-requests/", response_model=List[schemas.Plant])
async def list_care_requests(
        current_user: models.User = Depends(auth.get_current_user),
        db: Session = Depends(get_db)
):
    care_requests = db.query(models.Plant).filter(
        models.Plant.in_care == True
    ).all()
    return care_requests