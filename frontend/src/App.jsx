// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Páginas
import Home from "./pages/Home";
import CadastroUsuario from "./pages/CadastroUsuario";
import CadastroInstituicao from "./pages/CadastroInstituicao";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import BuscarInstituicoes from "./pages/BuscarInstituicoes";
import DetalhesInstituicao from "./pages/DetalhesInstituicao";
import Doar from "./pages/Doar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
<Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
      <Route path="/cadastro-instituicao" element={<CadastroInstituicao />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/buscar" element={<BuscarInstituicoes />} />
      <Route path="/detalhes" element={<DetalhesInstituicao />} />
      <Route path="/doar/:id" element={<Doar />} />

      {/* opcional: 404 manda pra Home */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
}

export default App;


// ...

