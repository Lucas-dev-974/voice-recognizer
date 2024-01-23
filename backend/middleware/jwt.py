import hug
import jwt
import os

SECRET_KEY = "{}".format(os.environ.get("SECRET_KEY"))


# Fonction pour créer un token JWT avec des informations utilisateur
def create_jwt(user_data):
    return jwt.encode(user_data, SECRET_KEY, algorithm="HS256")


# Fonction pour vérifier un token JWT
def verify_jwt(token):
    try:
        decoded_data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded_data
    except jwt.ExpiredSignatureError:
        return {"error": "Token expiré"}
    except jwt.InvalidTokenError:
        return {"error": "Token invalide"}


authenticate = hug.authentication.token(verify_jwt)
