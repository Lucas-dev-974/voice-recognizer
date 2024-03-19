from sqlalchemy import Column, Integer, String, Sequence, ForeignKey
from config.connexion import Base
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Mapped, mapped_column


class File(Base):
    __tablename__ = "files"

    id: Mapped[int] = mapped_column(primary_key=True, unique=True)
    filename: Mapped[str]
    location: Mapped[str]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
