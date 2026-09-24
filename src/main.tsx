import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { initAnalytics } from "./lib/analytics";
import { applyCachedContent, loadRemoteContent } from "./lib/remote-content";
import "./globals.css";

// Import fonts
import "@fontsource/geist-sans";
import "@fontsource/geist-mono";

initAnalytics();

// Textos geridos no Console: o que ficou guardado entra antes do primeiro
// render; o atual chega do backend e, se mudou algo, a página renderiza de novo.
applyCachedContent();
const remoteContent = loadRemoteContent();

function Root() {
  const [, setVersion] = useState(0);
  useEffect(() => {
    void remoteContent.then((changed) => {
      if (changed) setVersion((v) => v + 1);
    });
  }, []);
  return (
    <>
      <AnnouncementBar />
      <App />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
