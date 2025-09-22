import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, UserRound, Phone, MapPin } from "lucide-react";
import Button from "@/componentes/ui/Button";
import CampoSenha from "@/componentes/ui/CampoSenha";

export default function FormCadastro({ onSubmit }) {
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

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!aceite) return setErro("É necessário aceitar os termos de uso.");
    if (senha.length < 6) return setErro("A senha deve ter no mínimo 6 caracteres.");
    if (senha !== confirma) return setErro("As senhas não coincidem.");

    const dados = {
      nome,
      email,
      senha,              // em produção: NUNCA guardar senha em texto puro
      telefone,
      endereco,
      cidade,
      uf: uf.toUpperCase(),
      aceite,
    };

    if (onSubmit) onSubmit(dados);
    alert("Cadastro enviado! (mock)");
  }

  const labelClass = "block text-sm font-medium mb-1";
  const inputClass =
    "w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-600";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white/90 p-6 md:p-8 rounded-2xl shadow-card"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Criar conta</h1>
      {erro && (
        <p role="alert" className="mb-4 text-sm text-red-700">
          {erro}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nome */}
        <div>
          <label htmlFor="nome" className={labelClass}>
            <span className="inline-flex items-center gap-2">
              <UserRound className="w-4 h-4 text-gray-600" aria-hidden />
              Nome completo
            </span>
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        {/* E-mail */}
        <div>
          <label htmlFor="email" className={labelClass}>
            <span className="inline-flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-600" aria-hidden />
              E-mail
            </span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        {/* Senha */}
        <div>
          <label htmlFor="senha" className={labelClass}>Senha</label>
          <CampoSenha
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Mín. 6 caracteres"
          />
        </div>

        {/* Confirmar senha */}
        <div>
          <label htmlFor="confirma" className={labelClass}>Confirmar senha</label>
          <CampoSenha
            id="confirma"
            value={confirma}
            onChange={(e) => setConfirma(e.target.value)}
            placeholder="Repita a senha"
          />
        </div>

        {/* Telefone */}
        <div>
          <label htmlFor="telefone" className={labelClass}>
            <span className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-600" aria-hidden />
              Telefone (opcional)
            </span>
          </label>
          <input
            id="telefone"
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className={inputClass}
            placeholder="(00) 00000-0000"
          />
        </div>

        {/* Endereço */}
        <div className="md:col-span-2">
          <label htmlFor="endereco" className={labelClass}>Endereço (opcional)</label>
          <input
            id="endereco"
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            className={inputClass}
            placeholder="Rua, número, complemento"
          />
        </div>

        {/* Cidade */}
        <div>
          <label htmlFor="cidade" className={labelClass}>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-600" aria-hidden />
              Cidade (opcional)
            </span>
          </label>
          <input
            id="cidade"
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* UF */}
        <div>
          <label htmlFor="uf" className={labelClass}>UF (opcional)</label>
          <input
            id="uf"
            type="text"
            value={uf}
            onChange={(e) => setUf(e.target.value.toUpperCase())}
            maxLength={2}
            className={`${inputClass} text-center`}
            placeholder="SP"
          />
        </div>
      </div>

      {/* Termos */}
      <div className="mt-4 flex items-start gap-2">
        <input
          id="aceite"
          type="checkbox"
          checked={aceite}
          onChange={(e) => setAceite(e.target.checked)}
          className="mt-1 h-4 w-4"
          required
        />
        <label htmlFor="aceite" className="text-sm">
          Li e concordo com os <Link to="#" className="text-brand-700 underline">termos de uso</Link>.
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button type="submit">Criar conta</Button>
        <p className="text-sm text-center">
          Já tem conta?{" "}
          <Link to="/login" className="text-brand-700 hover:underline">Entrar</Link>
        </p>
      </div>
    </form>
  );
}
