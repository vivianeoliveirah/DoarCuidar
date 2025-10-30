import { useState } from "react";
import { api } from "@/lib/api";

export default function FormDoacao({ donatarioId }) {
  const [valor, setValor] = useState("");
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState("idle");
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErro("");

    try {
      await api.registrarDoacao({
        donatario_id: donatarioId,
        valor: parseFloat(valor),
        nome_doador: nome,
        mensagem,
      });
      setStatus("ok");
      setValor("");
      setNome("");
      setMensagem("");
    } catch (e) {
      setStatus("error");
      setErro(String(e.message));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">Nome do doador (opcional)</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-3 rounded w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">Valor da doação (R$)</label>
        <input
          type="number"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
          className="border p-3 rounded w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">Mensagem (opcional)</label>
        <textarea
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className="border p-3 rounded w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Enviar Doação
      </button>

      {status === "ok" && (
        <p className="text-green-700 font-semibold">Doação registrada com sucesso!</p>
      )}
      {status === "error" && (
        <p className="text-red-700 font-semibold">Erro: {erro}</p>
      )}
    </form>
  );
}
