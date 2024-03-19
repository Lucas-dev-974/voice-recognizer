import time
from typing import Dict
from fastapi import HTTPException
from decouple import config
import jwt


JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")


def decodeJWT(token: str) -> dict:
    decoded_data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    print("decoded data token: ", decoded_data)
    return decoded_data
    # try:
    # except jwt.ExpiredSignatureError:
    #     raise HTTPException(status_code=401, detail="Token expiré")
    # except jwt.InvalidTokenError:
    #     raise HTTPException(status_code=401, detail="Token invalide")


def signJWT(user_id: str) -> Dict[str, str]:
    payload = {"user_id": user_id, "expires": time.time() + 600}
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    return token
