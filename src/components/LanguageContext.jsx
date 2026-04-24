import { createContext, useContext, useState } from "react";

export const LanguageContext = createContext({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("ikigai_lang") || "en"; } catch { return "en"; }
  });

  const switchLang = (l) => {
    setLang(l);
    try { localStorage.setItem("ikigai_lang", l); } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}