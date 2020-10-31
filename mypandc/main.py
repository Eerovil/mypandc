import io
import base64
import os
from uuid import uuid4

from PIL import Image

from typing import List

from fastapi import Depends, FastAPI, HTTPException, File, UploadFile, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

dir_path = os.path.dirname(os.path.realpath(__file__))

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.mount("/static", StaticFiles(directory="mypandc/static"), name="static")
app.mount("/js", StaticFiles(directory="mypandc/static/js"), name="js")
app.mount("/css", StaticFiles(directory="mypandc/static/css"), name="css")
templates = Jinja2Templates(directory="mypandc/static")

@app.get("/")
def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/scenes/", response_model=schemas.Scene)
def create_scene(scene: schemas.SceneCreateWithImage, db: Session = Depends(get_db)):
    scene_dict = scene.dict()
    try:
        os.mkdir(os.path.join(dir_path, "static/images"))
    except:
        pass
    filename = "static/images/{}".format(str(scene_dict['filename']))
    del scene_dict['filename']
    img = io.BytesIO(base64.b64decode(scene.image.split(',')[1]))
    with open(os.path.join(dir_path, filename), "wb") as fh:
        fh.write(img.read())

    image = Image.open(os.path.join(dir_path, filename))
    width, height = image.size

    scene_dict['image'] = filename
    scene_dict['image_width'] = width
    scene_dict['image_height'] = height

    return crud.create_scene(db, schemas.SceneCreate(**scene_dict))


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
        scene_id: int,
        scene_link: schemas.SceneLinkCreate, db: Session = Depends(get_db)
            ):
    return crud.create_scene_link(
        db, scene_link, scene_from_id=scene_id
    )
