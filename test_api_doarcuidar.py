import requests

BASE_URL = "https://doarcuidar.onrender.com/api"

def test_health():
    print("🔍 Testando /health ...")
    r = requests.get(f"{BASE_URL}/health")
    print(r.status_code, r.json())

def test_cadastrar_usuario():
    print("\n👤 Testando /usuarios (cadastro de usuário)...")
    data = {
        "nome": "Teste API",
        "email": "teste_api@example.com",
        "senha": "123456",
        "telefone": "(11) 99999-0000",
        "cidade": "São Paulo",
        "uf": "SP"
    }
    r = requests.post(f"{BASE_URL}/usuarios", json=data)
    print(r.status_code, r.json())

def test_listar_instituicoes():
    print("\n🏢 Testando /instituicoes (listar)...")
    r = requests.get(f"{BASE_URL}/instituicoes")
    print(r.status_code, r.json() if r.status_code == 200 else r.text)

def test_cadastrar_instituicao():
    print("\n🏛️ Testando /instituicoes (cadastrar)...")
    data = {
        "nome": "Instituto Esperança API",
        "cnpj": "12.345.678/0001-90",
        "uf": "SP",
        "cidade": "São Paulo",
        "telefone": "(11) 3333-4444",
        "email": "contato@iesperanca.org",
        "endereco": "Rua das Flores, 123"
    }
    r = requests.post(f"{BASE_URL}/instituicoes", json=data)
    print(r.status_code, r.json())

def test_registrar_doacao():
    print("\n💚 Testando /doacoes (registrar doação)...")
    data = {
        "donatario_id": "teste123",
        "nome_doador": "Viviane Oliveira",
        "valor": 50.0,
        "mensagem": "Boa sorte na campanha!"
    }
    r = requests.post(f"{BASE_URL}/doacoes", json=data)
    print(r.status_code, r.json())

if __name__ == "__main__":
    print("🚀 Iniciando testes da API DoarCuidar...\n")
    test_health()
    test_cadastrar_usuario()
    test_listar_instituicoes()
    test_cadastrar_instituicao()
    test_registrar_doacao()
    print("\n✅ Testes finalizados.")
