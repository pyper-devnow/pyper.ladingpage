# Pyper landing

Landing page da Pyper (CRM com WhatsApp, IA e automação comercial). Página única em
React + Vite, publicada em https://pyper.com.br.

## Stack

- React 19 + Vite 6
- TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- Fontes self-hosted (`@fontsource/geist-sans`, `@fontsource/geist-mono`)
- `lucide-react` para ícones
- Vitest para os testes de conteúdo

## Scripts

```bash
npm run dev       # servidor de desenvolvimento (Vite)
npm run build     # tsc + build de produção em dist/
npm run preview   # serve o build de produção localmente
npm run lint      # ESLint
npm run test      # Vitest (vitest run)
```

## Estrutura

- `index.html`: shell da página, meta tags de SEO/OG e o snippet do Microsoft Clarity
- `src/main.tsx`: ponto de entrada, monta `<App />`
- `src/App.tsx`: a página inteira (todas as seções e os mockups de UI)
- `src/lib/site.ts`: todo o conteúdo textual e os dados estruturados (hero, FAQ, JSON-LD...). Editar copy aqui, não no JSX
- `src/lib/site.test.ts`: testes que travam o conteúdo aprovado
- `src/components/KanbanWorkspaceClient.tsx`: mockup do quadro kanban
- `src/globals.css`: todos os estilos, com os tokens de tema no `:root`
- `public/`: imagens, `robots.txt`, `sitemap.xml`

## Deploy

Build estático em `dist/`, publicado na Vercel.

## Revisão em andamento

`docs/REVISAO-LANDING.md` tem o backlog de melhorias priorizado.
