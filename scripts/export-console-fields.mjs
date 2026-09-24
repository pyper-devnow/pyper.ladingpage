// Gera a lista de campos editáveis da landing para o Console Master
// (pyper.platform/src/features/platform-landing/landing-fields.gen.ts).
// Uso: npm run export:console-fields
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = resolve(
  root,
  process.env.CONSOLE_FIELDS_OUT ??
    "../pyper.platform/src/features/platform-landing/landing-fields.gen.ts",
);

const dir = mkdtempSync(join(tmpdir(), "landing-fields-"));
const out = join(dir, "fields.mjs");
try {
  await build({
    stdin: {
      contents: `export { CONTENT_FIELD_GROUPS } from "./src/lib/content-fields";
export { getText } from "./src/lib/text-paths";`,
      resolveDir: root,
      loader: "ts",
    },
    bundle: true,
    format: "esm",
    platform: "node",
    outfile: out,
    logLevel: "silent",
  });
  const { CONTENT_FIELD_GROUPS, getText } = await import(pathToFileURL(out).href);

  const groups = CONTENT_FIELD_GROUPS.map((group) => ({
    id: group.id,
    title: group.title,
    ...(group.description ? { description: group.description } : {}),
    fields: group.fields.map((field) => {
      const value = getText(field.key);
      if (typeof value !== "string") throw new Error(`Campo sem texto no site.ts: ${field.key}`);
      const multiline = field.multiline ?? value.length > 90;
      return {
        key: field.key,
        label: field.label,
        default: value,
        multiline,
        max: field.max ?? (multiline ? 1000 : 200),
      };
    }),
  }));

  const body = `// Gerado por pyper.ladingpage/scripts/export-console-fields.mjs — não editar à mão.
export interface LandingField {
  key: string;
  label: string;
  default: string;
  multiline: boolean;
  max: number;
}
export interface LandingFieldGroup {
  id: string;
  title: string;
  description?: string;
  fields: LandingField[];
}
export const LANDING_FIELD_GROUPS: LandingFieldGroup[] = ${JSON.stringify(groups, null, 2)};
`;
  writeFileSync(target, body);
  // Formata com o prettier do pyper.platform, senão o eslint de lá reprova o arquivo.
  try {
    execFileSync("npx", ["prettier", "--write", target], {
      cwd: resolve(dirname(target), "../../.."),
      stdio: "ignore",
    });
  } catch {
    console.warn("prettier não rodou: formate o arquivo gerado no pyper.platform.");
  }
  const total = groups.reduce((n, g) => n + g.fields.length, 0);
  console.log(`${groups.length} grupos, ${total} campos -> ${target}`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
