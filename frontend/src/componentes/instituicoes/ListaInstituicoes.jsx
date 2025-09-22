import CardInstituicao from "./CardInstituicao";

export default function ListaInstituicoes({ itens = [] }) {
  if (!itens.length) {
    return <p className="text-gray-700">Nenhuma instituição encontrada.</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {itens.map((i) => (
        <CardInstituicao
          key={i.id ?? `${i.nome}-${i.cnpj ?? ""}`}
          nome={i.nome}
          estado={i.estado}
          descricao={`CNPJ: ${i.cnpj ?? "—"}`}
          email={i.email}
          telefone={i.telefone}
          cnpj={i.cnpj}
        />
      ))}
    </div>
  );
}
