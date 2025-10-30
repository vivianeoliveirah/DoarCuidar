import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from flask_cors import CORS
from flask import Flask

db = None

def init_firebase_admin(app: Flask):    
    global db

    try:        
        cred_source = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

        if cred_source:
            if os.path.exists(cred_source):                
                cred = credentials.Certificate(cred_source)
                app.logger.info(f"Firebase inicializado com arquivo: {cred_source}")
            else:                
                cred_dict = json.loads(cred_source)
                cred = credentials.Certificate(cred_dict)
                app.logger.info("Firebase inicializado via JSON de ambiente.")
        else:            
            local_path = "C:/Users/Viviane/Downloads/serviceAccountKey.json"
            cred = credentials.Certificate(local_path)
            app.logger.info(f"Firebase inicializado localmente com {local_path}")

        firebase_admin.initialize_app(cred)
        db = firestore.client()
        app.logger.info("✅ Firebase conectado com sucesso!")

    except Exception as e:
        app.logger.warning(f"⚠️ Erro ao inicializar Firebase: {e}")
        db = None


def init_extensions(app: Flask):    
    CORS(app, resources={r"/api/*": {"origins": [
        "http://localhost:5173",
        "https://doarcuidar.netlify.app",
        "https://doarcuidar.onrender.com"
    ]}})
