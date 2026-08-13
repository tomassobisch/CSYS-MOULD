import React, { useState } from 'react';
import { MOLD_CATALOG } from '../data/mouldData';
import { Layers, Shield, Clock, Flame, CheckCircle, ArrowRight, X, Sparkles, Filter, Zap, Mail } from 'lucide-react';

export default function CatalogSection({ onSelectMoldForContact }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedMold, setSelectedMold] = useState(null);

  const categories = ['Todos', 'Médica / Infantil', 'Seguridad & Electrónica', 'Industria 4.0 / Sensores', 'Diseño & Consumo', 'Multimaterial 2K', 'Envase & Packaging'];

  const filteredMolds = activeCategory === 'Todos'
    ? MOLD_CATALOG
    : MOLD_CATALOG.filter(m => m.category === activeCategory);

  return (
    <section id="catalog" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold">
            <Layers className="w-3.5 h-3.5" /> CASOS DE ÉXITO & ESPECIALIDADES CSYS MOULD
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Soluciones en Moldes de Inyección y Matricería
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Explora proyectos emblemáticos fabricados en nuestra nave de <strong className="text-white">500 m² en Llinars del Vallès (Barcelona)</strong> y plantas de <strong className="text-white">Dongguan y Shenzhen</strong>.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 scale-105'
                  : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Molds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMolds.map((mold) => (
            <div
              key={mold.id}
              className="group glass-panel rounded-3xl border border-slate-800/80 overflow-hidden glass-panel-hover flex flex-col justify-between"
            >
              <div>
                {/* Mold Image Container */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={mold.image}
                    alt={mold.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/90 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] font-mono font-semibold">
                    {mold.category}
                  </span>

                  {/* Cavities Badge */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-bold text-xs shadow">
                    {mold.cavities} Cavidades
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    {mold.industry}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {mold.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {mold.description}
                  </p>

                  {/* Technical Specs List */}
                  <div className="pt-3 grid grid-cols-2 gap-2 text-xs border-t border-slate-800/80">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono">Acero Molde</span>
                      <span className="font-semibold text-slate-200 truncate block">{mold.steel}</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono">Tiempo Ciclo</span>
                      <span className="font-semibold text-amber-400 font-mono block">{mold.cycleTime}</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono">Tolerancia</span>
                      <span className="font-semibold text-cyan-400 font-mono block">{mold.tolerance}</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono">Vida Útil</span>
                      <span className="font-semibold text-emerald-400 font-mono block">{mold.lifespan}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedMold(mold)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <span>Ficha Técnica</span>
                </button>

                <button
                  onClick={onSelectMoldForContact}
                  className="px-3.5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all flex items-center justify-center"
                  title="Consultar Presupuesto con Dirección"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Detailed Specs */}
      {selectedMold && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-6">
            
            <button
              onClick={() => setSelectedMold(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-amber-400">{selectedMold.category} • CSYS MOULD</span>
                <h3 className="text-xl font-bold text-white">{selectedMold.title}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedMold.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Especificaciones Técnicas de la Matriz
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block font-mono">Cavidades</span>
                  <span className="font-bold text-white text-sm">{selectedMold.cavities}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block font-mono">Acero</span>
                  <span className="font-bold text-amber-400 text-xs">{selectedMold.steel}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block font-mono">Tolerancia</span>
                  <span className="font-bold text-cyan-400 text-xs">{selectedMold.tolerance}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block font-mono">Planta Origen</span>
                  <span className="font-bold text-slate-200 text-xs">Llinars / Shenzhen</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Características de Ingeniería
              </h4>
              <div className="space-y-1.5">
                {selectedMold.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedMold(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Cerrar
              </button>

              <button
                onClick={() => {
                  setSelectedMold(null);
                  onSelectMoldForContact();
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/30"
              >
                <Mail className="w-4 h-4" /> Solicitar Presupuesto a Dirección
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
