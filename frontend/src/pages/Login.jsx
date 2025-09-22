import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/LogoDoarCuidar.png";
import Fundo from "../assets/fundo.png";
import Button from "@/componentes/ui/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    if (!email || !senha) return setErro("Informe e-mail e senha.");

    const usuario = { nome: email.split("@")[0], email, endereco: "", telefone: "", data_nascimento: "" };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("token", "ok");
    navigate("/perfil");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${Fundo})` }}>
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
          &#8592; Voltar
        </Link>
      </div>

      <div className="w-full max-w-md bg-white/90 p-6 rounded-xl shadow-md">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logotipo DoarCuidar" className="h-28 w-auto" />
        </div>

        <h1 className="text-2xl font-bold mb-4 text-center">Entrar</h1>
        {erro && <p role="alert" className="mb-3 text-sm text-red-700">{erro}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <label className="block mb-1 font-semibold" htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-3 rounded mb-4 w-full" required />

          <label className="block mb-1 font-semibold" htmlFor="senha">Senha</label>
          <div className="relative mb-4">
            <input id="senha" type={mostrarSenha ? "text" : "password"} placeholder="Sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="border p-3 rounded w-full pr-24" required />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-2 top-2"
              aria-pressed={mostrarSenha}
              aria-controls="senha"
              aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            >
              {mostrarSenha ? "Ocultar" : "Mostrar"}
            </Button>
          </div>

          <Button type="submit" className="w-full">Entrar</Button>
        </form>

        <div className="text-center mt-4">
          <Link to="/cadastro" className="text-blue-700 hover:underline text-sm">Criar uma conta</Link>
        </div>
      </div>
    </div>
  );
}
