import React, { useState } from 'react';
import { Clock, CheckCircle2, AlertCircle, Calendar, ShieldCheck, Cpu, ChevronRight, FileText, Camera, Search, RefreshCw, Layers, MapPin, Truck } from 'lucide-react';

export default function ProjectTrackerClient() {
  const [selectedProjectId, setSelectedProjectId] = useState('proj-01');

  const clientProjects = [
    {
      id: 'proj-01',
      code: 'CSYS-2026-08',
      name: 'Molde Micro-Conectores Médicos (16 Cavidades)',
      material: 'PEEK / Acero Stavax ESR',
      overallProgress: 68,
      estimatedDelivery: '18 de Agosto, 2026',
      daysRemaining: 19,
      currentPhase: 'Etapa 3: Ajuste de Matriz & Ensamblaje',
      location: 'Nave Llinars del Vallès (Barcelona)',
      steps: [
        { name: 'DFM & Diseño CAD 3D', status: 'completed', date: '04 Jul 2026', notes: 'Simulación Moldflow aprobada por cliente.' },
        { name: 'Mecanizado CNC 5 Ejes & EDM', status: 'completed', date: '21 Jul 2026', notes: 'Cavidades templadas a 54 HRC y pulido espejo.' },
        { name: 'Ajuste de Matriz & Ensamblaje', status: 'in_progress', date: 'En curso (70%)', notes: 'Montaje de sistema de expulsión y canal caliente.' },
        { name: 'Prueba T1 Inyección en Prensa', status: 'pending', date: '08 Ago 2026', notes: 'Pruebas de inyección en máquina 120T.' },
        { name: 'Metrología CMM & Muestras FAI', status: 'pending', date: '14 Ago 2026', notes: 'Informe de tolerancias ±0.002mm en máquina ZEISS.' },
        { name: 'Expedición & Entrega Final', status: 'pending', date: '18 Ago 2026', notes: 'Entrega de molde certificado e historial técnico.' }
      ],
      recentLog: [
        { time: 'Hoy 10:30 AM', update: 'Ajuste de guiado y centradores finalizado en Llinars del Vallès.' },
        { time: 'Ayer 16:45 PM', update: 'Inspección CMM parcial de placa porta-cavidades aprobada.' }
      ]
    },
    {
      id: 'proj-02',
      code: 'CSYS-2026-12',
      name: 'Molde Carcasa Sensor Automoción IP67 (4 Cavidades)',
      material: 'PBT+30%GF / Acero H13',
      overallProgress: 42,
      estimatedDelivery: '04 de Septiembre, 2026',
      daysRemaining: 36,
      currentPhase: 'Etapa 2: Mecanizado CNC 5 Ejes',
      location: 'Hub Dongguan (Verificación CMM Barcelona)',
      steps: [
        { name: 'DFM & Diseño CAD 3D', status: 'completed', date: '15 Jul 2026', notes: 'Planos 3D aprobados NDA.' },
        { name: 'Mecanizado CNC 5 Ejes & EDM', status: 'in_progress', date: 'En curso (80%)', notes: 'Desbaste y acabado de figura de cavidad.' },
        { name: 'Ajuste de Matriz & Ensamblaje', status: 'pending', date: '16 Ago 2026', notes: 'Ajuste de carros desmoldeadores laterales.' },
        { name: 'Prueba T1 Inyección en Prensa', status: 'pending', date: '25 Ago 2026', notes: 'Inyección de primeras muestras en resina PBT.' },
        { name: 'Metrología CMM & Muestras FAI', status: 'pending', date: '30 Ago 2026', notes: 'Inspección CMM final en Barcelona.' },
        { name: 'Expedición & Entrega Final', status: 'pending', date: '04 Sep 2026', notes: 'Despacho a planta de inyección del cliente.' }
      ],
      recentLog: [
        { time: '28 Jul 09:15 AM', update: 'Inicio de electroerosión por penetración EDM en nervios de estanqueidad.' }
      ]
    }
  ];

  const currentProject = clientProjects.find(p => p.id === selectedProjectId) || clientProjects[0];

  return (
    <div className="bg-black rounded-3xl border-2 border-amber-500/70 p-6 sm:p-10 space-y-8 shadow-2xl shadow-amber-950/40 relative overflow-hidden">
      
      {/* Header & Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-900">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold border border-amber-500/40">
            <Clock className="w-3.5 h-3.5" /> SEGUIMIENTO & RASTREO DE PROYECTO EN VIVO
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Tracking y Estado del Molde en Proceso
          </h2>
          <p className="text-xs text-slate-300 font-mono">
            Monitorea la etapa actual, los días restantes de fabricación y los informes de metrología.
          </p>
        </div>

        {/* Project Selector Dropdown */}
        <div className="w-full md:w-auto font-mono text-xs space-y-1">
          <label className="text-slate-400 block font-bold">Seleccionar Proyecto Activo:</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full md:w-80 px-4 py-2.5 rounded-xl bg-slate-950 border border-amber-500/50 text-white font-bold focus:border-amber-400 focus:outline-none"
          >
            {clientProjects.map(p => (
              <option key={p.id} value={p.id}>
                {p.code} - {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Project Overview Card */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        
        {/* Project Metrics Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-black border border-amber-500/40 space-y-1">
            <span className="text-slate-400 text-[11px]">Avance Total de Fabricación</span>
            <p className="text-3xl font-extrabold text-amber-400 font-tech">{currentProject.overallProgress}%</p>
            <p className="text-amber-300 text-[11px] font-bold">{currentProject.currentPhase}</p>
          </div>

          <div className="p-4 rounded-2xl bg-black border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[11px]">Fecha Estimada de Entrega</span>
            <p className="text-xl font-bold text-white font-tech pt-1">{currentProject.estimatedDelivery}</p>
            <p className="text-emerald-400 text-[11px] font-bold">Fase de Ajuste Final</p>
          </div>

          <div className="p-4 rounded-2xl bg-black border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[11px]">Días Restantes</span>
            <p className="text-3xl font-extrabold text-cyan-400 font-tech">{currentProject.daysRemaining} Días</p>
            <p className="text-slate-400 text-[11px]">Dentro de Cronograma</p>
          </div>

          <div className="p-4 rounded-2xl bg-black border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[11px]">Ubicación de Planta</span>
            <p className="text-sm font-bold text-white leading-snug pt-1">{currentProject.location}</p>
            <p className="text-amber-400 text-[11px] font-bold">Control CMM ZEISS</p>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span>Progreso General: <strong>{currentProject.name}</strong></span>
            <span className="text-amber-400 font-extrabold">{currentProject.overallProgress}% COMPLETADO</span>
          </div>
          <div className="w-full h-3 bg-black rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 rounded-full transition-all duration-700 shadow-md shadow-amber-500/50"
              style={{ width: `${currentProject.overallProgress}%` }}
            />
          </div>
        </div>

        {/* Timeline Steps Tracker */}
        <div className="space-y-4 pt-4 border-t border-slate-900">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" /> Etapas del Desarrollo del Molde:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 font-mono text-xs">
            {currentProject.steps.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isInProgress = step.status === 'in_progress';
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border space-y-2 flex flex-col justify-between transition-all ${
                    isCompleted
                      ? 'bg-black/90 border-emerald-500/50 text-slate-200'
                      : isInProgress
                      ? 'bg-amber-950/40 border-2 border-amber-500 text-white shadow-lg shadow-amber-500/20'
                      : 'bg-black/40 border-slate-850 text-slate-500'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400">Paso {idx + 1}</span>
                      {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {isInProgress && <Clock className="w-4 h-4 text-amber-400 animate-pulse" />}
                    </div>
                    <p className={`font-bold text-xs ${isInProgress ? 'text-amber-300' : 'text-white'}`}>{step.name}</p>
                  </div>

                  <div className="space-y-1 text-[10px] border-t border-slate-800 pt-2">
                    <p className="font-bold text-slate-300">{step.date}</p>
                    <p className="text-slate-400 leading-tight">{step.notes}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Workshop Activity Logs */}
        <div className="p-4 rounded-2xl bg-black border border-slate-800 space-y-3 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" /> Registro de Actividad Reciente en Taller:
            </span>
            <span className="text-slate-400 text-[11px]">Actualizado hoy</span>
          </div>

          <div className="space-y-2">
            {currentProject.recentLog.map((log, idx) => (
              <div key={idx} className="flex items-start gap-3 text-slate-300 text-[11px] border-b border-slate-900/80 pb-1.5">
                <span className="text-amber-400 font-bold shrink-0">{log.time}</span>
                <span>{log.update}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
