from sqlalchemy import Column, Integer, String, Sequence
from config.connexion import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, Sequence("user_id_seq"), primary_key=True)
    name = Column(String(50))
    last_name = Column(String(50))
    email = Column(String(50), unique=True)
    password = Column(String(500))


def getUser(user: User):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "lastName": user.last_name,
    }
