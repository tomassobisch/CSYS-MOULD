import React, { useState, useEffect } from 'react';
import { Shield, Globe, Mail, Lock, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection, onOpenContact, lang, setLang, isAuthenticated, onOpenLogin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: lang === 'ES' ? 'Inicio' : 'Home' },
    { id: 'catalog', label: lang === 'ES' ? 'Casos de Éxito' : 'Success Cases' },
    { id: 'gallery', label: lang === 'ES' ? 'Galería Real' : 'Real Gallery' },
    { id: 'contact', label: lang === 'ES' ? 'Contacto Directo' : 'Direct Contact' },
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 py-3 border-b border-amber-500/40 shadow-2xl backdrop-blur-2xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* OFFICIAL DESIGNED PNG LOGO & BARCELONA (SPAIN) ONLY */}
          <div 
            onClick={() => scrollTo('hero')} 
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative h-16 sm:h-20 px-4 py-2 rounded-2xl bg-black/95 border-2 border-amber-500/60 shadow-2xl animate-logo-glow group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
              <img
                src="/multimedia/logo_blanco.png"
                alt="CSYS MOULD Logo Oficial PNG"
                className="h-full max-h-12 sm:max-h-16 object-contain animate-logo-glow"
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm sm:text-base font-extrabold tracking-widest uppercase text-amber-400 font-mono text-tech drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                Barcelona (Spain)
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links - ONLY DISPLAYED ON PUBLIC LANDING PAGE (!isAuthenticated) */}
          {!isAuthenticated && (
            <nav className="hidden lg:flex items-center gap-1 bg-black/90 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeSection === link.id
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
              className="px-3 py-2 rounded-xl bg-black border border-slate-800 text-xs font-semibold text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              {lang}
            </button>

            {!isAuthenticated && (
              <button
                onClick={onOpenLogin}
                className="relative group px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/30 hover:shadow-amber-400/50 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-slate-950" />
                <span>{lang === 'ES' ? 'Acceso Clientes' : 'Client Login'}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button - ONLY DISPLAYED ON PUBLIC LANDING PAGE (!isAuthenticated) */}
          {!isAuthenticated && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-black border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}

        </div>
      </div>

      {/* Mobile Menu Drawer - ONLY DISPLAYED ON PUBLIC LANDING PAGE (!isAuthenticated) */}
      {mobileMenuOpen && !isAuthenticated && (
        <div className="lg:hidden bg-black/98 border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 backdrop-blur-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`p-3 rounded-xl text-xs font-semibold text-left transition-all ${
                  activeSection === link.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <button
              onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
              className="px-3 py-2 rounded-xl bg-black border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-amber-400" /> Idioma: {lang}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/30"
            >
              <Lock className="w-4 h-4" /> Acceso Clientes
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
