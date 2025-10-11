import { useNavigate } from "react-router-dom";
import Layout from "@/componentes/layout/Layout";
import HeroSection from "@/componentes/home/HeroSection";
import DonationGallery from "@/componentes/home/DonationGallery";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout className="py-6 md:py-8">
      <HeroSection />

      <section className="mt-8">
        <DonationGallery />
      </section>

      <div className="mt-8 flex justify-center pb-2">
        <button
          type="button"
          onClick={() => navigate("/buscar")}
          className="btn-brand btn-md"
        >
          Buscar instituições
        </button>
      </div>
    </Layout>
  );
}
