import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/componentes/layout/Layout";
import Fundo from "@/assets/fundo.png";
import Button from "@/componentes/ui/Button";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [donatarios, setDonatarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem("usuario");
    if (!u) return navigate("/login");
    const parsed = JSON.parse(u);
    setUsuario(parsed);
    setEmail(parsed.email || "");
    setEndereco(parsed.endereco || "");
    setTelefone(parsed.telefone || "");
    setDataNascimento(parsed.data_nascimento || "");
    setDonatarios([
      { nome: "Instituto Esperança", cnpj: "12.345.678/0001-99", telefone: "(11) 99999-0000", endereco: "Rua do Amor, 100" }
    ]);
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/");
  }

  function handleSalvar(e) {
    e.preventDefault();
    const atualizado = { ...usuario, email, endereco, telefone, data_nascimento: dataNascimento };
    localStorage.setItem("usuario", JSON.stringify(atualizado));
    setUsuario(atualizado);
    alert("Alterações salvas com sucesso!");
  }

  if (!usuario) return null;

  return (
    <Layout className="py-8">
      <section className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${Fundo})` }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/85 to-slate-50/90 backdrop-blur-[2px]" aria-hidden />

        <div className="relative mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-4">
            <Link
              to="/"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-3.5 py-1.5 text-white text-sm font-medium shadow-sm hover:bg-emerald-700"
            >
              ← Home
            </Link>
          </div>

          <div className="rounded-2xl bg-white/90 ring-1 ring-slate-200 shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Perfil do Usuário</h1>
              <Button variant="danger" size="sm" onClick={handleLogout}>Sair</Button>
            </div>

            <form onSubmit={handleSalvar}>
              <label htmlFor="email" className="block mb-1 font-medium">E-mail</label>
              <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                     className="w-full border p-2 rounded mb-4 focus:ring-2 focus:ring-emerald-600" required />

              <label htmlFor="endereco" className="block mb-1 font-medium">Endereço</label>
              <input id="endereco" type="text" value={endereco} onChange={(e)=>setEndereco(e.target.value)}
                     className="w-full border p-2 rounded mb-4 focus:ring-2 focus:ring-emerald-600" />

              <label htmlFor="telefone" className="block mb-1 font-medium">Telefone</label>
              <input id="telefone" type="tel" placeholder="(00) 00000-0000" value={telefone} onChange={(e)=>setTelefone(e.target.value)}
                     className="w-full border p-2 rounded mb-4 focus:ring-2 focus:ring-emerald-600" />

              <label htmlFor="nascimento" className="block mb-1 font-medium">Data de Nascimento</label>
              <input id="nascimento" type="text" placeholder="dd/mm/aaaa" value={dataNascimento} onChange={(e)=>setDataNascimento(e.target.value)}
                     className="w-full border p-2 rounded mb-6 focus:ring-2 focus:ring-emerald-600" />

              <Button type="submit" className="w-full">Salvar Alterações</Button>
            </form>

            <section className="mt-8" aria-labelledby="titulo-donatarios">
              <h2 id="titulo-donatarios" className="text-xl font-semibold mb-4">Donatários Salvos</h2>
              {donatarios.length ? (
                <ul className="space-y-3">
                  {donatarios.map((d, i) => (
                    <li key={i} className="bg-emerald-50/70 ring-1 ring-emerald-100 p-4 rounded-xl">
                      <p><strong>{d.nome}</strong></p>
                      <p>CNPJ: {d.cnpj}</p>
                      <p>Telefone: {d.telefone}</p>
                      <p>Endereço: {d.endereco}</p>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-slate-600">Nenhum destinatário salvo.</p>}
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}
