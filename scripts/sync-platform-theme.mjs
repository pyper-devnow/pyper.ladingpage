import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Run from this repository: node scripts/sync-platform-theme.mjs [platform path]
const platform = resolve(process.argv[2] ?? '../pyper.platform');
const source = readFileSync(resolve(platform, 'src/features/appearance/theme.defaults.ts'), 'utf8');
const kebab = value => value.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
function scale(name) {
  const block = source.match(new RegExp(`const ${name}: ThemeColorScale = \\{([\\s\\S]*?)\\n\\};`));
  if (!block) throw new Error(`Platform theme scale missing: ${name}`);
  return [...block[1].matchAll(/(\w+): "([^"]+)"/g)]
    .map(([, key, value]) => `  --${kebab(key)}: ${value};`).join('\n');
}
const font = source.match(/DEFAULT_FONT = '([^']+)'/)[1];
const radius = source.match(/DEFAULT_RADIUS = "([^"]+)"/)[1];
writeFileSync('src/styles/platform-tokens.css', `/* Generated from pyper.platform/src/features/appearance/theme.defaults.ts.
 * Refresh with: node scripts/sync-platform-theme.mjs
 * Committed locally so the landing builds independently of the platform.
 */
:root {
${scale('LIGHT')}
  --font-sans: ${font};
  --radius: ${radius};
  --radius-md: calc(var(--radius) - 2px);
  --radius-xl: calc(var(--radius) + 4px);
}
.final-card {
${scale('DARK')}
}
`);
