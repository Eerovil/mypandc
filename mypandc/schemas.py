from typing import List, Optional

from pydantic import BaseModel


class SceneLinkBase(BaseModel):
    pass


class SceneLinkCreate(SceneLinkBase):
    pass


class SceneLink(SceneLinkBase):
    id: int

    location_x: Optional[int]
    location_y: Optional[int]

    scene_from_id: int
    scene_to_id: int

    class Config:
        orm_mode = True


class SceneBase(BaseModel):
    image: str


class SceneCreate(SceneBase):
    pass


class Scene(SceneBase):
    id: int
    links: List[SceneLink] = []
    links_from: List[SceneLink] = []

    link_back: Optional[SceneLink]

    class Config:
        orm_mode = True
