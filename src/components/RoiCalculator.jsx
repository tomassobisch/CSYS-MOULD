import React, { useState } from 'react';
import { TrendingUp, Clock, Zap, DollarSign, Sliders, CheckCircle2, ArrowRight, Mail } from 'lucide-react';

export default function RoiCalculator({ onOpenContact }) {
  const [annualUnits, setAnnualUnits] = useState(2500000);
  const [currentCycleTime, setCurrentCycleTime] = useState(12);
  const [csysCycleTime, setCsysCycleTime] = useState(8);
  const [machineHourlyRate, setMachineHourlyRate] = useState(45); // €/hour

  // Calculation Math
  const oldTotalHours = (annualUnits * currentCycleTime) / 3600;
  const newTotalHours = (annualUnits * csysCycleTime) / 3600;
  const hoursSaved = Math.round(oldTotalHours - newTotalHours);
  const annualMoneySaved = Math.round(hoursSaved * machineHourlyRate);
  const percentCycleReduction = Math.round(((currentCycleTime - csysCycleTime) / currentCycleTime) * 100);

  return (
    <section id="roi" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> SIMULADOR DE ROI & RETORNO DE INVERSIÓN
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Calculadora de Ahorro y Eficiencia Energética
          </h2>
          <p className="text-sm text-slate-300">
            Descubre cuánto dinero y tiempo de máquina ahorrarás al implementar moldes CSYS MOULD con canal caliente y refrigeración adaptativa conformal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders Panel */}
          <div className="lg:col-span-6 glass-panel-amber rounded-3xl border border-amber-500/30 shadow-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" /> Parámetros de Inyección de tu Planta
            </h3>

            {/* Slider 1: Annual Units */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-300">Producción Anual Deseada</span>
                <span className="font-mono font-bold text-amber-400 text-sm">
                  {annualUnits.toLocaleString()} Unidades
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="10000000"
                step="250000"
                value={annualUnits}
                onChange={(e) => setAnnualUnits(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Slider 2: Current Cycle Time */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-300">Tiempo de Ciclo Actual (Segundos)</span>
                <span className="font-mono font-bold text-slate-300">{currentCycleTime} seg</span>
              </div>
              <input
                type="range"
                min="6"
                max="30"
                step="1"
                value={currentCycleTime}
                onChange={(e) => setCurrentCycleTime(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-slate-600"
              />
            </div>

            {/* Slider 3: CSYS Cycle Time */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-300">Tiempo de Ciclo Optimizado CSYS MOULD</span>
                <span className="font-mono font-bold text-emerald-400">{csysCycleTime} seg</span>
              </div>
              <input
                type="range"
                min="3"
                max={currentCycleTime - 1}
                step="0.5"
                value={csysCycleTime}
                onChange={(e) => setCsysCycleTime(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Slider 4: Hourly Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-300">Coste Hora Prensa Inyectora (€/h)</span>
                <span className="font-mono font-bold text-amber-400">{machineHourlyRate} €/h</span>
              </div>
              <input
                type="range"
                min="25"
                max="120"
                step="5"
                value={machineHourlyRate}
                onChange={(e) => setMachineHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel-amber rounded-3xl border border-emerald-500/30 p-6 sm:p-8 space-y-6 relative overflow-hidden bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950">
              
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                Impacto Financiero Estimado Anual
              </span>

              <div>
                <p className="text-4xl sm:text-5xl font-extrabold text-white font-tech">
                  {annualMoneySaved.toLocaleString()} €
                </p>
                <p className="text-xs text-slate-400 mt-1">Ahorro directo en coste de máquina e infraestructura eléctrica</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-4 border-t border-slate-800">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block">Horas de Prensa Ahorradas</span>
                  <span className="text-lg font-bold text-amber-400 font-tech">{hoursSaved.toLocaleString()} Horas</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block">Reducción de Tiempo de Ciclo</span>
                  <span className="text-lg font-bold text-emerald-400 font-tech">-{percentCycleReduction}%</span>
                </div>
              </div>

              <button
                onClick={onOpenContact}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Solicitar Estudio de Ciclo a Dirección</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
