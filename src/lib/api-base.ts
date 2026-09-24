// Endereço da API da Pyper para o que a landing lê e envia (conteúdo gerido no
// Console e métricas de visita). Em dev local aponta para o backend da máquina.
export function apiBase(): string {
  // Sem vite/client nos tipos do projeto: lê o env com cast.
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  const fromEnv = env?.VITE_PYPER_API_URL || "";
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  const host = typeof window !== "undefined" ? window.location.hostname : "";
  if (host === "localhost" || host === "127.0.0.1") return "http://localhost:9002/v1";
  return "https://api.pyper.com.br/v1";
}
