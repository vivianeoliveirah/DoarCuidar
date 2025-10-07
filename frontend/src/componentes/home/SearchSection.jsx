import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE = import.meta.env.VITE_API_URL ?? "";

export default function SearchSection() {
  const [keyword, setKeyword] = useState("");
  const [estado, setEstado] = useState("");
  const [ufs, setUfs] = useState([]);

  const navigate = useNavigate();
  const idKey = useId();
  const idUf = useId();

  // Carrega UFs do backend
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(`${BASE}/api/ufs`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        if (isMounted) setUfs(Array.isArray(json) ? json : []);
      } catch {
        if (isMounted) setUfs([]); // segue sem lista se falhar
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (estado.trim()) params.set("estado", estado.trim().toUpperCase());
    navigate(`/buscar?${params.toString()}`);
  };

  return (
    <section className="py-8 px-4 bg-gray-50" aria-labelledby="titulo-busca">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 id="titulo-busca" className="text-2xl font-bold mb-4 text-center">
          Buscar Instituições
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4"
          role="search"
          aria-label="Buscar instituições por nome/CNPJ e estado"
        >
          <div className="flex-1">
            <label htmlFor={idKey} className="sr-only">Palavra-chave ou CNPJ</label>
            <input
              id={idKey}
              type="text"
              placeholder="Palavra-chave ou CNPJ (14 dígitos)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border p-3 rounded-md w-full"
              aria-describedby="ajuda-keyword"
            />
            <p id="ajuda-keyword" className="text-xs text-gray-600 mt-1">
              Busque por parte do nome ou informe um CNPJ completo.
            </p>
          </div>

          <div className="w-full md:w-32">
            <label htmlFor={idUf} className="sr-only">Estado (UF)</label>
            <input
              id={idUf}
              type="text"
              list="lista-ufs-home"
              placeholder="UF"
              value={estado}
              onChange={(e) => setEstado(e.target.value.toUpperCase())}
              className="border p-3 rounded-md w-full text-center"
              maxLength={2}
            />
            <datalist id="lista-ufs-home">
              {ufs.map((u) => (
                <option key={u.sigla} value={u.sigla}>{u.nome}</option>
              ))}
            </datalist>
          </div>

          <button
            type="submit"
            className="bg-rose-600 text-white px-6 py-3 rounded-md hover:bg-rose-700 transition"
          >
            Buscar
          </button>
        </form>

        
        <p className="text-sm text-gray-700 mt-2 text-center">
          Após encontrar a instituição, você poderá fazer uma doação diretamente.
        </p>
      </div>
    </section>
  );
}
