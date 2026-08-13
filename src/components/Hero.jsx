import React from 'react';
import { COMPANY_INFO } from '../data/mouldData';
import { ShieldCheck, Cpu, ArrowRight, Sparkles, MapPin, Award, CheckCircle2, Mail } from 'lucide-react';
import MoldViewer3D from './MoldViewer3D';
import VideoBackground from './VideoBackground';

export default function Hero({ onOpenContact, onOpenBot }) {
  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden bg-slate-950 min-h-[90vh]">
      
      {/* Background Injection Molding Video System */}
      <VideoBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heritage Pill Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-amber-500/40 text-xs font-semibold text-amber-300 shadow-2xl shadow-amber-950/60 backdrop-blur-xl">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-slate-200 font-mono">Desde 1965 • Barcelona:</span>
            <span className="text-amber-400 font-bold">Nave 500m² Llinars del Vallès & Centros China</span>
          </div>
        </div>

        {/* Hero Title & Real Motto */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            De la Idea a la Fabricación: <span className="text-gradient-amber">Soluciones Técnicas a la Conformación de Plástico</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-3xl mx-auto drop-shadow-md">
            Somos expertos en diseño y fabricación de moldes de inyección con planta propia de <strong className="text-white">500 m² (puente grúa de 10 Toneladas) en Barcelona</strong> y centros de producción en <strong className="text-white">Dongguan y Shenzhen</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenContact}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/40 hover:shadow-amber-400/60 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2.5"
            >
              <Mail className="w-5 h-5 text-slate-950" />
              <span>Solicitar Presupuesto Directo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBot}
              className="px-6 py-3.5 rounded-xl bg-slate-950/90 border border-slate-700/80 hover:border-amber-500/50 text-slate-200 hover:text-white font-bold text-sm shadow-lg hover:bg-slate-900 transition-all duration-300 flex items-center gap-2.5 backdrop-blur-md"
            >
              <Cpu className="w-5 h-5 text-amber-400" />
              <span>Consultar Asistente DFM</span>
            </button>
          </div>

          {/* Real Guarantee Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 pt-4 font-mono">
            <span className="flex items-center gap-1.5 text-slate-200">
              <MapPin className="w-4 h-4 text-amber-400" /> Llinars del Vallès (Barcelona)
            </span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Moldes de Hasta 10 Toneladas
            </span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Plantas Dongguan & Shenzhen
            </span>
          </div>
        </div>

        {/* Embedded Interactive 3D Mold Canvas Viewer */}
        <div className="my-10">
          <MoldViewer3D />
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          <div className="glass-panel-amber p-5 rounded-2xl border border-amber-500/30 text-center hover:border-amber-400 transition-all">
            <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-tech mb-1">+60 Años</p>
            <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Fundados en 1965</p>
          </div>

          <div className="glass-panel-amber p-5 rounded-2xl border border-amber-500/30 text-center hover:border-amber-400 transition-all">
            <p className="text-3xl sm:text-4xl font-extrabold text-white font-tech mb-1">500 <span className="text-xs text-amber-400 font-mono">m²</span></p>
            <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Planta Propia Barcelona</p>
          </div>

          <div className="glass-panel-amber p-5 rounded-2xl border border-amber-500/30 text-center hover:border-amber-400 transition-all">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-tech mb-1">10 <span className="text-xs text-emerald-300 font-mono">Ton</span></p>
            <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Capacidad Puente Grúa</p>
          </div>

          <div className="glass-panel-amber p-5 rounded-2xl border border-amber-500/30 text-center hover:border-amber-400 transition-all">
            <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-tech mb-1">2 Hubs</p>
            <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider">China (Dongguan & Shenzhen)</p>
          </div>
        </div>

      </div>
    </section>
  );
}
