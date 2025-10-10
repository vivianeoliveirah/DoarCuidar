// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import Layout from "@/componentes/layout/Layout";
import HeroSection from "@/componentes/home/HeroSection";
import DonationGallery from "@/componentes/home/DonationGallery";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout className="py-6 md:py-10">
      {/* Hero com a citação */}
      <HeroSection />

      {/* Galeria inspiracional */}
      <section className="mt-10">
        <DonationGallery />
      </section>

      {/* CTA central para a página de busca */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => navigate("/buscar")}
          className="rounded-xl bg-emerald-600 px-6 py-3 text-white text-sm font-medium shadow-sm
                     hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Buscar instituições
        </button>
      </div>
    </Layout>
  );
}
