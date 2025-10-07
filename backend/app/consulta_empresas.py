# -*- coding: utf-8 -*-
import re
import requests

BRASILAPI_BASE = "https://brasilapi.com.br/api"

def only_digits(s: str) -> str:
    """Remove todos os caracteres não numéricos."""
    return re.sub(r"\D", "", s or "")

def is_cnpj(value: str) -> bool:
    """Verifica se a string tem 14 dígitos numéricos (CNPJ válido)."""
    return len(only_digits(value)) == 14

def brasilapi_get_cnpj(cnpj: str) -> dict:
    """Consulta CNPJ na BrasilAPI e retorna o JSON bruto."""
    s = only_digits(cnpj)
    if len(s) != 14:
        raise ValueError("CNPJ inválido (são necessários 14 dígitos).")
    r = requests.get(f"{BRASILAPI_BASE}/cnpj/v1/{s}", timeout=10)
    r.raise_for_status()
    return r.json()

def format_tel(est: dict) -> str | None:
    """Formata telefone com DDD, se disponível."""
    ddd = (est.get("ddd1") or est.get("ddd_fax") or "") or ""
    tel = (est.get("telefone1") or est.get("telefone2") or est.get("fax") or "") or ""
    ddd = only_digits(ddd)
    tel = only_digits(tel)
    if not (ddd and tel):
        return None
    if len(tel) == 8:  # fixo
        return f"({ddd}) {tel[:4]}-{tel[4:]}"
    if len(tel) == 9:  # celular
        return f"({ddd}) {tel[:5]}-{tel[5:]}"
    return f"({ddd}) {tel}"

def map_brasilapi_to_item(d: dict) -> dict:
    """Converte o JSON da BrasilAPI para o formato esperado pelo frontend."""
    est = d.get("estabelecimento") or {}

    # Atividade principal pode vir como dict ou lista
    atividade = est.get("atividade_principal")
    if isinstance(atividade, dict):
        desc = atividade.get("descricao")
    elif isinstance(atividade, list) and atividade:
        desc = (atividade[0] or {}).get("descricao")
    else:
        desc = None

    endereco = {
        "logradouro": est.get("logradouro"),
        "numero": est.get("numero"),
        "bairro": est.get("bairro"),
        "municipio": est.get("cidade") or est.get("municipio"),
        "uf": est.get("estado") or est.get("uf"),
        "cep": est.get("cep"),
    }

    return {
        "nome": d.get("razao_social") or d.get("nome_fantasia") or "",
        "estado": endereco["uf"],
        "cnpj": d.get("cnpj"),
        "email": est.get("email"),
        "telefone": format_tel(est),
        "descricao": desc,
        "endereco": endereco,
        "raw": d,  # útil para debug (não precisa expor ao frontend)
    }

def listar_ufs() -> list[dict]:
    """Consulta lista de UFs via BrasilAPI (IBGE)."""
    r = requests.get(f"{BRASILAPI_BASE}/ibge/uf/v1", timeout=10)
    r.raise_for_status()
    return r.json()
