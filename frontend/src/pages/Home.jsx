import Layout from "@/componentes/layout/Layout";
import HeroSection from "@/componentes/home/HeroSection";
import DonationGallery from "@/componentes/home/DonationGallery";

export default function Home() {
  return (
    <Layout className="flex flex-col justify-between">
      <div className="flex flex-col flex-grow overflow-hidden">
        <HeroSection />
        <DonationGallery />
      </div>
    </Layout>
  );
}
