from sqlalchemy.orm import Session

from . import models, schemas


def get_scene(db: Session, scene_id: int):
    return db.query(models.Scene).filter(models.Scene.id == scene_id).first()


def get_scenes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Scene).offset(skip).limit(limit).all()


def create_scene(db: Session, scene: schemas.SceneCreate):
    db_scene = models.Scene(**scene.dict())
    db.add(db_scene)
    db.commit()
    db.refresh(db_scene)
    return db_scene


def create_scene_link(db: Session, scene_link: schemas.SceneLinkCreate,
                      scene_from_id: int, scene_to_id: int):
    db_scene_link = models.SceneLink(
        **scene_link.dict(), scene_from_id=scene_from_id, scene_to_id=scene_to_id
    )
    db.add(db_scene_link)
    db.commit()
    db.refresh(db_scene_link)
    return db_scene_link
