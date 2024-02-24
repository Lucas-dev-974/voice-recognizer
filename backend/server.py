import hug
from models import index
from controller import authentification, fileManager
from hug.middleware import CORSMiddleware

# import tensorflow


api = hug.API(__name__)


@hug.response_middleware()
def CORS(request, response, resource):
    response.set_header("Access-Control-Allow-Origin", "*")
    response.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.set_header(
        "Access-Control-Allow-Headers",
        "Authorization,Keep-Alive,User-Agent,"
        "If-Modified-Since,Cache-Control,Content-Type",
    )
    response.set_header(
        "Access-Control-Expose-Headers",
        "Authorization,Keep-Alive,User-Agent,"
        "If-Modified-Since,Cache-Control,Content-Type",
    )
    if request.method == "OPTIONS":
        response.set_header("Access-Control-Max-Age", 1728000)
        response.set_header("Content-Type", "text/plain charset=UTF-8")
        response.set_header("Content-Length", 0)
        response.status_code = hug.HTTP_204


api.extend(authentification, "/api/authentification")
api.extend(fileManager, "/api/file")


if __name__ == "__main__":
    api.http.serve()
