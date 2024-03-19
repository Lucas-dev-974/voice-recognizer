from fastapi import APIRouter, Body, HTTPException

from model.user import UserSchema, UserLoginSchema
from middleware.auth_handler import signJWT, decodeJWT
from middleware.auth_bearer import JWTBearer
from orm.models.user import User, getUser
from config.connexion import session
from middleware.hash import verify_password, hash_password

router = APIRouter(prefix="/api/authentification")


def check_user(data: UserLoginSchema):
    print("user data before login:", data)
    user = session.query(User).filter_by(email=str(data.email).lower()).first()
    print("user at login:", user)
    if not user or not verify_password(
        input_password=data.password, stored_hash=user.password
    ):
        return False

    return True


@router.post("/register", tags=["user"])
async def create_user(user: UserSchema = Body(...)):
    existing_user = session.query(User).filter_by(email=str(user.email).lower()).first()
    if existing_user:
        raise HTTPException(
            status_code=401,
            detail="L'email est déjà enregistrer, veuillez vous connecter.'",
        )

    password = hash_password(user.password)
    user = User(
        name=user.name,
        email=str(user.email).lower(),
        password=password,
        last_name=user.last_name,
    )
    session.add(user)
    session.commit()

    token = signJWT(user.id)

    return {**getUser(user), "token": token}


@router.post("/", tags=["user"])
async def user_login(user: UserLoginSchema = Body(...)):
    if not check_user(user):
        raise HTTPException(
            status_code=401, detail="Les informations de connexions sont incorrectes"
        )

    user = session.query(User).filter_by(email=str(user.email).lower()).first()
    token = signJWT(user.id)
    return {**getUser(user), "token": token}


@router.get("/token")
def token(token: str):
    return decodeJWT(token)
