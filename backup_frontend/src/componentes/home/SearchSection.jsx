import { useId, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

const UFs = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

const DEMO = [
  { id:"sp-1", nome:"Instituto Esperança", cnpj:"12.345.678/0001-90", uf:"SP", desc:"Apoio a famílias vulneráveis com alimentação e educação." },
  { id:"rj-1", nome:"Lar Solidário",       cnpj:"98.765.432/0001-10", uf:"RJ", desc:"Moradia assistida para idosos." },
  { id:"mg-1", nome:"Projeto Semeando",     cnpj:"23.456.789/0001-55", uf:"MG", desc:"Oficinas de tecnologia e reforço escolar." },
];

function onlyDigits(s=""){ return s.replace(/\D/g, ""); }

export default function SearchSection({ compact = true, limit = 3, showSeeAll = true }) {
  const [q, setQ] = useState("");
  const [uf, setUf] = useState("");
  const idQ = useId();
  const idUf = useId();
  const navigate = useNavigate();

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

  return (
    <section id="buscar" className={compact ? "py-6 md:py-8" : "py-12 md:py-16"}>
      <h2 className="text-center page-subtitle">Buscar Instituições</h2>

      {/* Form padrão (mesmo estilo global) */}
      <form onSubmit={onSubmit} className="mx-auto mt-6 max-w-3xl">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <label htmlFor={idQ} className="sr-only">Palavra-chave ou CNPJ</label>
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"/>
            <input
              id={idQ}
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Palavra-chave ou CNPJ (14 dígitos)"
              className="input pl-10"
              aria-label="Palavra-chave ou CNPJ"
            />
          </div>

          <div>
            <label htmlFor={idUf} className="sr-only">UF</label>
            <select
              id={idUf}
              value={uf}
              onChange={(e)=>setUf(e.target.value)}
              className="input md:w-28 w-full text-center"
              aria-label="UF"
            >
              <option value="">UF</option>
              {UFs.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          <button type="submit" className="btn-brand btn-md">Buscar</button>
        </div>
      </form>

      {/* Cards DEMO (3) */}
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoFiltrado.slice(0, limit).map((it) => (
            <article key={it.id} className="card p-5">
              <h3 className="font-semibold leading-tight">{it.nome}</h3>
              <p className="text-xs text-slate-500">{it.uf} • CNPJ {it.cnpj}</p>
              <p className="mt-3 text-sm text-slate-600 line-clamp-3">{it.desc}</p>

              <div className="mt-4 flex gap-2">
                <Link
                  to="/detalhes"
                  state={{ cnpj: onlyDigits(it.cnpj), instituicao: it }}
                  className="btn-dark btn-sm"
                >
                  Detalhes
                </Link>
                <Link
                  to={`/doar/${it.id}`}
                  state={{ instituicao: it }}
                  className="btn-brand btn-sm"
                >
                  Doar
                </Link>
              </div>
            </article>
          ))}
        </div>

        {showSeeAll && (
          <div className="mt-6 flex justify-center">
            <Link to="/buscar" className="btn-outline btn-md">
              Ver todas as instituições
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
