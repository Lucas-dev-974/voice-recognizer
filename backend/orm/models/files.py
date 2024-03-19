from sqlalchemy import Column, Integer, String, Sequence
from config.connexion import Base
from sqlalchemy.orm import relationship


class File(Base):
    __tablename__ = "files"
    id = Column(Integer, Sequence("user_id_seq"), primary_key=True)
    filename = Column(String(50))
    location = Column(String(50))
    user_id = Column(Integer, ForeignKey("users.id"))
    utilisateur = relationship("User", back_populates="files")
