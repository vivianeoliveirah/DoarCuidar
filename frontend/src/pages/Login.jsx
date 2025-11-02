// src/pages/Login.jsx
import Layout from "@/componentes/layout/Layout";
import FormCard from "@/componentes/ui/FormCard";
import InputTexto from "@/componentes/ui/InputTexto";
import CampoSenha from "@/componentes/ui/CampoSenha";
import Button from "@/componentes/ui/Button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Layout>
      <FormCard title="Entrar">
        <form className="grid grid-cols-1 gap-4">
          <InputTexto label="E-mail" type="email" />
          <CampoSenha id="senha" label="Senha" />
          <Button type="submit" className="btn-brand w-full">Entrar</Button>
        </form>
        <p className="mt-4 text-center text-sm">
          Ainda não tem conta? <Link to="/cadastro-usuario" className="text-brand-700 hover:underline">Criar conta</Link>
        </p>
      </FormCard>
    </Layout>
  );
}
