
import { ReactNode, useState, useEffect } from "react";
import { KanbanWorkspaceClient } from "./components/KanbanWorkspaceClient";
import {
  ArrowRight,
  BellRing,
  Bot,
  ShieldCheck,
  Scale,
  FileText,
  CheckCircle2,
  Sparkles,
  QrCode,
  CheckSquare,
  CheckCheck,
  Clock3,
  CreditCard,
  Home as HomeIcon,
  LayoutGrid,
  MessageCircle,
  Paperclip,
  Plus,
  Search,
  Send,
  Smile,
  Split,
  ShoppingCart,
  User,
  Filter,
  BookOpen,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  autoImplementation,
  automationFlows,
  buildWhatsAppUrl,
  capabilities,
  faqItems,
  hero,
  heroDashboard,
  jsonLdGraph,
  metrics,
  painPoints,
  pipelineStages,
  productShowcases,
  siteConfig,
  workspaceTemplates,
} from "@/lib/site";

const Instagram = ({ size = 24, ...props }: { size?: number; [key: string]: any }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const iconMap = {
  bell: BellRing,
  bot: Bot,
  clock: Clock3,
  kanban: LayoutGrid,
  message: MessageCircle,
  scatter: Split,
  workflow: Workflow,
} satisfies Record<string, LucideIcon>;

const contacts = [
  {
    name: "Mariana Silva | TechStore",
    preview: "pode sim",
    time: "17:50",
    badge: null,
    active: true,
    initials: "MS",
    agent: "RAUL RENNER",
  },
  {
    name: "Logística Express",
    preview: "Você: combinado!!",
    time: "17:24",
    badge: null,
    active: false,
    initials: "LE",
    agent: "RAUL RENNER",
  },
  {
    name: "11988887777",
    preview: "Bom dia, gostaria de ver as...",
    time: "16:49",
    badge: "1",
    active: false,
    initials: "11",
    agent: "RAUL RENNER",
  },
] as const;

const messages = [
  {
    body: "Boa Tarde tudo bem Mariana ? me Chamo João sou da equipe comercial",
    time: "14:09",
    direction: "sent",
  },
  {
    body: "quero um momento pra conversar contigo sobre as novas funcionalidades que temos no sistema e as que estão por vir",
    time: "14:09",
    direction: "sent",
  },
  {
    body: "oi João! bora! vou salvar esse teu contato que eu ainda nao tenho...",
    time: "14:10",
    direction: "received",
  },
  {
    body: "essa semana da bom sim",
    time: "14:10",
    direction: "received",
  },
  {
    body: "Esse aqui é contato Oficial da nossa equipe",
    time: "14:11",
    direction: "sent",
  },
  {
    body: "show qual o melhor dia",
    time: "14:11",
    direction: "sent",
  },
  {
    body: "la pra quinta",
    time: "16:52",
    direction: "received",
  },
  {
    body: "de manha da bom",
    time: "16:52",
    direction: "received",
  },
  {
    body: "umas 10h ou 11h",
    time: "16:52",
    direction: "received",
  },
  {
    body: "posso marcar esse email mariana@techstore.com.br no google agenda ? para as 10 horas",
    time: "17:22",
    direction: "sent",
  },
  {
    body: "pode sim",
    time: "17:50",
    direction: "received",
  },
] as const;

const kanbanCards = [
  {
    stage: "Prospectar",
    id: "UPSC-69",
    name: "Gráfica Rapidex",
    tag: "Indicação",
    meta: "33d",
    tone: "blue",
    featured: false,
  },
  {
    stage: "Prospectar",
    id: "UPSC-10",
    name: "CHATBOT MAKER",
    tag: "R$ 10.070,00",
    meta: "33d",
    tone: "green",
    featured: false,
  },
  {
    stage: "Qualificação",
    id: "UPSC-124",
    name: "Eduardo | RevSpot",
    tag: "Agendar Demo",
    meta: "13h",
    tone: "purple",
    featured: true,
  },
  {
    stage: "Proposta",
    id: "UPSC-80",
    name: "LukTex",
    tag: "QR_CODE",
    meta: "102d",
    tone: "cyan",
    featured: false,
  },
  {
    stage: "Fechamento",
    id: "UPSC-46",
    name: "Grandene",
    tag: "Fechado",
    meta: "Win",
    tone: "green",
    featured: false,
  },
] as const;

function TypewriterInput() {
  const words = [
    "Construtoras de médio porte em São Paulo",
    "Clínicas odontológicas no Rio de Janeiro",
    "Agências de marketing em Belo Horizonte",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = words[currentWordIndex];
    const typeSpeed = isDeleting ? 30 : 65;

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText((prev) => fullText.substring(0, prev.length + 1));
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        setCurrentText((prev) => fullText.substring(0, prev.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          return;
        }
      }
      timer = setTimeout(handleTyping, typeSpeed);
    };

    timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <div className="prospect-search-input-wrapper">
      <Search size={16} className="prospect-search-icon" aria-hidden="true" />
      <span className="prospect-typewriter-text">
        {currentText}
        <span className="prospect-typewriter-cursor">|</span>
      </span>
    </div>
  );
}



