import firebase_admin
from firebase_admin import credentials, firestore
import os

try:
    cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

    if cred_path and os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("Firebase conectado com sucesso!")
    else:
        raise FileNotFoundError(f"Caminho inválido: {cred_path}")

except Exception as e:
    print(f"Erro ao inicializar Firebase: {e}")
    db = None
