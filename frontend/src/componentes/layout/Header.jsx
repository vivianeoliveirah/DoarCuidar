import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, Search, UserRound, LogIn, UserPlus, LogOut, HeartHandshake } from "lucide-react";
import Logo from "../../assets/LogoDoarCuidar.png";
import Button from "@/componentes/ui/Button";

function NavItem({ to, icon: Icon, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-1.5 px-2 py-1 rounded hover:text-brand-700 ${
          isActive ? "font-semibold text-brand-700" : "text-gray-700"
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
    <header className="bg-gray-100 py-3 px-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2" onClick={close}>
          <img src={Logo} alt="Logo DoarCuidar" className="h-10 w-auto" />
          <span className="font-bold text-xl text-gray-800">DoarCuidar</span>
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

          {!logado ? (
            <>
              <NavItem to="/cadastro" icon={UserPlus}>Cadastro</NavItem>
              <NavItem to="/login" icon={LogIn}>Login</NavItem>
            </>
          ) : (
            <>
              <NavItem to="/perfil" icon={UserRound}>Perfil</NavItem>
              <Button variant="ghost" size="sm" onClick={sair} aria-label="Sair da sessão">
                <LogOut className="w-4 h-4 mr-1" aria-hidden />
                Sair
              </Button>
            </>
          )}

          <Link to="/buscar" className="ml-2">
            <Button size="sm">
              <HeartHandshake className="w-4 h-4 mr-1" aria-hidden />
              Doar agora
            </Button>
          </Link>
        </nav>
      </div>

      {/* Nav mobile */}
      {open && (
        <nav
          id={navId}
          className="md:hidden mt-3 border-t pt-3 space-y-2"
          aria-label="Navegação principal móvel"
        >
          <div className="flex flex-col px-2">
            <NavItem to="/" icon={Home} onClick={close}>Home</NavItem>
            <NavItem to="/buscar" icon={Search} onClick={close}>Buscar</NavItem>

            {!logado ? (
              <>
                <NavItem to="/cadastro" icon={UserPlus} onClick={close}>Cadastro</NavItem>
                <NavItem to="/login" icon={LogIn} onClick={close}>Login</NavItem>
              </>
            ) : (
              <>
                <NavItem to="/perfil" icon={UserRound} onClick={close}>Perfil</NavItem>
                <button
                  type="button"
                  onClick={sair}
                  className="flex items-center gap-1.5 px-2 py-1 text-gray-700 hover:text-brand-700"
                  aria-label="Sair da sessão"
                >
                  <LogOut className="w-4 h-4" aria-hidden />
                  Sair
                </button>
              </>
            )}

            <Link to="/buscar" onClick={close} className="mt-2 px-2">
              <Button size="sm" className="w-full">
                <HeartHandshake className="w-4 h-4 mr-1" aria-hidden />
                Doar agora
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
