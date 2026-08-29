# Revisão da landing Pyper

Revisão feita sobre a página renderizada (dev server, desktop 1600px + mobile ~555px) em 2026-08-29.
Contexto estratégico: Pyper é o produto-cunha (venda / atendimento / automação no WhatsApp). A landing
é o motor de aquisição, então a revisão olha conversão e credibilidade antes de código.

Vamos fechar item a item, por prioridade.

---

## Status

| Item | Estado |
| --- | --- |
| Mascote "Clique em mim!" + modal de urgência falsa | feito |
| P0.1 Botão primário ilegível | feito |
| P0.2 Estratégia de CTA contraditória | feito (resta `offers.price` no JSON-LD) |
| P0.3 Prova social | adiado (sem material) |
| P1.1 "Métricas" vazias | feito |
| P1.2 Preço / seção de planos | aberto |
| P1.3 "Auto Implantação" muito abaixo | feito (subiu p/ 3ª seção) |
| P1.4 Analytics de funil | feito (eventos no Clarity; GA4/Plausible por 1 ID) |
| P1.5 `scroll-margin-top` nas âncoras | feito (já funcionava; nudge no mobile) |
| P2.1 Contraste secundário (chips) | feito (a11y 100) |
| P2.2 Acessibilidade pontual (heading-order, aria-label) | feito |
| P2.3 OG image quebrada | feito (1200x630 gerado) |
| P2.4 Repo desatualizado (README/AGENTS/gitignore) | feito |
| P2.5 Assets órfãos em `public/` | feito (com ressalva) |
| P2.6 Cookies de terceiros / LGPD | feito (consentimento gate + banner) |
| P2.7 Typo no nome (repo no GitHub) | aguarda ação sua no GitHub |
| P2.8 Testes de conteúdo desatualizados | feito (npm run test verde) |
| P2.9 `dist/` commitado | feito (untracked + gitignore) |
| Extra Templates da Auto Implantação (Vendas/Atendimento/Pós-venda) | feito |
| Extra Card "Projeto em branco" -> "Em branco" | feito |
| Extra Tailwind `@source not` para `public/` e `dist/` | feito |
| Medição no build de produção | feito (Lighthouse 100/100/100, LCP 245ms) |
| Prova social (P0.3) | adiado, aguarda material |
| Preço / planos (P1.2) | aberto, precisa de decisão de pricing |
| Rename do repo (P2.7) | aguarda ação sua no GitHub |
| Página de política de privacidade / termos | feito (rascunho, revisar c/ jurídico) |
| Rodapé: tagline + CNPJ + e-mail + ano dinâmico | feito |

---

## Feito nesta sessão

- [x] Removido o mascote flutuante "Clique em mim!" e o modal de urgência falsa
      ("Parabéns, você foi escolhido!", contador regressivo, "oferta válida só nessa sessão").
      Removido de `src/App.tsx` (componente `MascotFollower` + uso) e o CSS órfão em `src/globals.css`.
      O balão de WhatsApp fixo (`.floating-whatsapp`) foi mantido.
- [x] **P0.1** Botão primário legível. Novo token `--brand-green-strong: #05733f`; `.button-primary`
      passa de `#69dd96` (1.69:1) para `#05733f` (~6:1). `.feature-pill` e `.stats-value` deixam de
      usar verde claro como texto e passam a `--primary`. Verificado: os 3 alvos saíram do relatório
      de contraste do Lighthouse. Sobra a cauda de chips decorativos, ver P2.1.
