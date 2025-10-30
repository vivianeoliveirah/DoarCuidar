import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoDoarCuidar.png";
import Fundo from "../../assets/fundo.png";
import Button from "@/componentes/ui/Button";
import CampoSenha from "@/componentes/ui/CampoSenha";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    if (!email || !senha) return setErro("Informe e-mail e senha.");

    // login mockado
    const usuario = { nome: email.split("@")[0], email };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("token", "ok");
    navigate("/perfil");
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center text-sm text-white bg-brand-600 px-3 py-1.5 rounded-md hover:bg-brand-700 shadow-md transition"
      >
        <span className="text-lg mr-2">&#8592;</span> Voltar
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 p-8 rounded-2xl shadow-card flex flex-col space-y-4"
      >
        <div className="flex justify-center mb-2">
          <img src={Logo} alt="Logotipo DoarCuidar" className="h-24 w-auto" />
        </div>

        <h1 className="text-2xl font-bold text-center">Entrar</h1>
        {erro && <p role="alert" className="text-sm text-red-700">{erro}</p>}

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-600"
            required
          />
        </div>

        <div>
          <label htmlFor="senha" className="block text-sm font-medium mb-1">Senha</label>
          <CampoSenha
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Sua senha"
          />
        </div>

        <div className="text-center -mt-2">
          <Link to="/cadastro" className="text-brand-700 hover:underline">
            Criar uma conta
          </Link>
        </div>

        <Button type="submit" className="w-full">Entrar</Button>
      </form>
    </div>
  );
}
