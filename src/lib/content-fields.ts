// Campos da landing que o Console Master pode editar, na ordem da página.
//
// A chave é o caminho no site.ts (ex.: "faqItems.0.question"). O padrão é o
// valor que está lá hoje; o Console mostra esse texto e só guarda o que mudar.
// `npm run export:console-fields` gera a lista para o pyper.platform.
import {
  aiMcp,
  automationFlows,
  capabilities,
  faqItems,
  landingCopy,
  painPoints,
  productShowcases,
  sectionCopy,
  setupExample,
  agentToolsExample,
} from "./site";

export interface ContentFieldDef {
  key: string;
  label: string;
  multiline?: boolean;
  max?: number;
}

export interface ContentFieldGroup {
  id: string;
  title: string;
  description?: string;
  fields: ContentFieldDef[];
}

const range = (list: readonly unknown[]) => list.map((_, index) => index);

export const CONTENT_FIELD_GROUPS: ContentFieldGroup[] = [
  {
    id: "topo",
    title: "Topo da página",
    description: "A primeira coisa que o visitante vê.",
    fields: [
      { key: "hero.eyebrow", label: "Frase pequena acima do título" },
      { key: "landingCopy.headline", label: "Título (primeira linha)" },
      { key: "landingCopy.headlineAccent", label: "Título (segunda linha, em verde)" },
      { key: "hero.subtitle", label: "Texto abaixo do título", multiline: true },
      { key: "hero.primaryCta", label: "Botão principal (abre o WhatsApp)" },
      { key: "hero.secondaryCta", label: "Botão secundário" },
      { key: "landingCopy.demoNote", label: "Frase abaixo dos botões" },
      { key: "landingCopy.previewTitle", label: "Título da imagem do produto" },
      { key: "landingCopy.previewLabel", label: "Etiqueta da imagem do produto" },
      ...range(landingCopy.journey).map((i) => ({
        key: `landingCopy.journey.${i}`,
        label: `Passo ${i + 1} da faixa de benefícios`,
      })),
    ],
  },
  {
    id: "menu",
    title: "Menu do topo",
    description: "Links do menu no computador.",
    fields: [
      { key: "sectionCopy.nav.aiMcp", label: "Link para IA e MCP" },
      { key: "sectionCopy.nav.solutions", label: "Link para Soluções" },
      { key: "sectionCopy.nav.autoImplementation", label: "Link para Configuração" },
      { key: "sectionCopy.nav.faq", label: "Link para Perguntas frequentes" },
      { key: "sectionCopy.nav.support", label: "Link para o Suporte" },
      { key: "sectionCopy.nav.login", label: "Link para entrar na plataforma" },
    ],
  },
  {
    id: "ia-mcp",
    title: "Seção IA e MCP",
    fields: [
      { key: "aiMcp.kicker", label: "Frase pequena acima do título" },
      { key: "aiMcp.title", label: "Título" },
      { key: "aiMcp.description", label: "Texto", multiline: true },
      ...range(aiMcp.benefits).map((i) => ({
        key: `aiMcp.benefits.${i}`,
        label: `Benefício ${i + 1}`,
      })),
      { key: "aiMcp.cta", label: "Botão" },
      { key: "aiMcp.demoTitle", label: "Exemplo: título" },
      { key: "aiMcp.demoLabel", label: "Exemplo: etiqueta" },
      { key: "aiMcp.request", label: "Exemplo: pedido feito ao agente" },
      ...range(aiMcp.steps).flatMap((i) => [
        { key: `aiMcp.steps.${i}.title`, label: `Exemplo: passo ${i + 1} (título)` },
        { key: `aiMcp.steps.${i}.text`, label: `Exemplo: passo ${i + 1} (texto)` },
      ]),
      { key: "aiMcp.result", label: "Exemplo: resposta do agente" },
      { key: "aiMcp.control", label: "Exemplo: aviso de permissões" },
    ],
  },
  {
    id: "auto-implantacao",
    title: "Configuração da operação",
    fields: [
      { key: "setupExample.kicker", label: "Frase acima do título" },
      { key: "setupExample.title", label: "Título" },
      { key: "setupExample.description", label: "Descrição", multiline: true },
      ...range(setupExample.steps).flatMap((i) => [
        { key: `setupExample.steps.${i}.title`, label: `Passo ${i + 1}: título` },
        { key: `setupExample.steps.${i}.text`, label: `Passo ${i + 1}: texto`, multiline: true },
      ]),
    ],
  },
  {
    id: "ferramentas-exemplo",
    title: "Exemplos das ferramentas de IA",
    fields: [
      { key: "agentToolsExample.title", label: "Título" },
      { key: "agentToolsExample.instruction", label: "Instrução", multiline: true },
      ...range(agentToolsExample.tools).flatMap((i) => [
        { key: `agentToolsExample.tools.${i}.description`, label: `Ferramenta ${i + 1}: descrição`, multiline: true },
        { key: `agentToolsExample.tools.${i}.example`, label: `Ferramenta ${i + 1}: situação`, multiline: true },
        { key: `agentToolsExample.tools.${i}.result`, label: `Ferramenta ${i + 1}: resultado`, multiline: true },
      ]),
    ],
  },
  {
    id: "problemas",
    title: "Seção dos problemas",
    description: "Os problemas de quem vende pelo WhatsApp sem sistema.",
    fields: [
      { key: "sectionCopy.pain.kicker", label: "Frase pequena acima do título" },
      { key: "sectionCopy.pain.title", label: "Título (primeira linha)" },
      { key: "sectionCopy.pain.titleAccent", label: "Título (segunda linha, em destaque)" },
      { key: "sectionCopy.pain.description", label: "Texto", multiline: true },
      ...range(painPoints).flatMap((i) => [
        { key: `painPoints.${i}.title`, label: `Problema ${i + 1}: título` },
        { key: `painPoints.${i}.text`, label: `Problema ${i + 1}: texto`, multiline: true },
      ]),
    ],
  },
  {
    id: "solucoes",
    title: "Seção Soluções",
    fields: [
      { key: "sectionCopy.solution.kicker", label: "Frase pequena acima do título" },
      { key: "sectionCopy.solution.title", label: "Título (primeira linha)" },
      { key: "sectionCopy.solution.titleAccent", label: "Título (segunda linha)" },
      ...range(landingCopy.productViews).map((i) => ({
        key: `landingCopy.productViews.${i}`,
        label: `Botão de exemplo ${i + 1}`,
      })),
      ...range(productShowcases).flatMap((i) => [
        { key: `productShowcases.${i}.title`, label: `Exemplo ${i + 1}: título` },
        { key: `productShowcases.${i}.text`, label: `Exemplo ${i + 1}: texto`, multiline: true },
      ]),
      { key: "sectionCopy.solution.automationTitle", label: "Exemplo 3: título" },
      ...range(automationFlows).map((i) => ({
        key: `automationFlows.${i}.title`,
        label: `Exemplo 3: automação ${i + 1}`,
      })),
    ],
  },
  {
    id: "prospect",
    title: "Seção Prospect Inteligente",
    fields: [
      { key: "sectionCopy.prospect.kicker", label: "Etiqueta acima do título" },
      { key: "sectionCopy.prospect.title", label: "Título" },
      { key: "sectionCopy.prospect.description", label: "Texto", multiline: true },
      ...range(sectionCopy.prospect.features).map((i) => ({
        key: `sectionCopy.prospect.features.${i}`,
        label: `Vantagem ${i + 1}`,
      })),
      { key: "sectionCopy.prospect.windowTitle", label: "Exemplo: título da janela" },
      ...range(sectionCopy.prospect.searches).map((i) => ({
        key: `sectionCopy.prospect.searches.${i}`,
        label: `Exemplo: busca ${i + 1}`,
      })),
    ],
  },
  {
    id: "faixa",
    title: "Faixa de destaque",
    fields: [
      { key: "sectionCopy.trust.strong", label: "Frase em negrito" },
      { key: "sectionCopy.trust.text", label: "Complemento" },
    ],
  },
  {
    id: "funcionalidades",
    title: "Funcionalidades",
    fields: range(capabilities).flatMap((i) => [
      { key: `capabilities.${i}.title`, label: `Funcionalidade ${i + 1}: título` },
      { key: `capabilities.${i}.text`, label: `Funcionalidade ${i + 1}: texto`, multiline: true },
    ]),
  },
  {
    id: "faq",
    title: "Perguntas frequentes",
    fields: [
      { key: "sectionCopy.faq.kicker", label: "Frase pequena acima do título" },
      { key: "sectionCopy.faq.title", label: "Título" },
      ...range(faqItems).flatMap((i) => [
        { key: `faqItems.${i}.question`, label: `Pergunta ${i + 1}` },
        { key: `faqItems.${i}.answer`, label: `Resposta ${i + 1}`, multiline: true },
      ]),
      { key: "faqSupport.title", label: "Quadro do assistente: título" },
      { key: "faqSupport.text", label: "Quadro do assistente: texto", multiline: true },
      { key: "faqSupport.cta", label: "Quadro do assistente: botão" },
    ],
  },
  {
    id: "final",
    title: "Chamada final",
    fields: [
      { key: "landingCopy.finalTitle", label: "Título" },
      { key: "sectionCopy.final.text", label: "Texto", multiline: true },
      { key: "sectionCopy.final.secondaryCta", label: "Botão secundário" },
    ],
  },
  {
    id: "rodape",
    title: "Rodapé",
    fields: [
      { key: "sectionCopy.footer.tagline", label: "Frase ao lado do nome" },
      { key: "sectionCopy.footer.instagram", label: "Link do Instagram" },
      { key: "sectionCopy.footer.terms", label: "Link dos Termos de Uso" },
      { key: "sectionCopy.footer.privacy", label: "Link da Política de Privacidade" },
    ],
  },
  {
    id: "imagens",
    title: "Imagens (texto alternativo)",
    description: "Descrição das imagens para o Google e para quem usa leitor de tela.",
    fields: [
      { key: "siteConfig.logo.alt", label: "Logo" },
    ],
  },
];