- [x] **P0.2** CTA padronizado. Todo botão primário agora é "Começar Agora" (hero, nav,
      dashboard-overview, CTA final), todos apontando para o WhatsApp. O balão flutuante continua
      sendo o acesso ao WhatsApp. CTA final: primário "Começar Agora", secundário passou de
      "Falar com consultor" (ia pro WhatsApp) para "Ver como funciona" (ancora em #solucoes),
      igual ao hero. Removido o label "Criar minha conta grátis" (não há self-serve). `hero.primaryCta`
      em `src/lib/site.ts` também atualizado.
      Pendente: `jsonLdGraph.offers.price = "0"` ainda declara produto grátis. Rever quando definir
      pricing (P1.2).
- [~] **P0.3** Prova social: adiada, sem material por enquanto.
- [x] Copy: card "Projeto em branco" da Auto Implantação virou "Em branco"
      (`autoImplementation.blankWorkspace.title` em `src/lib/site.ts`).
- [x] Tailwind: `@source not "../public"` e `@source not "../dist"` no `globals.css`
      (ver ressalva em P2.5).
- [x] Templates da Auto Implantação: "Tarefas" e "Logística" não faziam sentido num produto de
      venda. Agora são **Vendas / Atendimento / Pós-venda** (fila de WhatsApp e ciclo de cliente).
      `workspaceTemplates` em `src/lib/site.ts`, `workspaceIconMap` em `src/App.tsx` (ícones
      `support`/`followup`, removido import `Truck`), e a asserção correspondente em
      `src/lib/site.test.ts` foi atualizada.
- [x] **P1.1** faixa de "métricas" reescrita como capacidades. **P1.3** seção Auto Implantação
      subiu para a 3ª posição. **P1.4** camada `src/lib/analytics.ts` (eventos de CTA no Clarity
      hoje; GA4/Plausible por 1 ID em `site.ts`).
- [x] **P2.2** heading-order (`h4`->`h3`) e aria-labels redundantes do mobile-dock.
      **P2.4** README/AGENTS/.gitignore alinhados ao Vite. **P2.5** assets órfãos removidos.
      **P2.8** `site.test.ts` alinhado ao `site.ts` (`npm run test` verde). **P2.9** `dist/`
      destrackeado + gitignorado.
- [x] **P1.5** verificado (já funcionava; nudge no mobile). **P2.1** contraste zerado,
      **a11y 100**. **P2.3** `opengraph-image.png` 1200x630 gerado. **P2.6** analytics só
      pós-consentimento + banner LGPD; Clarity saiu do `index.html`.

---

## P0 — bloqueia conversão ou credibilidade

### P0.1 — Botão primário ilegível (contraste 1.69:1) [FEITO]
O verde `#69dd96` com texto branco dava contraste 1.69:1 (mínimo WCAG AA é 4.5:1). Era o botão de
dinheiro, repetido em hero, nav ("Começar Agora"), CTA final e mais. Também atingia `stats-value`
e `feature-pill` (verde claro sobre fundo claro).
- Feito: novo token `--brand-green-strong: #05733f` (~6:1); `.button-primary` usa ele;
  `.feature-pill` e `.stats-value` passaram a `--primary`. Verificado no Lighthouse.
- Onde: `src/globals.css`.

### P0.2 — Estratégia de CTA contraditória [FEITO, com pendência]
A página não decide se é self-serve ou sales-assisted:
- Nav: "Começar Agora"
- CTA final: "Criar minha conta grátis" + "Falar com consultor"
- Subtítulo do CTA final: "Fale pelo WhatsApp e agende uma conversa"
- JSON-LD: `offers.price = "0"` (produto grátis)
- Todos os botões apontam para o mesmo link de WhatsApp de "agendar demonstração"

Decisão tomada: não há self-serve. Todo botão primário virou "Começar Agora" apontando para o
WhatsApp; o balão flutuante continua sendo o acesso ao WhatsApp.
- Feito: label unificado em hero, nav, dashboard-overview e CTA final. CTA final perdeu
  "Criar minha conta grátis" e o secundário "Falar com consultor" virou "Ver como funciona"
  (#solucoes). `hero.primaryCta` no `site.ts` atualizado.
- Pendência: `jsonLdGraph.offers.price = "0"` ainda declara produto grátis. Rever no P1.2 (pricing).
- Onde: `src/lib/site.ts`, `src/App.tsx`.

### P0.3 — Zero prova social [ADIADO]
Nenhum logo de cliente, depoimento ou número real na página inteira. É a maior alavanca de
conversão que falta para um ICP que decide numa sessão só.
- Ação: faixa "empresas que usam" + 2 ou 3 depoimentos curtos (nome, empresa, foto).
- Onde: `src/lib/site.ts` (bloco novo) + `src/App.tsx` (seção nova).
- Status: adiado por falta de material. Retomar quando o time reunir logos e depoimentos.

---

## P1 — impacto direto, sem depender de terceiros

### P1.1 — "Métricas" vazias [FEITO]
Era "1 tela / 24/7 / Automatize". Reescrito como faixa de capacidades (sem inventar número):
- "1 tela": conversas, leads e funil no mesmo lugar
- "24/7": agente de IA atende e qualifica na hora
- "Sem código": monte funil e automações arrastando
Quando houver métrica real (tempo de 1ª resposta, leads/mês, % follow-up automatizado), trocar
por número. `src/lib/site.ts` -> `metrics` (o nome do export ainda é `metrics`, não renomeei).

### P1.2 — Sem preço nem seção de planos [ABERTO]
Para wedge mirando startup, preço transparente qualifica e converte.
- Ação: seção "Planos" com valor de entrada e o que é assento / crédito, ou ao menos
  "a partir de R$ X".
- Esforço: médio + decisão de pricing.

### P1.3 — "Auto Implantação" enterrada [FEITO]
- A seção `auto-implementation` subiu da 4ª para a 3ª posição: agora é
  hero -> dashboard-overview -> **auto-implantação** -> painpoints -> prospect -> dados -> solucoes.
  Assim a prova de "no ar em minutos" aparece com a atenção ainda alta, logo depois do produto.
- Bullet no hero: não precisou. O hero (#inicio) já lidera com "Configurado em minutos" +
  "Sem código, sem estresse" + as 3 linhas (Plug & Play / 24h / Sem Código).
- Onde: `src/App.tsx` (`<main>`).

### P1.4 — Analytics de funil [FEITO]
Camada nova em `src/lib/analytics.ts`, inicializada em `src/main.tsx`:
- `track(name, props)` faz fan-out pra GA4 (`gtag`), Plausible (`window.plausible`) e Clarity
  (`clarity('event' / 'set')`).
- Listener delegado de clique captura todo `a[href*="wa.me"]` e todo `.button-primary` e dispara
  `whatsapp_click` / `cta_click` com `location` (id da seção: `inicio`, `visao-geral`,
  `auto-implantacao`, `final-cta`, `nav`, `mobile-dock`, `float`) e `label`. Zero mudança no JSX.
- Manda os eventos pro Clarity **depois do consentimento** (ver P2.6). Verificado ao vivo:
  aceitar -> clicar no CTA dispara `clarity('event','whatsapp_click')`.
- GA4 / Plausible: ligam preenchendo `analytics.ga4Id` ou `analytics.plausibleDomain` em
  `src/lib/site.ts` (hoje vazios = desligados). Sem CSP no projeto, os scripts carregam direto.
- Pixel de Meta / Google Ads: só quando for rodar tráfego pago (fora de escopo agora).

### P1.5 — Header fixo cobre o título ao ancorar [FEITO / não era bug]
Testado ao vivo: navegar por hash (`#visao-geral`, `#auto-implantacao`, `#solucoes`,
`#funcionalidades`, `#faq`) já cai abaixo do header fixo (69px), graças ao
`html { scroll-padding-top: 96px }` que já existia. O que eu tinha visto na review foi artefato
de `window.scrollTo` manual (que ignora `scroll-padding-top`), não o comportamento real da nav.
- Ajuste feito: mobile `scroll-padding-top` de 76px -> 88px, só pra folga.

---

## P2 — higiene e polish

### P2.1 — Contraste secundário [FEITO]
Zerado. `color-contrast` do Lighthouse passou de ~52 nós para 0. **Acessibilidade 95 -> 100.**
- `.workspace-chip.*` (blue/green/purple/amber/red/gray): tons escurecidos para AA (ex. amber
  `#f59e0b` -> `#92400e`, gray `#8793a0` -> `#475569`).
- `.status-pill.orange` -> `#8a4b00`; `.board-channel-badge` -> `#047857`;
  `.data-score-value` -> `var(--primary)`.
- Os greys ad-hoc espalhados (`#7b8580`, `#77817b`, `#9ba29e`, `#98a09b` em `color:`) viraram
  `var(--muted)` num sed só (`border-color: #98a09b` foi preservado).
- Inline nos mockups: `.contact-agent` e `● Online` -> `var(--primary)`; `.click-indicator` ->
  `var(--primary)` sem o `opacity: 0.8`.
- Onde: `src/globals.css`, `src/App.tsx`, `src/components/KanbanWorkspaceClient.tsx`.
- Visual conferido: chips seguem legíveis e color-coded, mockups não ficaram lavados.

### P2.2 — Acessibilidade pontual [FEITO]
- `heading-order`: `<h4>` de "Serasa Experian" e "JusBrasil" viraram `<h3>` (a seção só tinha
  `<h2>` antes, era pulo de nível). CSS `.integration-mini-card h4` -> `h3`.
- `label-content-name-mismatch`: removidos os `aria-label` redundantes dos 4 links do
  `mobile-dock` (o `#faq` tinha `aria-label="Perguntas frequentes"` com texto visível "FAQ"). O
  texto visível já é o nome acessível.
- Verificado no Lighthouse: `heading-order` passou, `label-content-name-mismatch` saiu de cena.
  Acessibilidade 93 -> 95.

### P2.3 — OG image quebrada em produção [FEITO]
`index.html` apontava `https://pyper.com.br/opengraph-image.png`, que não existia. O
`preview-landing-pyper-crm-whatsapp.png` era um print vertical 332x1600, imprestável como OG.
- Gerado um `public/opengraph-image.png` 1200x630 de verdade (wordmark + headline "CRM com
  WhatsApp e IA para automatizar vendas" + o mockup do dashboard, nas cores da marca). As metas
  `og:image` / `twitter:image` já batiam com esse nome, então não mexi no `index.html`.
- `preview-landing-pyper-crm-whatsapp.png` removido (era órfão).

### P2.4 — Repo desatualizado [FEITO]
- `README.md` reescrito para Vite + estrutura real.
- `AGENTS.md` reescrito (era o bloco `nextjs-agent-rules` mandando ler docs de Next.js).
- `.gitignore`: removidas as linhas de Next.js (`/.next/`, `/out/`, `next-env.d.ts`).
- `CLAUDE.md` mantido como `@AGENTS.md` (agora aponta para conteúdo correto).

### P2.5 — Assets órfãos em `public/` [FEITO, com ressalva]
Removidos de `public/`: `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`,
`pyper.png` (mascote), `x.png`. Depois, no P2.8, também `hero-dashboard-pyper.svg`.
- Ressalva: deletar esses arquivos quebrou o dev server. O Tailwind v4 estava varrendo `public/`
  e `dist/` como fontes de conteúdo e o `vite:css-analysis` tentava resolver os SVGs deletados
  (erro 500 em `globals.css`, app não montava). Corrigido adicionando no topo do `globals.css`:
  `@source not "../public";` e `@source not "../dist";`. Foi preciso reiniciar o Vite limpando
  `node_modules/.vite`.
- Mantidos (não deletados): `logo-pyper.png` (variante de logo sem uso, mas arriscado),
  `preview-landing-pyper-crm-whatsapp.png` (candidato a OG, ver P2.3).
- `dist/` foi destrackeado no P2.9, então as cópias lá deixaram de importar.

### P2.6 — Cookies de terceiros / LGPD [FEITO]
O Clarity carregava direto do `index.html`, setando cookies sem consentimento.
- Snippet inline do Clarity removido do `index.html`.
- `src/lib/analytics.ts` agora gerencia consentimento: nada carrega (Clarity, GA4, Plausible)
  antes de "Aceitar". Escolha guardada em `localStorage` (`pyper_consent` = granted/denied).
- Banner de consentimento vanilla (renderizado pelo próprio `analytics.ts`), estilo `.consent-banner`
  em `globals.css`, acima do mobile-dock. Botões "Recusar" / "Aceitar".
- O listener de clique nos CTAs é instalado sempre; `track()` vira no-op enquanto nenhum provedor
  estiver carregado.
- Testado ao vivo: sem consentimento nenhum script de analytics é injetado; "Aceitar" injeta o
  Clarity e persiste; "Recusar" persiste e não injeta nada.
- No build de produção o Lighthouse `best-practices` foi de 77 para **100**.
- Texto do banner simplificado (sem jargão) + link "Saiba mais" para `/privacidade.html`.

### Rodapé + identificação legal [FEITO]
- Tagline trocada de "Inteligência Artificial para seu CRM" (estreito, fora de posição) para
  "CRM com WhatsApp e IA para automatizar vendas" (= o h2 do hero).
- Ano do copyright agora é dinâmico (`new Date().getFullYear()`).
- Linha legal nova no rodapé: **Pyper LTDA · CNPJ 67.791.377/0001-87 · contato@pyper.com.br**
  (`siteConfig.legalName` / `siteConfig.cnpj` novos; `legalName` / `taxID` / `email` também
  entraram no `Organization` do JSON-LD).
- Links **Termos de Uso** e **Política de Privacidade** adicionados ao rodapé.
- Criadas `public/termos.html` e `public/privacidade.html`: páginas estáticas, no visual da
  marca, com aviso "Rascunho" e trechos `[ ]` a preencher (endereço, DPO, foro, data). A de
  privacidade é orientada a LGPD (bases legais, Clarity, direitos do art. 18). **Precisam de
  revisão jurídica antes de publicar.** `noindex` nas duas.

### P2.7 — Nome com typo [AGUARDA AÇÃO NO GITHUB]
Não é só a pasta local: o repositório no GitHub é `pyper-devnow/pyper.ladingpage` ("lading").
Renomear só a pasta local desalinha do nome do repo e do clone de todo mundo, então é meia
correção. O certo:
1. GitHub -> Settings do repo -> renomear para `pyper.landingpage`. O GitHub mantém redirect da
   URL antiga e a Vercel acompanha sozinha.
2. Local: `mv pyper.ladingpage pyper.landingpage` e
   `git remote set-url origin https://github.com/pyper-devnow/pyper.landingpage.git`.
Ação é sua (é rename de repo, mexe com Vercel e colaboradores). Não fiz nada aqui.

### P2.8 — Testes de conteúdo desatualizados [FEITO]
`src/lib/site.test.ts` travava strings que não batiam mais com `src/lib/site.ts` (a fonte da
verdade, junto do `index.html`). Alinhado ao `site.ts` atual:
- `siteMetadata.title` -> "Pyper | CRM com WhatsApp, Inteligência Artificial e Automação".
- `siteMetadata.description` -> substring "CRM integrado com WhatsApp e Inteligência Artificial".
- `heroDashboard.src` -> "/dashboard-crm-pyper.png"; adicionada checagem de `height`.
- Removido o teste que lia `public/hero-dashboard-pyper.svg` (asset morto). O SVG foi deletado e
  os imports `node:fs` / `node:path` saíram do teste.
- Asserção de `workspaceTemplates` já vinha sincronizada da sessão anterior.
- `npm run test`: 5 passando, verde.

### P2.9 — `dist/` está commitado [FEITO]
`/dist` adicionado ao `.gitignore` e `git rm -r --cached dist` (arquivos seguem no disco, só
saíram do tracking). O build passa a ser responsabilidade do deploy (Vercel roda `npm run build`,
não existe `vercel.json`). Isso também elimina a origem do problema do Tailwind varrer o build.

---

## Medição no build de produção [FEITO]

`npm run build` compila limpo (corrigi de passagem 2 erros de `tsc` que a remoção do mascote
tinha deixado: imports `React` e `useRef` sem uso em `App.tsx`).

Lighthouse mobile sobre `npm run preview` (localhost, sem throttling):
- Acessibilidade 100, Best Practices 100, SEO 100.
- LCP 245 ms, CLS 0.00.
- Única falha: `llms-txt` (não existe `/llms.txt`; convenção nova e opcional pra crawlers de IA).
- Bundle: JS 265 kB (78 kB gzip), CSS 76 kB (27 kB gzip).
- Ressalva: número de performance real depende do deploy (CDN/HTTP2/throttling 4G). O DOM é
  grande por causa dos mockups; é o que mais pode pesar em mobile real.

---

## Scorecard Lighthouse (dev, mobile, navigation)

| Categoria | Início (dev) | Agora (build de produção) |
| --- | --- | --- |
| Acessibilidade | 93 | 100 |
| Best Practices | 77 | 100 |
| SEO | 100 | 100 |
| Performance | não medida | LCP 245 ms / CLS 0 (local, sem throttling) |

Única falha restante no Lighthouse: `llms-txt` (opcional).
