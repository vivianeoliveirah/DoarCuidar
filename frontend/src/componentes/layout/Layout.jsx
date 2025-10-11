import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, className = "" }) {
  return (
    <div className="min-h-svh flex flex-col page">
      <Header />
      <main id="conteudo" tabIndex={-1} className={`flex-1 ${className}`}>
        <div className="container-p">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
