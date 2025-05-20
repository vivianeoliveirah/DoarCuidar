from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    cpf = db.Column(db.String(14), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(128), nullable=False)
    endereco = db.Column(db.String(200), nullable=True)
    telefone = db.Column(db.String(20), nullable=True)
    data_nascimento = db.Column(db.String(10), nullable=True)  # formato: dd/mm/aaaa

class Destinatario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    nome = db.Column(db.String(120), nullable=False)
    cnpj = db.Column(db.String(20), nullable=False)
    telefone = db.Column(db.String(20), nullable=True)
    endereco = db.Column(db.String(200), nullable=True)
    usuario = db.relationship('Usuario', backref=db.backref('donatarios', lazy=True))