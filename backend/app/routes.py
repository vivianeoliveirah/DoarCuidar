from flask import Blueprint, request, jsonify
import requests
from app.models import Donatario, Doacao, db
from app.consulta_empresas import brasilapi_get_cnpj, map_brasilapi_to_item, listar_ufs, is_cnpj

bp = Blueprint("api", __name__, url_prefix="/api")

@bp.get("/health")
def health():
    return jsonify({"status": "ok"})

@bp.get("/ufs")
def ufs():
    try:
        data = listar_ufs()
        return jsonify([{"sigla": u["sigla"], "nome": u["nome"]} for u in data])
    except Exception as e:
        return jsonify({"erro": f"Falha ao consultar UFs: {e}"}), 502

@bp.get("/cnpj/<cnpj>")
def api_cnpj(cnpj: str):
    try:
        data = brasilapi_get_cnpj(cnpj)
        item = map_brasilapi_to_item(data)
        return jsonify(item), 200
    except ValueError as ve:
        return jsonify({"erro": str(ve)}), 400
    except requests.exceptions.HTTPError as he:
        try:
            return jsonify({"erro": he.response.json().get("message", str(he))}), he.response.status_code
        except Exception:
            return jsonify({"erro": str(he)}), 502
    except Exception as e:
        return jsonify({"erro": f"Falha na consulta: {e}"}), 502

@bp.get("/instituicoes")
def buscar_instituicoes():
    q = (request.args.get("q") or "").strip()
    uf = (request.args.get("estado") or "").strip().upper()

    if is_cnpj(q):
        try:
            data = brasilapi_get_cnpj(q)
            item = map_brasilapi_to_item(data)
            if uf and item.get("estado") and item["estado"].upper() != uf:
                return jsonify([]), 200
            return jsonify([{
                "id": None,
                "nome": item["nome"],
                "estado": item["estado"],
                "cnpj": item["cnpj"],
                "email": item["email"],
                "telefone": item["telefone"],
            }]), 200
        except Exception as e:
            return jsonify({"erro": f"Falha na consulta: {e}"}), 502
    else:
        query = Donatario.query
        if q:
            query = query.filter(Donatario.nome.ilike(f"%{q}%"))
        if uf:
            query = query.filter(Donatario.estado == uf)
        return jsonify([d.to_dict() for d in query.all()])

@bp.get("/instituicoes/<int:id>")
def detalhes_instituicao(id):
    inst = Donatario.query.get(id)
    if not inst:
        return jsonify({"erro": "Instituição não encontrada"}), 404
    return jsonify(inst.to_dict()), 200

@bp.post("/instituicoes")
def cadastrar_instituicao():
    data = request.get_json()
    if not data.get("nome") or not data.get("cnpj"):
        return jsonify({"erro": "Campos obrigatórios ausentes"}), 400
    try:
        nova = Donatario(
            nome=data["nome"],
            cnpj=data["cnpj"],
            telefone=data.get("telefone"),
            endereco=data.get("endereco"),
            estado=data.get("estado"),
            usuario_id=data.get("usuario_id")
        )
        db.session.add(nova)
        db.session.commit()
        return jsonify(nova.to_dict()), 201
    except Exception as e:
        return jsonify({"erro": f"Erro ao cadastrar: {e}"}), 400

@bp.post("/doacoes")
def registrar_doacao():
    data = request.get_json()
    if not data.get("donatario_id") or not data.get("valor"):
        return jsonify({"erro": "Campos obrigatórios ausentes"}), 400
    try:
        nova = Doacao(
            donatario_id=data["donatario_id"],
            valor=float(data["valor"]),
            nome_doador=data.get("nome_doador"),
            mensagem=data.get("mensagem")
        )
        db.session.add(nova)
        db.session.commit()
        return jsonify(nova.to_dict()), 201
    except Exception as e:
        return jsonify({"erro": f"Erro ao registrar doação: {e}"}), 400

@bp.get("/doacoes")
def listar_doacoes():
    inst_id = request.args.get("instituicao")
    query = Doacao.query
    if inst_id:
        query = query.filter(Doacao.donatario_id == inst_id)
    return jsonify([d.to_dict() for d in query.all()])
