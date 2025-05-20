// src/componentes/instituicoes/CardInstituicao.jsx
export default function CardInstituicao({ nome, estado, descricao }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h2 className="text-lg font-bold mb-1">{nome}</h2>
      <p className="text-sm text-gray-600 mb-2">{estado}</p>
      <p className="text-gray-700">{descricao}</p>
    </div>
  );
}
