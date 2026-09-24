import { describe, expect, it } from "vitest";
import { classifyLink, readUtm } from "./pyper-metrics";

describe("métricas próprias da landing", () => {
  it("classifica os links que interessam contar", () => {
    expect(classifyLink("https://wa.me/5585?text=oi", "button button-primary", false)).toBe("whatsapp");
    expect(classifyLink("mailto:contato@pyper.com.br", "", false)).toBe("email");
    expect(classifyLink("https://app.pyper.com.br/suporte", "", true)).toBe("support");
    expect(classifyLink("https://app.pyper.com.br/signup", "button button-primary", false)).toBe("cta");
    expect(classifyLink("#solucoes", "button button-secondary", false)).toBe("secondary");
    expect(classifyLink("#faq", "", true)).toBe("nav");
  });

  it("ignora link comum fora do cabeçalho", () => {
    expect(classifyLink("/termos.html", "", false)).toBeNull();
    expect(classifyLink("#faq", "button-primary-ish", false)).toBeNull();
  });

  it("lê as UTMs da URL e descarta as vazias", () => {
    expect(readUtm("?utm_source=instagram&utm_medium=&utm_campaign=lancamento")).toEqual({
      utmSource: "instagram",
      utmCampaign: "lancamento",
    });
    expect(readUtm("")).toEqual({});
  });
});
