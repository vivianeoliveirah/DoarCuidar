import { Heart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a className="flex items-center gap-2" href="/">
          <div className="h-9 w-9 rounded-full bg-emerald-600 grid place-content-center shadow-sm">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold tracking-tight">Doar<span className="text-emerald-600">Cuidar</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="/buscar" className="hover:text-emerald-700">Buscar</a>
          <a href="/cadastro-instituicao" className="hover:text-emerald-700">Cadastrar instituição</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-sm hover:text-emerald-700">Login</a>
          <a href="/doar" className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700">
            Doar agora
          </a>
        </div>
      </div>
    </header>
  );
}
