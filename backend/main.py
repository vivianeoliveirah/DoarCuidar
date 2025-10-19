import sys, os
# Garante que o Python saiba onde está o pacote 'backend/app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app  # Agora o import funciona dentro do backend/

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
