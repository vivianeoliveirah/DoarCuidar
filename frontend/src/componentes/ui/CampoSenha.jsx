// src/componentes/ui/CampoSenha.jsx
import { useState } from "react";

export default function CampoSenha({ value, onChange }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="relative mb-4">
      <input
        type={mostrarSenha ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="border p-3 rounded w-full"
        required
      />
      <button
        type="button"
        onClick={() => setMostrarSenha(!mostrarSenha)}
        className="absolute right-3 top-3 text-blue-600 hover:underline text-sm"
      >
        {mostrarSenha ? "Ocultar" : "Mostrar"}
      </button>
    </div>
  );
}
