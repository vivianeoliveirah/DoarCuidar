import { useState } from "react";
import Button from "@/componentes/ui/Button";

export default function CampoSenha({
  id = "senha",
  value,
  onChange,
  placeholder = "Senha",
  required = true,
  className = "",
}) {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={mostrar ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-600 pr-24 ${className}`}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setMostrar(!mostrar)}
        className="absolute right-2 top-1.5"
        aria-pressed={mostrar}
        aria-controls={id}
        aria-label={mostrar ? "Ocultar senha" : "Mostrar senha"}
      >
        {mostrar ? "Ocultar" : "Mostrar"}
      </Button>
    </div>
  );
}
