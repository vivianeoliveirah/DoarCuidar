// frontend/src/lib/api.js
<<<<<<< HEAD
const BASE =
  import.meta.env.VITE_API_BASE_URL ??
  "http://127.0.0.1:5000/api";
=======

const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:5000/api";
>>>>>>> c92aca2 (ajustes)

async function request(path, opts = {}) {
  const url = `${BASE}${path}`;
  console.log(`[API] ${opts.method || "GET"} ${url}`);

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(opts.headers || {}),
      },
      ...opts,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[API ERROR] ${res.status}: ${text}`);
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    return res.status === 204 ? null : await res.json();
  } catch (err) {
    console.error("[API EXCEPTION]", err);
    throw err;
  }
}

export const api = {
<<<<<<< HEAD
 
  saude: () => request("/health"),

  
  listarInstituicoes: (q = "", estado = "") =>
    request(`/instituicoes?q=${encodeURIComponent(q)}&estado=${estado}`),

  cadastrarInstituicao: (data) =>
    request("/instituicoes", {
      method: "POST",
      body: JSON.stringify(data),
    }),


  registrarDoacao: (data) =>
    request("/doacoes", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  
  criarUsuario: (data) =>
    request("/usuarios", {
=======
  saude: () => request("/health"),
  listarInstituicoes: (q = "", estado = "") =>
    request(`/instituicoes?q=${encodeURIComponent(q)}&estado=${estado}`),
  registrarDoacao: (data) =>
    request("/doacoes", {
>>>>>>> c92aca2 (ajustes)
      method: "POST",
      body: JSON.stringify(data),
    }),
};
