
import { ReactNode, useState, useEffect } from "react";
import { KanbanWorkspaceClient } from "./components/KanbanWorkspaceClient";
import {
  ArrowRight,
  BellRing,
  Bot,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  CheckSquare,
  CheckCheck,
  Clock3,
  CreditCard,
  LayoutGrid,
  MessageCircle,
  Plus,
  Search,
  Split,
  ShoppingCart,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  aiMcp,
  servicePreview,
  autoImplementation,
  automationFlows,
  buildWhatsAppUrl,
  capabilities,
  faqItems,
  faqSupport,
  hero,
  heroDashboard,
  buildJsonLdGraph,
  landingCopy,
  painPoints,
  pipelineStages,
  productShowcases,
  sectionCopy,
  siteConfig,
  supportUrl,
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
  const words = sectionCopy.prospect.searches;
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrentText(words[0]);
      return;
    }
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

  const leads = sectionCopy.prospect.leads;

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
              <span className="prospect-header-title">{sectionCopy.prospect.windowTitle}</span>
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
                            {sectionCopy.prospect.addedLabel}
                          </>
                        ) : (
                          sectionCopy.prospect.addLabel
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
          <p className="feature-pill">{sectionCopy.prospect.kicker}</p>
          <h2 className="prospect-title">{sectionCopy.prospect.title}</h2>
          <p className="prospect-description">{sectionCopy.prospect.description}</p>
          <ul className="prospect-features-list">
            {sectionCopy.prospect.features.map((feature) => (
              <li key={feature}>
                <span className="bullet-circle">
                  <CheckCircle2 size={16} aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AiMcpSection() {
  return (
    <section className="section ai-mcp-section" id="ia-mcp" aria-labelledby="ia-mcp-title">
      <div className="site-shell ai-mcp-layout">
        <div className="ai-mcp-copy">
          <p className="section-kicker">{aiMcp.kicker}</p>
          <h2 className="section-title" id="ia-mcp-title">{aiMcp.title}</h2>
          <p className="section-copy">{aiMcp.description}</p>
          <ul className="ai-mcp-benefits">
            {aiMcp.benefits.map(item => <li key={item}><CheckCircle2 size={18} aria-hidden="true" /><span>{item}</span></li>)}
          </ul>
          <a className="button button-primary" href={buildWhatsAppUrl()}>{aiMcp.cta}<ArrowRight size={18} aria-hidden="true" /></a>
        </div>
        <figure className="ai-mcp-demo">
          <figcaption><span><Bot size={20} aria-hidden="true" />{aiMcp.demoTitle}</span><small>{aiMcp.demoLabel}</small></figcaption>
          <p className="ai-mcp-request">{aiMcp.request}</p>
          <ol className="ai-mcp-steps">
            {aiMcp.steps.map(step => <li key={step.title}><CheckCircle2 size={18} aria-hidden="true" /><div><strong>{step.title}</strong><p>{step.text}</p></div></li>)}
          </ol>
          <div className="ai-mcp-result"><Bot size={20} aria-hidden="true" /><p>{aiMcp.result}</p></div>
          <p className="ai-mcp-control"><ShieldCheck size={16} aria-hidden="true" />{aiMcp.control}</p>
        </figure>
      </div>
    </section>
  );
}

export default function Home() {
  const whatsappUrl = buildWhatsAppUrl();
  const jsonLd = JSON.stringify(buildJsonLdGraph()).replace(/</g, "\\u003c");
  const year = new Date().getFullYear();
  const [productView, setProductView] = useState(1);

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
            <a href="#ia-mcp">{sectionCopy.nav.aiMcp}</a>
            <a href="#solucoes">{sectionCopy.nav.solutions}</a>
            <a href="#auto-implantacao">{sectionCopy.nav.autoImplementation}</a>
            <a href="#faq">{sectionCopy.nav.faq}</a>
            <a href={supportUrl} target="_blank" rel="noopener noreferrer">{sectionCopy.nav.support}</a>
          </nav>

          <div className="nav-actions">
            <a className="login-link" href="https://app.pyper.com.br/login" target="_blank" rel="noopener noreferrer">
              {sectionCopy.nav.login}
            </a>
            <a className="button button-primary" href={whatsappUrl}>
              {hero.primaryCta}
            </a>
          </div>
        </div>
      </header>

      <main className="page-main">
        <section className="hero product-first-hero" id="inicio">
          <div className="site-shell">
            <div className="hero-intro">
              <p className="hero-category"><span className="status-dot" aria-hidden="true" />{hero.eyebrow}</p>
              <h1>{landingCopy.headline}{landingCopy.headlineAccent ? <>{" "}<span>{landingCopy.headlineAccent}</span></> : null}</h1>
              <p className="hero-description">{hero.subtitle}</p>
              <div className="cta-row centered">
                <a className="button button-primary" href={whatsappUrl}>{hero.primaryCta}<ArrowRight size={18} aria-hidden="true" /></a>
                <a className="button button-secondary" href="#solucoes">{hero.secondaryCta}<ArrowRight size={18} aria-hidden="true" /></a>
              </div>
              <p className="hero-note">{landingCopy.demoNote}</p>
            </div>
            <figure className="product-preview" id="visao-geral">
              <div className="preview-toolbar"><span className="preview-brand">pyper<span> / </span>{landingCopy.previewTitle}</span><span className="preview-label">{landingCopy.previewLabel}</span></div>
              <img src={heroDashboard.src} srcSet={heroDashboard.srcSet} sizes={heroDashboard.sizes} alt={heroDashboard.alt} width={heroDashboard.width} height={heroDashboard.height} fetchPriority="high" decoding="async" />
            </figure>
            <div className="product-journey" aria-label={landingCopy.journeyLabel}>
              {landingCopy.journey.map((item, index) => <div key={item}><CheckCircle2 size={18} aria-hidden="true" /><span>{item}</span>{index < landingCopy.journey.length - 1 && <ArrowRight className="journey-arrow" size={16} aria-hidden="true" />}</div>)}
            </div>
          </div>
        </section>

        <AiMcpSection />

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
              <p className="section-kicker">{sectionCopy.pain.kicker}</p>
              <h2 className="section-title">
                {sectionCopy.pain.title}
                <br />
                <span>{sectionCopy.pain.titleAccent}</span>
              </h2>
              <p className="section-copy">{sectionCopy.pain.description}</p>
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

        <section className="section solution-section" id="solucoes">
          <div className="site-shell">
            <div className="section-heading">
              <p className="section-kicker">{sectionCopy.solution.kicker}</p>
              <h2 className="section-title">
                {sectionCopy.solution.title}
                <br />
                {sectionCopy.solution.titleAccent}
              </h2>
            </div>

            <div className="product-stack">
              <div className="product-selector" role="group" aria-label={landingCopy.productSelectorLabel}>
                {landingCopy.productViews.map((label, index) => <button key={label} type="button" aria-pressed={productView === index} aria-controls="product-demo" onClick={() => setProductView(index)}>{label}</button>)}
              </div>
              <div id="product-demo">
              {productView === 0 && (
              <ProductPanel
                title={productShowcases[0].title}
                text={productShowcases[0].text}
                icon={MessageCircle}
                tone="green"
              >
                <ServiceWorkspace />
              </ProductPanel>
              )}
              {productView === 1 && (

              <ProductPanel
                title={productShowcases[1].title}
                text={productShowcases[1].text}
                icon={LayoutGrid}
                tone="blue"
              >
                <KanbanWorkspaceClient pipelineStages={pipelineStages} kanbanCards={kanbanCards} />
              </ProductPanel>
              )}
              {productView === 2 && (

              <div className="automation-section-wrapper">
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: "760", color: "var(--foreground)", letterSpacing: "-0.02em" }}>
                    {sectionCopy.solution.automationTitle}
                  </h3>
                </div>
                <div className="automation-grid">
                  {automationFlows.map((flow) => (
                    <AutomationFlowCard key={flow.title} flow={flow} />
                  ))}
                </div>
              </div>
              )}
              </div>
            </div>
          </div>
        </section>

        <ProspectInteligenteSection />


        <section className="trust-strip" aria-label="Mensagem de valor">
          <div className="glass-panel trust-pill">
            <span className="icon-box small">
              <Workflow size={16} aria-hidden="true" />
            </span>
            <strong>{sectionCopy.trust.strong}</strong>
            <span>{sectionCopy.trust.text}</span>
          </div>
        </section>

        <section className="section section-muted" id="funcionalidades" aria-labelledby="funcionalidades-title">
          <div className="site-shell">
            <h2 className="sr-only" id="funcionalidades-title">{sectionCopy.capabilitiesTitle}</h2>
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
              <p className="section-kicker">{sectionCopy.faq.kicker}</p>
              <h2 className="section-title">{sectionCopy.faq.title}</h2>
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

            {/*
              Dogfooding (SDD-13-A5): a dúvida que a lista não cobre não vai
              para um formulário nem para a fila do WhatsApp humano — vai para
              o nosso próprio agente. É a prova pública do produto, no lugar
              onde a pessoa está justamente com uma pergunta na mão.
            */}
            <div className="faq-support">
              <h3>{faqSupport.title}</h3>
              <p>{faqSupport.text}</p>
              <a
                className="button button-primary"
                href={supportUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {faqSupport.cta}
              </a>
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
                loading="lazy"
                decoding="async"
              />
              <h2>
                {landingCopy.finalTitle}
              </h2>
              <p>{sectionCopy.final.text}</p>
              <div className="cta-row centered">
                <a className="button button-primary" href={whatsappUrl}>
                  {hero.primaryCta}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="button button-secondary" href="#solucoes">
                  <LayoutGrid size={18} aria-hidden="true" />
                  {sectionCopy.final.secondaryCta}
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
              loading="lazy"
              decoding="async"
            />
            <p>
              © {year} {siteConfig.name}. {sectionCopy.footer.tagline}
            </p>
            <p className="footer-legal">
              {siteConfig.legalName} · CNPJ {siteConfig.cnpj} ·{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
          </div>
          <nav className="footer-links" aria-label="Links finais">
            <a
              href="https://www.instagram.com/pyper_crm"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <Instagram size={14} aria-hidden="true" /> {sectionCopy.footer.instagram}
            </a>
            <a href="/termos.html">{sectionCopy.footer.terms}</a>
            <a href="/privacidade.html">{sectionCopy.footer.privacy}</a>
          </nav>
        </div>
      </footer>


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

/** Destaca palavras dentro de um texto editável, sem exigir HTML no Console. */
function emphasize(text: string, words: string[], tag: "span" | "strong"): ReactNode[] {
  const escaped = words.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "g");
  const Tag = tag;
  return text.split(pattern).map((part, index) =>
    words.includes(part) ? <Tag key={index}>{part}</Tag> : part,
  );
}

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
        loading="lazy"
        decoding="async"
      />

      <div className="workspace-builder-header">
        <p className="workspace-builder-pill">
          <CheckSquare size={16} aria-hidden="true" />
          {autoImplementation.workspaceKicker}
        </p>
        <h3>{emphasize(autoImplementation.workspaceTitle, ["pyper"], "span")}</h3>
        <p>
          {emphasize(autoImplementation.workspaceSubtitle, ["pipeline", "dashboard", "automações"], "strong")}
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

function ServiceWorkspace() {
  return (
    <figure className="service-workspace">
      <figcaption className="service-toolbar"><span><LayoutGrid size={16} aria-hidden="true" />{servicePreview.workspace}</span><span>{servicePreview.example}</span></figcaption>
      <div className="service-layout">
        <aside className="service-context">
          <span className="service-avatar" aria-hidden="true">MS</span>
          <h4>{servicePreview.contact}</h4><p>{servicePreview.company}</p>
          <dl>{servicePreview.fields.map(field => <div key={field.label}><dt>{field.label}</dt><dd>{field.value}</dd></div>)}</dl>
        </aside>
        <section className="service-activity" aria-label={servicePreview.title}>
          <h4>{servicePreview.title}</h4>
          <ol>{servicePreview.events.map(event => <li key={event.title}><span className="service-event-dot" aria-hidden="true" /><div><strong>{event.title}</strong><p>{event.text}</p></div><time>{event.time}</time></li>)}</ol>
        </section>
        <aside className="service-agent"><Bot size={24} aria-hidden="true" /><h4>{servicePreview.agentTitle}</h4><p>{servicePreview.agentText}</p><span><CheckCircle2 size={16} aria-hidden="true" />{servicePreview.agentStatus}</span></aside>
      </div>
    </figure>
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
