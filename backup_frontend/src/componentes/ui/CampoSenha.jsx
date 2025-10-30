import { useState } from "react";

export default function CampoSenha({
  id, label = "Senha", value, onChange,
  placeholder = "", required = true
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <label htmlFor={id} className="label">{label}</label>
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="input pr-24"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-700 text-sm"
        aria-controls={id}
        aria-pressed={show}
      >
        {show ? "Ocultar" : "Mostrar"}
      </button>
    </div>
  );
}
