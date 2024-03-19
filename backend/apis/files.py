import os
import pathlib
from typing import Annotated
from fastapi import APIRouter, File, UploadFile, Depends
import librosa
import io
from middleware.auth_bearer import JWTBearer


router = APIRouter(prefix="/api/file")


@router.post("/", dependencies=[Depends(JWTBearer())])
async def importFile(file: UploadFile):
    # file_ = await file.
    # audio, sr = librosa.load(file.file)
    content = file.file.read()
    with open(file.filename + ".mp3", "wb") as f:
        f.write(content)
    # librosa.output.write_wav("file_trim_5s.wav", audio, sr)
    print(file.filename)
    return [{"username": "Rick"}, {"username": "Morty"}]
