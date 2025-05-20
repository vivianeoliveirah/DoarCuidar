import { useState } from "react";

export default function SearchSection() {
  const [keyword, setKeyword] = useState("");
  const [estado, setEstado] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Buscar Instituições</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Palavra-chave (ex: caridade)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border p-3 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Estado (ex: SP)"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="border p-3 rounded-md w-full"
          />
          <button
            type="submit"
            className="bg-rose-600 text-white px-6 py-3 rounded-md hover:bg-rose-700 transition"
          >
            Buscar Instituições
          </button>
        </form>
      </div>
    </section>
  );
}
