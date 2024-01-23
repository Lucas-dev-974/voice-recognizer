from config.connexion import engine
from .user import *
from .model_ia import *

Base.metadata.create_all(engine)
