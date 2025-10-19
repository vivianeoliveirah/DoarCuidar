import os
from flask import Flask
from flask_cors import CORS
# Importa o db (cliente Firestore) e a função de inicialização do extensions.py
# NOTA: O 'db' agora é a instância do Firestore, não mais do SQLAlchemy
from app.extensions import init_firebase_admin 
from app.routes import bp as api_bp

# Importa a classe de configuração
from app.config import Config


def create_app(config_class=Config):
    # 1. Cria a instância do Flask
    app = Flask(__name__, instance_relative_config=True)
    
    # 2. Carrega as configurações (SECRET_KEY do config.py ou ambiente)
    app.config.from_object(config_class)

    # 3. Limpeza de caminhos de instância:
    # Como não usaremos SQLite/Alembic, a criação da pasta 'instance' não é crítica, 
    # mas pode ser mantida se houver outros arquivos de instância.
    os.makedirs(app.instance_path, exist_ok=True)
    
    # 4. Inicializa o Firebase Admin SDK (Chave de Serviço)
    # Esta função irá inicializar o 'db' (cliente Firestore) no extensions.py
    init_firebase_admin(app) 

    # 5. Inicializa o CORS
    CORS(app)

    # 6. Registro de Modelos e Blueprints
    # É bom manter o import do models para que as estruturas de dados 
    # (agora funções/dicionários) estejam disponíveis.
    from app import models 
    app.register_blueprint(api_bp)

    return app