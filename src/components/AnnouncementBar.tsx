import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getAnnouncement, onContentChange } from "@/lib/remote-content";

const CLOSED_KEY = "pyper_announcement_closed";

function wasClosed(text: string): boolean {
  try {
    return sessionStorage.getItem(CLOSED_KEY) === text;
  } catch {
    return false;
  }
}

/** Aviso fino no topo, ligado e escrito pelo master no Console. */
export function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState(getAnnouncement);
  const [closed, setClosed] = useState(() => {
    const a = getAnnouncement();
    return a ? wasClosed(a.text) : false;
  });

  useEffect(
    () =>
      onContentChange(() => {
        const next = getAnnouncement();
        setAnnouncement(next);
        setClosed(next ? wasClosed(next.text) : false);
      }),
    [],
  );

  const visible = Boolean(announcement && !closed);
  const barRef = useRef<HTMLDivElement>(null);

  // O cabeçalho do site é fixo no topo (globals.css, que não é deste componente):
  // a barra fica fixa acima dele, o cabeçalho desce a altura dela e a página
  // ganha o mesmo respiro em cima. Some a barra, tudo volta ao lugar.
  useLayoutEffect(() => {
    if (!visible) return;
    const bar = barRef.current;
    const nav = document.querySelector<HTMLElement>(".site-nav");
    const place = () => {
      const h = bar?.offsetHeight ?? 0;
      if (nav) nav.style.top = `${h}px`;
      document.body.style.paddingTop = `${h}px`;
    };
    place();
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("resize", place);
      if (nav) nav.style.top = "";
      document.body.style.paddingTop = "";
    };
  }, [visible, announcement?.text]);

  if (!announcement || closed) return null;

  const close = () => {
    try {
      sessionStorage.setItem(CLOSED_KEY, announcement.text);
    } catch {
      // sem sessionStorage: fecha só nesta tela
    }
    setClosed(true);
  };

  const external = /^https?:\/\//i.test(announcement.linkUrl);

  return (
    <div
      ref={barRef}
      role="region"
      aria-label="Aviso"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        background: "#06140f",
        color: "#fff",
        fontSize: 14,
        lineHeight: "20px",
        padding: "8px 44px",
        textAlign: "center",
        borderBottom: "1px solid rgba(72,205,145,0.25)",
      }}
    >
      <span>{announcement.text}</span>
      {announcement.linkUrl && (
        <>
          {" "}
          <a
            href={announcement.linkUrl}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            style={{ color: "#48cd91", fontWeight: 600, textDecoration: "underline", whiteSpace: "nowrap" }}
          >
            {announcement.linkLabel || "Saiba mais"}
          </a>
        </>
      )}
      <button
        type="button"
        onClick={close}
        aria-label="Fechar aviso"
        style={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          width: 28,
          height: 28,
          border: 0,
          borderRadius: 6,
          background: "transparent",
          color: "rgba(255,255,255,0.7)",
          fontSize: 18,
          lineHeight: "28px",
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
}
