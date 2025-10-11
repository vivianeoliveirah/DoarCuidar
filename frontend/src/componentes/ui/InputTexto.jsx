import { useId } from "react";

export default function InputTexto({
  label, name, id, type = "text",
  value, onChange, placeholder = "", required = false, className = "", ...rest
}) {
  const auto = useId();
  const inputId = id || `${name || "input"}-${auto}`;
  return (
    <div>
      {label && <label htmlFor={inputId} className="label">{label}</label>}
      <input
        id={inputId} name={name} type={type}
        value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className={`input ${className}`} {...rest}
      />
    </div>
  );
}
