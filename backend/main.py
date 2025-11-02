import os
import sys
import json
from dotenv import load_dotenv
from firebase_admin import credentials, firestore, initialize_app
from flask import Flask, jsonify
from flask_cors import CORS

load_dotenv()

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

db = None

class LogColor:
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    RESET = "\033[0m"

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
            print(f"{LogColor.GREEN} Firebase inicializado via variável JSON.{LogColor.RESET}")
        
        elif os.path.exists(firebase_json):
            cred = credentials.Certificate(firebase_json)
            initialize_app(cred)
            print(f"{LogColor.GREEN} Firebase inicializado via arquivo local.{LogColor.RESET}")
        else:
            raise ValueError(f"Caminho inválido: {firebase_json}")

        db = firestore.client()
        print(f"{LogColor.GREEN} Firestore conectado com sucesso!{LogColor.RESET}")

    except Exception as e:
        print(f"{LogColor.YELLOW}⚠️ Erro ao inicializar Firebase: {e}{LogColor.RESET}")
        db = None

def get_db():    
    global db
    if db is None:
        init_firebase()
    return db

init_firebase()

@app.route("/api/health")
def health_check():
    return jsonify({
        "status": "ok",
        "mensagem": "API DoarCuidar está funcionando!",
        "firebase": "conectado" if db else "falhou"
    }), 200

from app.routes import bp as api_bp
app.register_blueprint(api_bp, url_prefix="/api")


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
