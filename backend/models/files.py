from sqlalchemy import Column, Integer, String, Sequence
from config.connexion import Base


class File(Base):
    __tablename__ = "files"
    id = Column(Integer, Sequence("user_id_seq"), primary_key=True)
    filename = Column(String(50))
    location = Column(String(50))
