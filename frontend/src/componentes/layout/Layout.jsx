import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function SkipLink() {
  return (
    <a
      href="#conteudo"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white border p-2 rounded shadow"
    >
      Pular para o conteúdo
    </a>
  );
}

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SkipLink />
      <Header />
      {/* tabIndex -1 permite foco ao usar o skip link */}
      <main id="conteudo" tabIndex={-1} className="flex-grow outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
