// Camada de analytics da landing.
//
// LGPD: nenhum provedor (Clarity, GA4, Plausible) carrega antes do consentimento.
// O rastreio de clique nos CTAs é instalado sempre, mas `track()` vira no-op
// enquanto nenhum provedor estiver carregado.
//
// Para ligar GA4 ou Plausible, preencha `analytics` em src/lib/site.ts.
import { analytics } from "./site";

type Props = Record<string, string | number | boolean>;

const CONSENT_KEY = "pyper_consent";
const CLARITY_ID = "xbr4742uei";
const ga4Id = analytics.ga4Id || "";
const plausibleDomain = analytics.plausibleDomain || "";

let providersLoaded = false;

type Consent = "granted" | "denied" | null;

function getConsent(): Consent {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function setConsent(value: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // sem localStorage: segue sem persistir
  }
}

function loadClarity(id: string) {
  const w = window as unknown as { clarity?: (...args: unknown[]) => void };
  w.clarity =
    w.clarity ||
    function clarity(...args: unknown[]) {
      (
        (w.clarity as unknown as { q?: unknown[] }).q ||
        ((w.clarity as unknown as { q?: unknown[] }).q = [])
      ).push(args);
    };
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${id}`;
  document.head.appendChild(script);
}

function loadGa4(id: string) {
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer!.push(args);
  };
  w.gtag("js", new Date());
  w.gtag("config", id);
}

function loadPlausible(domain: string) {
  const script = document.createElement("script");
  script.defer = true;
  script.dataset.domain = domain;
  script.src = "https://plausible.io/js/script.js";
  document.head.appendChild(script);
}

function loadProviders() {
  if (providersLoaded) return;
  providersLoaded = true;
  loadClarity(CLARITY_ID);
  if (ga4Id) loadGa4(ga4Id);
  if (plausibleDomain) loadPlausible(plausibleDomain);
}

function locationOf(el: Element): string {
  if (el.closest(".floating-whatsapp")) return "float";
  if (el.closest(".mobile-dock")) return "mobile-dock";
  if (el.closest(".site-header, header")) return "nav";
  const section = el.closest("section");
  if (section?.id) return section.id;
  if (section?.classList.contains("final-cta")) return "final-cta";
  return "other";
}

/** Dispara um evento pra todos os destinos carregados. */
export function track(name: string, props: Props = {}) {
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      plausible?: (name: string, opts?: { props: Props }) => void;
      clarity?: (...args: unknown[]) => void;
    };
    if (typeof w.gtag === "function") w.gtag("event", name, props);
    if (typeof w.plausible === "function") w.plausible(name, { props });
    if (typeof w.clarity === "function") {
      w.clarity("event", name);
      for (const [key, value] of Object.entries(props)) {
        w.clarity("set", key, String(value));
      }
    }
  } catch {
    // analytics nunca deve quebrar a página
  }
}

function renderConsentBanner() {
  if (document.querySelector(".consent-banner")) return;

  const banner = document.createElement("div");
  banner.className = "consent-banner";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Aviso de cookies");

  const text = document.createElement("p");
  text.append(
    "A gente usa cookies pra entender como você usa o site e deixá-lo melhor. ",
  );
  const learnMore = document.createElement("a");
  learnMore.href = "/privacidade.html";
  learnMore.textContent = "Saiba mais";
  text.append(learnMore);

  const actions = document.createElement("div");
  actions.className = "consent-actions";

  const decline = document.createElement("button");
  decline.type = "button";
  decline.className = "consent-btn consent-decline";
  decline.textContent = "Recusar";
  decline.addEventListener("click", () => {
    setConsent("denied");
    banner.remove();
  });

  const accept = document.createElement("button");
  accept.type = "button";
  accept.className = "consent-btn consent-accept";
  accept.textContent = "Aceitar";
  accept.addEventListener("click", () => {
    setConsent("granted");
    banner.remove();
    loadProviders();
  });

  actions.append(decline, accept);
  banner.append(text, actions);
  document.body.appendChild(banner);
}

/** Instala o rastreio de clique e carrega os provedores conforme o consentimento. */
export function initAnalytics() {
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const isWhatsApp = href.includes("wa.me");
      const isPrimaryCta = anchor.classList.contains("button-primary");
      if (!isWhatsApp && !isPrimaryCta) return;

      track(isWhatsApp ? "whatsapp_click" : "cta_click", {
        location: locationOf(anchor),
        label: (anchor.textContent || "").trim().slice(0, 40),
      });
    },
    { capture: true },
  );

  const consent = getConsent();
  if (consent === "granted") {
    loadProviders();
  } else if (consent === null) {
    renderConsentBanner();
  }
}
