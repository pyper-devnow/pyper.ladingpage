// Conteúdo da landing gerido pelo master no Console da Pyper.
//
// O site continua estático: os textos de src/lib/site.ts são o padrão e o que o
// Console salva só substitui campo preenchido. A última resposta fica guardada
// no navegador, então quem volta já abre com o texto novo, sem piscar.
import { apiBase } from "./api-base";
import * as site from "./site";
import { hero, landingCopy, siteConfig, siteMetadata } from "./site";
import { getText, setText } from "./text-paths";

export type LandingAnnouncement = {
  enabled: boolean;
  text: string;
  linkLabel: string;
  linkUrl: string;
};

export type LandingContent = {
  announcement?: Partial<LandingAnnouncement> | null;
  hero?: Partial<Record<"eyebrow" | "title" | "subtitle" | "primaryCta" | "secondaryCta", string | null>> | null;
  contact?: Partial<Record<"whatsappPhone" | "whatsappMessage" | "email", string | null>> | null;
  seo?: Partial<Record<"title" | "description", string | null>> | null;
  /** Qualquer texto do site.ts pelo caminho (ex.: "faqItems.0.question"). */
  texts?: Record<string, string> | null;
};

const CACHE_KEY = "pyper_landing_content";
const TIMEOUT_MS = 1500;

type Mutable = Record<string, unknown>;

// Padrões do site.ts, guardados antes de qualquer mudança: campo limpo no
// Console volta ao texto original.
const defaults = {
  hero: { ...hero } as Mutable,
  contact: {
    whatsappPhone: siteConfig.whatsappPhone,
    whatsappMessage: siteConfig.whatsappMessage,
    email: siteConfig.email,
  } as Mutable,
  seo: { title: siteMetadata.title, description: siteMetadata.description } as Mutable,
};

// Padrão de cada texto trocado pelo Console, para voltar quando a chave sai.
const textDefaults = new Map<string, string>();
const headlineDefaults = {
  headline: landingCopy.headline as string,
  headlineAccent: landingCopy.headlineAccent as string,
};

let current: LandingContent = {};
const listeners = new Set<() => void>();

function filled(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

/** Valor do Console quando preenchido; senão o padrão do site. */
export function pick(value: unknown, fallback: unknown): unknown {
  return filled(value) ? value.trim() : fallback;
}

function assignAll(target: Mutable, base: Mutable, override: Mutable | null | undefined): boolean {
  let changed = false;
  for (const key of Object.keys(base)) {
    const next = pick(override?.[key], base[key]);
    if (target[key] !== next) {
      target[key] = next;
      changed = true;
    }
  }
  return changed;
}

function setMeta(name: string, content: string) {
  const el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (el) el.content = content;
}

/**
 * Textos por caminho. Só troca texto que já existe no site.ts; chave que saiu
 * do Console volta ao padrão.
 */
export function applyTexts(texts: Record<string, string> | null | undefined): boolean {
  let changed = false;
  const next = texts ?? {};
  for (const [key, original] of textDefaults) {
    if (!filled(next[key])) changed = setText(key, original) || changed;
  }
  for (const [key, value] of Object.entries(next)) {
    if (!filled(value)) continue;
    const before = getText(key);
    if (before === undefined) continue;
    if (!textDefaults.has(key)) textDefaults.set(key, before);
    changed = setText(key, value.trim()) || changed;
  }
  return changed;
}

/** Aplica o conteúdo sobre os objetos do site.ts. Devolve se algo mudou. */
export function applyContent(content: LandingContent | null | undefined): boolean {
  const next = content ?? {};
  // Os passos abaixo repõem o padrão antes de aplicar; o que vale é a foto final.
  const before = JSON.stringify(site);
  assignAll(hero as unknown as Mutable, defaults.hero, next.hero as Mutable);
  assignAll(siteConfig as unknown as Mutable, defaults.contact, next.contact as Mutable);
  assignAll(siteMetadata as unknown as Mutable, defaults.seo, next.seo as Mutable);
  // Campo antigo "Título" do Console: vira o título inteiro do topo (uma linha).
  const legacyTitle = pick(next.hero?.title, null) as string | null;
  const headline = (legacyTitle
    ? { headline: legacyTitle, headlineAccent: "" }
    : headlineDefaults) as Mutable;
  assignAll(landingCopy as unknown as Mutable, headline, null);
  applyTexts(next.texts);
  let changed = JSON.stringify(site) !== before;
  if (JSON.stringify(current.announcement ?? null) !== JSON.stringify(next.announcement ?? null)) {
    changed = true;
  }
  current = next;
  try {
    if (typeof document !== "undefined") {
      document.title = siteMetadata.title;
      setMeta("description", siteMetadata.description);
    }
  } catch {
    // sem DOM (teste): segue
  }
  if (changed) listeners.forEach((fn) => fn());
  return changed;
}

/** Aviso do topo, só quando ligado e com texto. */
export function getAnnouncement(): LandingAnnouncement | null {
  const a = current.announcement;
  if (!a?.enabled || !filled(a.text)) return null;
  return {
    enabled: true,
    text: a.text.trim(),
    linkLabel: filled(a.linkLabel) ? a.linkLabel.trim() : "",
    linkUrl: filled(a.linkUrl) ? a.linkUrl.trim() : "",
  };
}

export function onContentChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Síncrono, antes do primeiro render: usa o que ficou guardada da última visita. */
export function applyCachedContent(): boolean {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return false;
    return applyContent(JSON.parse(raw) as LandingContent);
  } catch {
    return false;
  }
}

/** Busca o conteúdo atual no backend. `true` se algo mudou na página. */
export async function loadRemoteContent(): Promise<boolean> {
  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = setTimeout(() => controller?.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${apiBase()}/public/landing/content`, { signal: controller?.signal });
    if (!res.ok) return false;
    const body = (await res.json()) as { content?: LandingContent | null };
    const content = body?.content ?? {};
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(content));
    } catch {
      // sem localStorage: só não guarda
    }
    return applyContent(content);
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
