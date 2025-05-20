// src/pages/BuscarInstituicoes.jsx
import { useState } from "react";
import Layout from "../componentes/layout/Layout";
import CardInstituicao from "../componentes/instituicoes/CardInstituicao";

export default function BuscarInstituicoes() {
  const [instituicoes, setInstituicoes] = useState([
    { nome: "Instituição A", estado: "SP", descricao: "Ajudando crianças em situação de risco." },
    { nome: "Instituição B", estado: "RJ", descricao: "Apoio a idosos em situação de vulnerabilidade." },
  ]);

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Buscar Instituições</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {instituicoes.map((inst, index) => (
            <CardInstituicao
              key={index}
              nome={inst.nome}
              estado={inst.estado}
              descricao={inst.descricao}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
