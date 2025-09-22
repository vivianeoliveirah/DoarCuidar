import React from "react";
import HeroSection from "../componentes/home/HeroSection";
import SearchSection from "../componentes/home/SearchSection";
import Layout from "../componentes/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <main id="conteudo">
        <HeroSection />
        <SearchSection />
      </main>
    </Layout>
  );
}
