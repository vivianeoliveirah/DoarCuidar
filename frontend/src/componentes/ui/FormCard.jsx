export default function FormCard({ title, subtitle, children, actions }) {
  return (
    <section className="container-p py-8">
      <div className="form-card mx-auto max-w-2xl">
        {title ? (
          <header className="text-center mb-5">
            <p className="text-xs font-semibold tracking-[.18em] text-brand-700">CRIAR CONTA</p>
            <h1 className="mt-1 page-title">{title}</h1>
            {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
          </header>
        ) : null}

        {children}

        {actions ? <div className="mt-6">{actions}</div> : null}
      </div>
    </section>
  );
}
