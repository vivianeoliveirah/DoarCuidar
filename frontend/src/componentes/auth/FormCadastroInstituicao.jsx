import { useState } from "react";
import { Building2, Mail, Phone, MapPin } from "lucide-react";
import Button from "@/componentes/ui/Button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

function onlyDigits(s = "") {
  return s.replace(/\D/g, "");
}

export default function FormCadastroInstituicao({ showTitle = true }) {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    const cnpjLimpo = onlyDigits(cnpj);
    if (cnpjLimpo.length !== 14) return setErro("Informe um CNPJ válido (14 dígitos).");
    if (uf && uf.length !== 2) return setErro("UF deve ter 2 letras.");

    try {
      await addDoc(collection(db, "instituicoes"), {
        nome,
        cnpj: cnpjLimpo,
        uf: uf.toUpperCase(),
        cidade,
        telefone,
        email,
        endereco,
        criadoEm: new Date().toISOString(),
      });

      setSucesso("Instituição cadastrada com sucesso!");
      setNome(""); setCnpj(""); setUf(""); setCidade("");
      setTelefone(""); setEmail(""); setEndereco("");
    } catch (err) {
      console.error(err);
      setErro("Erro ao cadastrar instituição.");
    }
  }

  const label = "block text-sm font-medium mb-1";
  const input =
    "w-full rounded-xl border border-slate-300 px-3 py-2 shadow-sm " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-600";

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
        {/* Nome */}
        <div className="md:col-span-2">
          <label htmlFor="nome" className={label}>
            <span className="inline-flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-500" />
              Nome da instituição
            </span>
          </label>
          <input id="nome" value={nome} onChange={(e)=>setNome(e.target.value)} className={input} required />
        </div>

        {/* CNPJ */}
        <div>
          <label htmlFor="cnpj" className={label}>CNPJ</label>
          <input
            id="cnpj"
            value={cnpj}
            onChange={(e)=>setCnpj(e.target.value)}
            className={input}
            placeholder="00.000.000/0001-00"
            required
          />
        </div>

        {/* UF */}
        <div>
          <label htmlFor="uf" className={label}>Estado (UF)</label>
          <input
            id="uf"
            value={uf}
            onChange={(e)=>setUf(e.target.value.toUpperCase())}
            maxLength={2}
            className={`${input} text-center`}
            placeholder="SP"
          />
        </div>

        {/* Cidade */}
        <div>
          <label htmlFor="cidade" className={label}>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              Cidade
            </span>
          </label>
          <input id="cidade" value={cidade} onChange={(e)=>setCidade(e.target.value)} className={input} />
        </div>

        {/* Telefone */}
        <div>
          <label htmlFor="telefone" className={label}>
            <span className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-500" />
              Telefone
            </span>
          </label>
          <input id="telefone" value={telefone} onChange={(e)=>setTelefone(e.target.value)} className={input} />
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label htmlFor="email" className={label}>
            <span className="inline-flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-500" />
              Email
            </span>
          </label>
          <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className={input} />
        </div>

        {/* Endereço */}
        <div className="md:col-span-2">
          <label htmlFor="endereco" className={label}>Endereço completo</label>
          <input id="endereco" value={endereco} onChange={(e)=>setEndereco(e.target.value)} className={input} />
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" className="w-full">Cadastrar Instituição</Button>
      </div>
    </form>
  );
}
