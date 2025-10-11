// src/pages/CadastroUsuario.jsx
import { useState } from "react";
import Layout from "@/componentes/layout/Layout";
import FormCard from "@/componentes/ui/FormCard";
import InputTexto from "@/componentes/ui/InputTexto";
import CampoSenha from "@/componentes/ui/CampoSenha";
import Button from "@/componentes/ui/Button";

export default function CadastroUsuario() {
  const [form, setForm] = useState({
    nome:"", email:"", senha:"", confirma:"", telefone:"",
    endereco:"", cidade:"", uf:"", aceite:false
  });
  const set = (k) => (e) => setForm(p => ({...p, [k]: e.target?.type==="checkbox" ? e.target.checked : e.target.value}));

  function handleSubmit(e){
    e.preventDefault();
    // TODO: validar e salvar
  }

  return (
    <Layout>
      <FormCard
        title="Crie sua conta"
        subtitle="É rápido, seguro e você pode doar quando quiser."
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputTexto label="Nome completo" value={form.nome} onChange={set("nome")} />
          <InputTexto label="E-mail" type="email" value={form.email} onChange={set("email")} />

          <CampoSenha id="senha" label="Senha (mín. 6)" value={form.senha} onChange={set("senha")} />
          <CampoSenha id="confirma" label="Confirmar senha" value={form.confirma} onChange={set("confirma")} />

          <InputTexto label="Telefone (opcional)" value={form.telefone} onChange={set("telefone")} />
          <div className="md:col-span-2">
            <InputTexto label="Endereço (opcional)" value={form.endereco} onChange={set("endereco")} />
          </div>

          <InputTexto label="Cidade (opcional)" value={form.cidade} onChange={set("cidade")} />
          <InputTexto label="UF (opcional)" value={form.uf} onChange={set("uf")} placeholder="SP" className="text-center" maxLength={2} />

          <div className="md:col-span-2 mt-2 flex items-start gap-2">
            <input id="aceite" type="checkbox" checked={form.aceite} onChange={set("aceite")} className="mt-1 h-4 w-4" required />
            <label htmlFor="aceite" className="text-sm">Li e concordo com os <a className="text-brand-700 underline">termos de uso</a>.</label>
          </div>

          <div className="md:col-span-2 mt-2">
            <Button type="submit" className="btn-brand btn-lg w-full">Criar conta</Button>
          </div>
        </form>
      </FormCard>
    </Layout>
  );
}
