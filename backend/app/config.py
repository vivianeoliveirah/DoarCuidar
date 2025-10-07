class Config:
    SECRET_KEY = "troque-esta-chave-por-uma-bem-forte"
    # usa arquivo instance/doarcuidar.db
    SQLALCHEMY_DATABASE_URI = "sqlite:///doarcuidar.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_AS_ASCII = False  # para acentos corretos no JSON
