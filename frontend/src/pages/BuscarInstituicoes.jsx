import { useState } from "react";
import Layout from "../componentes/layout/Layout";
import Fundo from "../assets/fundo.png";
import CardInstituicao from "../componentes/instituicoes/CardInstituicao";

export default function BuscarInstituicoes() {
  const [palavraChave, setPalavraChave] = useState("");
  const [estado, setEstado] = useState("");
  const [instituicoes, setInstituicoes] = useState([
    {
      nome: "Casa Solidária",
      cnpj: "00.000.000/0001-00",
      estado: "SP",
      email: "contato@casasolidaria.org",
    },
    {
      nome: "Ação Cidadã",
      cnpj: "11.111.111/0001-11",
      estado: "RJ",
      email: "contato@acaocidada.org",
    },
  ]);

  const handleBuscar = (e) => {
    e.preventDefault();
    // Aqui você poderia implementar a lógica de filtro local se desejar
  };

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
        style={{ backgroundImage: `url(${Fundo})` }}
      >
        <div className="max-w-5xl mx-auto bg-white/90 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Buscar Instituições
          </h2>

          <form onSubmit={handleBuscar} className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Palavra-chave"
              value={palavraChave}
              onChange={(e) => setPalavraChave(e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <input
              type="text"
              placeholder="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Buscar
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instituicoes.map((inst, idx) => (
              <CardInstituicao
                key={idx}
                nome={inst.nome}
                estado={inst.estado}
                descricao={`CNPJ: ${inst.cnpj} | Email: ${inst.email}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
