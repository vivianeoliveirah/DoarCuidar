import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/90">
      <div className="container-p py-4 text-sm text-slate-600
                      flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-emerald-600 grid place-content-center text-white">
            <Heart className="h-4 w-4" />
          </div>
          <span className="font-semibold tracking-tight">
            Doar<span className="text-emerald-600">Cuidar</span>
          </span>
        </div>
        <p>© 2025 DoarCuidar. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
