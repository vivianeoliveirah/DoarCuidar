import os
import json
from firebase_admin import credentials, firestore, initialize_app

db = None

def init_firebase():    
    global db
    try:
        firebase_json = (
            os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
            or os.getenv("FIREBASE_ADMIN_CONFIG")
        )

        if not firebase_json:
            raise ValueError("Variável de ambiente com credenciais Firebase não encontrada.")

        if firebase_json.strip().startswith("{"):
            cred_dict = json.loads(firebase_json)
            if "private_key" in cred_dict:
                cred_dict["private_key"] = cred_dict["private_key"].replace("\\n", "\n")
            cred = credentials.Certificate(cred_dict)
            initialize_app(cred)
        elif os.path.exists(firebase_json):
            cred = credentials.Certificate(firebase_json)
            initialize_app(cred)
        else:
            raise ValueError(f"Caminho inválido: {firebase_json}")

        db = firestore.client()
        print("✅ Firebase conectado com sucesso!")
    except Exception as e:
        print(f"⚠️ Erro ao inicializar Firebase: {e}")
        db = None


def get_db():
    
    global db
    if db is None:
        init_firebase()
    return db
