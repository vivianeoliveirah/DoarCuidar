// src/pages/BuscarInstituicoes.jsx
import { useEffect, useId, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/componentes/layout/Layout";
import Fundo from "@/assets/fundo.png";
import ListaInstituicoes from "@/componentes/instituicoes/ListaInstituicoes";
import Button from "@/componentes/ui/Button";

const DEMO = [
  { id: 1, nome: "Casa Solidária", estado: "SP", cnpj: "00.000.000/0001-00", email: "contato@casasolidaria.org" },
  { id: 2, nome: "Ação Cidadã",    estado: "RJ", cnpj: "11.111.111/0001-11", email: "contato@acaocidada.org" },
  { id: 3, nome: "Amparo Feliz",   estado: "SP", cnpj: "22.222.222/0001-22" },
];

const USE_DEMO = import.meta.env.VITE_USE_DEMO === "true";
const BASE = import.meta.env.VITE_API_URL ?? ""; // com proxy do Vite, pode ficar vazio

export default function BuscarInstituicoes() {
  const [params, setParams] = useSearchParams();

  const [q, setQ] = useState(params.get("q") ?? "");
  const [estado, setEstado] = useState(params.get("estado") ?? "");

  const [ufs, setUfs] = useState([]);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle"); // idle|loading|ok|empty|error
  const [erro, setErro] = useState("");
  const [demo, setDemo] = useState(false);

  const idKey = useId();
  const idUf  = useId();

  // carrega UFs ao montar
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${BASE}/api/ufs`);
        if (r.ok) setUfs(await r.json());
      } catch {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function carregar() {
    setStatus("loading");
    setErro("");

    try {
      if (USE_DEMO) throw new Error("DEMO");

      const sp = new URLSearchParams();
      if (q.trim()) sp.set("q", q.trim());
      if (estado.trim()) sp.set("estado", estado.trim().toUpperCase());

      const r = await fetch(`${BASE}/api/instituicoes?${sp.toString()}`);
      const json = await r.json();
      if (!r.ok) throw new Error(json?.erro || `HTTP ${r.status}`);

      setData(json);
      setStatus(json.length ? "ok" : "empty");
      setDemo(false);
    } catch (e) {
      // fallback: dados DEMO (útil para apresentação)
      const result = DEMO.filter((i) =>
        (!q || i.nome.toLowerCase().includes(q.toLowerCase())) &&
        (!estado || i.estado === estado.toUpperCase())
      );

      setData(result);
      setStatus(result.length ? "ok" : "empty");
      setDemo(true);

      const msg = String(e?.message || e);
      if (msg !== "DEMO") setErro(msg);
    }
  }

  // sincroniza com a URL e dispara busca quando /buscar?...
  useEffect(() => {
    setQ(params.get("q") ?? "");
    setEstado(params.get("estado") ?? "");
    if (params.size) carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function handleBuscar(e) {
    e.preventDefault();
    const s = new URLSearchParams();
    if (q.trim()) s.set("q", q.trim());
    if (estado.trim()) s.set("estado", estado.trim().toUpperCase());
    setParams(s); // dispara useEffect -> carregar()
  }

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
        style={{ backgroundImage: `url(${Fundo})` }}
      >
        <div className="max-w-6xl mx-auto bg-white/90 p-6 rounded-2xl shadow-card">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Buscar Instituições
          </h1>

          <form
            onSubmit={handleBuscar}
            className="flex flex-col md:flex-row gap-4 mb-6"
            role="search"
            aria-label="Buscar instituições por CNPJ e UF"
          >
            <div className="flex-1">
              <label htmlFor={idKey} className="sr-only">CNPJ</label>
              <input
                id={idKey}
                type="text"
                placeholder="CNPJ (apenas números)"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="border p-3 rounded w-full"
              />
            </div>

            <div className="w-full md:w-36">
              <label htmlFor={idUf} className="sr-only">Estado (UF)</label>
              <input
                id={idUf}
                type="text"
                list="lista-ufs"
                placeholder="UF"
                value={estado}
                onChange={(e) => setEstado(e.target.value.toUpperCase())}
                className="border p-3 rounded w-full text-center"
                maxLength={2}
              />
              <datalist id="lista-ufs">
                {ufs.map((u) => (
                  <option key={u.sigla} value={u.sigla}>{u.nome}</option>
                ))}
              </datalist>
            </div>

            <Button type="submit">Buscar</Button>
          </form>

          {demo && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm">
              <span className="font-semibold">Modo demonstração</span>
              <span>mostrando dados fictícios</span>
            </div>
          )}

          {status === "loading" && (
            <p role="status" aria-live="polite" className="text-gray-700">Carregando…</p>
          )}

          {!!erro && (
            <p role="alert" className="text-red-700 mt-2">
              Erro ao carregar: {erro}
            </p>
          )}

          {status === "empty" && (
            <p className="text-gray-700">Nenhuma instituição encontrada.</p>
          )}

          <div className="mt-4">
            <ListaInstituicoes itens={data} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
