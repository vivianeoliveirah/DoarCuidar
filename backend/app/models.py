from datetime import datetime
from app import db

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    cpf = db.Column(db.String(14), unique=True)
    email = db.Column(db.String(120), unique=True)
    senha = db.Column(db.String(128))
    endereco = db.Column(db.String(200))
    telefone = db.Column(db.String(20))
    data_nascimento = db.Column(db.String(10))
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Usuario {self.id} {self.email}>"

class Donatario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=True)
    nome = db.Column(db.String(180), nullable=False)
    cnpj = db.Column(db.String(20), nullable=False)
    telefone = db.Column(db.String(30))
    endereco = db.Column(db.String(250))
    estado = db.Column(db.String(2))
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)

    usuario = db.relationship("Usuario", backref=db.backref("donatarios", lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "nome": self.nome,
            "cnpj": self.cnpj,
            "telefone": self.telefone,
            "endereco": self.endereco,
            "estado": self.estado,
            "criado_em": self.criado_em.isoformat(),
        }

class Doacao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    donatario_id = db.Column(db.Integer, db.ForeignKey("donatario.id"), nullable=False)
    valor = db.Column(db.Float, nullable=False)
    nome_doador = db.Column(db.String(120))
    mensagem = db.Column(db.String(300))
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)

    donatario = db.relationship("Donatario", backref=db.backref("doacoes", lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "donatario_id": self.donatario_id,
            "valor": self.valor,
            "nome_doador": self.nome_doador,
            "mensagem": self.mensagem,
            "criado_em": self.criado_em.isoformat(),
        }
