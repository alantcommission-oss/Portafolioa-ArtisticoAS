"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import es from "./es.json";
import en from "./en.json";

export type Lang = "es" | "en";

const translations: Record<Lang, Record<string, string>> = { es, en };

interface LangCtx {
  lang: Lang;
  t: (key: string) => string;
  toggle: () => void;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangCtx | null>(null);

export function LangProvider({ children, initial = "es" }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initial);

  const toggle = useCallback(() => {
    setLangState((prev) => (prev === "es" ? "en" : "es"));
  }, []);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback(
    (key: string) => translations[lang][key] ?? key,
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, t, toggle, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
