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


def create_scene_link(
        db: Session, scene_link: schemas.SceneLinkCreate, scene_from_id: int, ):

    scene_link_dict = scene_link.dict()
    del scene_link_dict['is_link_back']
    db_scene_link = models.SceneLink(
        **scene_link_dict, scene_from_id=scene_from_id
    )
    db.add(db_scene_link)
    db.commit()
    db.refresh(db_scene_link)

    if scene_link.is_link_back:
        (
            db.query(models.Scene).filter_by(id=scene_from_id)
            .update({'link_back_id': db_scene_link.id})
        )
        db.commit()
    return db_scene_link
