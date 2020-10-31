from typing import List, Optional

from pydantic import BaseModel


class SceneLinkBase(BaseModel):
    scene_to_id: int
    location_x: Optional[int]
    location_y: Optional[int]
    is_link_back: bool = False


class SceneLinkCreate(SceneLinkBase):
    pass


class SceneLink(SceneLinkBase):
    id: int
    scene_from_id: int

    class Config:
        orm_mode = True


class SceneBase(BaseModel):
    image: str

class SceneCreate(SceneBase):
    image_width: str
    image_height: str

class SceneCreateWithImage(SceneBase):
    filename: str


class Scene(SceneBase):
    id: int
    links: List[SceneLink] = []
    links_from: List[SceneLink] = []
    image_width: str
    image_height: str

    link_back: Optional[SceneLink]

    class Config:
        orm_mode = True
