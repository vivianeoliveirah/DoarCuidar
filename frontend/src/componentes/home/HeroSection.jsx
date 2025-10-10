import { ShieldCheck, Users, Quote } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      {/* halo decorativo para preencher a lateral sem conteúdo */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-8rem] top-6 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        {/* bloco do texto mais largo */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Encontre uma instituição{" "}
            <span className="block text-emerald-600">e faça a diferença hoje</span>
          </h1>

          <p className="mt-4 text-slate-600">
            Consulte CNPJ oficial, filtre por estado e conecte-se com causas reais.
          </p>

          <figure
            aria-labelledby="quote-title"
            className="mt-5 inline-block text-left rounded-2xl border border-amber-200 bg-amber-50/70 text-amber-900 shadow-sm"
          >
            <figcaption className="flex items-center gap-2 px-5 pt-3">
              <Quote className="h-4 w-4" />
              <p id="quote-title" className="text-[11px] font-semibold tracking-wide">
                2ª SURATA AL BÁCARA – A VACA 215
              </p>
            </figcaption>
            <blockquote className="px-5 pb-4 pt-1 text-[13px] leading-relaxed max-w-2xl">
              “Perguntam-te que parte devem gastar (em caridade). Dize-lhes: Toda a
              caridade que fizerdes, deve ser para os pais, parentes, órfãos,
              necessitados e viajantes (desamparados). E sabei que todo o bem que
              fizerdes, Allah dele tomará consciência.”
            </blockquote>
          </figure>

          <div className="mt-5 flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Dados verificados
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4" /> Comunidade engajada
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
