import React, { useState, useEffect } from 'react';
import { Cookie, CheckCircle, XCircle } from 'lucide-react';

const STORAGE_KEY = 'csys_cookie_consent';

// localStorage puede no existir o lanzar error (modo privado, navegadores in-app de Instagram/LinkedIn,
// cookies bloqueadas). Si falla, el banner se cierra igualmente durante la sesión.
const readConsent = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const saveConsent = (value) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* sin almacenamiento disponible: se recuerda solo en esta sesión */
  }
};

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!readConsent()) {
      // Pequeño retraso para que no compita con la carga del hero
      const t = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const close = (value) => {
    saveConsent(value);
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 250);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className={`fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md md:left-8 z-[45] transition-all duration-300 ease-out ${
        isClosing ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 cookie-banner-enter'
      }`}
    >
      <div className="bg-black border border-amber-500/60 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/80 space-y-3 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/40 shrink-0">
            <Cookie className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-[13px] sm:text-sm font-bold text-white">Política de Cookies &amp; Privacidad</h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Utilizamos cookies propias y de terceros para optimizar el rendimiento técnico de la plataforma, medir la navegación y garantizar la seguridad del área de clientes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:justify-end gap-2 pt-3 border-t border-slate-800 font-mono">
          <button
            type="button"
            onClick={() => close('declined')}
            className="h-9 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <XCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Denegar</span>
          </button>

          <button
            type="button"
            onClick={() => close('accepted')}
            className="h-9 px-4 sm:px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold shadow-lg shadow-amber-500/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Aceptar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
