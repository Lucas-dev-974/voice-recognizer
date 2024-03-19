from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apis import authentification, files

from orm import index

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


@app.get("/")
def read_root():
    return {"Hello": "World"}
