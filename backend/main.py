import os
import sys
import json
from dotenv import load_dotenv
from firebase_admin import credentials, firestore, initialize_app
from flask import Flask, jsonify
from flask_cors import CORS

# Carrega variáveis do .env (para ambiente local)
load_dotenv()

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)
CORS(app)

db = None

# --- Cores para logs no terminal ---
class LogColor:
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    RESET = "\033[0m"


def init_firebase():
    """Inicializa o Firebase de forma compatível com local e Render."""
    global db
    try:
        firebase_json = (
            os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
            or os.getenv("FIREBASE_ADMIN_CONFIG")
        )

        if not firebase_json:
            raise ValueError("Variável de ambiente com credenciais Firebase não encontrada.")

        # Se vier um JSON direto
        if firebase_json.strip().startswith("{"):
            cred_dict = json.loads(firebase_json)
            # Corrige as quebras de linha na chave privada
            if "private_key" in cred_dict:
                cred_dict["private_key"] = cred_dict["private_key"].replace("\\n", "\n")

            cred = credentials.Certificate(cred_dict)
            initialize_app(cred)
            print(f"{LogColor.GREEN}✅ Firebase inicializado via variável de ambiente JSON.{LogColor.RESET}")

        # Se vier um caminho de arquivo
        elif os.path.exists(firebase_json):
            cred = credentials.Certificate(firebase_json)
            initialize_app(cred)
            print(f"{LogColor.GREEN}✅ Firebase inicializado via arquivo local: {firebase_json}{LogColor.RESET}")

        else:
            raise ValueError(f"Caminho ou formato inválido: {firebase_json}")

        db = firestore.client()
        print(f"{LogColor.GREEN}✅ Firebase conectado com sucesso!{LogColor.RESET}")

    except Exception as e:
        print(f"{LogColor.YELLOW}⚠️ Erro ao inicializar Firebase: {e}{LogColor.RESET}")
        db = None


# Inicializa o Firebase
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
