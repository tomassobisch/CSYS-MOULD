import React from 'react';
import { Cpu, ShieldCheck, Zap, Database, Bot, ArrowRight, CheckCircle2, Award, Sparkles } from 'lucide-react';

export default function TjDeveloperEcosystem() {
  return (
    <section id="ecosystem" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-semibold">
            <Cpu className="w-3.5 h-3.5" /> ARQUITECTURA DIGITAL & AUTOMATIZACIÓN IA
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ecosistema Desarrollado por <span className="text-gradient-cyan">TJ Developer</span>
          </h2>
          <p className="text-sm text-slate-300">
            Una infraestructura tecnológica a medida para <strong>CSYS MOULD</strong> (Abraham Lozano / Claudio), conectada a modelos de IA de última generación, automatización de cotizaciones y canal técnico post-lanzamiento.
          </p>
        </div>

        {/* Phase Breakdown Grid from Commercial Proposal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Phase 1 Card */}
          <div className="glass-panel rounded-3xl border border-cyan-500/30 p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold">
                FASE 1 - Desarrollo e Implementación IA
              </span>
              <span className="text-2xl font-extrabold text-white font-tech">4.000 €</span>
            </div>

            <h3 className="text-lg font-bold text-white">
              Plataforma Web Corporativa & Agentes de IA
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Diseño y Desarrollo Web Profesional:</strong> Interfaz fluida optimizada para objetivos comerciales de CSYS MOULD.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Infraestructura de Datos & Backend:</strong> Conexión a bases de datos dinámicas y escalables.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Integración de Bots y Automatizaciones:</strong> APIs de LLM avanzadas y flujos condicionales de respuesta.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
              <span>Valor Medio de Mercado: 5.500€ - 7.500€</span>
              <span className="text-emerald-400 font-bold">Ahorro &gt; 30%</span>
            </div>
          </div>

          {/* Phase 2 Card */}
          <div className="glass-panel rounded-3xl border border-indigo-500/30 p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold">
                FASE 2 - Acompañamiento & Mantenimiento
              </span>
              <span className="text-2xl font-extrabold text-white font-tech">1.500 € <span className="text-xs text-slate-400 font-sans">(500€/mes)</span></span>
            </div>

            <h3 className="text-lg font-bold text-white">
              Optimización Adaptativa por 3 Meses
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>Optimización de Prompts & Reentrenamiento:</strong> Ajustes finos basados en interacciones reales recopiladas.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>Auditoría de Consumo de Tokens:</strong> Monitoreo constante de estabilidad e integraciones de API.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>Soporte Prioritario TJ Developer:</strong> Canal directo para resolución de incidencias.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
              <span>Suscripción Recurrente: 3 Meses Cobertura</span>
              <span className="text-indigo-300 font-bold">TJ Developer Care</span>
            </div>
          </div>

        </div>

        {/* Technical Architecture Flowchart Banner */}
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 text-center space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Diagrama del Ecosistema de Automatización Integrado
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-2">
                <Bot className="w-4 h-4" />
              </div>
              <p className="font-bold text-white">Bot Técnico DFM</p>
              <p className="text-[10px] text-slate-500 mt-1">Respuestas DFM en vivo</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="font-bold text-white">Cotizador Inteligente</p>
              <p className="text-[10px] text-slate-500 mt-1">Cálculo instantáneo + PDF</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                <Database className="w-4 h-4" />
              </div>
              <p className="font-bold text-white">Portal de Seguimiento</p>
              <p className="text-[10px] text-slate-500 mt-1">Estado CNC / EDM / CMM</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-2">
                <Zap className="w-4 h-4" />
              </div>
              <p className="font-bold text-white">API Connectors</p>
              <p className="text-[10px] text-slate-500 mt-1">Tsteam.fit@gmail.com</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
