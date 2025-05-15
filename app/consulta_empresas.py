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
    """Busca empresas na API com suporte à paginação."""
    # Obtém o token antes da busca
    token = autenticar(client_id, client_secret)
    
    cnpj_url = f"https://apigateway.conectagov.estaleiro.serpro.gov.br/api-cnpj-empresa/v2/empresa?estado={estado}&termo={palavra_chave}&pagina={pagina}"
    
    if cidade:
        cnpj_url += f"&cidade={cidade}"
    if cnae:
        cnpj_url += f"&cnae={cnae}"
    if situacao:
        cnpj_url += f"&situacao={situacao}"
    
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.get(cnpj_url, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise RuntimeError(f"Erro na consulta: {e}")