import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Fundo from '../assets/fundo.png';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [donatarios, setDonatarios] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const dadosUsuario = localStorage.getItem('usuario');
    if (!dadosUsuario) {
      navigate('/login');
    } else {
      const usuarioObj = JSON.parse(dadosUsuario);
      setUsuario(usuarioObj);
      setEmail(usuarioObj.email || "");
      setEndereco(usuarioObj.endereco || "");
      setTelefone(usuarioObj.telefone || "");
      setDataNascimento(usuarioObj.data_nascimento || "");

      // Simulação de donatários salvos
      setDonatarios([
        {
          nome: "Instituto Esperança",
          cnpj: "12.345.678/0001-99",
          telefone: "(11) 99999-0000",
          endereco: "Rua do Amor, 100"
        }
      ]);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    console.log("Salvar:", { email, endereco, telefone, dataNascimento });
    alert("Alterações salvas com sucesso!");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        &#8592; Voltar para Home
      </button>

      <div className="max-w-xl mx-auto bg-white/90 p-6 rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Perfil do Usuário</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Sair
          </button>
        </div>

        <form onSubmit={handleSalvar}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Endereço:</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Telefone:</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-semibold">Data de Nascimento:</label>
            <input
              type="text"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              placeholder="dd/mm/aaaa"
              className="w-full border p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            Salvar Alterações
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Donatários Salvos</h2>
          {donatarios.length > 0 ? (
            <ul className="space-y-3">
              {donatarios.map((d, index) => (
                <li key={index} className="bg-yellow-50 p-4 rounded shadow">
                  <p><strong>{d.nome}</strong></p>
                  <p>CNPJ: {d.cnpj}</p>
                  <p>Telefone: {d.telefone}</p>
                  <p>Endereço: {d.endereco}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum donatário salvo.</p>
          )}
        </div>
      </div>
    </div>
  );
}
