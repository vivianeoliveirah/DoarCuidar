import { useNavigate } from "react-router-dom";
import Layout from "@/componentes/layout/Layout";
import HeroSection from "@/componentes/home/HeroSection";
import DonationGallery from "@/componentes/home/DonationGallery";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout className="flex flex-col justify-between">
  <div className="flex flex-col flex-grow overflow-hidden">
    <HeroSection />
    <DonationGallery />
  </div>

  <div className="flex justify-center pb-4">
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
