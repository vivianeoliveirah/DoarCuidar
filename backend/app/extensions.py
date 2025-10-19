# backend/app/extensions.py
from firebase_admin import credentials, initialize_app
from flask_cors import CORS
from flask import Flask
import os
import json

# Variável global para o cliente Firestore
db = None


def init_firebase_admin(app: Flask):
    """Inicializa o Firebase Admin SDK usando credenciais do ambiente (Render ou local)."""
    global db

    firebase_json_config = os.environ.get("FIREBASE_ADMIN_CONFIG")

    try:
        if firebase_json_config:
            # Produção (Render)
            cred_dict = json.loads(firebase_json_config)
            cred = credentials.Certificate(cred_dict)
            app.logger.info("Firebase inicializado via variável de ambiente.")
        else:
            # Desenvolvimento local
            cred_path = "C:/Users/Viviane/Downloads/serviceAccountKey.json"
            cred = credentials.Certificate(cred_path)
            app.logger.info(f"Firebase inicializado localmente com {cred_path}")

        firebase_app = initialize_app(cred)
        from firebase_admin import firestore

        db = firestore.client()

    except Exception as e:
        app.logger.warning(f"⚠️ Erro ao inicializar Firebase: {e}")
        db = None


def init_extensions(app: Flask):
    """Inicializa extensões do Flask, incluindo CORS."""
    # Permite chamadas do frontend local e das versões hospedadas
    CORS(app, resources={r"/api/*": {"origins": [
        "http://localhost:5173",
        "https://doarcuidar.onrender.com",
        "https://doarcuidar.netlify.app"
    ]}})
