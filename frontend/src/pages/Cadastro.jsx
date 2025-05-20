import React from "react";
import FormCadastro from "../componentes/auth/FormCadastro";
import Fundo from "../assets/fundo.png";

function Cadastro() {
  const handleCadastro = (dados) => {
    console.log("Dados de cadastro:", dados);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-8 bg-gray-200"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      <FormCadastro onSubmit={handleCadastro} />
    </div>
  );
}

export default Cadastro;

// src/pages/BuscarInstituicoes.jsx
import { useState } from 'react';

function BuscarInstituicoes() {
  const [palavraChave, setPalavraChave] = useState('');
  const [estado, setEstado] = useState('');
  const [instituicoes, setInstituicoes] = useState([]);

  const handleBuscar = async () => {
    const response = await fetch(
      `http://127.0.0.1:5000/buscar_instituicoes?palavra_chave=${palavraChave}&estado=${estado}`
    );
    const data = await response.json();
    setInstituicoes(data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Buscar Instituições</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Palavra-chave"
          value={palavraChave}
          onChange={e => setPalavraChave(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={e => setEstado(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleBuscar}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Buscar
        </button>
      </div>

      <ul className="space-y-4">
        {instituicoes.map((inst, idx) => (
          <li key={idx} className="p-4 border rounded bg-white shadow-sm">
            <h3 className="text-lg font-bold">{inst.nome}</h3>
            <p>CNPJ: {inst.cnpj}</p>
            <p>Estado: {inst.estado}</p>
            <p>Email: {inst.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}