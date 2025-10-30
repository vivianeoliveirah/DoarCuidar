from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from app.consulta_empresas import is_cnpj

bp = Blueprint("api", __name__)

def document_to_dict(doc):
    d = doc.to_dict()
    d["id"] = doc.id
    return d


@bp.route("/health")
def health_check():
    return jsonify({"status": "ok"}), 200


@bp.post("/usuarios")
def cadastrar_usuario():
    from app import db
    if db is None:
        return jsonify({"erro": "Banco de dados não inicializado"}), 500

    data = request.get_json() or {}
    obrigatorios = ["nome", "email", "senha"]

    if not all(k in data and data[k] for k in obrigatorios):
        return jsonify({"erro": "Campos obrigatórios ausentes."}), 400

    try:
        doc_ref = db.collection("usuarios").add({
            "nome": data["nome"],
            "email": data["email"],
            "senha": data["senha"],
            "telefone": data.get("telefone", ""),
            "endereco": data.get("endereco", ""),
            "cidade": data.get("cidade", ""),
            "uf": data.get("uf", ""),
            "aceite": data.get("aceite", False),
            "criadoEm": firestore.SERVER_TIMESTAMP,
        })
        return jsonify({"id": doc_ref[1].id, "mensagem": "Usuário criado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"erro": f"Erro ao salvar usuário: {e}"}), 500


@bp.post("/login")
def login_usuario():
    from app import db
    if db is None:
        return jsonify({"erro": "Banco de dados não inicializado"}), 500

    data = request.get_json() or {}
    email = data.get("email", "").strip()
    senha = data.get("senha", "").strip()

    if not email or not senha:
        return jsonify({"erro": "Email e senha são obrigatórios."}), 400

    try:
        usuarios = db.collection("usuarios").where("email", "==", email).stream()
        for u in usuarios:
            user_data = u.to_dict()
            if user_data.get("senha") == senha:
                return jsonify({
                    "id": u.id,
                    "nome": user_data.get("nome"),
                    "email": user_data.get("email"),
                    "mensagem": "Login realizado com sucesso!"
                }), 200

        return jsonify({"erro": "Credenciais inválidas."}), 401

    except Exception as e:
        return jsonify({"erro": f"Erro ao autenticar: {e}"}), 500


@bp.get("/instituicoes")
def buscar_instituicoes():
    from app import db
    if db is None:
        return jsonify({"erro": "Banco de dados não inicializado"}), 500

    q = (request.args.get("q") or "").strip()
    uf = (request.args.get("estado") or "").strip().upper()

    try:
        query = db.collection("donatarios")
        if uf:
            query = query.where("uf", "==", uf)

        results = query.stream()
        instituicoes = [document_to_dict(doc) for doc in results]

        if q:
            instituicoes = [i for i in instituicoes if q.lower() in i.get("nome", "").lower()]

        return jsonify(instituicoes), 200
    except Exception as e:
        return jsonify({"erro": f"Erro ao consultar instituições: {e}"}), 500


@bp.post("/instituicoes")
def cadastrar_instituicao():
    from app import db
    if db is None:
        return jsonify({"erro": "Banco de dados não inicializado"}), 500

    data = request.get_json() or {}
    obrigatorios = ["nome", "cnpj"]

    if not all(k in data and data[k] for k in obrigatorios):
        return jsonify({"erro": "Campos obrigatórios ausentes."}), 400

    if not is_cnpj(data["cnpj"]):
        return jsonify({"erro": "CNPJ inválido"}), 400

    try:
        doc_ref = db.collection("donatarios").add({
            "nome": data["nome"],
            "cnpj": data["cnpj"],
            "uf": data.get("uf", ""),
            "cidade": data.get("cidade", ""),
            "telefone": data.get("telefone", ""),
            "email": data.get("email", ""),
            "endereco": data.get("endereco", ""),
            "criadoEm": firestore.SERVER_TIMESTAMP,
        })
        return jsonify({"id": doc_ref[1].id, "mensagem": "Instituição cadastrada com sucesso!"}), 201
    except Exception as e:
        return jsonify({"erro": f"Erro ao cadastrar instituição: {e}"}), 500


@bp.put("/instituicoes/<id>")
def atualizar_instituicao(id):
    from app import db
    data = request.get_json() or {}
    try:
        db.collection("donatarios").document(id).update(data)
        return jsonify({"mensagem": "Instituição atualizada com sucesso!"}), 200
    except Exception as e:
        return jsonify({"erro": f"Erro ao atualizar instituição: {e}"}), 500


@bp.delete("/instituicoes/<id>")
def excluir_instituicao(id):
    from app import db
    try:
        db.collection("donatarios").document(id).delete()
        return jsonify({"mensagem": "Instituição excluída com sucesso!"}), 200
    except Exception as e:
        return jsonify({"erro": f"Erro ao excluir instituição: {e}"}), 500


@bp.post("/doacoes")
def registrar_doacao():
    from app import db
    if db is None:
        return jsonify({"erro": "Banco de dados não inicializado"}), 500

    data = request.get_json() or {}
    try:
        doc_ref = db.collection("doacoes").add({
            "donatario_id": data.get("donatario_id"),
            "nome_doador": data.get("nome_doador"),
            "valor": data.get("valor"),
            "mensagem": data.get("mensagem", ""),
            "criadoEm": firestore.SERVER_TIMESTAMP,
        })
        return jsonify({"id": doc_ref[1].id, "mensagem": "Doação registrada!"}), 201
    except Exception as e:
        return jsonify({"erro": f"Erro ao registrar doação: {e}"}), 500
