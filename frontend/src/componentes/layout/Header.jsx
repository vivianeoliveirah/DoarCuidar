// src/componentes/layout/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/LogoDoarCuidar.png";

export default function Header() {
  return (
    <header className="bg-gray-100 py-4 px-6 shadow-md flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <img src={Logo} alt="Logo DoarCuidar" className="h-10 mr-2" />
        <span className="font-bold text-xl text-gray-800">DoarCuidar</span>
      </Link>
    </header>
  );
}
