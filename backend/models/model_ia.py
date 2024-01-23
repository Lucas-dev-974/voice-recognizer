from sqlalchemy import Column, Integer, String, Sequence
from config.connexion import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, Sequence("user_id_seq"), primary_key=True)
    model_name = Column(String(50), unique=True)
    path = Column(String(500), unique=True)
