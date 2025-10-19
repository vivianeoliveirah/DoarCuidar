from firebase_admin import credentials, initialize_app
import os
import json
from flask import Flask

# Variável global para o cliente Firestore
db = None

def init_firebase_admin(app: Flask):
    """Inicializa o Firebase Admin SDK usando credenciais do ambiente."""
    global db
    
    # Tenta obter as credenciais do Firebase de uma variável de ambiente no Render.
    firebase_json_config = os.environ.get('FIREBASE_ADMIN_CONFIG')

    if firebase_json_config:
        # Carrega o JSON de credenciais (modo produção - Render)
        cred_dict = json.loads(firebase_json_config)
        cred = credentials.Certificate(cred_dict)
    else:
        # Modo local (desenvolvimento)
        try:
            # Caminho local para o JSON do Firebase
            cred = credentials.Certificate("C:/Users/Viviane/Downloads/serviceAccountKey.json")
        except Exception as e:
            app.logger.warning(f"Nenhuma credencial do Firebase Admin encontrada: {e}")
            return

    # Inicializa o app do Firebase
    firebase_app = initialize_app(cred)
    
    # Obtém o cliente Firestore e o atribui à variável global
    from firebase_admin import firestore
    db = firestore.client()
