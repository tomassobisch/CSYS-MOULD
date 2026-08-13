import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PublicLandingPage from './components/PublicLandingPage';
import LoginModal from './components/LoginModal';
import DirectorCorporateDashboard from './components/DirectorCorporateDashboard';
import ClientPortalDashboard from './components/ClientPortalDashboard';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import { Shield, Lock, LogOut, CheckCircle2, Eye } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [lang, setLang] = useState('ES');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (profileData) => {
    setUserProfile(profileData);
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* AUTHENTICATED COMPACT FLOATING MICRO-PILL (PLACED NEATLY IN TOP CORNER, NO OBSTRUCTION) */}
      {isAuthenticated && (
        <div className="fixed top-3 right-4 z-50 animate-in fade-in duration-200">
          <div className="bg-black/95 border border-amber-500/60 rounded-full px-3.5 py-1.5 shadow-2xl shadow-amber-950/80 backdrop-blur-2xl flex items-center gap-2.5 text-[11px] font-mono text-amber-300">
            <span className="flex items-center gap-1 font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              {userProfile?.name || 'Usuario'}
            </span>

            <span className="text-slate-500">|</span>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              title="Ver Landing Pública"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Landing</span>
            </button>

            <span className="text-slate-500">|</span>

            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 transition-colors font-bold flex items-center gap-1"
              title="Cerrar Sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Top Header Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenContact={scrollToContact}
        lang={lang}
        setLang={setLang}
        isAuthenticated={isAuthenticated}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* RENDER VIEW ACCORDING TO AUTHENTICATION STATE & ROLE */}
      {!isAuthenticated ? (
        /* 1. PUBLIC LANDING PAGE (Purely Informative) */
        <PublicLandingPage
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onOpenContact={scrollToContact}
        />
      ) : userProfile?.role === 'director' ? (
        /* 2. CORPORATE EXECUTIVE DASHBOARD WITH BOTS CENTER (Claudio & Abraham) */
        <DirectorCorporateDashboard
          userProfile={userProfile}
          onLogout={handleLogout}
        />
      ) : (
        /* 3. VALUE-ADDED CLIENT PORTAL (Newsletter, Forum MOULD, ROI Simulator, 3D CAD, CNC Tracker) */
        <ClientPortalDashboard
          userProfile={userProfile}
          onOpenContact={scrollToContact}
        />
      )}

      {/* Footer */}
      <Footer lang={lang} />

      {/* COOKIE CONSENT BANNER */}
      <CookieBanner />

      {/* LOGIN MODAL GATEWAY WITH ACCESO CORPORATIVO TOGGLE */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
