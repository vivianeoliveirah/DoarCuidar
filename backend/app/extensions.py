from firebase_admin import credentials, firestore, initialize_app
import os, json

db = None

def init_firebase():
    global db
    if db is not None:
        return db  

    firebase_json = (
        os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        or os.getenv("FIREBASE_ADMIN_CONFIG")
    )

    if not firebase_json:
        raise ValueError("Variável de ambiente com credenciais Firebase não encontrada.")

    if firebase_json.strip().startswith("{"):
        cred_dict = json.loads(firebase_json)
        cred_dict["private_key"] = cred_dict["private_key"].replace("\\n", "\n")
        cred = credentials.Certificate(cred_dict)
        initialize_app(cred)
    elif os.path.exists(firebase_json):
        cred = credentials.Certificate(firebase_json)
        initialize_app(cred)
    else:
        raise ValueError("Credencial Firebase inválida.")

    db = firestore.client()
    print("✅ Firebase inicializado e Firestore conectado com sucesso.")
    return db


def get_db():
    global db
    if db is None:
        init_firebase()
    return db
