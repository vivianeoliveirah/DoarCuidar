from flask import Flask, jsonify
from flask_cors import CORS
from app.extensions import get_db, init_firebase
from app.routes import bp as api_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

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
    app.run(host="0.0.0.0", port=5000)
