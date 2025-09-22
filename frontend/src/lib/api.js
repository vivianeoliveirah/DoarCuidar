const BASE = import.meta.env.VITE_API_URL ?? "";

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export const api = {
  saude: () => request("/api/saude"),
  listarInstituicoes: (q = "", estado = "") =>
    request(`/api/instituicoes?q=${encodeURIComponent(q)}&estado=${estado}`),
};
