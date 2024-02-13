from middleware.jwt import authenticate, create_jwt
from falcon import HTTP_401
import hug
from models.user import User, getUser
from config.connexion import session
from middleware.hash import hash_password, verify_password


@hug.post("/register")
def register(name, lastName, email, password):
    password = hash_password(password)
    user = User(name=name, email=email, password=password, last_name=lastName)

    session.add(user)
    session.commit()

    token = create_jwt({"id": user.id, "email": email})

    return {**getUser(user), "token": token}


@hug.post("/")
def login(email, password, response):
    user = session.query(User).filter_by(email=email).first()

    if not verify_password(input_password=password, stored_hash=user.password):
        response.status = HTTP_401
        return "Mot de passe ou email incorrecte"

    token = create_jwt({"id": user.id, "email": email})
    return {**getUser(user), "token": token}


@hug.get("/token", requires=authenticate)
def tokenTest(user: hug.directives.user):
    return True
