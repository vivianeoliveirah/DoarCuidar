import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/componentes/layout/Layout";
import Fundo from "@/assets/fundo.png";
import FormDoacao from "@/componentes/instituicoes/FormDoacao";
import { api } from "@/lib/api";

export default function Doar() {
  const { id } = useParams();
  const [instituicao, setInstituicao] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const inst = await api.listarInstituicoes("", "");
        const encontrada = inst.find((i) => String(i.id) === id);
        if (!encontrada) throw new Error("Instituição não encontrada");
        setInstituicao(encontrada);
      } catch (e) {
        setErro(String(e.message));
      }
    })();
  }, [id]);

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
        style={{ backgroundImage: `url(${Fundo})` }}
      >
        <div className="max-w-xl mx-auto bg-white/90 p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4 text-center">Fazer uma Doação</h1>

          {erro && <p className="text-red-700 font-semibold">{erro}</p>}

          {instituicao && (
            <>
              <p className="mb-4 text-center">
                Você está doando para <strong>{instituicao.nome}</strong>
              </p>
              <FormDoacao donatarioId={instituicao.id} />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
