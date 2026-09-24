// Coloca o HTML pré-renderizado da landing dentro do #root do dist/index.html.
// Roda depois de `vite build` e `vite build --ssr src/entry-server.tsx`.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = resolve(root, "dist/index.html");
const ssrDir = resolve(root, "dist-ssr");

const { render } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);
const html = render();
const template = readFileSync(indexPath, "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("dist/index.html sem <div id=\"root\"></div>");
writeFileSync(indexPath, template.replace(marker, `<div id="root">${html}</div>`));
rmSync(ssrDir, { recursive: true, force: true });
console.log(`pré-renderizado: ${(html.length / 1024).toFixed(1)} KB de HTML em dist/index.html`);
