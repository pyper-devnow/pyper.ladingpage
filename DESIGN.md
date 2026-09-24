# Design system da landing Pyper

A fonte de referência é `pyper.platform/src/features/appearance/theme.defaults.ts` (DEFAULT_THEME), complementada por `src/styles.css` e `src/components/ui/button.tsx` da plataforma.

## Tokens

`src/styles/platform-tokens.css` contém uma cópia gerada do tema claro padrão e do tema escuro aplicado ao CTA final. O build é independente do repositório irmão. Atualize a partir da raiz da landing com:

```sh
node scripts/sync-platform-theme.mjs ../pyper.platform
```

Use tokens semânticos nos componentes. `--muted` é superfície; texto secundário usa `--muted-foreground`. Os aliases de compatibilidade em `globals.css` adaptam componentes antigos da landing.

## Tipografia e componentes

- Mesma pilha da plataforma: Inter, ui-sans-serif, system-ui, sans-serif. Assim como a plataforma, a landing não baixa Inter; usa a fonte disponível ou fallback do sistema.
- Raio-base: 8 px; botões: 6 px (`radius-md`).
- Botões com peso 600, gap de 8 px, estados de hover e foco sem deslocamento.
- CTAs mantêm área de toque mínima de 44 px por serem uma superfície pública responsiva.
- O fundo do botão claro deriva de primary misturado com 15% de preto para contraste do texto branco. O valor canônico de primary permanece intacto.

## Layout

A landing preserva sua composição de marketing: título de destaque, demonstração visual do produto, seletor de recursos e CTA de demonstração. O layout não replica a densidade ou a navegação da aplicação autenticada.
