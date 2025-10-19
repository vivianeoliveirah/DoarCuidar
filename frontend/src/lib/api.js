// frontend/src/lib/api.js

const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:5000/api";

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export const api = {
  saude: () => request("/health"),
  listarInstituicoes: (q = "", estado = "") =>
    request(`/instituicoes?q=${encodeURIComponent(q)}&estado=${estado}`),
  registrarDoacao: (data) =>
    request("/doacoes", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
