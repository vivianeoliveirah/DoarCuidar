const BASE = import.meta.env.VITE_API_URL ?? "https://doarcuidar.onrender.com/api";

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
      method: "POST",
      body: JSON.stringify(data),
    }),
};
