# backend/app/consulta_empresas.py
import re
import requests

# --- 🔹 Validação de CNPJ
def is_cnpj(value: str) -> bool:
    """Retorna True se for um CNPJ válido (apenas números, 14 dígitos)."""
    cnpj = re.sub(r"\D", "", value or "")
    return len(cnpj) == 14 and cnpj.isdigit()

# --- 🔹 Consulta CNPJ na BrasilAPI
def brasilapi_get_cnpj(cnpj: str) -> dict | None:
    """Busca dados do CNPJ na BrasilAPI."""
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

# --- 🔹 Conversão para o formato do app
def map_brasilapi_to_item(data: dict) -> dict:
    """Converte o JSON da BrasilAPI para o formato usado no DoarCuidar."""
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

# --- 🔹 Lista de UFs válidas (para dropdowns e filtros)
def listar_ufs() -> list[str]:
    """Retorna a lista de UFs brasileiras."""
    return [
        "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT",
        "MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO",
        "RR","SC","SP","SE","TO"
    ]
