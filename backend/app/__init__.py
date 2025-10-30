from flask import Flask, jsonify
from app.routes import bp as api_bp
from app.extensions import init_firebase_admin, init_extensions

db = None

def create_app():
    global db
    app = Flask(__name__)
    
    init_extensions(app)
    init_firebase_admin(app)
    
    from app.extensions import db as firestore_db
    db = firestore_db
    
    app.register_blueprint(api_bp, url_prefix="/api")
    
    @app.route("/api/health")
    def health():
        return jsonify({"message": "API DoarCuidar está funcionando!", "status": "ok"})

    return app
