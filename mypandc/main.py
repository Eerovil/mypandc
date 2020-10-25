from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/scenes/", response_model=schemas.Scene)
def create_scene(scene: schemas.SceneCreate, db: Session = Depends(get_db)):
    return crud.create_scene(db, scene)


@app.get("/scenes/", response_model=List[schemas.Scene])
def read_scenes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    scenes = crud.get_scenes(db, skip=skip, limit=limit)
    return scenes


@app.get("/scenes/{scene_id}", response_model=schemas.Scene)
def read_scene(scene_id: int, db: Session = Depends(get_db)):
    db_scene = crud.get_scene(db, scene_id=scene_id)
    if db_scene is None:
        raise HTTPException(status_code=404, detail="scene not found")
    return db_scene


@app.post("/scenes/{scene_id}/links/", response_model=schemas.SceneLink)
def create_scene_link(
        scene_id: int, scene_to_id: int,
        scene_link: schemas.SceneLinkCreate, db: Session = Depends(get_db),
        location_x: int=None, location_y: int=None, is_link_back: bool=False):        
    return crud.create_scene_link(
        db, scene_link, scene_from_id=scene_id, scene_to_id=scene_to_id,
        location_x=location_x, location_y=location_y, is_link_back=is_link_back
    )
