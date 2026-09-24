// Pré-renderização no build (scripts/prerender.mjs): o HTML da página com os
// textos padrão já vai dentro do #root, para buscadores e para o primeiro
// desenho não depender do JavaScript. A barra de aviso e os textos do Console
// continuam só no navegador.
import { renderToString } from "react-dom/server";
import App from "./App";

export function render(): string {
  return renderToString(<App />);
}
