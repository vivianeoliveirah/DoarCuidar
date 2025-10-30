// src/componentes/home/DonationGallery.jsx
export default function DonationGallery({ items = 3 }) {
  const imagens = [
    {
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop",
      titulo: "Alimentação",
      texto: "Ajude iniciativas que combatem a fome.",
    },
    {
      url: "https://observatorio3setor.org.br/wp-content/uploads/2023/04/AdobeStock_528812603.png",
      titulo: "Educação",
      texto: "Apoie projetos de reforço escolar e tecnologia.",
    },
    {
      url: "https://jrmcoaching.com.br/wp-content/uploads/2016/01/Dinamica-para-Terceira-Idade.jpg",
      titulo: "Idosos",
      texto: "Lar e cuidado para a melhor idade.",
    },
    {
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
      titulo: "Cultura",
      texto: "Arte e oficinas para crianças e jovens.",
    },
    {
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop",
      titulo: "Emergências",
      texto: "Ações rápidas em situações críticas.",
    },
    {
      url: "https://images.unsplash.com/photo-1478476868527-002ae3f3e159?q=80&w=1600&auto=format&fit=crop",
      titulo: "Saúde",
      texto: "Atendimento e acolhimento humanizado.",
    },
  ];

  // mantém só 3 (ou o número passado via prop) — sem rolagem
  const cards = imagens.slice(0, items);

  return (
    <div>
      <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight">
        Causas para transformar vidas
      </h2>
      <p className="mt-2 text-center text-slate-600">
        Conheça áreas onde sua doação faz a diferença.
      </p>

      {/* grid: 1 col no mobile, 3 col no desktop — sem overflow/scroll */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, i) => (
          <figure
            key={i}
            className="group relative overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-slate-100"
          >
            <img
              src={card.url}
              alt={card.titulo}
              className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <figcaption className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent p-4 flex items-end">
              <div>
                <h3 className="text-white font-semibold text-lg drop-shadow">
                  {card.titulo}
                </h3>
                <p className="text-white/90 text-sm drop-shadow">{card.texto}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
