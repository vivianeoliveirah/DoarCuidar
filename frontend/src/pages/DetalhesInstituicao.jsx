import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "@/componentes/layout/Layout";
import FormCard from "@/componentes/ui/FormCard";

function cleanCnpj(v = "") { return String(v).replace(/\D/g, ""); }
function formatCnpj(v = "") {
  const s = cleanCnpj(v);
  if (s.length !== 14) return "—";
  return `${s.slice(0,2)}.${s.slice(2,5)}.${s.slice(5,8)}/${s.slice(8,12)}-${s.slice(12)}`;
}

export default function DetalhesInstituicao() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [instituicao, setInstituicao] = useState(state?.instituicao || null);
  const [erro, setErro] = useState(state?.erro || "");

  useEffect(() => {
    // se veio do state, já estamos prontos
    if (instituicao || erro) return;

    const cnpj = cleanCnpj(state?.cnpj);
    if (!cnpj) {
      navigate("/buscar", { replace: true, state: { aviso: "Selecione uma instituição para ver detalhes." } });
      return;
    }

    (async () => {
      try {
        const r = await fetch(`/api/instituicoes/${cnpj}`);
        const ct = r.headers.get("content-type") || "";
        if (!ct.includes("application/json")) throw new Error("A API não retornou JSON válido.");
        const js = await r.json();
        if (!r.ok) throw new Error(js?.erro || "Falha ao consultar instituição.");
        setInstituicao(js);
      } catch (e) {
        setErro(String(e?.message || e));
      }
    })();
  }, [state, instituicao, erro, navigate]);

  return (
    <Layout className="py-8">
      <FormCard
        title="Detalhes da Instituição"
        actions={
          <Link to="/buscar" className="btn-outline btn-sm" aria-label="Voltar para a busca">
            ← Voltar
          </Link>
        }
      >
        {erro ? (
          <div className="rounded-xl bg-red-50 text-red-800 border border-red-200 px-4 py-2 text-sm" role="alert">
            <strong>Erro:</strong> {erro}
          </div>
        ) : (
          <>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <dt className="label">Nome</dt>
                <dd className="text-slate-800">{instituicao?.nome ?? "—"}</dd>
              </div>
              <div>
                <dt className="label">CNPJ</dt>
                <dd className="text-slate-800">{formatCnpj(instituicao?.cnpj)}</dd>
              </div>
              <div>
                <dt className="label">Telefone</dt>
                <dd className="text-slate-800">{instituicao?.telefone || "—"}</dd>
              </div>
              <div>
                <dt className="label">Email</dt>
                <dd className="text-slate-800 break-all">{instituicao?.email || "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="label">Endereço</dt>
                <dd className="text-slate-800">
                  {instituicao?.endereco || "—"}
                  {instituicao?.cidade ? ` — ${instituicao.cidade}` : ""}
                  {instituicao?.estado ? `/${instituicao.estado}` : ""}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link to="/buscar" className="btn-dark btn-sm">Voltar para a busca</Link>
            </div>
          </>
        )}
      </FormCard>
    </Layout>
  );
}
