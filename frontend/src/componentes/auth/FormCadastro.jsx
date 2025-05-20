import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputTexto from "../ui/InputTexto";
import Botao from "../ui/Botao";
import Logo from "../../assets/LogoDoarCuidar.png";
import Fundo from "../../assets/fundo.png"; // Ajuste para sua imagem de fundo

export default function FormCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [estado, setEstado] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate(); // Para navegar de volta

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ nome, email, senha, estado });
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 text-sm hover:underline flex items-center gap-1"
        >
          &#8592; Voltar
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg mx-4 flex flex-col space-y-4"
        style={{ minHeight: "450px" }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="Logo da Empresa" className="h-24 w-auto" />
        </div>

        <h2 className="text-3xl font-bold mb-4 text-center">Cadastro de Doador</h2>

        <div className="flex flex-col md:flex-row gap-4">
          <InputTexto
            label="Nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="flex-1"
          />

          <InputTexto
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="flex-1"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Senha</label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-2 text-sm text-blue-600 hover:underline"
              >
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <InputTexto
            label="Estado"
            name="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="text-sm text-center mt-2">
          <Link to="/login" className="text-blue-600 hover:underline">
            Voltar para o login
          </Link>
        </div>

        <Botao
          type="submit"
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition"
        >
          Cadastrar
        </Botao>
      </form>
    </div>
  );
}
