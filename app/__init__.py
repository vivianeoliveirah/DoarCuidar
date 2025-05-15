"""
Este módulo inicializa o aplicativo Flask.
"""

from flask import Flask

app = Flask(__name__, template_folder="../templates")

from app import routes  # Importa as rotas