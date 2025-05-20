import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoDoarCuidar.png";
import Fundo from "../../assets/fundo.png";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate(); // Para navegar de volta

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ email, senha });
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      {/* Botão de Voltar para Home */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        &#8592; Voltar para Home
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 p-8 rounded-lg shadow-lg flex flex-col space-y-4"
        style={{ maxWidth: "400px" }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="Logo da Empresa" className="h-24 w-auto" />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">Entrar</h2>

        {/* Campo de Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Campo de Senha */}
        <div>
          <label className="block text-sm font-medium mb-1">Senha</label>
          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-2 text-sm text-blue-600 hover:underline"
            >
              {mostrarSenha ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        {/* Link para Cadastro */}
        <div className="text-center mt-2">
          <Link to="/cadastro" className="text-blue-600 hover:underline">
            Criar uma conta
          </Link>
        </div>

        {/* Botão de Entrar */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded w-full hover:bg-blue-700 transition font-semibold"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
