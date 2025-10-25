from flask import Flask, jsonify
from app.routes import bp as api_bp
from app.extensions import init_firebase_admin, init_extensions

db = None

def create_app():
    global db
    app = Flask(__name__)

    # 🔹 Inicializa CORS e Firebase
    init_extensions(app)
    init_firebase_admin(app)

    # 🔹 Atualiza referência global ao Firestore
    from app.extensions import db as firestore_db
    db = firestore_db

    # 🔹 Registra as rotas principais
    app.register_blueprint(api_bp, url_prefix="/api")

    # 🔹 Endpoint de verificação
    @app.route("/api/health")
    def health():
        return jsonify({"message": "API DoarCuidar está funcionando!", "status": "ok"})

    return app
