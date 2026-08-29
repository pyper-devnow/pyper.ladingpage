# Notas para agentes

Este projeto é uma landing page em **React + Vite**. Não é Next.js, apesar do histórico do repo
(não existe `app/`, `next` não está nas dependências).

- Página única: toda a UI está em `src/App.tsx`.
- Conteúdo e copy ficam em `src/lib/site.ts`. Alterar texto ali, não no JSX.
- `src/lib/site.test.ts` (Vitest) trava o conteúdo aprovado. Rodar `npm run test` depois de mexer em `site.ts`.
- Estilos: `src/globals.css`, com os tokens de tema no `:root`.
- Sem roteador, sem backend, sem SSR. Build estático: `npm run build` gera `dist/`.
- Backlog de melhorias priorizado: `docs/REVISAO-LANDING.md`.
