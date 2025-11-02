from flask import Flask, jsonify
from flask_cors import CORS
from app.extensions import get_db, init_firebase
from app.routes import bp as api_bp
import os

app = Flask(__name__)


CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://doar-cuidar.vercel.app",
            "http://localhost:5173"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})


init_firebase()


@app.route("/api/health")
def health_check():
    db = get_db()
    return jsonify({
        "status": "ok",
        "mensagem": "API DoarCuidar está funcionando!",
        "firebase": "conectado" if db else "falhou"
    }), 200


app.register_blueprint(api_bp, url_prefix="/api")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
