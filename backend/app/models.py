# A importação do 'db' (SQLAlchemy) não é mais necessária aqui
# from app import db 
from datetime import datetime
from typing import Dict, Any

# Não são mais classes db.Model, apenas funções/classes para estruturar dados.

# Função de conversão de Firestore Document Snapshot para Dicionário
def document_to_dict(doc_snapshot: Any) -> Dict[str, Any]:
    """Converte um snapshot do Firestore em um dicionário."""
    if not doc_snapshot.exists:
        return None
    data = doc_snapshot.to_dict()
    # Adiciona o ID do documento ao dicionário para referência
    data["id"] = doc_snapshot.id
    # Converte timestamp do Firestore para string ISO, se necessário
    if 'criado_em' in data and hasattr(data['criado_em'], 'isoformat'):
        data['criado_em'] = data['criado_em'].isoformat()
    return data

# Para fins de documentação e estrutura, mantemos as estruturas conceituais:

def default_usuario_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """Estrutura os dados de um novo Usuário."""
    return {
        "nome": data.get("nome"),
        "cpf": data.get("cpf"),
        "email": data.get("email"),
        "senha": data.get("senha"), # NOTA: A senha deve ser HASHED antes de salvar, mas no Firebase Auth, a senha geralmente não é salva no Firestore.
        "endereco": data.get("endereco"),
        "telefone": data.get("telefone"),
        "data_nascimento": data.get("data_nascimento"),
        "criado_em": datetime.utcnow()
    }

def default_donatario_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """Estrutura os dados de um novo Donatário (Instituição)."""
    return {
        "usuario_id": data.get("usuario_id"), # ID do usuário Firebase Auth
        "nome": data.get("nome"),
        "cnpj": data.get("cnpj"),
        "telefone": data.get("telefone"),
        "endereco": data.get("endereco"),
        "estado": data.get("estado"),
        "criado_em": datetime.utcnow()
    }
    
def default_doacao_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """Estrutura os dados de uma nova Doação."""
    return {
        "donatario_id": data.get("donatario_id"), # ID do documento Donatario (Firestore)
        "valor": float(data.get("valor", 0)),
        "nome_doador": data.get("nome_doador"),
        "mensagem": data.get("mensagem"),
        "criado_em": datetime.utcnow()
    }