const BASE = import.meta.env.VITE_API_URL ?? "";

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
  saude: () => request("/api/health"),
  listarInstituicoes: (q = "", estado = "") =>
    request(`/api/instituicoes?q=${encodeURIComponent(q)}&estado=${estado}`),
  registrarDoacao: (data) =>
    request("/api/doacoes", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
