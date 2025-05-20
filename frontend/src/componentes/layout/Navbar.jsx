import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/LogoDoarCuidar.png";

export default function Navbar() {
  return (
    <nav className="bg-gray-100 shadow-md py-4 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <img src={Logo} alt="Logo DoarCuidar" className="h-10 mr-2" />
        <span className="font-bold text-xl text-gray-800">DoarCuidar</span>
      </Link>
      <div className="space-x-4">
        <Link to="/cadastro" className="text-gray-700 hover:text-blue-700">Cadastro</Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-700">Login</Link>
        <Link to="/buscar" className="text-gray-700 hover:text-blue-700">Buscar Instituições</Link>
        <Link to="/perfil" className="text-gray-700 hover:text-blue-700">Perfil</Link>
      </div>
    </nav>
  );
}
