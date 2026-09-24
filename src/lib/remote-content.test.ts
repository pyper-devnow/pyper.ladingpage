import { describe, expect, it } from "vitest";
import { applyContent, getAnnouncement, pick } from "./remote-content";
import { buildWhatsAppUrl, hero, siteConfig } from "./site";

describe("conteúdo gerido no Console", () => {
  it("só troca campo preenchido", () => {
    expect(pick("  Novo ", "Padrão")).toBe("Novo");
    expect(pick("", "Padrão")).toBe("Padrão");
    expect(pick(null, "Padrão")).toBe("Padrão");
  });

  it("aplica o texto do Console e volta ao padrão quando ele é apagado", () => {
    const original = hero.title;
    const phone = siteConfig.whatsappPhone;

    expect(applyContent({ hero: { title: "Título do Console" }, contact: { whatsappPhone: "5511999999999" } })).toBe(true);
    expect(hero.title).toBe("Título do Console");
    expect(buildWhatsAppUrl()).toContain("wa.me/5511999999999");

    expect(applyContent({ hero: { title: "" } })).toBe(true);
    expect(hero.title).toBe(original);
    expect(siteConfig.whatsappPhone).toBe(phone);
    expect(applyContent({})).toBe(false);
  });

  it("mostra o aviso só ligado e com texto", () => {
    applyContent({ announcement: { enabled: false, text: "Oi" } });
    expect(getAnnouncement()).toBeNull();
    applyContent({ announcement: { enabled: true, text: " Webinar quinta ", linkUrl: "https://x.com" } });
    expect(getAnnouncement()).toEqual({ enabled: true, text: "Webinar quinta", linkLabel: "", linkUrl: "https://x.com" });
    applyContent({});
  });
});
