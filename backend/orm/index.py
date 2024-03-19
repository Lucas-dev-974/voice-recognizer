from config.connexion import engine
from orm.models.user import *
from orm.models.model_ia import *

Base.metadata.create_all(engine)
