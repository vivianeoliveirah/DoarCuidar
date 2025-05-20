// src/componentes/layout/HeroSection.jsx
import React from "react";
import Logo from "../../assets/LogoDoarCuidar.png";
import Fundo from "../../assets/fundo.png";

export default function HeroSection() {
  return (
    <div
      className="flex flex-col justify-between min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      <div className="flex flex-col justify-center items-center flex-grow py-12">
        <div className="bg-white/90 rounded-xl shadow-md max-w-4xl w-full mx-4 p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-blue-700 mb-4">Bem-vindo ao DoarCuidar</h1>
            <p className="text-lg text-gray-800 mb-2">
              Encontre uma instituição para doar
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Consulta CNPJ oficial registrado na Receita Federal do Brasil
            </p>
            <p className="text-red-600 font-semibold">
              Para pesquisar instituições, faça login ou crie uma conta.
            </p>
          </div>

          <div className="flex-1 flex justify-center">
            <img src={Logo} alt="Logo da Empresa" className="h-40 w-auto" />
          </div>
        </div>
      </div>

      <footer className="w-full bg-gray-100 py-4 text-center text-sm text-gray-600">
        © 2025 DoarCuidar. Todos os direitos reservados.
      </footer>
    </div>
  );
}
