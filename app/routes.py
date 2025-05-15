"""
Este módulo define as rotas para o aplicativo Flask.
"""
import logging
from flask import render_template, request, redirect, url_for, session
from app import app
from app.consulta_empresas import buscar_empresas
from app.models import db, Usuario
from werkzeug.security import generate_password_hash

logging.basicConfig(level=logging.DEBUG)

@app.route('/')
def index():
    """Página inicial do site."""
    return render_template('index.html')  # Renderiza o formulário de pesquisa


@app.route('/pesquisar', methods=['POST'])
def pesquisar():
    logging.debug("Iniciando a rota /pesquisar")
    client_id = "SEU_CLIENT_ID"
    client_secret = "SEU_SECRET"
    palavra_chave = request.form.get('palavra_chave')  # Obtém a palavra-chave do formulário
    estado = request.form.get('estado')  # Obtém o estado do formulário

    if not client_id or not client_secret:
        erro = "Credenciais de autenticação não configuradas."
        logging.error(erro)
        return render_template('resultados.html', erro=erro)

    try:
        logging.debug(f"Buscando empresas com palavra-chave: {palavra_chave}, estado: {estado}")
        empresas = buscar_empresas(client_id, client_secret, palavra_chave, estado)
        return render_template('resultados.html', empresas=empresas)
    except Exception as e:
        logging.error(f"Erro ao buscar empresas: {str(e)}")
        return render_template('resultados.html', erro="Erro interno no servidor.")


@app.route('/buscar_instituicoes', methods=['POST'])
def buscar_instituicoes():
    client_id = "SEU_CLIENT_ID"
    client_secret = "SEU_SECRET"
    palavra_chave = request.form.get('palavra_chave')
    estado = request.form.get('estado')

    try:
        empresas = buscar_empresas(client_id, client_secret, palavra_chave, estado)
        return render_template('resultados.html', empresas=empresas)
    except Exception as e:
        return render_template('resultados.html', erro=str(e))


@app.route('/cadastro', methods=['GET'])
def cadastro():
    return render_template('cadastro.html')


@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    nome = request.form['nome']
    cpf = request.form['cpf']
    email = request.form['email']
    senha = generate_password_hash(request.form['senha'])
    usuario = Usuario(nome=nome, cpf=cpf, email=email, senha=senha)
    db.session.add(usuario)
    db.session.commit()
    return redirect(url_for('index'))


@app.route('/perfil')
def perfil():
    # Supondo que o id do usuário está salvo na sessão após login
    usuario_id = session.get('usuario_id')
    if not usuario_id:
        return redirect(url_for('login'))
    usuario = Usuario.query.get(usuario_id)
    return render_template('perfil.html', usuario=usuario)