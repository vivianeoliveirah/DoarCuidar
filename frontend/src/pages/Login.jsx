import { useState } from "react";
import Layout from "@/componentes/layout/Layout";
import FormCard from "@/componentes/ui/FormCard";
import InputTexto from "@/componentes/ui/InputTexto";
import CampoSenha from "@/componentes/ui/CampoSenha";
import Button from "@/componentes/ui/Button";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();
      if (res.ok) {
        setSucesso(data.mensagem);
      } else {
        setErro(data.erro || "Erro ao fazer login.");
      }
    } catch {
      setErro("Erro de conexão com o servidor.");
    }
  }

  return (
    <Layout>
      <FormCard title="Entrar">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <InputTexto
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CampoSenha
            id="senha"
            label="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Button type="submit" className="btn-brand w-full">
            Entrar
          </Button>
        </form>

        {erro && <p className="text-red-600 mt-2 text-sm">{erro}</p>}
        {sucesso && <p className="text-green-600 mt-2 text-sm">{sucesso}</p>}

        <p className="mt-4 text-center text-sm">
          Ainda não tem conta?{" "}
          <Link
            to="/cadastro-usuario"
            className="text-brand-700 hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </FormCard>
    </Layout>
  );
}
