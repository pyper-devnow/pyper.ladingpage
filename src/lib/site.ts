
export const siteConfig = {
  name: "Pyper",
  legalName: "Pyper LTDA",
  cnpj: "67.791.377/0001-87",
  url: "https://pyper.com.br",
  whatsappPhone: "558581086339",
  whatsappMessage: "Olá, quero agendar uma demonstração da Pyper.",
  email: "contato@pyper.com.br",
  logo: {
    src: "/logo-pyper-crm-v2.png",
    schemaSrc: "/logo-pyper-crm-v2.png",
    alt: "Logo da Pyper",
    width: 1965,
    height: 800,
  },
} as const;

/**
 * Suporte atendido pelo próprio agente da Pyper (SDD-13-A5, dogfooding).
 *
 * Mora no produto, não aqui: é o mesmo motor que o cliente contrata, com a
 * nossa base de conhecimento, o nosso teto de abuso e o transbordo caindo no
 * time. Duplicar o chat neste site estático significaria manter duas
 * implementações do mesmo atendimento — e a que o visitante veria não seria a
 * que a gente vende.
 */
export const supportUrl = "https://app.pyper.com.br/suporte";

export function buildWhatsAppUrl(message: string = siteConfig.whatsappMessage) {
  return `https://wa.me/${siteConfig.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

// Analytics. Vazio = desligado (os eventos de funil continuam indo pro Clarity,
// que já está no index.html). Preencha um dos dois para ligar GA4 ou Plausible.
export const analytics = {
  ga4Id: "", // ex: "G-XXXXXXXXXX"
  plausibleDomain: "", // ex: "pyper.com.br"
} as const;

export const hero = {
  eyebrow: "Pyper · CRM e agentes de IA",
  title: "CRM com IA e WhatsApp para automatizar vendas.",
  subtitle:
    "Organize sua operação comercial e coloque agentes de IA para trabalhar com sua equipe. Com MCP, eles consultam informações e executam ações autorizadas no CRM.",
  primaryCta: "Agendar demonstração",
  secondaryCta: "Ver como funciona",
} as const;

export const heroDashboard = {
  src: "/dashboard-crm-pyper.png",
  alt: "Dashboard da Pyper com quadro de tarefas, pipeline e agente de IA",
  width: 1800,
  height: 1040,
} as const;

export const siteMetadata = {
  title: "Pyper | CRM com WhatsApp, Inteligência Artificial e Automação",
  description:
    "CRM integrado com WhatsApp e Inteligência Artificial. Conecte agentes de IA ao seu CRM via MCP para consultar leads, atualizar oportunidades e automatizar o atendimento.",
  keywords: [
    "CRM com WhatsApp",
    "CRM integrado com WhatsApp",
    "melhor CRM para WhatsApp",
    "chatbot IA para WhatsApp",
    "automação de vendas no WhatsApp",
    "qualificação de leads automática",
    "agentes de IA com MCP",
    "CRM com IA",
    "automação comercial Brasil",
  ],
  openGraphTitle: "Pyper | CRM com WhatsApp, Inteligência Artificial e Automação",
  openGraphDescription:
    "CRM integrado com WhatsApp e Inteligência Artificial. Agentes de IA com MCP para consultar leads, atualizar oportunidades e apoiar sua equipe comercial.",
  imageAlt: "Dashboard da Pyper com CRM integrado ao WhatsApp e agentes de IA",
} as const satisfies {
  title: string;
  description: string;
  keywords: readonly string[];
  openGraphTitle: string;
  openGraphDescription: string;
  imageAlt: string;
};

export const metrics = [
  { value: "1 tela", label: "conversas, leads e funil no mesmo lugar" },
  { value: "24/7", label: "agente de IA atende e qualifica na hora" },
  { value: "Sem código", label: "monte funil e automações arrastando" },
] as const;

export const painPoints = [
  {
    icon: "clock",
    title: "Atendimento lento custa vendas",
    text: "Quanto mais tempo um lead fica sem resposta, maior a chance de ele fechar com outra empresa.",
  },
  {
    icon: "scatter",
    title: "Leads ficam espalhados",
    text: "Conversas em celulares, planilhas e anotações tornam o acompanhamento comercial inconsistente.",
  },
  {
    icon: "bell",
    title: "Follow-ups desaparecem",
    text: "Sem lembretes e etapas claras, sua equipe esquece retornos importantes e perde oportunidades quentes.",
  },
] as const;

export const autoImplementation = {
  kicker: "Um ponto de partida para sua equipe",
  title: "Auto Implantação",
  description:
    "Escolha um modelo para vendas, atendimento ou pós-venda. Seu workspace começa com pipeline, dashboard e automações prontos para você adaptar à sua operação.",
  workspaceKicker: "Configure seu workspace",
  workspaceTitle: "Como você vai usar o pyper?",
  workspaceSubtitle:
    "Escolha um modelo e seu workspace já vem com pipeline, dashboard e automações prontos — sem partir de uma tela em branco.",
  blankWorkspace: {
    title: "Em branco",
    description:
      "Comece do zero e configure tudo manualmente. Para usuários avançados.",
    action: "Criar vazio",
  },
  image: {
    src: "/auto-implantacao-workspace-pyper.png",
    alt: "Tela da Pyper para escolher modelos de workspace com pipeline, dashboard e automações prontas",
    width: 1850,
    height: 1048,
  },
} as const;

export const workspaceTemplates = [
  {
    icon: "cart",
    tone: "green",
    title: "Vendas",
    description:
      "Pipeline para times de vendas com estágios de prospecção, negociação e fechamento.",
    tags: [
      { label: "Prospecção", tone: "blue" },
      { label: "Primeiro Contato", tone: "green" },
      { label: "Proposta Enviada", tone: "purple" },
      { label: "Negociação", tone: "amber" },
      { label: "Fechado Ganho", tone: "green" },
      { label: "Fechado Perdido", tone: "red" },
    ],
    stats: [
      { value: "6", label: "estágios", icon: "pipeline" },
      { value: "4", label: "widgets", icon: "widgets" },
      { value: "3", label: "automações", icon: "automation" },
    ],
  },
  {
    icon: "support",
    tone: "green",
    title: "Atendimento",
    description:
      "Fila de conversas do WhatsApp com triagem, acompanhamento de SLA e encerramento por etapa.",
    tags: [
      { label: "Novo", tone: "blue" },
      { label: "Em Atendimento", tone: "amber" },
      { label: "Aguardando Cliente", tone: "purple" },
      { label: "Escalado", tone: "red" },
      { label: "Resolvido", tone: "green" },
    ],
    stats: [
      { value: "5", label: "estágios", icon: "pipeline" },
      { value: "4", label: "widgets", icon: "widgets" },
      { value: "3", label: "automações", icon: "automation" },
    ],
  },
  {
    icon: "followup",
    tone: "green",
    title: "Pós-venda",
    description:
      "Acompanhe cada cliente do fechamento ao onboarding, renovação e reativação.",
    tags: [
      { label: "Contrato Fechado", tone: "green" },
      { label: "Onboarding", tone: "blue" },
      { label: "Cliente Ativo", tone: "green" },
      { label: "Renovação", tone: "amber" },
      { label: "Em Risco", tone: "red" },
    ],
    stats: [
      { value: "5", label: "estágios", icon: "pipeline" },
      { value: "4", label: "widgets", icon: "widgets" },
      { value: "3", label: "automações", icon: "automation" },
    ],
  },
] as const;

export const capabilities = [
  {
    icon: "message",
    title: "CRM com WhatsApp",
    text: "Veja atendimentos, contatos e histórico comercial em uma única visão compartilhada pela equipe.",
  },
  {
    icon: "bot",
    title: "Agente de IA para WhatsApp",
    text: "Automatize respostas, qualifique leads e direcione conversas para o vendedor certo.",
  },
  {
    icon: "kanban",
    title: "Funil de vendas",
    text: "Acompanhe cada oportunidade desde o primeiro contato até fechamento, proposta ou reativação.",
  },
  {
    icon: "workflow",
    title: "Automação comercial",
    text: "Reduza tarefas manuais com fluxos que criam lembretes, atualizam etapas e padronizam processos.",
  },
] as const;

export const productShowcases = [
  {
    icon: "message",
    title: "WhatsApp Oficial Integrado",
    text: "Conversas centralizadas, sem perda de histórico e acessíveis a toda a equipe.",
  },
  {
    icon: "kanban",
    title: "Funil de Vendas Inteligente",
    text: "Relacionamentos que geram valor. Organize seu funil de vendas e não perca oportunidades.",
  },
] as const;

export const automationFlows = [
  {
    icon: "bot",
    title: "Configuração de Agente de IA",
    status: "Ativo",
    steps: [
      {
        type: "Gatilho",
        title: "Mensagem no WhatsApp",
        text: "Quando uma nova mensagem é recebida",
        icon: "message",
        tone: "green",
      },
      {
        type: "Ação",
        title: "Análise por IA",
        text: "Analisa intenção e sentimento",
        icon: "bot",
        tone: "blue",
      },
      {
        type: "Decisão",
        title: "Qualificar / Direcionar",
        text: "Direcionar para vendas ou suporte",
        icon: "workflow",
        tone: "purple",
      },
    ],
  },
  {
    icon: "workflow",
    title: "Automação de Processos de Venda",
    status: "Pronto",
    steps: [
      {
        type: "Gatilho",
        title: "Negócio Fechado",
        text: "Quando o status do negócio for 'Ganho'",
        icon: "workflow",
        tone: "green",
      },
      {
        type: "Ação",
        title: "Criar Fatura",
        text: "Gera PDF e envia para o cliente",
        icon: "kanban",
        tone: "gray",
      },
      {
        type: "Ação",
        title: "Notificar Equipe de Sucesso",
        text: "Alerta no Slack para onboarding",
        icon: "bell",
        tone: "cyan",
      },
    ],
  },
] as const;

export const processSteps = [
  {
    label: "01",
    title: "Captura e centraliza",
    text: "Toda conversa do WhatsApp entra no CRM com histórico, origem e responsável.",
  },
  {
    label: "02",
    title: "Qualifica com IA",
    text: "O agente identifica intenção, coleta informações e ajuda sua equipe a priorizar os melhores leads.",
  },
  {
    label: "03",
    title: "Move o processo",
    text: "Automações criam tarefas, follow-ups e mudanças de etapa para manter o funil em movimento.",
  },
] as const;

export const pipelineStages = [
  { title: "Novo lead", count: "18", accent: "green" },
  { title: "Qualificação", count: "9", accent: "blue" },
  { title: "Proposta", count: "6", accent: "amber" },
  { title: "Fechamento", count: "4", accent: "green" },
] as const;

/** Fecho da seção de dúvidas: quem não achou a dele fala com o agente. */
export const faqSupport = {
  title: "Não achou a sua dúvida?",
  text: "Fale com o nosso assistente virtual. É o mesmo agente que a gente vende — ele responde na hora e chama alguém do time quando precisa.",
  cta: "Falar com o assistente",
} as const;

export const faqItems = [
  {
    question: "A Pyper é indicada para qual tipo de empresa?",
    answer:
      "A Pyper é indicada para empresas que usam WhatsApp para vender, atender ou qualificar leads e precisam organizar o processo comercial sem depender de planilhas.",
  },
  {
    question: "A integração com WhatsApp é oficial?",
    answer:
      "A Pyper foi desenhada para trabalhar com operação profissional de WhatsApp, centralizando atendimentos e histórico para a equipe atuar com mais controle.",
  },
  {
    question: "Preciso saber programar para criar automações?",
    answer:
      "Não. A proposta é permitir que sua operação use fluxos, etapas e agentes de IA sem exigir conhecimento técnico da equipe comercial.",
  },
  {
    question: "Como faço para ver a Pyper funcionando?",
    answer:
      "Clique em Agendar demonstração e fale diretamente pelo WhatsApp. A equipe entende sua operação e mostra o melhor caminho para começar.",
  },
] as const;

export const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      taxID: siteConfig.cnpj,
      url: siteConfig.url,
      logo: `${siteConfig.url}${siteConfig.logo.schemaSrc}`,
      email: siteConfig.email,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+55 85 8108-6339",
        email: siteConfig.email,
        availableLanguage: "Portuguese",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.url}/#software`,
      name: "Pyper CRM",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: siteConfig.url,
      description: siteMetadata.description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
} as const;

