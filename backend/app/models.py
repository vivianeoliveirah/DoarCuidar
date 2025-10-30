from datetime import datetime
from typing import Dict, Any

def document_to_dict(doc_snapshot: Any) -> Dict[str, Any]:    
    if not doc_snapshot.exists:
        return None
    data = doc_snapshot.to_dict()    
    data["id"] = doc_snapshot.id    
    if 'criado_em' in data and hasattr(data['criado_em'], 'isoformat'):
        data['criado_em'] = data['criado_em'].isoformat()
    return data

def default_usuario_data(data: Dict[str, Any]) -> Dict[str, Any]:
    
    return {
        "nome": data.get("nome"),
        "cpf": data.get("cpf"),
        "email": data.get("email"),
        "senha": data.get("senha"), 
        "endereco": data.get("endereco"),
        "telefone": data.get("telefone"),
        "data_nascimento": data.get("data_nascimento"),
        "criado_em": datetime.utcnow()
    }

def default_donatario_data(data: Dict[str, Any]) -> Dict[str, Any]:    
    return {
        "usuario_id": data.get("usuario_id"), 
        "nome": data.get("nome"),
        "cnpj": data.get("cnpj"),
        "telefone": data.get("telefone"),
        "endereco": data.get("endereco"),
        "estado": data.get("estado"),
        "criado_em": datetime.utcnow()
    }
    
def default_doacao_data(data: Dict[str, Any]) -> Dict[str, Any]:    
    return {
        "donatario_id": data.get("donatario_id"), 
        "valor": float(data.get("valor", 0)),
        "nome_doador": data.get("nome_doador"),
        "mensagem": data.get("mensagem"),
        "criado_em": datetime.utcnow()
    }