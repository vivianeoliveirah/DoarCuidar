import { useNavigate } from "react-router-dom";
import { Building2, MapPin, Mail, Phone } from "lucide-react";
import Button from "@/componentes/ui/Button";
import InfoItem from "@/componentes/ui/InfoItem";

export default function CardInstituicao({ nome, estado, descricao, cnpj, email, telefone }) {
  const navigate = useNavigate();

  function irParaDetalhes() {
    const empresaFake = {
      nomeEmpresarial: nome,
      ni: cnpj ?? "00.000.000/0000-00",
      telefone: telefone ?? "(11) 0000-0000",
      cnaePrincipal: { descricao: "Atividade Exemplo" },
      endereco: { logradouro: "Rua Exemplo", numero: "123", uf: estado },
      email: email ?? "",
    };
    navigate("/detalhes", { state: { empresa: empresaFake } });
  }

  return (
    <article className="border border-gray-100 rounded-2xl p-4 shadow-card hover:shadow-lg transition bg-white">
      {/* Cabeçalho */}
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-brand-50 text-brand-700">
          <Building2 className="w-5 h-5" aria-hidden />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{nome}</h3>
          <p className="text-sm text-gray-600">{descricao}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-4 space-y-1">
        <InfoItem icon={MapPin}>{estado ?? "—"}</InfoItem>
        {email && <InfoItem icon={Mail}>{email}</InfoItem>}
        {telefone && <InfoItem icon={Phone}>{telefone}</InfoItem>}
      </div>

      {/* Ação */}
      <div className="mt-4">
        <Button onClick={irParaDetalhes} aria-label={`Ver mais detalhes de ${nome}`}>
          Ver mais
        </Button>
      </div>
    </article>
  );
}
