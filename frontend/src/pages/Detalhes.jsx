// src/pages/Detalhes.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Fundo from "../assets/fundo.png";

function cleanCnpj(v){ return String(v||"").replace(/\D/g, ""); }
function formatCnpj(v){
  const s = cleanCnpj(v);
  if (s.length !== 14) return v ?? "—";
  return `${s.slice(0,2)}.${s.slice(2,5)}.${s.slice(5,8)}/${s.slice(8,12)}-${s.slice(12)}`;
}

export default function Detalhes() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState(state?.empresa || null);
  const [erro, setErro] = useState(state?.erro || "");

  useEffect(() => {
    const cnpj = cleanCnpj(state?.cnpj || empresa?.ni);
    if (!empresa && !erro && cnpj) {
      (async () => {
        try {
          const r = await fetch(`/api/cnpj/${cnpj}`);
          const js = await r.json();
          if (!r.ok) throw new Error(js?.erro || "Falha ao consultar CNPJ");
          setEmpresa(js);
        } catch (e) {
          setErro(String(e.message));
        }
      })();
    }
    if (!empresa && !erro && !cnpj) {
      navigate("/buscar", { replace: true, state: { aviso: "Selecione uma instituição para ver detalhes." } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!empresa && !erro) return null;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-8 text-black relative"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      <header className="max-w-xl mx-auto">
        <Link
          to="/buscar"
          className="inline-block text-white font-bold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
          aria-label="Voltar para a página de busca"
        >
          &#8592; Voltar
        </Link>
      </header>

      <section className="max-w-xl mx-auto bg-white/90 p-6 rounded shadow mt-6" aria-labelledby="titulo-detalhes">
        <h1 id="titulo-detalhes" className="text-2xl font-bold mb-4">Detalhes da Instituição</h1>

        {erro ? (
          <p role="alert" className="text-red-700">
            <strong>Erro:</strong> {erro}
          </p>
        ) : (
          <>
            <dl className="space-y-2">
              <div>
                <dt className="font-semibold">Nome</dt>
                <dd>{empresa?.nomeEmpresarial ?? "—"}</dd>
              </div>

              <div>
                <dt className="font-semibold">CNPJ</dt>
                <dd>{formatCnpj(empresa?.ni) ?? "—"}</dd>
              </div>

              <div>
                <dt className="font-semibold">Telefone</dt>
                <dd>{empresa?.telefone ?? "—"}</dd>
              </div>

              <div>
                <dt className="font-semibold">Atividade Econômica</dt>
                <dd>{empresa?.cnaePrincipal?.descricao ?? "—"}</dd>
              </div>
            </dl>

            <div className="mt-3">
              <h2 className="font-semibold">Endereço</h2>
              <address className="not-italic">
                {empresa?.endereco?.logradouro ?? "—"}
                {empresa?.endereco?.numero ? `, ${empresa.endereco.numero}` : ""}
                {empresa?.endereco?.bairro ? ` — ${empresa.endereco.bairro}` : ""}
                {empresa?.endereco?.municipio ? ` — ${empresa.endereco.municipio}` : ""}
                {empresa?.endereco?.uf ? `/${empresa.endereco.uf}` : ""}
              </address>
            </div>

            <div className="mt-6">
              <Link to="/buscar" className="text-blue-700 underline">
                Voltar para a busca
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
