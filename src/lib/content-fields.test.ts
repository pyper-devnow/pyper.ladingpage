import { describe, expect, it } from "vitest";
import { CONTENT_FIELD_GROUPS } from "./content-fields";
import { applyTexts } from "./remote-content";
import { faqItems, landingCopy } from "./site";
import { getText, TEXT_KEY_RE } from "./text-paths";

describe("campos editáveis da landing", () => {
  const keys = CONTENT_FIELD_GROUPS.flatMap((group) => group.fields.map((field) => field.key));

  it("toda chave existe no site.ts, é texto e segue o formato do backend", () => {
    for (const key of keys) {
      expect(TEXT_KEY_RE.test(key), key).toBe(true);
      expect(typeof getText(key), key).toBe("string");
    }
  });

  it("não repete chave", () => {
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("applyTexts troca o texto, ignora chave inexistente e __proto__, e volta ao padrão", () => {
    const original = landingCopy.headline;
    const changed = applyTexts({
      "landingCopy.headline": "Título de teste",
      "faqItems.0.question": "Pergunta nova?",
      "landingCopy.naoExiste": "x",
      "__proto__.polluted": "x",
      "landingCopy.journey.9": "x",
    });
    expect(changed).toBe(true);
    expect(landingCopy.headline).toBe("Título de teste");
    expect(faqItems[0].question).toBe("Pergunta nova?");
    expect((landingCopy as Record<string, unknown>).naoExiste).toBeUndefined();
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
    expect(landingCopy.journey).toHaveLength(3);

    expect(applyTexts({})).toBe(true);
    expect(landingCopy.headline).toBe(original);
  });
});
