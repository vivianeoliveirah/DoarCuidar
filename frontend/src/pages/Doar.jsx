// src/pages/Doar.jsx
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Layout from "@/componentes/layout/Layout";
import Fundo from "@/assets/fundo.png";
import FormDoacao from "@/componentes/instituicoes/FormDoacao";

// Mesmo conjunto de demonstração usado nas outras telas
const DEMO = [
  { id: "sp-1", nome: "Instituto Esperança", uf: "SP", cnpj: "12.345.678/0001-90", desc: "Apoio a famílias vulneráveis com alimentação e educação." },
  { id: "rj-1", nome: "Lar Solidário",       uf: "RJ", cnpj: "98.765.432/0001-10", desc: "Moradia assistida para idosos." },
  { id: "mg-1", nome: "Projeto Semeando",    uf: "MG", cnpj: "23.456.789/0001-55", desc: "Oficinas de tecnologia e reforço escolar." },
];

function onlyDigits(s = "") { return s.replace(/\D/g, ""); }

export default function Doar() {
  const { id } = useParams();                          // vem da URL
  const { state } = useLocation();                     // vem do Link (state.instituicao)
  const [instituicao, setInstituicao] = useState(state?.instituicao || null);
  const [erro, setErro] = useState("");

  // chave de comparação flexível: aceita tanto id quanto CNPJ sem pontuação
  const lookupKey = useMemo(() => (id ? id.toLowerCase() : ""), [id]);

  useEffect(() => {
    if (instituicao) return; // já recebemos via state

    (async () => {
      try {
        // tenta API apenas se devolver JSON
        const r = await fetch(`/api/instituicoes`);
        const ct = (r.headers.get("content-type") || "").toLowerCase();

        if (!ct.includes("application/json")) {
          throw new Error("API não retornou JSON (provavelmente HTML do dev server).");
        }

        const lista = await r.json();
        const achada =
          (lista || []).find((i) => {
            const keyId = String(i.id || "").toLowerCase();
            const keyCnpj = onlyDigits(i.cnpj || "");
            return keyId === lookupKey || keyCnpj === lookupKey;
          }) || null;

        if (!achada) throw new Error("Instituição não encontrada na API.");
        setInstituicao(achada);
      } catch (e) {
        // Fallback DEMO
        const achada =
          DEMO.find((i) => {
            const keyId = String(i.id || "").toLowerCase();
            const keyCnpj = onlyDigits(i.cnpj || "");
            return keyId === lookupKey || keyCnpj === lookupKey;
          }) || null;

        if (!achada) {
          setErro(String(e?.message || e) || "Falha ao carregar instituição.");
        } else {
          setInstituicao(achada);
        }
      }
    })();
  }, [instituicao, lookupKey]);

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
        style={{ backgroundImage: `url(${Fundo})` }}
      >
        <div className="max-w-xl mx-auto bg-white/90 p-6 rounded-3xl shadow-card ring-1 ring-slate-200">
          <h1 className="text-2xl font-bold mb-1 text-center">Fazer uma Doação</h1>
          <p className="text-center text-slate-600 mb-6">
            É rápido, seguro e faz diferença para quem precisa.
          </p>

          {!!erro && (
            <p className="text-rose-700 font-medium text-center">{erro}</p>
          )}

          {instituicao ? (
            <>
              <div className="mb-5 text-center">
                <p className="text-sm text-slate-500">
                  Você está doando para
                </p>
                <p className="text-lg font-semibold">
                  {instituicao.nome}
                </p>
                {instituicao.uf || instituicao.cnpj ? (
                  <p className="text-xs text-slate-500">
                    {instituicao.uf ? `${instituicao.uf}` : ""}{instituicao.uf && instituicao.cnpj ? " • " : ""}
                    {instituicao.cnpj ? `CNPJ ${instituicao.cnpj}` : ""}
                  </p>
                ) : null}
              </div>

              {/* Seu formulário de doação */}
              <FormDoacao donatarioId={instituicao.id || onlyDigits(instituicao.cnpj)} />
            </>
          ) : !erro ? (
            <p className="text-center text-slate-600">Carregando…</p>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
