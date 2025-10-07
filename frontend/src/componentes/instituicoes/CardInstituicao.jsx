import { useNavigate, Link } from "react-router-dom";
import { Building2, MapPin, Mail, Phone, Heart } from "lucide-react";
import Button from "@/componentes/ui/Button";
import InfoItem from "@/componentes/ui/InfoItem";

function formatCnpj(v) {
  const s = String(v || "").replace(/\D/g, "");
  if (s.length !== 14) return v ?? "—";
  return `${s.slice(0,2)}.${s.slice(2,5)}.${s.slice(5,8)}/${s.slice(8,12)}-${s.slice(12)}`;
}
function cleanCnpj(v) {
  return String(v || "").replace(/\D/g, "");
}

export default function CardInstituicao({ nome, estado, descricao, cnpj, email, telefone, id }) {
  const navigate = useNavigate();
  const cnpjFmt = formatCnpj(cnpj);
  const cnpjRaw = cleanCnpj(cnpj);

  function irParaDetalhes() {
    navigate("/detalhes", {
      state: {
        cnpj: cnpjRaw,
        empresa: {
          nomeEmpresarial: nome,
          ni: cnpjFmt,
          telefone: telefone || "",
          cnaePrincipal: { descricao: "Atividade Exemplo" },
          endereco: {
            logradouro: "Rua Exemplo",
            numero: "123",
            uf: (estado || "").toUpperCase(),
          },
          email: email || "",
        },
      },
    });
  }

  return (
    <article className="border border-gray-100 rounded-2xl p-4 shadow-card hover:shadow-lg transition bg-white">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-brand-50 text-brand-700">
          <Building2 className="w-5 h-5" aria-hidden />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{nome}</h3>
          <p className="text-sm text-gray-600">
            {descricao || (cnpjFmt ? `CNPJ: ${cnpjFmt}` : "—")}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <InfoItem icon={MapPin}>{(estado || "—").toUpperCase()}</InfoItem>
        {email && <InfoItem icon={Mail}>{email}</InfoItem>}
        {telefone && <InfoItem icon={Phone}>{telefone}</InfoItem>}
      </div>

      <div className="mt-4 flex gap-2">
        <Button type="button" onClick={irParaDetalhes} aria-label={`Ver mais detalhes de ${nome}`}>
          Ver mais
        </Button>
        {id && (
          <Link
            to={`/doar/${id}`}
            className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium"
            aria-label={`Fazer uma doação para ${nome}`}
          >
            <Heart className="w-4 h-4" />
            Doar
          </Link>
        )}
      </div>
    </article>
  );
}
