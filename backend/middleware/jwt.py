import hug
import jwt
import os

SECRET_KEY = "{}".format(os.environ.get("SECRET_KEY"))


# TODO
def isPublicPath(path):
    return False


def create_jwt(user_data):
    return jwt.encode(user_data, SECRET_KEY, algorithm="HS256")


def verify_jwt(token):
    _, token = token.split(" ")
    try:
        decoded_data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded_data
    except jwt.ExpiredSignatureError:
        return {"error": "Token expiré"}
    except jwt.InvalidTokenError:
        return {"error": "Token invalide"}


authenticate = hug.authentication.token(verify_jwt)
