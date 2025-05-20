"""
Este módulo inicializa o aplicativo Flask.
"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder="../templates")
app.secret_key = 'doarcuidar$2025!@#segredo'  # Coloque uma chave secreta forte!
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///doarcuidar.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from app.models import db
db.init_app(app)

from app import routes  # Importa as rotas


