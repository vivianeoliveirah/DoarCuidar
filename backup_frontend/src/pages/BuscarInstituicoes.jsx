import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/componentes/layout/Layout";
import { Search as SearchIcon } from "lucide-react";

// DEMO estável (os 3 cards que você queria)
const DEMO = [
  { id:"sp-1", nome:"Instituto Esperança", cnpj:"12.345.678/0001-90", uf:"SP", desc:"Apoio a famílias vulneráveis com alimentação e educação." },
  { id:"rj-1", nome:"Lar Solidário",       cnpj:"98.765.432/0001-10", uf:"RJ", desc:"Moradia assistida para idosos." },
  { id:"mg-1", nome:"Projeto Semeando",     cnpj:"23.456.789/0001-55", uf:"MG", desc:"Oficinas de tecnologia e reforço escolar." },
];

const UFs = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];
const BASE = import.meta.env.VITE_API_URL ?? "";

function onlyDigits(s=""){ return s.replace(/\D/g,""); }

export default function BuscarInstituicoes() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [uf, setUf] = useState(params.get("estado") ?? "");

  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | ok | empty | error
  const [erro, setErro] = useState("");
  const [demo, setDemo] = useState(false);

  // filtra DEMO localmente para fallback imediato
  const demoFiltrado = useMemo(() => {
    const qd = onlyDigits(q);
    return DEMO.filter(i =>
      (!q || i.nome.toLowerCase().includes(q.toLowerCase()) || onlyDigits(i.cnpj).includes(qd)) &&
      (!uf || i.uf === uf.toUpperCase())
    );
  }, [q, uf]);

  async function carregar() {
    setStatus("loading");
    setErro("");
    setDemo(false);

    try {
      const sp = new URLSearchParams();
      if (q.trim()) sp.set("q", q.trim());
      if (uf.trim()) sp.set("estado", uf.trim().toUpperCase());

      const r = await fetch(`${BASE}/api/instituicoes?${sp.toString()}`);
      const ct = r.headers.get("content-type") || "";
      // evita o erro "Unexpected token '<'"
      if (!ct.includes("application/json")) throw new Error("A API não retornou JSON válido (verifique proxy/URL).");
      const js = await r.json();
      if (!Array.isArray(js)) throw new Error("Formato inesperado da API.");
      setData(js);
      setStatus(js.length ? "ok" : "empty");
    } catch (e) {
      // fallback: usa os DEMO, mas exibe aviso
      setData(demoFiltrado);
      setStatus(demoFiltrado.length ? "ok" : "empty");
      setDemo(true);
      setErro(String(e?.message || e));
    }
  }

  // sincroniza URL -> estado e busca
  useEffect(() => {
    const pq = params.get("q") ?? "";
    const pe = params.get("estado") ?? "";
    setQ(pq);
    setUf(pe);
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function handleBuscar(e) {
    e.preventDefault();
    const s = new URLSearchParams();
    if (q.trim()) s.set("q", q.trim());
    if (uf.trim()) s.set("estado", uf.trim().toUpperCase());
    setParams(s);
  }

  return (
    <Layout className="py-8">
      <section className="form-card mx-auto max-w-6xl">
        <header className="text-center mb-6">
          <h1 className="page-title">Buscar Instituições</h1>
          <p className="mt-1 text-slate-600">
            Use CNPJ completo ou filtre por UF. Resultados confiáveis e transparentes.
          </p>
        </header>

        {/* FORM padrão */}
        <form onSubmit={handleBuscar} className="grid grid-cols-1 md:grid-cols-[1fr_140px_auto] gap-3">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              className="input pl-9"
              placeholder="Palavra-chave ou CNPJ (14 dígitos)"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              aria-label="Palavra-chave ou CNPJ"
            />
          </div>

          <select
            className="input text-center"
            aria-label="UF"
            value={uf}
            onChange={(e)=>setUf(e.target.value)}
          >
            <option value="">UF</option>
            {UFs.map(u => <option key={u} value={u}>{u}</option>)}
          </select>

          <button type="submit" className="btn-brand btn-md">Buscar</button>
        </form>

        {/* Estados/avisos */}
        <div className="mt-4 space-y-2">
          {demo && (
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 text-brand-800 px-3 py-1 text-xs">
              <strong className="font-medium">Modo demonstração</strong>
              <span className="opacity-80">mostrando dados fictícios</span>
            </span>
          )}
          {erro && (
            <div className="rounded-xl bg-red-50 text-red-800 border border-red-200 px-4 py-2 text-sm" role="alert">
              {erro}
            </div>
          )}
          {status === "loading" && <p className="text-slate-700">Carregando…</p>}
          {status === "empty" && <p className="text-slate-700">Nenhuma instituição encontrada.</p>}
        </div>

        {/* Lista */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((it, i) => (
            <article key={(it.id ?? it.cnpj)+i} className="card p-5">
              <h3 className="font-semibold leading-tight">{it.nome}</h3>
              <p className="text-xs text-slate-500">{(it.uf || it.estado || "").toString().toUpperCase()} • CNPJ {it.cnpj}</p>
              {it.desc ? <p className="mt-3 text-sm text-slate-600 line-clamp-3">{it.desc}</p> : null}

              <div className="mt-4 flex gap-2">
                <Link
                  to="/detalhes"
                  state={{ cnpj: onlyDigits(it.cnpj), instituicao: it }}
                  className="btn-dark btn-sm"
                >
                  Detalhes
                </Link>
                <Link
                  to={`/doar/${it.id ?? onlyDigits(it.cnpj)}`}
                  state={{ instituicao: it }}
                  className="btn-brand btn-sm"
                >
                  Doar
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
