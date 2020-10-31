from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Scene(Base):
    __tablename__ = "scenes"
    id = Column(Integer, primary_key=True, index=True)
    image = Column(String, index=True)
    image_width = Column(Integer)
    image_height = Column(Integer)

    link_back_id = Column(Integer, ForeignKey("scene_links.id"), nullable=True)

    # This scene can be traversed forward via these links
    links = relationship("SceneLink", back_populates="scene_from", foreign_keys='SceneLink.scene_from_id')
    # This scene can be traversed to from these links
    links_from = relationship("SceneLink", back_populates="scene_to", foreign_keys='SceneLink.scene_to_id')
    # A "back button" link
    link_back = relationship("SceneLink", back_populates="scene_from", foreign_keys=[link_back_id])



class SceneLink(Base):
    """
    Explicit M2M model for Scene-Scene M2M relation
    """
    __tablename__ = "scene_links"

    id = Column(Integer, primary_key=True, index=True)

    location_x = Column(Integer, nullable=True)
    location_y = Column(Integer, nullable=True)

    # Scene we are coming from
    scene_from_id = Column(Integer, ForeignKey("scenes.id"), nullable=False)
    # Scene we are going to
    scene_to_id = Column(Integer, ForeignKey("scenes.id"), nullable=False)

    scene_from = relationship("Scene", back_populates="links", foreign_keys=[scene_from_id])
    scene_to = relationship("Scene", back_populates="links_from", foreign_keys=[scene_to_id])
