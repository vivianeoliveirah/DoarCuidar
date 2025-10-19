import { useState } from "react";
import { Building2, Mail, Phone, MapPin } from "lucide-react";
import Button from "@/componentes/ui/Button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { api } from "@/lib/api";

function onlyDigits(s = "") {
  return s.replace(/\D/g, "");
}

export default function FormCadastroInstituicao({ showTitle = true }) {
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    uf: "",
    cidade: "",
    telefone: "",
    email: "",
    endereco: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function handleChange(e) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    const cnpjLimpo = onlyDigits(form.cnpj);
    const telefoneLimpo = onlyDigits(form.telefone);

    if (cnpjLimpo.length !== 14) return setErro("Informe um CNPJ válido (14 dígitos).");
    if (form.uf && form.uf.length !== 2) return setErro("UF deve ter 2 letras.");
    if (!form.email.includes("@")) return setErro("Email inválido.");
    if (telefoneLimpo.length < 10) return setErro("Telefone incompleto.");

    try {
      // 🔹 Salva no Firebase
      await addDoc(collection(db, "instituicoes"), {
        ...form,
        cnpj: cnpjLimpo,
        uf: form.uf.toUpperCase(),
        telefone: telefoneLimpo,
        criadoEm: new Date().toISOString(),
      });

      // 🔹 Envia também para o backend Flask
      await api.cadastrarInstituicao({
        ...form,
        cnpj: cnpjLimpo,
        telefone: telefoneLimpo,
        uf: form.uf.toUpperCase(),
      });

      setSucesso("Instituição cadastrada com sucesso!");
      setForm({
        nome: "",
        cnpj: "",
        uf: "",
        cidade: "",
        telefone: "",
        email: "",
        endereco: "",
      });
    } catch (err) {
      console.error(err);
      setErro("Erro ao cadastrar instituição: " + err.message);
    }
  }

  const label = "block text-sm font-medium mb-1";
  const input =
    "w-full rounded-xl border border-slate-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white/90 p-6 md:p-8 rounded-3xl shadow-card ring-1 ring-slate-200"
    >
      {showTitle && (
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastrar Instituição</h1>
      )}

      {erro && <p role="alert" className="mb-4 text-sm text-rose-700">{erro}</p>}
      {sucesso && <p className="mb-4 text-sm text-emerald-700">{sucesso}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="nome" className={label}>
            <span className="inline-flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-500" />
              Nome da instituição
            </span>
          </label>
          <input id="nome" value={form.nome} onChange={handleChange} className={input} required />
        </div>

        <div>
          <label htmlFor="cnpj" className={label}>CNPJ</label>
          <input id="cnpj" value={form.cnpj} onChange={handleChange} className={input} required />
        </div>

        <div>
          <label htmlFor="uf" className={label}>Estado (UF)</label>
          <input id="uf" value={form.uf} onChange={handleChange} maxLength={2} className={`${input} text-center`} />
        </div>

        <div>
          <label htmlFor="cidade" className={label}>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              Cidade
            </span>
          </label>
          <input id="cidade" value={form.cidade} onChange={handleChange} className={input} />
        </div>

        <div>
          <label htmlFor="telefone" className={label}>
            <span className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-500" />
              Telefone
            </span>
          </label>
          <input id="telefone" value={form.telefone} onChange={handleChange} className={input} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="email" className={label}>
            <span className="inline-flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-500" />
              Email
            </span>
          </label>
          <input id="email" type="email" value={form.email} onChange={handleChange} className={input} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="endereco" className={label}>Endereço completo</label>
          <input id="endereco" value={form.endereco} onChange={handleChange} className={input} />
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" className="w-full">Cadastrar Instituição</Button>
      </div>
    </form>
  );
}
