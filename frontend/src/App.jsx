// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import BuscarInstituicoes from "./pages/BuscarInstituicoes";
import Detalhes from "./pages/Detalhes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/buscar" element={<BuscarInstituicoes />} />
      <Route path="/detalhes" element={<Detalhes />} />
    </Routes>
  );
}

export default App;
