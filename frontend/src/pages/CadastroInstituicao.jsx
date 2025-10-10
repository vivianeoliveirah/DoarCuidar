import Layout from "@/componentes/layout/Layout";
import FormCadastroInstituicao from "@/componentes/auth/FormCadastroInstituicao";
import Fundo from "@/assets/fundo.png";

export default function CadastroInstituicao() {
  return (
    <Layout className="py-8">
      <section className="relative rounded-3xl overflow-hidden">
        {/* bg */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${Fundo})` }}
          aria-hidden
        />
        {/* véu/gradiente para casar com Home/Buscar */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/85 to-slate-50/90 backdrop-blur-[2px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-2xl bg-white/90 ring-1 ring-slate-200 shadow-xl p-6 md:p-8">
            <h1 className="text-center text-2xl font-semibold tracking-tight mb-4">
              Cadastrar Instituição
            </h1>
            <FormCadastroInstituicao />
          </div>
        </div>
      </section>
    </Layout>
  );
}
