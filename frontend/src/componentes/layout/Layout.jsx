import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, className = "" }) {
  return (
    <div className="min-h-svh flex flex-col page">
      <Header />
      <main
        id="conteudo"
        tabIndex={-1}
        className={`flex-1 pt-14 overflow-hidden${className}`} 
      >
        <div className="container-p h-full flex items-center justify-center">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
