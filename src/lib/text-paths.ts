// Caminho "objeto.chave.0.campo" sobre os objetos exportados do site.ts.
// Usado para aplicar os textos do Console e para gerar a lista de campos.
import * as site from "./site";

const FORBIDDEN = new Set(["__proto__", "prototype", "constructor"]);
export const TEXT_KEY_RE = /^[A-Za-z][A-Za-z0-9_]*(\.[A-Za-z0-9_]+){1,5}$/;

type Container = Record<string, unknown>;

function isContainer(value: unknown): value is Container {
  return typeof value === "object" && value !== null;
}

/** Objeto dono do último pedaço do caminho, ou null se o caminho não existe. */
function resolveParent(key: string): { parent: Container; last: string } | null {
  if (!TEXT_KEY_RE.test(key)) return null;
  const parts = key.split(".");
  if (parts.some((part) => FORBIDDEN.has(part))) return null;
  let node: unknown = site as unknown as Container;
  for (const part of parts.slice(0, -1)) {
    if (!isContainer(node) || !Object.prototype.hasOwnProperty.call(node, part)) return null;
    node = node[part];
  }
  if (!isContainer(node)) return null;
  const last = parts[parts.length - 1];
  if (!Object.prototype.hasOwnProperty.call(node, last)) return null;
  return { parent: node, last };
}

/** Texto atual no caminho; undefined se não existe ou não é texto. */
export function getText(key: string): string | undefined {
  const found = resolveParent(key);
  if (!found) return undefined;
  const value = found.parent[found.last];
  return typeof value === "string" ? value : undefined;
}

/** Troca o texto no caminho. Só mexe em texto que já existe; devolve se mudou. */
export function setText(key: string, value: string): boolean {
  const found = resolveParent(key);
  if (!found || typeof found.parent[found.last] !== "string") return false;
  if (found.parent[found.last] === value) return false;
  found.parent[found.last] = value;
  return true;
}
