import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchSection() {
  const [keyword, setKeyword] = useState("");
  const [estado, setEstado] = useState("");
  const navigate = useNavigate();
  const idKey = useId();
  const idUf = useId();

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

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4" role="search" aria-label="Buscar instituições por nome e estado">
          <div className="flex-1">
            <label htmlFor={idKey} className="sr-only">Palavra-chave</label>
            <input
              id={idKey}
              type="text"
              placeholder="Palavra-chave (ex.: caridade)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border p-3 rounded-md w-full"
              aria-describedby="ajuda-keyword"
            />
            <p id="ajuda-keyword" className="text-xs text-gray-600 mt-1">Use parte do nome da instituição.</p>
          </div>

          <div className="w-full md:w-28">
            <label htmlFor={idUf} className="sr-only">Estado (UF)</label>
            <input
              id={idUf}
              type="text"
              placeholder="UF"
              value={estado}
              onChange={(e) => setEstado(e.target.value.toUpperCase())}
              className="border p-3 rounded-md w-full text-center"
              inputMode="text"
              maxLength={2}
            />
          </div>

          <button
            type="submit"
            className="bg-rose-600 text-white px-6 py-3 rounded-md hover:bg-rose-700 transition"
          >
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
}
