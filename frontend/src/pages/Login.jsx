import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/LogoDoarCuidar.png";
import Fundo from "../assets/fundo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ email, senha });
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      {/* Botão de Voltar */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
          &#8592; Voltar
        </Link>
      </div>

      {/* Formulário de Login */}
      <div className="w-full max-w-md bg-white bg-opacity-90 p-6 rounded-xl shadow-md">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo da Empresa" className="h-28 w-auto" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded mb-4 w-full"
            required
          />

          <div className="relative mb-4">
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border p-3 rounded w-full"
              required
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-2 text-blue-600 hover:underline text-sm"
            >
              {mostrarSenha ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded w-full hover:bg-blue-600 transition mb-4"
          >
            Entrar
          </button>
        </form>

        <div className="text-center">
          <Link to="/cadastro" className="text-blue-600 hover:underline text-sm">
            Criar uma conta
          </Link>
        </div>
      </div>
    </div>
  );
}
