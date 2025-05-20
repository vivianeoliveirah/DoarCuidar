import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Fundo from '../assets/fundo.png'; // ajuste conforme seu caminho

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dadosUsuario = localStorage.getItem('usuario');
    if (!dadosUsuario) {
      navigate('/login');
    } else {
      setUsuario(JSON.parse(dadosUsuario));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      {/* Botão Voltar para Home */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        &#8592; Voltar para Home
      </button>

      <div className="flex justify-between items-center mb-6 max-w-xl mx-auto bg-white/90 p-4 rounded shadow">
        <h1 className="text-2xl font-bold">Perfil do Usuário</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Sair
        </button>
      </div>

      {usuario ? (
        <div className="bg-white/90 p-6 rounded shadow max-w-xl mx-auto">
          <p className="mb-2"><strong>Nome:</strong> {usuario.nome}</p>
          <p className="mb-2"><strong>CPF:</strong> {usuario.cpf}</p>
          <p className="mb-2"><strong>Email:</strong> {usuario.email}</p>
        </div>
      ) : (
        <p className="text-center text-white">Carregando informações do usuário...</p>
      )}

      <div className="mt-6 text-center">
        <Link to="/buscar" className="text-blue-700 underline">
          Buscar Instituições
        </Link>
      </div>
    </div>
  );
}
