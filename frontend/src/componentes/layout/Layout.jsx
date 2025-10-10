import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, className = "" }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50 text-slate-800">
      <Header />
      <main id="conteudo" tabIndex={-1} className={`flex-1 outline-none ${className}`}>
        {children} {/* cada página decide se usa container ou não */}
      </main>
      <Footer />
    </div>
  );
}
