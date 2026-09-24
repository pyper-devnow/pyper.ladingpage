import { describe, expect, it } from "vitest";
import {
  autoImplementation,
  automationFlows,
  buildWhatsAppUrl,
  faqItems,
  faqSupport,
  hero,
  heroDashboard,
  jsonLdGraph,
  productShowcases,
  siteConfig,
  siteMetadata,
  supportUrl,
  workspaceTemplates,
} from "./site";

describe("Pyper landing content", () => {
  it("builds the WhatsApp CTA with the approved phone number and message", () => {
    const url = buildWhatsAppUrl();

    expect(url).toContain("https://wa.me/558581086339");
    expect(decodeURIComponent(url)).toContain(
      "Olá, quero agendar uma demonstração da Pyper.",
    );
  });

  it("keeps the SEO and canonical metadata aligned", () => {
    expect(hero.title).toBe(
      "CRM com IA e WhatsApp para automatizar vendas.",
    );
    expect(siteMetadata.title).toBe(
      "Pyper | CRM com WhatsApp, Inteligência Artificial e Automação",
    );
    expect(siteMetadata.description).toContain(
      "CRM integrado com WhatsApp e Inteligência Artificial",
    );
    expect(siteConfig.url).toBe("https://pyper.com.br");
    expect(siteConfig.logo.src).toBe("/logo-pyper-crm-v2-400.webp");
    expect(siteConfig.logo.schemaSrc).toBe("/logo-pyper-crm-v2.png");
    expect(heroDashboard.src).toBe("/dashboard-crm-pyper.webp");
    expect(heroDashboard.width).toBe(1672);
    expect(heroDashboard.height).toBe(941);
  });

  it("exposes FAQ and structured data for search engines", () => {
    expect(faqItems).toHaveLength(4);
    expect(jsonLdGraph["@graph"].map((item) => item["@type"])).toEqual([
      "Organization",
      "WebSite",
      "WebPage",
      "SoftwareApplication",
      "FAQPage",
    ]);
  });

  it("defines the auto implementation section from the approved mockup", () => {
    expect(autoImplementation.kicker).toBe("Um ponto de partida para sua equipe");
    expect(autoImplementation.title).toBe("Auto Implantação");
    expect(autoImplementation.description).toContain(
      "pipeline, dashboard e automações prontos",
    );
    expect(autoImplementation.workspaceTitle).toBe(
      "Como você vai usar o pyper?",
    );
    expect(autoImplementation.image.src).toBe(
      "/auto-implantacao-workspace-pyper.png",
    );
    expect(workspaceTemplates.map((template) => template.title)).toEqual([
      "Vendas",
      "Atendimento",
      "Pós-venda",
    ]);
  });

  it("keeps the Stitch-inspired product sections available to the page", () => {
    expect(productShowcases.map((item) => item.title)).toEqual([
      "WhatsApp Oficial Integrado",
      "Funil de Vendas Inteligente",
    ]);
    expect(automationFlows.map((flow) => flow.title)).toEqual([
      "Configuração de Agente de IA",
      "Automação de Processos de Venda",
    ]);
  });
});

/**
 * Dogfooding (SDD-13-A5): a landing precisa TER a saída para o nosso próprio
 * agente. Enquanto isso não existia, toda dúvida do visitante ia para o FAQ
 * estático ou para a fila do WhatsApp humano — o oposto do que o produto
 * promete.
 */
describe("suporte atendido pelo agente", () => {
  it("aponta para o suporte do produto, não para um formulário", () => {
    expect(supportUrl).toContain("/suporte");
    expect(supportUrl.startsWith("https://")).toBe(true);
  });

  it("o fecho do FAQ convida a falar com o assistente", () => {
    expect(faqSupport.text.toLowerCase()).toContain("assistente virtual");
    expect(faqSupport.cta.length).toBeGreaterThan(0);
  });
});
