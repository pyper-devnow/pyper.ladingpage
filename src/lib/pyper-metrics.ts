// Métricas próprias da landing: visitas e cliques, vistos no Console da Pyper.
//
// LGPD: anônimo e agregado. Sem consentimento vai só um id de sessão (some ao
// fechar a aba); o id de visitante, que conta "visitantes únicos" entre visitas,
// só é criado depois de "Aceitar" no aviso de cookies. Nada disso é cookie.
import { locationOf } from "./analytics";
import { apiBase } from "./api-base";

export type ClickTarget = "whatsapp" | "cta" | "secondary" | "support" | "email" | "nav";

export type MetricEvent = {
  type: "pageview" | "click";
  sessionId: string;
  visitorId?: string;
  path?: string;
  target?: ClickTarget;
  location?: string;
  label?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

const SESSION_KEY = "pyper_metrics_session";
const VISITOR_KEY = "pyper_metrics_visitor";
const CONSENT_KEY = "pyper_consent";
const MAX_BATCH = 20;
const FLUSH_MS = 2000;

function randomId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    // segue para o fallback
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

const memorySession = randomId();

function sessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = randomId();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return memorySession;
  }
}
function visitorId(): string | undefined {
  try {
    if (localStorage.getItem(CONSENT_KEY) !== "granted") return undefined;
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = randomId();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return undefined;
  }
}

/** utm_* da URL da página (vazios ficam de fora). */
export function readUtm(search: string): Pick<MetricEvent, "utmSource" | "utmMedium" | "utmCampaign"> {
  const params = new URLSearchParams(search);
  const pick = (key: string) => params.get(key)?.trim().slice(0, 100) || undefined;
  const utm: Pick<MetricEvent, "utmSource" | "utmMedium" | "utmCampaign"> = {};
  const source = pick("utm_source");
  const medium = pick("utm_medium");
  const campaign = pick("utm_campaign");
  if (source) utm.utmSource = source;
  if (medium) utm.utmMedium = medium;
  if (campaign) utm.utmCampaign = campaign;
  return utm;
}

/**
 * O que um link é para a métrica. `null` = clique que não interessa contar.
 * `inNav` = o link está no cabeçalho ou num <nav>.
 */
export function classifyLink(href: string, className: string, inNav: boolean): ClickTarget | null {
  const classes = ` ${className} `;
  if (href.includes("wa.me") || href.includes("api.whatsapp.com")) return "whatsapp";
  if (href.startsWith("mailto:")) return "email";
  if (/\/suporte(\b|\/|\?|#|$)/.test(href)) return "support";
  if (classes.includes(" button-primary ")) return "cta";
  if (classes.includes(" button-secondary ")) return "secondary";
  if (inNav) return "nav";
  return null;
}

let queue: MetricEvent[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let installed = false;

function flush() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  while (queue.length) {
    const events = queue.slice(0, MAX_BATCH);
    queue = queue.slice(MAX_BATCH);
    try {
      void fetch(`${apiBase()}/public/landing/events`, {
        method: "POST",
        keepalive: true,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ events }),
      }).catch(() => undefined);
    } catch {
      // métrica nunca quebra a página
    }
  }
}

function enqueue(event: Omit<MetricEvent, "sessionId" | "visitorId">) {
  try {
    const full: MetricEvent = { ...event, sessionId: sessionId() };
    const visitor = visitorId();
    if (visitor) full.visitorId = visitor;
    queue.push(full);
    if (queue.length >= MAX_BATCH) flush();
    else if (!timer) timer = setTimeout(flush, FLUSH_MS);
  } catch {
    // idem
  }
}

function onClick(event: MouseEvent) {
  try {
    const anchor = (event.target as HTMLElement | null)?.closest?.("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href") || "";
    const inNav = Boolean(anchor.closest("header, nav"));
    const target = classifyLink(href, anchor.className || "", inNav);
    if (!target) return;
    enqueue({
      type: "click",
      path: window.location.pathname,
      target,
      location: locationOf(anchor),
      label: (anchor.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80) || undefined,
    });
    // Link que sai da página (WhatsApp, e-mail): manda já, antes de perder a aba.
    if (target === "whatsapp" || target === "email") flush();
  } catch {
    // idem
  }
}

/** Conta a visita desta página e passa a contar os cliques que importam. */
export function initPyperMetrics() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  try {
    enqueue({
      type: "pageview",
      path: window.location.pathname,
      referrer: document.referrer || undefined,
      ...readUtm(window.location.search),
    });
    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flush();
    });
  } catch {
    // idem
  }
}
