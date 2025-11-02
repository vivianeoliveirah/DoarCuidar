import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Layout from "@/componentes/layout/Layout";
import FormCard from "@/componentes/ui/FormCard";
import FormDoacao from "@/componentes/instituicoes/FormDoacao";

// fallback local — mesmo conjunto da busca/home
const DEMO = [
  { id:"sp-1", nome:"Instituto Esperança" },
  { id:"rj-1", nome:"Lar Solidário" },
  { id:"mg-1", nome:"Projeto Semeando" },
];

export default function Doar() {
  const { id } = useParams();
  const { state } = useLocation();
  const [inst, setInst] = useState(state?.instituicao || null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (inst) return;

    (async () => {
      try {
        // Tente obter de uma API real aqui se desejar.
        // Se sua função "api.listarInstituicoes" retornar HTML por erro, evite usar.
        // Fallback imediato:
        const found = DEMO.find((i) => String(i.id) === String(id));
        if (!found) throw new Error("Instituição não encontrada.");
        setInst(found);
      } catch (e) {
        setErro(String(e?.message || e));
      }
    })();
  }, [id, inst]);

  return (
    <Layout className="py-8">
      <FormCard
        title="Fazer uma Doação"
        subtitle={inst ? `Você está doando para ${inst.nome}` : "Selecione um destinatário para continuar."}
      >
        {erro && (
          <div className="rounded-xl bg-red-50 text-red-800 border border-red-200 px-4 py-2 text-sm mb-4" role="alert">
            {erro}
          </div>
        )}

        {inst && (
          <FormDoacao donatarioId={inst.id} />
        )}
      </FormCard>
    </Layout>
  );
}
