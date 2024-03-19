from sqlalchemy import Column, Integer, String, Sequence, Boolean
from config.connexion import Base
from sqlalchemy.orm import relationship

from orm.models.files import File
from sqlalchemy.orm import Mapped, mapped_column


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    last_name: Mapped[str]
    email: Mapped[str]
    password: Mapped[str]
    recognizable_voice: Mapped[bool]
    files: Mapped[list["File"]] = relationship()


def getUser(user: User):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "lastName": user.last_name,
        "recognizableVoice": user.recognizable_voice,
    }
