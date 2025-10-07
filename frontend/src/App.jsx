import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import BuscarInstituicoes from "./pages/BuscarInstituicoes";
import Detalhes from "./pages/Detalhes";
import Doar from "./pages/Doar"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/buscar" element={<BuscarInstituicoes />} />
      <Route path="/detalhes" element={<Detalhes />} />
      <Route path="/doar/:id" element={<Doar />} />
    </Routes>
  );
}

export default App;
