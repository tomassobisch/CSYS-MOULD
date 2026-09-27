import React, { useState, useEffect } from 'react';
import { X, Mail, Check, ExternalLink, Sparkles, Send } from 'lucide-react';
import { getEmailComposeUrl, getPreferredEmailClient, setPreferredEmailClient } from '../lib/emailService';

export default function EmailClientModal({
  isOpen,
  onClose,
  to = 'abraham@csysmould.com',
  subject = 'Consulta Técnica y Presupuesto CSYS MOULD',
  body = ''
}) {
  const [rememberPreference, setRememberPreference] = useState(true);
  const [selectedClient, setSelectedClient] = useState('gmail');

  useEffect(() => {
    if (isOpen) {
      const saved = getPreferredEmailClient();
      if (saved) setSelectedClient(saved);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectAndOpen = (clientType) => {
    setSelectedClient(clientType);
    if (rememberPreference) {
      setPreferredEmailClient(clientType);
    }
    const url = getEmailComposeUrl({ to, subject, body, client: clientType });

    if (clientType === 'mailto') {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-black border-2 border-amber-500/70 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-950/50 space-y-6 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 text-left pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold">
            <Mail className="w-3.5 h-3.5" /> CONTACTO DIRECTO
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Enviar Solicitud
          </h3>
          <p className="text-xs text-slate-300">
            Atención directa y asesoramiento técnico de ingeniería
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">
            Selecciona tu servicio de correo preferido:
          </p>

          {/* Option 1: Gmail Web */}
          <button
            type="button"
            onClick={() => handleSelectAndOpen('gmail')}
            className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
              selectedClient === 'gmail'
                ? 'bg-red-950/40 border-red-500/80 shadow-lg shadow-red-950/50 ring-1 ring-red-500/50'
                : 'bg-slate-950/80 border-slate-800 hover:border-red-500/60 hover:bg-red-950/20'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0">
                <span className="text-base font-black text-red-400">G</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">Gmail (Google)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                    Recomendado
                  </span>
                </div>
                <p className="text-xs text-slate-400">Abre redacción en Gmail Web en nueva pestaña</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-red-400 transition-colors shrink-0" />
          </button>

          {/* Option 2: Outlook Web */}
          <button
            type="button"
            onClick={() => handleSelectAndOpen('outlook')}
            className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
              selectedClient === 'outlook'
                ? 'bg-blue-950/40 border-blue-500/80 shadow-lg shadow-blue-950/50 ring-1 ring-blue-500/50'
                : 'bg-slate-950/80 border-slate-800 hover:border-blue-500/60 hover:bg-blue-950/20'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0">
                <span className="text-base font-black text-blue-400">O</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">Outlook / Office 365</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Microsoft
                  </span>
                </div>
                <p className="text-xs text-slate-400">Abre redacción en Outlook Web en nueva pestaña</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
          </button>

          {/* Option 3: Mail App (mailto) */}
          <button
            type="button"
            onClick={() => handleSelectAndOpen('mailto')}
            className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
              selectedClient === 'mailto'
                ? 'bg-amber-950/40 border-amber-500/80 shadow-lg shadow-amber-950/50 ring-1 ring-amber-500/50'
                : 'bg-slate-950/80 border-slate-800 hover:border-amber-500/60 hover:bg-amber-950/20'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <span className="font-bold text-white text-xs">App de Correo Predeterminada</span>
                <p className="text-[11px] text-slate-400">Apple Mail, Windows Mail o cliente instalado</p>
              </div>
            </div>
            <Send className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0" />
          </button>
        </div>

        {/* Remember preference checkbox */}
        <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberPreference}
              onChange={(e) => setRememberPreference(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 bg-black border-slate-700 focus:ring-amber-500 cursor-pointer"
            />
            <span>Recordar mi elección para los próximos clics</span>
          </label>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}
