import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoDoarCuidar.png";
import Button from "@/componentes/ui/Button";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-2 py-1 rounded hover:text-blue-700 ${isActive ? "font-semibold text-blue-700" : "text-gray-700"}`
      }
      end
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const logado = Boolean(localStorage.getItem("token"));

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  }

  return (
    <nav className="bg-gray-100 shadow-md py-3 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Logo DoarCuidar" className="h-10 w-auto" />
          <span className="font-bold text-xl text-gray-800">DoarCuidar</span>
        </Link>

        <div className="flex items-center gap-2">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/buscar">Buscar</NavItem>

          {!logado ? (
            <>
              <NavItem to="/cadastro">Cadastro</NavItem>
              <NavItem to="/login">Login</NavItem>
            </>
          ) : (
            <>
              <NavItem to="/perfil">Perfil</NavItem>
              <Button variant="ghost" size="sm" onClick={sair} aria-label="Sair da sessão">
                Sair
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
