import hug
from middleware.jwt import authenticate, create_jwt
from falcon import HTTP_401, HTTP_404, HTTP_400
from models.user import User, getUser
from config.connexion import session
from middleware.hash import hash_password, verify_password


@hug.post("/register")
def register(name, lastName, email, password, response):
    existing = session.query(User).filter_by(email=email).first()
    if existing:
        response.status = HTTP_400
        return "L'email est déjà enregistrer"

    password = hash_password(password)
    user = User(name=name, email=email, password=password, last_name=lastName)

    # ! Todo - check existing email
    session.add(user)
    session.commit()

    token = create_jwt({"id": user.id, "email": email})

    return {**getUser(user), "token": token}


@hug.post("/")
def login(email, password, response):
    user = session.query(User).filter_by(email=email).first()

    if not user:
        response.status = HTTP_404
        return "Le compte na pas été trouver"

    if not verify_password(input_password=password, stored_hash=user.password):
        response.status = HTTP_401
        return "Mot de passe ou email incorrecte"

    token = create_jwt({"id": user.id, "email": email})
    return {**getUser(user), "token": token}


@hug.get("/token", requires=authenticate)
def tokenTest(request, response, user: hug.directives.user):
    if "error" in user:
        response.status = HTTP_401
        return user
    return True
