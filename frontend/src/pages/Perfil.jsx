// src/pages/Perfil.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-yellow-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Perfil do Usuário</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Sair
        </button>
      </div>

      {usuario ? (
        <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>CPF:</strong> {usuario.cpf}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
        </div>
      ) : (
        <p>Carregando informações do usuário...</p>
      )}

      <div className="mt-6">
        <Link to="/buscar" className="text-blue-700 underline">
          Buscar Instituições
        </Link>
      </div>
    </div>
  );
}
