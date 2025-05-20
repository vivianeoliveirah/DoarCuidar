# filepath: c:\Projetos\DoarCuidar\app\consulta_empresas.py

"""
Este módulo contém funções para autenticação e consulta de dados de CNPJ.
"""
import requests


def autenticar(client_id, client_secret):
    """Autentica na API e retorna o token de acesso."""
    auth_url = (
        "https://apigateway.conectagov.estaleiro.serpro.gov.br/oauth2/jwt-token"
    )
    auth_data = {
        "client_id": client_id,
        "client_secret": client_secret,
        "grant_type": "client_credentials",
    }
    try:
        response = requests.post(auth_url, data=auth_data, timeout=10)
        response.raise_for_status()
        return response.json().get("access_token")
    except requests.exceptions.RequestException as e:
        raise RuntimeError(f"Erro na autenticação: {e}")


def consulta_basica(token, cnpj):
    """Consulta básica de CNPJ."""
    url = (
        f"https://apigateway.conectagov.estaleiro.serpro.gov.br/"
        f"api-cnpj-basica/v2/basica/{cnpj}"
    )
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise RuntimeError(f"Erro na consulta básica: {e}")


def consulta_empresa(token, cnpj):
    """Consulta detalhada de CNPJ."""
    url = (
        f"https://apigateway.conectagov.estaleiro.serpro.gov.br/"
        f"api-cnpj-empresa/v2/empresa/{cnpj}"
    )
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise RuntimeError(f"Erro na consulta empresa: {e}")


def consulta_qsa(token, cnpj):
    """Consulta de QSA (Quadro de Sócios e Administradores)."""
    url = (
        f"https://apigateway.conectagov.estaleiro.serpro.gov.br/"
        f"api-cnpj-qsa/v2/qsa/{cnpj}"
    )
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise RuntimeError(f"Erro na consulta QSA: {e}")


def buscar_empresas(client_id, client_secret, palavra_chave, estado, cidade='', cnae='', situacao='', pagina=1):
    """Simulação de busca de empresas para uso acadêmico."""
    # Dados fictícios simulando resposta da API
    return {
        "empresas": [
            {
                "nomeEmpresarial": "Associação de Caridade Cuidadora",
                "ni": "12345678000199",
                "telefone": [{"ddd": "11", "numero": "12345678"}],
                "cnaePrincipal": {"descricao": "Atividades assistenciais"},
                "endereco": {"logradouro": "Rua Exemplo", "numero": "100"},
                "uf": "SP"
            },
            {
                "nomeEmpresarial": "Clínica Caridade",
                "ni": "98765432000188",
                "telefone": [{"ddd": "11", "numero": "87654321"}],
                "cnaePrincipal": {"descricao": "Atividades de clínicas"},
                "endereco": {"logradouro": "Avenida Teste", "numero": "200"},
                "uf": "SP"
            }
        ]
    }


from app.consulta_empresas import buscar_empresas

client_id = 'SEU_CLIENT_ID'
client_secret = 'SEU_CLIENT_SECRET'
palavra_chave = 'hospital'
estado = 'SP'

resultado = buscar_empresas(client_id, client_secret, palavra_chave, estado)
print(resultado)