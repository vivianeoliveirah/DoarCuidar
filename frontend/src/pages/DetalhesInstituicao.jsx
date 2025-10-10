import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Fundo from "@/assets/fundo.png";

function cleanCnpj(v){ return String(v||"").replace(/\D/g,""); }
function formatCnpj(v){
  const s = cleanCnpj(v);
  if (s.length !== 14) return v ?? "—";
  return `${s.slice(0,2)}.${s.slice(2,5)}.${s.slice(5,8)}/${s.slice(8,12)}-${s.slice(12)}`;
}

export default function DetalhesInstituicao() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [instituicao, setInstituicao] = useState(state?.instituicao || null);
  const [erro, setErro] = useState(state?.erro || "");

  useEffect(() => {
    const cnpj = cleanCnpj(state?.cnpj || instituicao?.cnpj);
    if (!instituicao && !erro && cnpj) {
      (async () => {
        try {
          const r = await fetch(`/api/instituicoes/${cnpj}`);
          const js = await r.json();
          if (!r.ok) throw new Error(js?.erro || "Falha ao consultar instituição");
          setInstituicao(js);
        } catch (e) {
          setErro(String(e.message));
        }
      })();
    }
    if (!instituicao && !erro && !cnpj) {
      navigate("/buscar", { replace: true, state: { aviso: "Selecione uma instituição para ver detalhes." } });
    }
  }, [state, instituicao, erro, navigate]);

  if (!instituicao && !erro) return null;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-slate-100/85 backdrop-blur-[2px]" />

      <div className="relative max-w-3xl mx-auto px-4 py-8">
        <div className="mb-4">
          <Link
            to="/buscar"
            className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-emerald-700"
          >
            ← Voltar
          </Link>
        </div>

        <section className="bg-white/85 backdrop-blur-md p-6 rounded-3xl shadow-2xl ring-1 ring-slate-200">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Detalhes da Instituição</h1>

          {erro ? (
            <p role="alert" className="text-rose-700"><strong>Erro:</strong> {erro}</p>
          ) : (
            <>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="font-semibold text-slate-700">Nome</dt>
                  <dd>{instituicao?.nome ?? "—"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">CNPJ</dt>
                  <dd>{formatCnpj(instituicao?.cnpj)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Telefone</dt>
                  <dd>{instituicao?.telefone ?? "—"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Email</dt>
                  <dd>{instituicao?.email ?? "—"}</dd>
                </div>
              </dl>

              <div className="mt-4">
                <h2 className="font-semibold text-slate-700">Endereço</h2>
                <address className="not-italic text-slate-800">
                  {instituicao?.endereco ?? "—"}
                  {instituicao?.cidade ? ` — ${instituicao.cidade}` : ""}
                  {instituicao?.estado ? `/${instituicao.estado}` : ""}
                </address>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/buscar"
                  className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-emerald-700"
                >
                  ← Voltar para a busca
                </Link>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium hover:bg-slate-50"
                >
                  Voltar ao topo
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
