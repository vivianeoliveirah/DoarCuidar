// src/componentes/ui/Botao.jsx
export default function Botao({ children, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}



