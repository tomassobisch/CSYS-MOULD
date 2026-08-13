import React, { useState } from 'react';
import { Lock, Mail, User, Key, Shield, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Cpu, Bot, Building2, UserCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [loginType, setLoginType] = useState('client'); // 'client' | 'corporate'
  const [email, setEmail] = useState('cliente@empresa.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSwitchType = (type) => {
    setLoginType(type);
    setError('');
    if (type === 'corporate') {
      setEmail('claudio@csysmould.com');
      setPassword('csys2026');
    } else {
      setEmail('cliente@empresa.com');
      setPassword('demo123');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();

      if (loginType === 'corporate') {
        // CORPORATE EXECUTIVE ACCESS (Claudio Arriaga Silva & Abraham Lozano)
        if (
          cleanEmail === 'claudio@csysmould.com' ||
          cleanEmail === 'claudio' ||
          cleanEmail === 'abraham@csysmould.com' ||
          cleanEmail === 'abraham' ||
          cleanEmail.endsWith('@csysmould.com')
        ) {
          const isClaudio = cleanEmail.includes('claudio');
          onLoginSuccess({
            name: isClaudio ? 'Claudio Arriaga Silva' : 'Abraham Lozano',
            email: cleanEmail.includes('@') ? cleanEmail : (isClaudio ? 'claudio@csysmould.com' : 'abraham@csysmould.com'),
            company: 'CSYS MOULD Dirección Corporativa',
            role: 'director',
            avatar: '/multimedia/team_photo.jpg'
          });
        } else {
          setError('Utiliza claudio@csysmould.com o abraham@csysmould.com para el Acceso Corporativo.');
          setLoading(false);
        }
      } else {
        // CLIENT PORTAL ACCESS
        onLoginSuccess({
          name: cleanEmail.includes('empresa') ? 'Cliente Corporativo' : cleanEmail.split('@')[0],
          email: cleanEmail,
          company: 'Proyecto Tecnológico',
          role: 'client',
          avatar: '/multimedia/logo_blanco.png'
        });
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      
      {/* MODAL CARD */}
      <div className="relative w-full max-w-lg bg-black border-2 border-amber-500/70 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-950/80 space-y-6 overflow-hidden">
        
        {/* HUD Corner Accents */}
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Laser Line */}
        <div className="scanline-laser" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs font-mono"
        >
          ✕
        </button>

        {/* Header with Official Logo */}
        <div className="text-center space-y-3 pt-2">
          <div className="h-16 px-4 py-2 bg-black rounded-2xl border border-amber-500/50 inline-flex items-center justify-center shadow-lg shadow-amber-500/20">
            <img src="/multimedia/logo_blanco.png" alt="CSYS MOULD Logo" className="h-full object-contain filter drop-shadow-[0_0_10px_rgba(224,153,0,0.8)]" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-white">
              {loginType === 'corporate' ? 'Acceso Corporativo de Dirección' : 'Área Privada de Clientes'}
            </h3>
            <p className="text-xs text-slate-300 font-mono">
              {loginType === 'corporate' ? 'Panel exclusivo para Claudio Arriaga Silva y Abraham Lozano' : 'Newsletter, Foro MOULD, Simulador ROI & Herramientas'}
            </p>
          </div>
        </div>

        {/* LOGIN TYPE TOGGLE BUTTONS (ACCESO CLIENTES vs ACCESO CORPORATIVO) */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs">
          <button
            type="button"
            onClick={() => handleSwitchType('client')}
            className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              loginType === 'client'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" /> Acceso Clientes
          </button>

          <button
            type="button"
            onClick={() => handleSwitchType('corporate')}
            className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              loginType === 'corporate'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4" /> Acceso Corporativo
          </button>
        </div>

        {/* Corporate Quick Credentials (Only shown in corporate mode) */}
        {loginType === 'corporate' && (
          <div className="p-3 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2 text-xs animate-in fade-in">
            <p className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Credenciales Directivas (Claudio & Abraham):
            </p>
            <div className="grid grid-cols-2 gap-2 font-mono">
              <button
                type="button"
                onClick={() => { setEmail('claudio@csysmould.com'); setPassword('csys2026'); }}
                className="p-2 rounded-xl bg-black border border-amber-500/40 text-amber-300 text-left font-bold text-[11px] truncate hover:bg-slate-900"
              >
                claudio@csysmould.com
              </button>
              <button
                type="button"
                onClick={() => { setEmail('abraham@csysmould.com'); setPassword('csys2026'); }}
                className="p-2 rounded-xl bg-black border border-amber-500/40 text-amber-300 text-left font-bold text-[11px] truncate hover:bg-slate-900"
              >
                abraham@csysmould.com
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
          <div>
            <label className="text-slate-300 block mb-1 font-bold">
              {loginType === 'corporate' ? 'Correo Directivo' : 'Correo de Cliente / Empresa'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-amber-400" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={loginType === 'corporate' ? 'claudio@csysmould.com' : 'cliente@empresa.com'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white focus:border-amber-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 block mb-1 font-bold">Contraseña de Acceso</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 w-4 h-4 text-amber-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white focus:border-amber-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Ingresando...</span>
            ) : (
              <>
                <Lock className="w-4 h-4 text-slate-950" />
                <span>{loginType === 'corporate' ? 'Ingresar al Centro de Bots' : 'Acceder al Área de Clientes'}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </>
            )}
          </button>
        </form>

        {/* Security Footer Note */}
        <div className="pt-2 text-center text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Acceso Seguro 256-bit SSL • CSYS MOULD Llinars del Vallès</span>
        </div>

      </div>
    </div>
  );
}
