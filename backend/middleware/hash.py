import bcrypt


def hash_password(password):
    # Générez un sel aléatoire et hachez le mot de passe avec ce sel
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed_password.decode("utf-8")


def verify_password(input_password, stored_hash):
    # Vérifiez si le mot de passe entré correspond au hachage stocké
    return bcrypt.checkpw(input_password.encode("utf-8"), stored_hash.encode("utf-8"))
