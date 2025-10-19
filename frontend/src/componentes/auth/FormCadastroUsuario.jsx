import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, UserRound, Phone, MapPin } from "lucide-react";
import Button from "@/componentes/ui/Button";
import CampoSenha from "@/componentes/ui/CampoSenha";

function onlyDigits(s = "") {
  return s.replace(/\D/g, "");
}

export default function FormCadastroUsuario({ showTitle = true }) {
  const [form, setForm] = useState({
    nome: "", email: "", senha: "", confirma: "",
    telefone: "", endereco: "", cidade: "", uf: "", aceite: false
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const set = (k) => (e) =>
    setForm((p) => ({
      ...p,
      [k]: e.target?.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    const { nome, email, senha, confirma, telefone, endereco, cidade, uf, aceite } = form;

    if (!aceite) return setErro("É necessário aceitar os termos de uso.");
    if (senha.length < 6) return setErro("A senha deve ter no mínimo 6 caracteres.");
    if (senha !== confirma) return setErro("As senhas não coincidem.");
    if (!email.includes("@")) return setErro("Email inválido.");
    if (uf && uf.length !== 2) return setErro("UF deve ter 2 letras.");

    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          senha,
          confirma,
          telefone: onlyDigits(telefone),
          endereco,
          cidade,
          uf: uf.toUpperCase(),
          aceite,
        }),
      });

      const resultado = await res.json();
      if (!res.ok) return setErro(resultado.erro || "Erro ao cadastrar.");

      setSucesso(resultado.sucesso);
      setForm({
        nome: "", email: "", senha: "", confirma: "",
        telefone: "", endereco: "", cidade: "", uf: "", aceite: false
      });
    } catch (error) {
      console.error(error);
      setErro("Erro de conexão com o servidor.");
    }
  }

  const label = "block text-sm font-medium mb-1 text-slate-700";
  const input =
    "w-full rounded-xl border border-slate-300/70 bg-white px-3 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600";

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
        <div>
          <label htmlFor="nome" className={label}>
            <span className="inline-flex items-center gap-2">
              <UserRound className="w-4 h-4 text-emerald-700" />
              Nome completo
            </span>
          </label>
          <input id="nome" value={form.nome} onChange={set("nome")} className={input} required />
        </div>

        <div>
          <label htmlFor="email" className={label}>
            <span className="inline-flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-700" />
              E-mail
            </span>
          </label>
          <input id="email" type="email" value={form.email} onChange={set("email")} className={input} required />
        </div>

        <div>
          <label htmlFor="senha" className={label}>Senha <span className="text-slate-400">(mín. 6)</span></label>
          <CampoSenha id="senha" value={form.senha} onChange={set("senha")} placeholder="Sua senha" />
        </div>

        <div>
          <label htmlFor="confirma" className={label}>Confirmar senha</label>
          <CampoSenha id="confirma" value={form.confirma} onChange={set("confirma")} placeholder="Repita a senha" />
        </div>

        <div>
          <label htmlFor="telefone" className={label}>
            <span className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-700" />
              Telefone (opcional)
            </span>
          </label>
          <input id="telefone" value={form.telefone} onChange={set("telefone")} className={input} placeholder="(00) 00000-0000" />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="endereco" className={label}>Endereço (opcional)</label>
          <input id="endereco" value={form.endereco} onChange={set("endereco")} className={input} />
        </div>

        <div>
          <label htmlFor="cidade" className={label}>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              Cidade (opcional)
            </span>
          </label>
          <input id="cidade" value={form.cidade} onChange={set("cidade")} className={input} />
        </div>

        <div>
          <label htmlFor="uf" className={label}>UF (opcional)</label>
          <input id="uf" value={form.uf} onChange={set("uf")} maxLength={2} className={`${input} text-center`} placeholder="SP" />
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2">
        <input id="aceite" type="checkbox" checked={form.aceite} onChange={set("aceite")} className="mt-1 h-4 w-4 rounded border-slate-300" required />
        <label htmlFor="aceite" className="text-sm">
          Li e concordo com os <Link to="#" className="text-emerald-700 underline">termos de uso</Link>.
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button type="submit" className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
          Criar conta
        </Button>
        <p className="text-sm text-center">
          Já tem conta? <Link to="/login" className="text-emerald-700 hover:underline">Entrar</Link>
        </p>
      </div>
    </form>
  );
}
