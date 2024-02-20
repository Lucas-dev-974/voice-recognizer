import hug
from models import index
from controller import authentification, fileManager
from hug.middleware import CORSMiddleware
import tensorflow

api = hug.API(__name__)
api.extend(authentification, "/api/authentification")
api.extend(fileManager, "/api/file")

# Configuring CORS middleware
api.http.add_middleware(CORSMiddleware(api, allow_origins=["*"]))

if __name__ == "__main__":
    api.http.serve()
