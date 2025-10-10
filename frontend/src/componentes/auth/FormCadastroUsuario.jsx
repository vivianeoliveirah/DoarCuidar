import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, UserRound, Phone, MapPin } from "lucide-react";
import Button from "@/componentes/ui/Button";
import CampoSenha from "@/componentes/ui/CampoSenha";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export default function FormCadastroUsuario({ showTitle = true }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [aceite, setAceite] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!aceite) return setErro("É necessário aceitar os termos de uso.");
    if (senha.length < 6) return setErro("A senha deve ter no mínimo 6 caracteres.");
    if (senha !== confirma) return setErro("As senhas não coincidem.");

    const dados = {
      nome,
      email,
      senha,
      telefone,
      endereco,
      cidade,
      uf: uf.toUpperCase(),
      aceite,
    };

    try {
      await addDoc(collection(db, "usuarios"), dados);
      setSucesso("Usuário cadastrado com sucesso!");
      setNome(""); setEmail(""); setSenha(""); setConfirma("");
      setTelefone(""); setEndereco(""); setCidade(""); setUf("");
      setAceite(false);
    } catch (error) {
      setErro("Erro ao cadastrar usuário.");
      console.error(error);
    }
  }

  const label = "block text-sm font-medium mb-1 text-slate-700";
  const input =
    "w-full rounded-xl border border-slate-300/70 bg-white px-3 py-2.5 shadow-sm " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-600";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl bg-white/85 backdrop-blur-md p-8 rounded-3xl shadow-2xl ring-1 ring-slate-200"
    >
      {showTitle && (
        <>
          <p className="text-center text-xs uppercase tracking-widest text-emerald-600 font-semibold">
            Criar conta
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-center mt-1">Crie sua conta</h1>
          <p className="text-center text-slate-500 mt-1 text-sm">
            É rápido, seguro e você pode doar quando quiser.
          </p>
        </>
      )}

      {erro && <p role="alert" className="mt-4 mb-2 text-sm text-rose-700">{erro}</p>}
      {sucesso && <p className="mt-4 mb-2 text-sm text-emerald-700">{sucesso}</p>}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nome */}
        <div>
          <label htmlFor="nome" className={label}>
            <span className="inline-flex items-center gap-2">
              <UserRound className="w-4 h-4 text-emerald-700" aria-hidden />
              Nome completo
            </span>
          </label>
          <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} className={input} required />
        </div>

        {/* E-mail */}
        <div>
          <label htmlFor="email" className={label}>
            <span className="inline-flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-700" aria-hidden />
              E-mail
            </span>
          </label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} required />
        </div>

        {/* Senha */}
        <div>
          <label htmlFor="senha" className={label}>
            Senha <span className="text-slate-400">(mín. 6)</span>
          </label>
          <CampoSenha id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Sua senha" />
        </div>

        {/* Confirmar senha */}
        <div>
          <label htmlFor="confirma" className={label}>Confirmar senha</label>
          <CampoSenha id="confirma" value={confirma} onChange={(e) => setConfirma(e.target.value)} placeholder="Repita a senha" />
        </div>

        {/* Telefone */}
        <div>
          <label htmlFor="telefone" className={label}>
            <span className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-700" aria-hidden />
              Telefone (opcional)
            </span>
          </label>
          <input id="telefone" type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} className={input} placeholder="(00) 00000-0000" />
        </div>

        {/* Endereço */}
        <div className="md:col-span-2">
          <label htmlFor="endereco" className={label}>Endereço (opcional)</label>
          <input id="endereco" type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} className={input} placeholder="Rua, número, complemento" />
        </div>

        {/* Cidade */}
        <div>
          <label htmlFor="cidade" className={label}>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" aria-hidden />
              Cidade (opcional)
            </span>
          </label>
          <input id="cidade" type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} className={input} />
        </div>

        {/* UF */}
        <div>
          <label htmlFor="uf" className={label}>UF (opcional)</label>
          <input id="uf" type="text" value={uf} onChange={(e) => setUf(e.target.value.toUpperCase())} maxLength={2} className={`${input} text-center`} placeholder="SP" />
        </div>
      </div>

      {/* Termos */}
      <div className="mt-5 flex items-start gap-2">
        <input id="aceite" type="checkbox" checked={aceite} onChange={(e) => setAceite(e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300" required />
        <label htmlFor="aceite" className="text-sm">
          Li e concordo com os{" "}
          <Link to="#" className="text-emerald-700 underline">termos de uso</Link>.
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button type="submit" className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
          Criar conta
        </Button>
        <p className="text-sm text-center">
          Já tem conta?{" "}
          <Link to="/login" className="text-emerald-700 hover:underline">Entrar</Link>
        </p>
      </div>
    </form>
  );
}
