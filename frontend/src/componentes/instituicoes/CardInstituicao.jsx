import { useNavigate } from "react-router-dom";

export default function CardInstituicao({ nome, estado, descricao }) {
  const navigate = useNavigate();

  const handleVerMais = () => {
    const empresaFake = {
      nomeEmpresarial: nome,
      ni: "00.000.000/0000-00",
      telefone: "(11) 0000-0000",
      cnaePrincipal: { descricao: "Atividade Exemplo" },
      endereco: { logradouro: "Rua Exemplo", numero: "123" },
    };

    navigate("/detalhes", { state: { empresa: empresaFake } });
  };

  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h2 className="text-lg font-bold mb-1">{nome}</h2>
      <p className="text-sm text-gray-600 mb-2">{estado}</p>
      <p className="text-gray-700 mb-4">{descricao}</p>
      <button
        onClick={handleVerMais}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Ver mais
      </button>
    </div>
  );
}
