// src/pages/CadastroInstituicao.jsx
import Layout from "@/componentes/layout/Layout";
import FormCard from "@/componentes/ui/FormCard";
import InputTexto from "@/componentes/ui/InputTexto";
import Button from "@/componentes/ui/Button";

export default function CadastroInstituicao() {
  return (
    <Layout>
      <FormCard title="Cadastrar Instituição">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <InputTexto label="Nome da instituição" />
          </div>
          <InputTexto label="CNPJ" placeholder="00.000.000/0001-00" />
          <InputTexto label="Estado (UF)" placeholder="SP" className="text-center" maxLength={2} />
          <InputTexto label="Cidade" />
          <InputTexto label="Telefone" />
          <div className="md:col-span-2"><InputTexto label="Email" type="email" /></div>
          <div className="md:col-span-2"><InputTexto label="Endereço completo" /></div>

          <div className="md:col-span-2">
            <Button type="submit" className="btn-brand btn-lg w-full">Cadastrar Instituição</Button>
          </div>
        </form>
      </FormCard>
    </Layout>
  );
}
