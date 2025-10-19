import sys, os
# Garante que o Python saiba onde está o pacote 'backend/app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app

app = create_app()

if __name__ == "__main__":
    # para dev local
    app.run(host="127.0.0.1", port=5000, debug=True)
