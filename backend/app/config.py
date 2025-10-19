import os


class Config:
    # Use uma variável de ambiente para a chave secreta em produção
    SECRET_KEY = os.environ.get("SECRET_KEY", "troque-esta-chave-por-uma-bem-forte") 
    JSON_AS_ASCII = False  # para acentos corretos no JSON
    # Configuracoes SQL removidas