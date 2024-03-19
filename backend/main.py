from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apis import authentification, files

from config.connexion import session
from orm import index
from orm.models.user import User

# ! --- auth import
from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


from middleware.jwt import get_current_active_user, Token, authenticate_user

# ! -------------

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authentification.router)
app.include_router(files.router)


@app.get("/api/authentification/token")
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    return current_user
