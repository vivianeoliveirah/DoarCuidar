from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    cpf = db.Column(db.String(14), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    endereco = db.Column(db.String(200), nullable=False)
    senha = db.Column(db.String(128), nullable=False)  # Armazene o hash da senha

class Donatario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    nome = db.Column(db.String(120), nullable=False)
    cnpj = db.Column(db.String(18), nullable=False)
    email = db.Column(db.String(120))
    endereco = db.Column(db.String(200))
    usuario = db.relationship('Usuario', backref=db.backref('donatarios', lazy=True))