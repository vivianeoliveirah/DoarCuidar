import os
import sys
from dotenv import load_dotenv
from firebase_admin import credentials, firestore, initialize_app
from flask import Flask, jsonify
from flask_cors import CORS
import json

load_dotenv()


sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)
CORS(app)

db = None  

def init_firebase():
    """Inicializa o Firebase de forma compatível com local e Render."""
    global db
    try:      
        firebase_json = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

        if firebase_json and firebase_json.strip().startswith("{"):            
            cred_dict = json.loads(firebase_json)
            cred = credentials.Certificate(cred_dict)
            initialize_app(cred)
            app.logger.info("Firebase inicializado via variável de ambiente (Render).")

        elif firebase_json and os.path.exists(firebase_json):            
            cred = credentials.Certificate(firebase_json)
            initialize_app(cred)
            app.logger.info(f"Firebase inicializado localmente: {firebase_json}")

        else:
            raise FileNotFoundError(f"Caminho ou variável inválida: {firebase_json}")

        db = firestore.client()
        print("✅ Firebase conectado com sucesso!")

    except Exception as e:
        app.logger.warning(f"⚠️ Erro ao inicializar Firebase: {e}")
        print(f"⚠️ Erro ao inicializar Firebase: {e}")
        db = None


init_firebase()

@app.route("/api/health")
def health_check():
    return jsonify({
        "status": "ok",
        "mensagem": "API DoarCuidar está funcionando!",
        "firebase": "conectado" if db else "falhou"
    })


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
