// src/componentes/home/SearchSection.jsx
import { useId, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const UFs = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

const DEMO = [
  { id:"sp-1", nome:"Instituto Esperança", cnpj:"12.345.678/0001-90", uf:"SP", desc:"Apoio a famílias vulneráveis com alimentação e educação." },
  { id:"rj-1", nome:"Lar Solidário",       cnpj:"98.765.432/0001-10", uf:"RJ", desc:"Moradia assistida para idosos." },
  { id:"mg-1", nome:"Projeto Semeando",     cnpj:"23.456.789/0001-55", uf:"MG", desc:"Oficinas de tecnologia e reforço escolar." },
];

function onlyDigits(s=""){ return s.replace(/\D/g, ""); }

export default function SearchSection({
  compact = true,
  limit = 3,           // quantos cards demo mostrar
  showSeeAll = true,   // mostra o botão "Ver todas"
}) {
  const [q, setQ] = useState("");
  const [uf, setUf] = useState("");
  const idQ = useId();
  const idUf = useId();
  const navigate = useNavigate();

  // filtra os DEMO de acordo com os campos (para a Home já parecer “viva”)
  const demoFiltrado = useMemo(() => {
    const qDigits = onlyDigits(q);
    return DEMO.filter(i =>
      (!q || i.nome.toLowerCase().includes(q.toLowerCase()) || onlyDigits(i.cnpj).includes(qDigits)) &&
      (!uf || i.uf === uf)
    );
  }, [q, uf]);

  function onSubmit(e) {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (uf.trim()) sp.set("estado", uf.trim().toUpperCase());
    navigate(`/buscar?${sp.toString()}`);
  }

  const sectionPad = compact ? "py-6 md:py-8" : "py-12 md:py-16";

  return (
    <section id="buscar" className={sectionPad}>
      <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight">Buscar Instituições</h2>

      {/* Form */}
      <form onSubmit={onSubmit} className="mx-auto mt-6 max-w-3xl">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <label htmlFor={idQ} className="sr-only">Palavra-chave ou CNPJ</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"/>
            <input
              id={idQ}
              aria-label="Palavra-chave ou CNPJ"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Palavra-chave ou CNPJ (14 dígitos)"
              className="w-full rounded-2xl border border-slate-300 bg-white px-10 py-3 shadow-sm outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label htmlFor={idUf} className="sr-only">UF</label>
            <select
              id={idUf}
              aria-label="UF"
              value={uf}
              onChange={(e)=>setUf(e.target.value)}
              className="md:w-28 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-600"
            >
              <option value="">UF</option>
              {UFs.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          <button
            type="submit"
            className="rounded-2xl bg-emerald-600 px-6 py-3 text-white font-medium shadow-sm hover:bg-emerald-700"
          >
            Buscar
          </button>
        </div>
      </form>

      {/* Cards DEMO (Home) */}
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoFiltrado.slice(0, limit).map((it) => (
            <article
              key={it.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm
                         hover:shadow-md hover:border-slate-300 transition-[box-shadow,border-color]"
            >
              <h3 className="font-semibold leading-tight group-hover:text-emerald-700">{it.nome}</h3>
              <p className="text-xs text-slate-500">{it.uf} • CNPJ {it.cnpj}</p>
              <p className="mt-3 text-sm text-slate-600 line-clamp-3">{it.desc}</p>

              <div className="mt-4 flex gap-2">
                <Link
                  to="/detalhes"
                  state={{ cnpj: onlyDigits(it.cnpj), instituicao: it }}
                  className="rounded-xl px-3 py-2 text-sm bg-slate-900 text-white hover:bg-slate-800"
                >
                  Detalhes
                </Link>
                <Link
                  to={`/doar/${it.id}`}
                  className="rounded-xl px-3 py-2 text-sm bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Doar
                </Link>
              </div>
            </article>
          ))}
        </div>

        {showSeeAll && (
          <div className="mt-6 flex justify-center">
            <Link
              to="/buscar"
              className="inline-flex items-center rounded-xl border border-emerald-600 px-4 py-2
                         text-emerald-700 font-medium hover:bg-emerald-50"
            >
              Ver todas as instituições
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
