import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/LogoDoarCuidar.png";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4 text-center">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          <img src={Logo} alt="Logo DoarCuidar" className="h-8 mr-2" />
          <span className="font-bold text-blue-700">DoarCuidar</span>
        </div>
        <p className="text-sm text-gray-600">Conectando solidariedade com quem mais precisa.</p>
        <p className="text-xs text-gray-500 mt-2">© 2025 DoarCuidar. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
