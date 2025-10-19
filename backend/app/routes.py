from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import document_to_dict, default_donatario_data
from app.consulta_empresas import brasilapi_get_cnpj, map_brasilapi_to_item, is_cnpj
from flask_cors import cross_origin

bp = Blueprint("api", __name__, url_prefix="/api")


# ======================================================
# 🔍 Health check
# ======================================================
@bp.get("/health")
@cross_origin()
def health_check():
    return {"status": "ok", "message": "API DoarCuidar está funcionando!"}, 200


# ======================================================
# 🧭 Listar instituições (Firestore)
# ======================================================
@bp.get("/instituicoes")
@cross_origin()
def buscar_instituicoes():
    """Lista instituições com filtros opcionais de nome e UF."""
    if db is None:
        return jsonify({"erro": "Banco de dados não inicializado"}), 500

    q = (request.args.get("q") or "").strip()
    uf = (request.args.get("estado") or "").strip().upper()

    # Caso o usuário insira um CNPJ diretamente
    if is_cnpj(q):
        try:
            empresa = brasilapi_get_cnpj(q)
            item = map_brasilapi_to_item(empresa)
            return jsonify([item]), 200
        except Exception as e:
            return jsonify({"erro": f"Erro ao buscar CNPJ: {e}"}), 500

    # Busca normal no Firestore
    try:
        instituicoes_ref = db.collection("donatarios")
        query = instituicoes_ref

        if uf:
            query = query.where("estado", "==", uf)

        results = query.stream()
        donatarios = [document_to_dict(doc) for doc in results]

        if q:
            donatarios = [d for d in donatarios if q.lower() in d.get("nome", "").lower()]

        return jsonify(donatarios), 200

    except Exception as e:
        return jsonify({"erro": f"Erro ao consultar instituições: {e}"}), 500


# ======================================================
# 🧾 Detalhar instituição
# ======================================================
@bp.get("/instituicoes/<inst_id>")
@cross_origin()
def detalhes_instituicao(inst_id):
    if db is None:
        return jsonify({"erro": "Banco de dados não inicializado"}), 500

    try:
        inst_ref = db.collection("donatarios").document(inst_id)
        inst_doc = inst_ref.get()

        if not inst_doc.exists:
            return jsonify({"erro": "Instituição não encontrada"}), 404

        inst = document_to_dict(inst_doc)
        inst["id"] = inst_doc.id

        return jsonify(inst), 200

    except Exception as e:
        return jsonify({"erro": f"Erro ao buscar detalhes: {e}"}), 500


# ======================================================
# 🏛️ Cadastrar instituição
# ======================================================
@bp.post("/instituicoes")
@cross_origin()
def cadastrar_instituicao():
    """Cadastra uma nova instituição (donatário)."""
    if db is None:
        return jsonify({"erro": "Banco de dados não inicializado"}), 500

    data = request.get_json(silent=True)
    if not data:
        return jsonify({"erro": "Corpo da requisição vazio ou inválido"}), 400

    nome = data.get("nome")
    cnpj = data.get("cnpj")

    if not nome or not cnpj:
        return jsonify({"erro": "Campos obrigatórios ausentes (nome e cnpj)"}), 400

    try:
        nova_data = default_donatario_data(data)
        _, nova_ref = db.collection("donatarios").add(nova_data)

        nova = {**nova_data, "id": nova_ref.id}
        return jsonify(nova), 201

    except Exception as e:
        return jsonify({"erro": f"Erro ao cadastrar: {e}"}), 500
