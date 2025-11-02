from flask import Flask
from flask_cors import CORS
from app.extensions import init_firebase
from app.routes import bp as api_bp

def create_app():  
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    init_firebase()
 
    app.register_blueprint(api_bp, url_prefix="/api")

    @app.route("/api/health")
    def health_check():
        from app.extensions import get_db
        db = get_db()
        return {
            "status": "ok",
            "mensagem": "API DoarCuidar está funcionando!",
            "firebase": "conectado" if db else "falhou"
        }

    return app
