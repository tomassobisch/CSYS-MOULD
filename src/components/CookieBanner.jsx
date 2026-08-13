import React, { useState, useEffect } from 'react';
import { Shield, Cookie, CheckCircle, XCircle } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('csys_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('csys_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('csys_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-xl z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-black/95 border-2 border-amber-500/70 rounded-3xl p-5 shadow-2xl shadow-amber-950/80 backdrop-blur-2xl space-y-4 text-xs">
        
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Política de Cookies & Privacidad • CSYS MOULD
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Utilizamos cookies propias y de terceros para optimizar el rendimiento técnico de la plataforma, medir la navegación y garantizar la seguridad del área de clientes. Puedes aceptar o denegar el uso de cookies.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800 font-mono">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-semibold transition-all flex items-center gap-1.5"
          >
            <XCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Denegar</span>
          </button>

          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold shadow-lg shadow-amber-500/30 transition-all flex items-center gap-1.5"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Aceptar Todas las Cookies</span>
          </button>
        </div>

      </div>
    </div>
  );
}
