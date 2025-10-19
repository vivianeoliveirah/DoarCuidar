from flask import Blueprint, request, jsonify
# Importa o cliente Firestore 'db' e a função de conversão de modelos
from app.extensions import db
from app.models import (
    document_to_dict, 
    default_donatario_data, 
    default_doacao_data,
    # Você precisará criar uma estrutura semelhante para o Donatario
) 
import requests
from app.consulta_empresas import brasilapi_get_cnpj, map_brasilapi_to_item, listar_ufs, is_cnpj

bp = Blueprint("api", __name__, url_prefix="/api")

# ... (Rotas /health, /ufs, /cnpj/<cnpj> permanecem inalteradas) ...

@bp.get("/instituicoes")
def buscar_instituicoes():
    if db is None:
        return jsonify({"erro": "Banco de dados não inicializado"}), 500

    q = (request.args.get("q") or "").strip()
    uf = (request.args.get("estado") or "").strip().upper()

    # Lógica de consulta por CNPJ na Brasil API permanece a mesma
    if is_cnpj(q):
        # ... (Mantém a lógica de consulta externa) ...
        # (código omitido, é igual ao seu original)
        # ...
        pass # Mantém o código do seu arquivo original para CNPJ
    
    # Lógica de consulta no Firestore
    else:
        # Ponto de acesso à coleção 'donatarios' (Instituições)
        instituicoes_ref = db.collection('donatarios')
        
        query = instituicoes_ref
        
        # Filtragem por Estado/UF
        if uf:
            query = query.where('estado', '==', uf)

        # Filtragem por Nome (Firestore não suporta 'like' (ilike) como o SQL. 
        # A busca por nome precisa ser exata ou tratada com N-grams/Full-text search, 
        # ou, para este caso, você pode buscar todos e filtrar em memória, 
        # MAS, é recomendado FORTEMENTE fazer a busca exata no DB ou usar uma solução de busca externa.)
        # Para um MVP simples, vamos buscar tudo com filtros de estado e filtrar nome em memória, se necessário.
        
        try:
            results = query.stream()
            donatarios = [document_to_dict(doc) for doc in results]
            
            # Filtragem de nome em memória (se não usar busca externa)
            if q:
                donatarios = [d for d in donatarios if q.lower() in d.get('nome', '').lower()]

            return jsonify(donatarios), 200
        except Exception as e:
             return jsonify({"erro": f"Erro ao consultar instituições: {e}"}), 500

@bp.get("/instituicoes/<inst_id>")
def detalhes_instituicao(inst_id):
    if db is None:
        return jsonify({"erro": "Banco de dados não inicializado"}), 500
        
    inst_ref = db.collection('donatarios').document(inst_id)
    inst_doc = inst_ref.get()
    
    inst = document_to_dict(inst_doc)
    
    if not inst:
        return jsonify({"erro": "Instituição não encontrada"}), 404
    
    return jsonify(inst), 200

@bp.post("/instituicoes")
def cadastrar_instituicao():
    if db is None:
        return jsonify({"erro": "Banco de dados não inicializado"}), 500
        
    data = request.get_json()
    if not data.get("nome") or not data.get("cnpj"):
        return jsonify({"erro": "Campos obrigatórios ausentes"}), 400
        
    try:
        # Usa a função de modelo para estruturar os dados
        nova_data = default_donatario_data(data)
        
        # Adiciona ao Firestore e pega a referência
        _, nova_ref = db.collection('donatarios').add(nova_data)
        
        # Pega o ID gerado pelo Firestore
        nova = nova_data
        nova["id"] = nova_ref.id
        
        return jsonify(nova), 201
    except Exception as e:
        return jsonify({"erro": f"Erro ao cadastrar: {e}"}), 500 # Alterado de 400 para 500

# ... (O endpoint /doacoes seguirá o mesmo padrão de INSERT/SELECT no Firestore) ...
@bp.get("/health")
def health_check():
    return {"status": "ok", "message": "API DoarCuidar está funcionando!"}, 200
