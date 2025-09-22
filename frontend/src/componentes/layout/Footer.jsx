import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/LogoDoarCuidar.png";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-6 mt-auto" role="contentinfo" aria-label="Rodapé">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col items-center gap-2 text-center">
        <Link to="/" className="flex items-center justify-center gap-2">
          <img src={Logo} alt="Logo DoarCuidar" className="h-8 w-auto" />
          <span className="font-bold text-brand-700">DoarCuidar</span>
        </Link>

        <p className="text-sm text-gray-700">
          Conectando solidariedade com quem mais precisa.
        </p>

        <nav aria-label="Links do rodapé" className="flex gap-4 text-sm">
          <Link to="/buscar" className="text-gray-700 hover:text-brand-700">Buscar</Link>
          <Link to="/cadastro" className="text-gray-700 hover:text-brand-700">Cadastro</Link>
          <Link to="/login" className="text-gray-700 hover:text-brand-700">Login</Link>
        </nav>

        <small className="text-xs text-gray-500 mt-1">
          © {ano} DoarCuidar. Todos os direitos reservados.
        </small>
      </div>
    </footer>
  );
}
