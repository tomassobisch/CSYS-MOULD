import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// ==============================================================================
// Idioma de la web (ES / EN). Uso en componentes:
//   const { t, lang } = useLang();
//   t('Texto en español', 'English text')
// El idioma elegido se recuerda en el navegador.
// ==============================================================================

const STORAGE_KEY = 'csys_lang';
const LangContext = createContext({ lang: 'ES', setLang: () => {}, t: (es) => es });

const initialLang = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ES' || saved === 'EN') return saved;
  } catch {
    // sin almacenamiento
  }
  return 'ES';
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // sin almacenamiento
    }
    document.documentElement.lang = lang === 'EN' ? 'en' : 'es';
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: (es, en) => (lang === 'EN' ? en : es) }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LangContext);
