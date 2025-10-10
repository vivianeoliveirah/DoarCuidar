import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Fundo from "@/assets/fundo.png";
import Button from "@/componentes/ui/Button";
import CampoSenha from "@/componentes/ui/CampoSenha";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    if (!email || !senha) return setErro("Informe e-mail e senha.");

    const usuario = {
      nome: email.split("@")[0],
      email,
      endereco: "",
      telefone: "",
      data_nascimento: "",
    };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("token", "ok");
    navigate("/perfil");
  }

  return (
    <div
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      {/* véu para manter leitura */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/85 to-slate-50/90 backdrop-blur-[2px]" />

      <main className="relative w-full px-4">
        <div className="mx-auto w-full max-w-md bg-white/90 p-6 md:p-8 rounded-3xl shadow-card ring-1 ring-slate-200">
          <h1 className="text-2xl font-bold mb-6 text-center">Entrar</h1>

          {erro && <p role="alert" className="mb-4 text-sm text-rose-700">{erro}</p>}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium mb-1">Senha</label>
              <CampoSenha
                id="senha"
                value={senha}
                onChange={(e)=>setSenha(e.target.value)}
                placeholder="Sua senha"
              />
            </div>

            <Button type="submit" className="w-full">Entrar</Button>
          </form>

          <p className="mt-4 text-center text-sm">
            Ainda não tem conta?{" "}
            <Link to="/cadastro-usuario" className="text-emerald-700 hover:underline">
              Criar conta
            </Link>
          </p>

          <div className="mt-4">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-slate-600 hover:text-emerald-700"
              aria-label="Voltar para a Home"
            >
              ← Voltar para a Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
