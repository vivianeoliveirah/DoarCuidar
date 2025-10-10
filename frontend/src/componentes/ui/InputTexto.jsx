import { useId } from "react";

export default function InputTexto({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  className = "",
  ...rest
}) {
  const autoId = useId();
  const inputId = id || `${name || "input"}-${autoId}`;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-label={label || placeholder}
        className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-600 ${className}`}
        {...rest}
      />
    </div>
  );
}
