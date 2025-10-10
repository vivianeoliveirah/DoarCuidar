// src/pages/CadastroUsuario.jsx
import React from "react";
import FormCadastroUsuario from "../componentes/auth/FormCadastroUsuario";
import Fundo from "../assets/fundo.png";

export default function CadastroUsuario() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      <FormCadastroUsuario />
    </div>
  );
}
