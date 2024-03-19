from sqlalchemy import Column, Integer, String, Sequence, Boolean
from config.connexion import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, Sequence("user_id_seq"), primary_key=True)
    name = Column(String(50))
    last_name = Column(String(50))
    email = Column(String(50), unique=True)
    password = Column(String(500))
    recognizable_voice = Column(Boolean)
    fichiers = relationship("File", back_populates="users")


def getUser(user: User):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "lastName": user.last_name,
        "recognizableVoice": user.recognizable_voice,
    }