function ProspectInteligenteSection() {
  const [addedLeads, setAddedLeads] = useState<string[]>([]);

  const toggleLead = (id: string) => {
    setAddedLeads((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const leads = [
    {
      id: "vanguard",
      name: "Vanguard Engenharia Ltda",
      sub: "Construção Civil • São Paulo, SP",
      match: "98% Match",
    },
    {
      id: "estrutura",
      name: "Estrutura Forte S.A.",
      sub: "Infraestrutura • Campinas, SP",
      match: "92% Match",
    },
    {
      id: "marmoraria",
      name: "Marmoraria & Construções",
      sub: "Acabamentos • São Paulo, SP",
      match: "85% Match",
    },
  ];

  return (
    <section className="section prospect-inteligente-section" id="prospect-inteligente">
      <div className="site-shell prospect-layout">
        {/* Left Visual Card Mockup */}
        <div className="prospect-mockup-container">
          <div className="prospect-card-window">
            {/* Window Header */}
            <div className="prospect-card-header">
              <div className="prospect-logo-badge">
                <Sparkles size={16} className="prospect-sparkles-icon" />
              </div>
              <span className="prospect-header-title">Gerador de Leads IA</span>
            </div>

            {/* Typewriter Input */}
            <TypewriterInput />

            {/* Leads List */}
            <div className="prospect-leads-list">
              {leads.map((lead) => {
                const isAdded = addedLeads.includes(lead.id);
                return (
                  <div key={lead.id} className="prospect-lead-row">
                    <div className="prospect-lead-info">
                      <strong className="prospect-lead-name">{lead.name}</strong>
                      <span className="prospect-lead-sub">{lead.sub}</span>
                    </div>
                    <div className="prospect-lead-actions">
                      <span className="prospect-match-badge">
                        <CheckCircle2 size={12} className="prospect-check-icon" />
                        {lead.match}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleLead(lead.id)}
                        className={`prospect-crm-btn ${isAdded ? "added" : ""}`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCheck size={14} style={{ marginRight: 4 }} />
                            Adicionado
                          </>
                        ) : (
                          "Adicionar CRM"
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Copy Content */}
        <div className="prospect-copy-container">
          <p className="feature-pill">Prospect Inteligente</p>
          <h2 className="prospect-title">Encontre seu cliente ideal em segundos com IA</h2>
          <p className="prospect-description">
            Defina sua persona ideal e deixe nossa IA vasculhar o mercado. Chega de listas frias
            compradas no escuro. Gere leads qualificados que realmente precisam da sua solução.
          </p>
          <ul className="prospect-features-list">
            <li>
              <span className="bullet-circle">
                <CheckCircle2 size={16} />
              </span>
              Filtros geográficos e de faturamento precisos.
            </li>
            <li>
              <span className="bullet-circle">
                <CheckCircle2 size={16} />
              </span>
              Matching semântico baseado em intenção de compra.
            </li>
            <li>
              <span className="bullet-circle">
                <CheckCircle2 size={16} />
              </span>
              Importação direta para seu funil de vendas.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function InteligenciaDadosSection() {
  return (
    <section className="section inteligencia-dados-section" id="inteligencia-dados">
      <div className="site-shell data-enrichment-layout">
        {/* Left Copy Content */}
        <div className="data-copy-container">
          <p className="feature-pill blue">Inteligência de Dados</p>
          <h2 className="data-title">Enriquecimento de Dados e Aquecimento de Leads</h2>
          <p className="data-description">
            Saiba com quem você está falando antes mesmo do primeiro "Oi". Integramos
            nativamente com Serasa e JusBrasil para trazer segurança jurídica e financeira para
            cada negociação.
          </p>

          <div className="integration-cards-row">
            <div className="integration-mini-card">
              <span className="integration-icon serasa">
                <ShieldCheck size={20} />
              </span>
              <div>
                <h3>Serasa Experian</h3>
                <p>Score de crédito e saúde financeira em tempo real.</p>
              </div>
            </div>
            <div className="integration-mini-card">
              <span className="integration-icon jusbrasil">
                <Scale size={20} />
              </span>
              <div>
                <h3>JusBrasil</h3>
                <p>Monitoramento de processos e histórico jurídico.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Visual Card Mockup */}
        <div className="data-mockup-container">
          <div className="data-enrichment-card">
            {/* Header */}
            <div className="data-card-header">
              <div className="data-lead-avatar">V</div>
              <div className="data-lead-meta">
                <strong className="data-lead-name">Vanguard Engenharia</strong>
                <span className="data-lead-cnpj">CNPJ: 00.123.456/0001-99</span>
              </div>
              <span className="data-hot-badge">LEAD QUENTE</span>
            </div>

            {/* Financial Health Section */}
            <div className="data-card-block">
              <div className="data-block-header">
                <span className="data-block-title">SAÚDE FINANCEIRA (SERASA)</span>
                <span className="data-score-value">842</span>
              </div>
              <div className="data-indicators-grid">
                <div className="data-indicator">
                  <span className="data-indicator-label">Risco de Inadimplência</span>
                  <span className="data-indicator-value">
                    <span className="status-dot-indicator green" /> Baixo
                  </span>
                </div>
                <div className="data-indicator">
                  <span className="data-indicator-label">Capacidade Pgto.</span>
                  <span className="data-indicator-value">
                    <span className="status-dot-indicator blue" /> Alta
                  </span>
                </div>
                <div className="data-indicator">
                  <span className="data-indicator-label">Protestos (12m)</span>
                  <strong className="data-indicator-value dark">0 ocorrências</strong>
                </div>
              </div>
            </div>

            {/* Legal Situation Section */}
            <div className="data-card-block last">
              <span className="data-block-title">SITUAÇÃO JURÍDICA (JUSBRASIL)</span>
              <div className="data-legal-box">
                <div className="data-legal-row">
                  <div className="data-legal-type">
                    <FileText size={16} className="data-legal-icon" />
                    <span>Processos Ativos</span>
                  </div>
                  <strong className="data-legal-count">02</strong>
                </div>
                <div className="data-progress-bar-wrapper">
                  <div className="data-progress-bar-track">
                    <div className="data-progress-bar-fill" style={{ width: "20%" }} />
                  </div>
                  <div className="data-progress-labels">
                    <span>Risco Processual Mínimo</span>
                    <span>Certidão Negativa: Válida</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Check Card */}
            <div className="data-floating-validation">
              <ShieldCheck size={16} className="data-validation-icon" />
              <span>Venda Segura Liberada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesDashboardSection() {
  const whatsappUrl = buildWhatsAppUrl();
  return (
    <section className="section dashboard-overview-section" id="visao-geral">
      <div className="site-shell hero-grid">
        {/* Left Copy Content */}
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h2 className="hero-title" style={{ fontSize: "clamp(30px, 3.5vw, 48px)", lineHeight: 1.15 }}>
            {hero.title}
          </h2>
          <p className="hero-subtitle">{hero.subtitle}</p>

          <div className="cta-row">
            <a className="button button-primary" href={whatsappUrl}>
              {hero.primaryCta}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#solucoes">
              <LayoutGrid size={18} aria-hidden="true" />
              {hero.secondaryCta}
            </a>
          </div>

          <div className="hero-metrics" aria-label="Resumo de benefícios">
            {metrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Product Graphic (Dashboard Mockup) */}
        <figure className="hero-product" aria-label="Interface da Pyper">
          <div className="hero-product-frame">
            <img
              className="hero-dashboard-image"
              src={heroDashboard.src}
              alt={heroDashboard.alt}
              width={heroDashboard.width}
              height={heroDashboard.height}
              sizes="(max-width: 980px) 100vw, 68vw"
            />
          </div>
          <figcaption className="hero-floating-card">
            <strong>Lead qualificado automaticamente</strong>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}


export default function Home() {
  const whatsappUrl = buildWhatsAppUrl();
  const jsonLd = JSON.stringify(jsonLdGraph).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <header className="site-nav" aria-label="Navegação principal">
        <div className="site-shell nav-row">
          <a className="brand-link" href="#inicio" aria-label="Pyper">
            <img
              className="brand-wordmark"
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              
            />
          </a>

          <nav className="desktop-nav" aria-label="Seções da página">
            <a href="#solucoes">Soluções</a>
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#auto-implantacao">Auto Implantação</a>
            <a href="#faq">FAQ</a>
            <a href="https://www.instagram.com/pyper_crm" target="_blank" rel="noopener noreferrer">Instagram</a>
          </nav>

          <div className="nav-actions">
            <a className="login-link" href="https://app.pyper.com.br/login" target="_blank" rel="noopener noreferrer">
              Login
            </a>
            <a className="button button-primary" href={whatsappUrl}>
              Começar Agora
            </a>
          </div>
        </div>
      </header>

      <nav className="mobile-dock" aria-label="Navegação mobile">
        <a href="#inicio">
          <HomeIcon size={20} aria-hidden="true" />
          Início
        </a>
        <a href="#solucoes">
          <Workflow size={20} aria-hidden="true" />
          Recursos
        </a>
        <a href="#faq">
          <CreditCard size={20} aria-hidden="true" />
          FAQ
        </a>
        <a href={whatsappUrl}>
          <MessageCircle size={20} aria-hidden="true" />
          WhatsApp
        </a>
      </nav>

      <main className="page-main">
        <section className="hero" id="inicio">
          <div className="site-shell hero-grid setup-layout">
            {/* Left Visual Setup Collage Mockup */}
            <div className="setup-mockup-container">
              <div className="setup-collage-backdrop" />
              
              <div className="setup-collage-wrapper">
                
                {/* Left Layer: Stats / Conversion Card */}
                <div className="collage-card stats-card">
                  <span className="stats-kicker">Conversão de Leads</span>
                  <strong className="stats-value">+142%</strong>
                  <div className="mini-chart">
                    <span className="bar" style={{ height: "40%" }} />
                    <span className="bar" style={{ height: "65%" }} />
                    <span className="bar active" style={{ height: "90%" }} />
                  </div>
                </div>

                {/* Center Layer: Lead Table Board */}
                <div className="collage-card board-card">
                  <header className="board-header">
                    <span className="board-dot" />
                    <span className="board-title">Atendimentos Recentes</span>
                  </header>
                  <div className="board-table">
                    <div className="board-row header">
                      <span>Lead</span>
                      <span>Canal</span>
                      <span>Status</span>
                    </div>
                    <div className="board-row">
                      <div className="board-lead-cell">
                        <span className="avatar-small gray">MS</span>
                        <strong>Mariana Silva</strong>
                      </div>
                      <span className="board-channel-badge">WhatsApp</span>
                      <span className="status-pill green">Resolvido</span>
                    </div>
                    <div className="board-row">
                      <div className="board-lead-cell">
                        <span className="avatar-small blue">VE</span>
                        <strong>Vanguard Eng.</strong>
                      </div>
                      <span className="board-channel-badge">WhatsApp</span>
                      <span className="status-pill orange">Em andamento</span>
                    </div>
                    <div className="board-row">
                      <div className="board-lead-cell">
                        <span className="avatar-small purple">EF</span>
                        <strong>Estrutura Forte</strong>
                      </div>
                      <span className="board-channel-badge">WhatsApp</span>
                      <span className="status-pill green">Resolvido</span>
                    </div>
                  </div>
                </div>

                {/* Right Layer: Automation Recipe Card */}
                <div className="collage-card automation-card">
                  <header className="automation-header">
                    <Zap size={14} className="automation-bolt-icon" />
                    <span>Automação Ativa</span>
                  </header>
                  <p className="automation-recipe">
                    Quando <strong>Mensagem Recebida</strong>, responder com <strong>Agente de IA</strong>.
                  </p>
                  <div className="automation-footer">
                    <span className="status-active-tag">
                      <span className="pulse-green-dot" />
                      Ativo 24h
                    </span>
                  </div>
                </div>

                {/* Floating Integrations */}
                <div className="floating-integrations">
                  <div className="integration-bubble wpp">
                    <MessageCircle size={16} />
                  </div>
                  <div className="integration-bubble stripe">
                    <CreditCard size={16} />
                  </div>
                  <div className="integration-bubble gmail">
                    <Send size={14} />
                  </div>
                </div>

              </div>
            </div>

            {/* Right Copy Content */}
            <div className="setup-copy-container hero-copy">
              <h1 className="hero-title">
                Seu negócio funcionando 24h.
                <br />
                <span>Configurado em minutos.</span>
              </h1>
              <p className="hero-subtitle">
                Conecte seu WhatsApp escaneando um QR Code, ative o agente de IA para sua empresa e defina
                seu funil comercial em poucos cliques. Sem código, sem estresse.
              </p>

              <div className="cta-row">
                <a className="button button-primary" href={whatsappUrl}>
                  Começar Agora
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="button button-secondary" href="#solucoes">
                  <LayoutGrid size={18} aria-hidden="true" />
                  Ver como funciona
                </a>
              </div>

              <div className="setup-advantages hero-advantages" style={{ marginTop: "28px" }}>
                <div className="advantage-row">
                  <span className="advantage-icon">
                    <QrCode size={16} />
                  </span>
                  <div>
                    <strong>Conexão Plug & Play</strong>
                    <p>Escaneie o QR Code e comece. Sem burocracia ou APIs complexas.</p>
                  </div>
                </div>

                <div className="advantage-row">
                  <span className="advantage-icon">
                    <Clock3 size={16} />
                  </span>
                  <div>
                    <strong>Operação 24 Horas por Dia</strong>
                    <p>IA que atende na hora, qualifica leads e agenda reuniões.</p>
                  </div>
                </div>

                <div className="advantage-row">
                  <span className="advantage-icon">
                    <LayoutGrid size={16} />
                  </span>
                  <div>
                    <strong>Automação Sem Código</strong>
                    <p>Crie fluxos de atendimento de forma visual e simples.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturesDashboardSection />

        <section className="section auto-implementation" id="auto-implantacao">
          <div className="site-shell auto-implementation-layout">
            <div className="auto-implementation-copy">
              <p className="feature-pill">{autoImplementation.kicker}</p>
              <h2>{autoImplementation.title}</h2>
              <p>{autoImplementation.description}</p>
            </div>

            <WorkspaceBuilderMockup />
          </div>
        </section>

        <section className="section section-muted">
          <div className="site-shell">
            <div className="section-heading">
              <p className="section-kicker">Atendimento lento custa vendas</p>
              <h2 className="section-title">
                Sua empresa ainda vende pelo WhatsApp,
                <br />
                <span>mas gerencia tudo no improviso?</span>
              </h2>
              <p className="section-copy">
                O WhatsApp é rápido, mas sem um sistema por trás vira caos.
                Veja o que acontece quando sua equipe não tem a ferramenta
                certa.
              </p>
            </div>

            <div className="card-grid">
              {painPoints.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <article className="info-card glass-panel" key={item.title}>
                    <span className="icon-box">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <ProspectInteligenteSection />

        <InteligenciaDadosSection />

        <section className="section solution-section" id="solucoes">
          <div className="site-shell">
            <div className="section-heading">
              <p className="section-kicker">A solução Pyper</p>
              <h2 className="section-title">
                Uma plataforma para transformar
                <br />
                conversas em processos claros.
              </h2>
            </div>

            <div className="product-stack">
              <ProductPanel
                title={productShowcases[0].title}
                text={productShowcases[0].text}
                icon={MessageCircle}
                tone="green"
              >
                <WhatsAppWorkspace />
              </ProductPanel>

              <ProductPanel
                title={productShowcases[1].title}
                text={productShowcases[1].text}
                icon={LayoutGrid}
                tone="blue"
              >
                <KanbanWorkspaceClient pipelineStages={pipelineStages} kanbanCards={kanbanCards} />
              </ProductPanel>

              <div className="automation-section-wrapper" style={{ marginTop: "48px" }}>
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: "760", color: "var(--foreground)", letterSpacing: "-0.02em" }}>
                    Crie sua própria automação e seu Agente de forma simplificada
                  </h3>
                </div>
                <div className="automation-grid">
                  {automationFlows.map((flow) => (
                    <AutomationFlowCard key={flow.title} flow={flow} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Mensagem de valor">
          <div className="glass-panel trust-pill">
            <span className="icon-box small">
              <Workflow size={16} aria-hidden="true" />
            </span>
            <strong>Menos retrabalho.</strong>
            <span>Conversas que movem negócios.</span>
          </div>
        </section>

        <section className="section section-muted" id="funcionalidades">
          <div className="site-shell">
            <div className="card-grid four">
              {capabilities.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <article className="benefit-card" key={item.title}>
                    <Icon size={24} aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="site-shell narrow-shell">
            <div className="section-heading">
              <p className="section-kicker">Perguntas frequentes</p>
              <h2 className="section-title">O que saber antes da demo.</h2>
            </div>

            <div className="faq-list">
              {faqItems.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>
                    {item.question}
                    <ArrowRight size={18} aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section final-cta">
          <div className="site-shell">
            <div className="final-card">
              <img
                className="final-logo"
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
              />
              <h2>
                Pronto para organizar seu WhatsApp,
                <br />
                seu CRM e seus processos em um só lugar?
              </h2>
              <p>
                Fale com a gente pelo WhatsApp e veja como a Pyper entra na sua
                operação comercial.
              </p>
              <div className="cta-row centered">
                <a className="button button-primary" href={whatsappUrl}>
                  Começar Agora
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="button button-secondary" href="#solucoes">
                  <LayoutGrid size={18} aria-hidden="true" />
                  Ver como funciona
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="site-shell footer-row">
          <div className="footer-brand">
            <img
              className="brand-wordmark muted"
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
            />
            <p>
              © 2026 {siteConfig.name}. Inteligência Artificial para seu CRM.
            </p>
          </div>
          <nav className="footer-links" aria-label="Links finais">
            <a href="#solucoes">Soluções</a>
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#faq">FAQ</a>
            <a href={whatsappUrl}>WhatsApp</a>
            <a
              href="https://www.instagram.com/pyper_crm"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <Instagram size={14} /> Instagram
            </a>
          </nav>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={whatsappUrl}
        aria-label="Fale com a Pyper no WhatsApp"
      >
        <MessageCircle size={24} aria-hidden="true" />
      </a>
    </>
  );
}

const workspaceIconMap = {
  cart: ShoppingCart,
  support: MessageCircle,
  followup: BellRing,
} satisfies Record<string, LucideIcon>;

const workspaceStatIconMap = {
  automation: Zap,
  pipeline: LayoutGrid,
  widgets: CreditCard,
} satisfies Record<string, LucideIcon>;

function WorkspaceBuilderMockup() {
  return (
    <div className="workspace-builder" aria-label={autoImplementation.image.alt}>
      <div className="workspace-decoration paper-plane" aria-hidden="true" />
      <div className="workspace-decoration cloud" aria-hidden="true" />

      <img
        className="workspace-builder-logo"
        src={siteConfig.logo.src}
        alt=""
        width={siteConfig.logo.width}
        height={siteConfig.logo.height}
      />

      <div className="workspace-builder-header">
        <p className="workspace-builder-pill">
          <CheckSquare size={16} aria-hidden="true" />
          {autoImplementation.workspaceKicker}
        </p>
        <h3>
          Como você vai usar o <span>pyper</span>?
        </h3>
        <p>
          Escolha um modelo e seu workspace já vem com{" "}
          <strong>pipeline</strong>, <strong>dashboard</strong> e{" "}
          <strong>automações</strong> prontos — sem partir de uma tela em
          branco.
        </p>
      </div>

      <div className="workspace-template-grid">
        {workspaceTemplates.map((template) => {
          const TemplateIcon = workspaceIconMap[template.icon];

          return (
            <article className="workspace-template-card" key={template.title}>
              <header>
                <span className={`workspace-template-icon ${template.tone}`}>
                  <TemplateIcon size={28} aria-hidden="true" />
                </span>
                <span className="workspace-template-arrow">
                  <ArrowRight size={20} aria-hidden="true" />
                </span>
              </header>

              <h4>{template.title}</h4>
              <p>{template.description}</p>

              <div className="workspace-template-tags">
                {template.tags.map((tag) => (
                  <span className={`workspace-chip ${tag.tone}`} key={tag.label}>
                    <i aria-hidden="true" />
                    {tag.label}
                  </span>
                ))}
              </div>

              <footer>
                {template.stats.map((stat) => {
                  const StatIcon = workspaceStatIconMap[stat.icon];

                  return (
                    <span key={`${template.title}-${stat.label}`}>
                      <StatIcon size={17} aria-hidden="true" />
                      <strong>{stat.value}</strong>
                      {stat.label}
                    </span>
                  );
                })}
              </footer>
            </article>
          );
        })}
      </div>

      <article className="workspace-blank-card">
        <span className="workspace-blank-icon">
          <Plus size={32} aria-hidden="true" />
        </span>
        <div>
          <h4>{autoImplementation.blankWorkspace.title}</h4>
          <p>{autoImplementation.blankWorkspace.description}</p>
        </div>
        <a href="#solucoes">
          {autoImplementation.blankWorkspace.action}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </article>
    </div>
  );
}

function ProductPanel({
  children,
  icon: Icon,
  text,
  title,
  tone,
}: {
  children: ReactNode;
  icon: LucideIcon;
  text: string;
  title: string;
  tone: "green" | "blue";
}) {
  return (
    <article className="product-panel">
      <header className="panel-header">
        <span className={`panel-icon ${tone}`}>
          <Icon size={22} aria-hidden="true" />
        </span>
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </header>
      {children}
    </article>
  );
}

function WhatsAppWorkspace() {
  return (
    <div className="whatsapp-workspace">
      <aside className="chat-sidebar" aria-label="Lista de conversas">
        <div className="chat-search">
          <Search size={15} aria-hidden="true" />
          <span>Buscar conversas...</span>
        </div>
        <div className="chat-filters">
          <span>Todos <b>12</b></span>
          <span>Meus <b>4</b></span>
          <span>Aguardando <Filter size={12} style={{marginLeft: 4, display: 'inline-block', verticalAlign: 'middle'}}/></span>
        </div>

        <div className="contact-list">
          {contacts.map((contact) => (
            <article
              className={`contact-card ${contact.active ? "active" : ""}`}
              key={contact.name}
            >
              <span className="avatar">{contact.initials}</span>
              <div>
                <div className="contact-head">
                  <strong>{contact.name}</strong>
                  <small>{contact.time}</small>
                </div>
                <p>{contact.preview}</p>
                <div className="contact-agent" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', fontWeight: 'bold', color: 'var(--primary)', marginTop: '4px' }}>
                  <User size={10} /> PYPER AI
                </div>
              </div>
              {contact.badge ? <b className="message-badge">{contact.badge}</b> : null}
            </article>
          ))}
        </div>
      </aside>

      <section className="chat-main" aria-label="Prévia de conversa">
        <header className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="avatar online" style={{ background: '#e0e7ff', color: '#3730a3' }}>MS</span>
            <div>
              <strong>Mariana Silva | TechStore</strong>
              <p style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--primary)' }}>● Online</span> · 558588006464
                <span style={{ color: '#047857', background: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', marginLeft: '6px', display: 'inline-flex', alignItems: 'center' }}>
                  <Bot size={10} style={{ marginRight: '4px' }}/>🤖 PYPER AI
                </span>
              </p>
            </div>
          </div>
          <div className="chat-actions">
            <button type="button" className="btn-icon-only">
              <BookOpen size={14} aria-hidden="true" />
            </button>
            <button type="button">
              Assumir
            </button>
            <button type="button">
              Transferir
            </button>
            <button type="button" className="btn-danger">
              Encerrar
            </button>
          </div>
        </header>

        <div className="message-canvas">
          <span className="history-note">
            Não há mais histórico, verifique no aparelho
          </span>
          {messages.map((message) => (
            <article
              className={`message-bubble ${message.direction}`}
              key={`${message.time}-${message.body}`}
            >
              <p>{message.body}</p>
              <time>{message.time}</time>
              {message.direction === "sent" ? (
                <CheckCheck size={13} aria-hidden="true" />
              ) : null}
            </article>
          ))}
          <div style={{ textAlign: 'center', margin: '8px 0' }}>
            <span style={{ background: '#d1fae5', color: '#047857', fontSize: '11px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
               ✨ Atendimento Automático Ativo
            </span>
          </div>
        </div>

        <footer className="chat-input">
          <Smile size={20} aria-hidden="true" />
          <Paperclip size={20} aria-hidden="true" />
          <span>Digite sua mensagem...</span>
          <button type="button" aria-label="Enviar mensagem">
            <Send size={16} aria-hidden="true" />
          </button>
        </footer>
      </section>
      
      <aside className="chat-details">
        <div className="chat-details-header">
           <span className="avatar">MS</span>
           <strong>Mariana Silva | TechStore</strong>
        </div>
        <div className="chat-details-body">
           <div className="chat-details-label">E-MAIL</div>
           <div className="chat-details-value">mariana@techstore.com.br</div>
           
           <div className="chat-details-label">CELULAR</div>
           <div className="chat-details-value">558588006464</div>
           
           <div className="chat-details-row">
             <span className="chat-details-label">TAREFAS RECENTES</span>
             <span className="chat-details-link">Ver todas &gt;</span>
           </div>
           <div className="chat-details-box">
             Nenhuma tarefa vinculada
           </div>
           
           <div className="chat-details-row">
             <span className="chat-details-label">ANOTAÇÕES</span>
           </div>
           <div className="chat-details-row" style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '12px' }}>
             <span>📄 Notas Importantes</span>
             <span className="chat-details-action-text">+ Nova</span>
           </div>
           <div className="chat-details-box large">
             Nenhuma nota adicionada
           </div>
        </div>
      </aside>
    </div>
  );
}



function AutomationFlowCard({
  flow,
}: {
  flow: (typeof automationFlows)[number];
}) {
  const HeadingIcon = iconMap[flow.icon];

  return (
    <article className="flow-card">
      <header>
        <div>
          <HeadingIcon size={20} aria-hidden="true" />
          <h3>{flow.title}</h3>
        </div>
        <span>
          <i aria-hidden="true" />
          {flow.status}
        </span>
      </header>

      <div className="flow-canvas">
        {flow.steps.map((step, index) => {
          const StepIcon = iconMap[step.icon];

          return (
            <div className="flow-segment" key={step.title}>
              <article className={`flow-step tone-${step.tone}`}>
                <div className="flow-step-head">
                  <span>
                    <StepIcon size={15} aria-hidden="true" />
                  </span>
                  <strong>{step.type}</strong>
                </div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </article>
              {index < flow.steps.length - 1 ? (
                <span className="flow-line" aria-hidden="true" />
              ) : null}
            </div>
          );
        })}
      </div>
    </article>
  );
}
