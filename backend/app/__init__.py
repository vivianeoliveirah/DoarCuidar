# backend/app/__init__.py
import os
from flask import Flask
from app.config import Config
from app.extensions import init_firebase_admin, init_extensions
from app.routes import bp as api_bp


def create_app(config_class=Config):
    """Cria e configura a aplicação Flask principal."""
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config_class)

    # Garante que a pasta instance exista
    os.makedirs(app.instance_path, exist_ok=True)

    # Inicializa Firebase Admin
    init_firebase_admin(app)

    # Inicializa CORS e outras extensões
    init_extensions(app)

    # Registra rotas (Blueprint principal)
    app.register_blueprint(api_bp)

    # Endpoint simples para checagem de saúde
    @app.route("/api/health")
    def health():
        return {"status": "ok", "message": "API DoarCuidar funcionando"}

    return app
