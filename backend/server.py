import hug
from models import index
from controller import authentification, fileManager
import tensorflow

api = hug.API(__name__)

api.extend(authentification, "/api/authentification")
api.extend(fileManager, "/api/file")
