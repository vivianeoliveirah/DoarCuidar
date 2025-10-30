import re
import requests

def is_cnpj(value: str) -> bool:    
    cnpj = re.sub(r"\D", "", value or "")
    if len(cnpj) != 14 or not cnpj.isdigit():
        return False
    return True

def brasilapi_get_cnpj(cnpj: str) -> dict | None:    
    cnpj_limpo = re.sub(r"\D", "", cnpj)
    url = f"https://brasilapi.com.br/api/cnpj/v1/{cnpj_limpo}"

    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"[BrasilAPI] CNPJ não encontrado: {cnpj_limpo}")
            return None
    except Exception as e:
        print(f"[BrasilAPI] Erro na requisição: {e}")
        return None

def map_brasilapi_to_item(data: dict) -> dict:    
    if not data:
        return {}

    return {
        "cnpj": data.get("cnpj"),
        "nome": data.get("razao_social") or data.get("nome_fantasia"),
        "email": data.get("email"),
        "telefone": data.get("ddd_telefone_1"),
        "endereco": f"{data.get('logradouro', '')}, {data.get('numero', '')} - {data.get('bairro', '')}",
        "cidade": data.get("municipio"),
        "uf": data.get("uf"),
        "atividade": data.get("descricao_atividade_principal", [{}])[0].get("text", ""),
        "fonte": "BrasilAPI",
    }

def listar_ufs() -> list[str]:    
    return [
        "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT",
        "MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO",
        "RR","SC","SP","SE","TO"
    ]
