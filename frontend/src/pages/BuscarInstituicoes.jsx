// src/pages/BuscarInstituicoes.jsx
import { useEffect, useId, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/componentes/layout/Layout";
import Fundo from "@/assets/fundo.png";
import { Search as SearchIcon } from "lucide-react";

const USE_DEMO = import.meta.env.VITE_USE_DEMO === "true";
const BASE = import.meta.env.VITE_API_URL ?? "";

// ----- DEMO (os mesmos 3 da Home)
const DEMO = [
  {
    id: "sp-1",
    nome: "Instituto Esperança",
    cnpj: "12.345.678/0001-90",
    uf: "SP",
    desc: "Apoio a famílias vulneráveis com alimentação e educação.",
  },
  {
    id: "rj-1",
    nome: "Lar Solidário",
    cnpj: "98.765.432/0001-10",
    uf: "RJ",
    desc: "Moradia assistida para idosos.",
  },
  {
    id: "mg-1",
    nome: "Projeto Semeando",
    cnpj: "23.456.789/0001-55",
    uf: "MG",
    desc: "Oficinas de tecnologia e reforço escolar.",
  },
];

const UFs = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"
];

function onlyDigits(s = "") {
  return s.replace(/\D/g, "");
}

export default function BuscarInstituicoes() {
  const [params, setParams] = useSearchParams();

  // estado dos campos
  const [q, setQ] = useState(params.get("q") ?? "");
  const [uf, setUf] = useState((params.get("estado") ?? "").toUpperCase());

  // dados/carregamento
  const [items, setItems] = useState(DEMO);       // começa mostrando DEMO
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [usingDemo, setUsingDemo] = useState(true);

  // ids acessíveis
  const idKey = useId();
  const idUf = useId();

  // filtra demo localmente (quando o usuário digita antes de buscar)
  const filteredDemo = useMemo(() => {
    const qDigits = onlyDigits(q);
    return DEMO.filter(
      (i) =>
        (!q ||
          i.nome.toLowerCase().includes(q.toLowerCase()) ||
          onlyDigits(i.cnpj).includes(qDigits)) &&
        (!uf || i.uf === uf.toUpperCase())
    );
  }, [q, uf]);

  // quando há query string (/buscar?q=..&estado=..), tenta carregar da API
  useEffect(() => {
    const hasParams = params.get("q") || params.get("estado");
    if (!hasParams) return;

    (async () => {
      await carregar(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  async function carregar(fromParams = false) {
    setLoading(true);
    setErro("");

    try {
      if (USE_DEMO) throw new Error("DEMO");

      // monta query
      const sp = new URLSearchParams();
      const _q = fromParams ? params.get("q") ?? "" : q;
      const _uf = (fromParams ? params.get("estado") ?? "" : uf).toUpperCase();

      if (_q.trim()) sp.set("q", _q.trim());
      if (_uf.trim()) sp.set("estado", _uf.trim());

      const r = await fetch(`${BASE}/api/instituicoes?${sp.toString()}`);
      const ct = r.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        const preview = (await r.text()).slice(0, 120);
        throw new Error("Resposta não-JSON da API. Prévia: " + preview);
      }
      const json = await r.json();

      setItems(Array.isArray(json) && json.length ? json : []);
      setUsingDemo(false);
    } catch (e) {
      // fallback: mostra DEMO filtrado
      setItems(filteredDemo);
      setUsingDemo(true);
      const msg = String(e?.message || e);
      if (msg !== "DEMO") setErro(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleBuscar(e) {
    e.preventDefault();
    const s = new URLSearchParams();
    if (q.trim()) s.set("q", q.trim());
    if (uf.trim()) s.set("estado", uf.trim().toUpperCase());
    setParams(s);      // sincroniza URL
    carregar();        // tenta API; se falhar, deixa DEMO
  }

  return (
    <Layout className="py-8">
      {/* BG com imagem + véu/gradiente, combinando com a Home */}
      <section className="relative rounded-3xl overflow-hidden" aria-labelledby="titulo-buscar">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${Fundo})` }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/85 to-slate-50/90 backdrop-blur-[2px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
          {/* Card container */}
          <div className="rounded-3xl bg-white/90 ring-1 ring-slate-200 shadow-xl p-6 md:p-7">
            <header className="text-center">
              <h1 id="titulo-buscar" className="text-2xl md:text-3xl font-semibold tracking-tight">
                Buscar Instituições
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Use CNPJ completo ou filtre por UF. Resultados confiáveis e transparentes.
              </p>
            </header>

            {/* Form */}
            <form
              onSubmit={handleBuscar}
              className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_120px_auto] gap-3"
              role="search"
              aria-label="Buscar instituições por CNPJ e UF"
            >
              <div className="relative">
                <label htmlFor={idKey} className="sr-only">
                  Palavra-chave ou CNPJ
                </label>
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <SearchIcon className="h-4 w-4" />
                </span>
                <input
                  id={idKey}
                  type="text"
                  placeholder="Palavra-chave ou CNPJ (14 dígitos)"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label htmlFor={idUf} className="sr-only">
                  UF
                </label>
                <select
                  id={idUf}
                  value={uf}
                  onChange={(e) => setUf(e.target.value.toUpperCase())}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="">UF</option>
                  {UFs.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-white font-medium shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Buscar
              </button>
            </form>

            {/* Badges/Estados */}
            <div className="mt-4 space-y-2">
              {usingDemo && (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-sm">
                  <span className="font-medium">Modo demonstração</span>
                  <span className="text-emerald-800/80">mostrando dados fictícios</span>
                </span>
              )}
              {loading && (
                <p role="status" aria-live="polite" className="text-slate-700">
                  Carregando…
                </p>
              )}
              {!!erro && (
                <p role="alert" className="text-rose-700">
                  Erro ao carregar: {erro}
                </p>
              )}
              {!loading && !items.length && (
                <p className="text-slate-700">Nenhuma instituição encontrada.</p>
              )}
            </div>

            {/* Lista de cartões (iguais aos da Home) */}
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((it, i) => (
                <article
                  key={(it.id ?? it.cnpj) + i}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm
                             hover:shadow-md hover:border-slate-300 transition-[box-shadow,border-color]"
                >
                  <h3 className="font-semibold leading-tight group-hover:text-emerald-700">
                    {it.nome}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {(it.uf || it.estado) ?? "—"} • CNPJ {it.cnpj}
                  </p>
                  {it.desc ? (
                    <p className="mt-3 text-sm text-slate-600 line-clamp-3">{it.desc}</p>
                  ) : null}

                  <div className="mt-4 flex gap-2">
                    <Link
                      to="/detalhes"
                      state={{ cnpj: onlyDigits(it.cnpj), instituicao: it }}
                      className="rounded-xl px-3 py-2 text-sm bg-slate-900 text-white hover:bg-slate-800"
                    >
                      Detalhes
                    </Link>
                    <Link
                      to={`/doar/${it.id ?? onlyDigits(it.cnpj)}`}
                      className="rounded-xl px-3 py-2 text-sm bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      Doar
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
