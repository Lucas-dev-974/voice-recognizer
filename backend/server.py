import hug
from models import index
from controller import authentification

api = hug.API(__name__)

api.extend(authentification, "/api/authentification")
