import React, { useState } from 'react';
import { Lock, Mail, User, Key, Shield, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Cpu, Bot, Building2, UserCheck, Wrench, X } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [loginType, setLoginType] = useState('client'); // 'client' | 'corporate'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showClientNoticeModal, setShowClientNoticeModal] = useState(false);

  if (!isOpen) return null;

  const handleSwitchType = (type) => {
    setLoginType(type);
    setError('');
    setEmail('');
    setPassword('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // REQUEST 1: CLIENT PORTAL "ENTRAR" -> POPUP "Estamos trabajando en ello, próximamente."
    if (loginType === 'client') {
      setShowClientNoticeModal(true);
      return;
    }

    // REQUEST 2: ACCESO CORPORATIVO CREDENTIALS
    setLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();

      const isClaudioEmail = cleanEmail === 'claudio@csysmould.com' || cleanEmail === 'claudio';
      const isAbrahamEmail = cleanEmail === 'abraham@csysmould.com' || cleanEmail === 'abraham';

      if (isClaudioEmail) {
        if (cleanPass === 'claudiocsys') {
          onLoginSuccess({
            name: 'Claudio Arriaga Silva',
            email: 'claudio@csysmould.com',
            company: 'CSYS MOULD Dirección Corporativa',
            role: 'director',
            avatar: '/multimedia/team_photo.jpg'
          });
        } else {
          setError('Contraseña incorrecta. Introduce la contraseña corporativa.');
          setLoading(false);
        }
      } else if (isAbrahamEmail) {
        if (cleanPass === 'abrahamcsys') {
          onLoginSuccess({
            name: 'Abraham Lozano',
            email: 'abraham@csysmould.com',
            company: 'CSYS MOULD Dirección Corporativa',
            role: 'director',
            avatar: '/multimedia/team_photo.jpg'
          });
        } else {
          setError('Contraseña incorrecta. Introduce la contraseña corporativa.');
          setLoading(false);
        }
      } else if (cleanEmail.endsWith('@csysmould.com')) {
        // Fallback for general csysmould corporate domain
        if (cleanPass === 'claudiocsys' || cleanPass === 'abrahamcsys' || cleanPass === 'csys2026') {
          onLoginSuccess({
            name: 'Claudio Arriaga Silva',
            email: cleanEmail,
            company: 'CSYS MOULD Dirección Corporativa',
            role: 'director',
            avatar: '/multimedia/team_photo.jpg'
          });
        } else {
          setError('Contraseña corporativa incorrecta.');
          setLoading(false);
        }
      } else {
        setError('Utiliza tu correo corporativo directivo.');
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      
      {/* POPUP EMERGENTE ÁREA CLIENTES "Estamos trabajando en ello, próximamente." */}
      {showClientNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-slate-950 border-2 border-amber-500 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center font-mono">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border-2 border-amber-500 text-amber-400 flex items-center justify-center mx-auto animate-bounce">
              <Wrench className="w-8 h-8 text-amber-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white">Área de Clientes</h3>
              <p className="text-sm text-amber-400 font-bold leading-relaxed">
                Estamos trabajando en ello, próximamente.
              </p>
              <p className="text-xs text-slate-400 pt-1">
                El portal exclusivo para clientes está en fase de desarrollo final y estará disponible en breve.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowClientNoticeModal(false)}
              className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-xl shadow-amber-500/30 transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* MAIN LOGIN MODAL CARD */}
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
              {loginType === 'corporate' ? 'Panel exclusivo para Claudio Arriaga Silva y Abraham Lozano' : 'Portal de Clientes & Servicios CSYS MOULD'}
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

        {/* Corporate Quick Email Helper Card (Password remains completely blank and un-filled!) */}
        {loginType === 'corporate' && (
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2 text-xs animate-in fade-in">
            <p className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Selecciona tu correo corporativo:
            </p>
            <div className="grid grid-cols-2 gap-2 font-mono">
              <button
                type="button"
                onClick={() => { setEmail('claudio@csysmould.com'); setPassword(''); setError(''); }}
                className="p-2.5 rounded-xl bg-black border border-amber-500/40 text-amber-300 text-left hover:bg-amber-950/40 transition-all space-y-0.5"
              >
                <p className="font-bold text-[11px] text-white">Claudio Arriaga</p>
                <p className="text-[10px] text-slate-400 truncate">claudio@csysmould.com</p>
              </button>

              <button
                type="button"
                onClick={() => { setEmail('abraham@csysmould.com'); setPassword(''); setError(''); }}
                className="p-2.5 rounded-xl bg-black border border-amber-500/40 text-amber-300 text-left hover:bg-amber-950/40 transition-all space-y-0.5"
              >
                <p className="font-bold text-[11px] text-white">Abraham Lozano</p>
                <p className="text-[10px] text-slate-400 truncate">abraham@csysmould.com</p>
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
                placeholder="Escribe tu contraseña..."
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
              <span>Verificando credenciales...</span>
            ) : (
              <>
                <Lock className="w-4 h-4 text-slate-950" />
                <span>{loginType === 'corporate' ? 'Ingresar al Centro de Bots' : 'Entrar'}</span>
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
