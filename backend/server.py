import hug
from models import index
from controller import authentification, fileManager

api = hug.API(__name__)

api.extend(authentification, "/api/authentification")
api.extend(fileManager, "/api/file")
