from middleware.jwt import authenticate
import hug
import shutil
import os
import magic
from falcon import HTTP_400
from models.user import User
import time


def is_mp3_data(file_content):
    try:
        file_type = magic.from_buffer(file_content, mime=True)
        # Vérifier si le type MIME commence par "audio/mpeg" (MP3)
        return file_type.startswith("audio/mpeg")
    except Exception as e:
        print(f"Erreur lors de la vérification du type de fichier : {str(e)}")
        return False


def save_uploaded_file(body, destination_directory):
    try:
        timestamp = int(time.time())
        # Récupérer le nom du fichier et son contenu à partir du corps de la requête
        filename = list(body.keys()).pop() + "_{}".format(timestamp)
        file_content = list(body.values()).pop()

        if not is_mp3_data(file_content):
            return False

        # Construire le     chemin complet du fichier de destination
        destination_path = os.path.join(destination_directory, filename + ".mp3")
        # Écrire le contenu du fichier dans le fichier de destination
        with open(destination_path, "wb") as file:
            file.write(file_content)

        return destination_path  # Retourner le chemin complet du fichier sauvegardé
    except Exception as e:
        return False


def getUserStaticPath(user):
    path = "./static/" + str(user["id"]) + "/"
    # Vérifier si le répertoire existe
    if not os.path.exists(path):
        try:
            # Créer le répertoire s'il n'existe pas
            os.makedirs(path)
            print(f"Répertoire créé : {path}")
        except OSError as e:
            print(f"Erreur lors de la création du répertoire {path}: {e}")
    return path


@hug.post("/", requires=authenticate)
def importFile(body, response, user: hug.directives.user):
    if "error" in user:
        return user

    save_path = getUserStaticPath(user)
    if not save_uploaded_file(body, save_path):
        response.status = HTTP_400
        return "Le format du fichier est incorrect, veuillez importer uniquement des fichier de type mp3"

    return {
        "filename": list(body.keys()).pop(),
        "filesize": len(list(body.values()).pop()),
    }