export const landingCopy = {
  headline: "Seu CRM organiza.",
  headlineAccent: "Sua IA faz acontecer.",
  finalTitle: "Coloque seu CRM e sua IA para trabalhar juntos.",
  assistantLabel: "Assistente Pyper",
  menuLabel: "Menu de navegação",
  loginLabel: "Entrar na Pyper",
  navigation: [
    { href: "#ia-mcp", label: "IA e MCP" },
    { href: "#solucoes", label: "Soluções" },
    { href: "#auto-implantacao", label: "Auto Implantação" },
    { href: "#faq", label: "Perguntas frequentes" },
  ],
  demoNote: "Conheça a Pyper em uma demonstração com nossa equipe.",
  previewTitle: "Sua operação comercial",
  previewLabel: "Visão do produto",
  journeyLabel: "Do primeiro contato ao fechamento",
  journey: ["Organize sua operação", "Conecte agentes via MCP", "Acompanhe cada venda"],
  productSelectorLabel: "Explore os recursos da Pyper",
  productViews: ["Atendimento no WhatsApp", "Funil de vendas", "Agentes e automações"],
} as const;

export const aiMcp = {
  kicker: "Inteligência artificial conectada via MCP",
  title: "IA que conversa e age no seu CRM.",
  description: "Com MCP, seus agentes acessam as ferramentas autorizadas da Pyper. A conversa ganha contexto e vira ação: consultar um lead, registrar uma oportunidade ou mover um negócio no funil.",
  benefits: [
    "Consulte leads, negócios e produtos durante o atendimento.",
    "Crie oportunidades e atualize etapas com ferramentas do CRM.",
    "Defina quais ferramentas cada agente pode usar.",
  ],
  cta: "Ver a IA em uma demonstração",
  demoTitle: "Agente Pyper + MCP",
  demoLabel: "Exemplo ilustrativo",
  request: "Encontre o negócio da Mariana e mova para a etapa Proposta.",
  steps: [
    { title: "Consulta o contexto", text: "Localiza o lead e o negócio no CRM." },
    { title: "Identifica a etapa", text: "Consulta as etapas disponíveis no funil." },
    { title: "Executa a ação autorizada", text: "Move o negócio usando a ferramenta conectada." },
  ],
  result: "O negócio da Mariana foi movido para Proposta.",
  control: "Ações conforme as permissões e ferramentas habilitadas para o agente.",
} as const;

export const servicePreview = {
  workspace: "Pyper / Atendimento",
  example: "Exemplo ilustrativo",
  contact: "Mariana Silva",
  company: "TechStore",
  fields: [
    { label: "Etapa do negócio", value: "Proposta" },
    { label: "Responsável", value: "Equipe comercial" },
    { label: "Canal de origem", value: "WhatsApp" },
  ],
  title: "Histórico do atendimento",
  events: [
    { title: "Interesse registrado", text: "Mariana quer conhecer a solução para sua equipe.", time: "10:02" },
    { title: "Contexto consultado pela IA", text: "O agente localizou o cadastro e a oportunidade no CRM.", time: "10:03" },
    { title: "Negócio atualizado", text: "A oportunidade avançou para a etapa Proposta.", time: "10:04" },
  ],
  agentTitle: "Agente de IA",
  agentText: "Atendimento conectado ao contexto do cliente e às ferramentas do CRM.",
  agentStatus: "Ferramentas via MCP",
} as const;
