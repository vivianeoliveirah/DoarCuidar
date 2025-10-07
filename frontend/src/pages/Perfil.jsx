import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Fundo from "../assets/fundo.png";
import Button from "@/componentes/ui/Button";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [donatarios, setDonatarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem("usuario");
    if (!u) return navigate("/login");
    const parsed = JSON.parse(u);
    setUsuario(parsed);
    setEmail(parsed.email || "");
    setEndereco(parsed.endereco || "");
    setTelefone(parsed.telefone || "");
    setDataNascimento(parsed.data_nascimento || "");
    setDonatarios([{ nome: "Instituto Esperança", cnpj: "12.345.678/0001-99", telefone: "(11) 99999-0000", endereco: "Rua do Amor, 100" }]);
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/");
  }

  function handleSalvar(e) {
    e.preventDefault();
    const atualizado = { ...usuario, email, endereco, telefone, data_nascimento: dataNascimento };
    localStorage.setItem("usuario", JSON.stringify(atualizado));
    setUsuario(atualizado);
    alert("Alterações salvas com sucesso!");
  }

  if (!usuario) return null;

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-6" style={{ backgroundImage: `url(${Fundo})` }}>
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">&#8592; Home</Link>
      </div>

      <div className="max-w-xl mx-auto bg-white/90 p-6 rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Perfil do Usuário</h1>
          <Button variant="danger" size="sm" onClick={handleLogout}>Sair</Button>
        </div>

        <form onSubmit={handleSalvar}>
          <label htmlFor="email" className="block mb-1 font-semibold">E-mail</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded mb-4" required />

          <label htmlFor="endereco" className="block mb-1 font-semibold">Endereço</label>
          <input id="endereco" type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="w-full border p-2 rounded mb-4" />

          <label htmlFor="telefone" className="block mb-1 font-semibold">Telefone</label>
          <input id="telefone" type="tel" placeholder="(00) 00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="w-full border p-2 rounded mb-4" />

          <label htmlFor="nascimento" className="block mb-1 font-semibold">Data de Nascimento</label>
          <input id="nascimento" type="text" placeholder="dd/mm/aaaa" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} className="w-full border p-2 rounded mb-6" />

          <Button type="submit" className="w-full">Salvar Alterações</Button>
        </form>

        <section className="mt-8" aria-labelledby="titulo-donatarios">
          <h2 id="titulo-donatarios" className="text-xl font-semibold mb-4">Donatários Salvos</h2>
          {donatarios.length ? (
            <ul className="space-y-3">
              {donatarios.map((d, i) => (
                <li key={i} className="bg-yellow-50 p-4 rounded shadow">
                  <p><strong>{d.nome}</strong></p>
                  <p>CNPJ: {d.cnpj}</p>
                  <p>Telefone: {d.telefone}</p>
                  <p>Endereço: {d.endereco}</p>
                </li>
              ))}
            </ul>
          ) : <p>Nenhum destinatário salvo.</p>}
        </section>
      </div>
    </div>
  );
}
1