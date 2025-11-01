import Layout from "@/componentes/layout/Layout";
import HeroSection from "@/componentes/home/HeroSection";
import DonationGallery from "@/componentes/home/DonationGallery";

export default function Home() {
  return (
    <Layout className="flex flex-col justify-between">
<<<<<<< HEAD
      <div className="flex flex-col flex-grow overflow-hidden">
        <HeroSection />
        <DonationGallery />
      </div>
    </Layout>
=======
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
>>>>>>> 328caec (Implementações)
  );
}
