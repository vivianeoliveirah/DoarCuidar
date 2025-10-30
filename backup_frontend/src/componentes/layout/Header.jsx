// src/componentes/layout/Header.jsx
import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Menu, X, Home, Search, UserRound, LogIn, UserPlus, LogOut, HeartHandshake, Heart
} from "lucide-react";

// --- Mini componente de item do menu
function NavItem({ to, icon: Icon, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-1.5 px-2 py-1 rounded hover:text-emerald-700 ${
          isActive ? "font-semibold text-emerald-700" : "text-gray-700"
        }`
      }
      end
    >
      {Icon ? <Icon className="w-4 h-4" aria-hidden /> : null}
      {children}
    </NavLink>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logado = Boolean(localStorage.getItem("token"));

  function close() { setOpen(false); }
  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
    setOpen(false);
  }

  const navId = "primary-navigation";

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-7xl h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo igual ao footer (ícone + texto) */}
        <Link to="/" onClick={close} className="flex items-center gap-2" aria-label="Página inicial">
          <span className="h-8 w-8 rounded-full bg-emerald-600 grid place-content-center shadow-sm">
            <Heart className="h-4 w-4 text-white" />
          </span>
          <span className="font-semibold tracking-tight">
            Doar<span className="text-emerald-600">Cuidar</span>
          </span>
        </Link>

        {/* Botão mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-200"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls={navId}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Navegação principal">
          <NavItem to="/" icon={Home}>Home</NavItem>
          <NavItem to="/buscar" icon={Search}>Buscar</NavItem>
          <NavItem to="/cadastro-usuario" icon={UserPlus}>Cadastro Usuário</NavItem>
          <NavItem to="/cadastro-instituicao" icon={UserPlus}>Cadastro Instituição</NavItem>

          {!logado ? (
            <NavItem to="/login" icon={LogIn}>Login</NavItem>
          ) : (
            <>
              <NavItem to="/perfil" icon={UserRound}>Perfil</NavItem>
              <button
                type="button"
                onClick={sair}
                className="flex items-center gap-1.5 px-2 py-1 text-gray-700 hover:text-emerald-700"
                aria-label="Sair da sessão"
              >
                <LogOut className="w-4 h-4" aria-hidden />
                Sair
              </button>
            </>
          )}

          {/* Botão Doar agora no tom emerald */}
          <Link to="/buscar" className="ml-2">
            <button
              type="button"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <HeartHandshake className="w-4 h-4 mr-1" aria-hidden />
              Doar agora
            </button>
          </Link>
        </nav>
      </div>

      {/* Nav mobile */}
      {open && (
        <nav
          id={navId}
          className="md:hidden mt-2 border-t pt-2 space-y-2"
          aria-label="Navegação principal móvel"
        >
          <div className="flex flex-col px-2">
            <NavItem to="/" icon={Home} onClick={close}>Home</NavItem>
            <NavItem to="/buscar" icon={Search} onClick={close}>Buscar</NavItem>
            <NavItem to="/cadastro-usuario" icon={UserPlus} onClick={close}>Cadastro Usuário</NavItem>
            <NavItem to="/cadastro-instituicao" icon={UserPlus} onClick={close}>Cadastro Instituição</NavItem>

            {!logado ? (
              <NavItem to="/login" icon={LogIn} onClick={close}>Login</NavItem>
            ) : (
              <>
                <NavItem to="/perfil" icon={UserRound} onClick={close}>Perfil</NavItem>
                <button
                  type="button"
                  onClick={sair}
                  className="flex items-center gap-1.5 px-2 py-1 text-gray-700 hover:text-emerald-700"
                  aria-label="Sair da sessão"
                >
                  <LogOut className="w-4 h-4" aria-hidden />
                  Sair
                </button>
              </>
            )}

            <Link to="/buscar" onClick={close} className="mt-2 px-2">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <HeartHandshake className="w-4 h-4 mr-1" aria-hidden />
                Doar agora
              </button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
