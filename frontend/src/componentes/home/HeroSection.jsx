import React from "react";
import Fundo from "../../assets/fundo.png";

export default function HeroSection() {
  return (
    <section
      className="h-auto py-16 px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      <div className="bg-white/90 rounded-xl shadow-md max-w-6xl mx-auto p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Bloco da esquerda - Texto principal */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-black mb-4">Bem-vindo ao DoarCuidar</h1>
          <p className="text-lg text-black mb-1">Encontre uma instituição para doar</p>
          <p className="text-sm text-gray-800 mb-2">
            Consulta CNPJ oficial registrado na Receita Federal do Brasil
          </p>
          <p className="text-red-600 font-semibold">
            Para pesquisar instituições, faça login ou crie uma conta.
          </p>
        </div>

        {/* Bloco da direita - Citação religiosa */}
        <div className="flex-1 bg-yellow-100 p-4 md:p-6 rounded-xl text-center text-gray-800 shadow-inner">
          <h2 className="font-semibold mb-2 text-sm text-gray-700">2ª SURATA AL BÁCARA - A VACA 215</h2>
          <p className="text-sm leading-relaxed">
            "Perguntam-te que parte devem gastar (em caridade). Dize-lhes:
            Toda a caridade que fizerdes, deve ser para os pais, parentes, órfãos, necessitados e viajantes (desamparados).
            E sabei que todo o bem que fizerdes, Allah dele tomará consciência."
          </p>
        </div>
      </div>
    </section>
  );
}
