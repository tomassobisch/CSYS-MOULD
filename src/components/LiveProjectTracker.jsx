import React, { useState } from 'react';
import { DEMO_PROJECTS } from '../data/mouldData';
import { Activity, Search, CheckCircle2, Clock, FileText, Download, ShieldCheck, Cpu, ChevronRight } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function LiveProjectTracker() {
  const [searchCode, setSearchCode] = useState('CSYS-MOLD-772');
  const [activeProject, setActiveProject] = useState(DEMO_PROJECTS['CSYS-MOLD-772']);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const codeUpper = searchCode.trim().toUpperCase();
    if (DEMO_PROJECTS[codeUpper]) {
      setActiveProject(DEMO_PROJECTS[codeUpper]);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };

  const downloadCmmReport = () => {
    if (!activeProject) return;
    const doc = new jsPDF();

    doc.setFillColor(3, 7, 18);
    doc.rect(0, 0, 210, 35, 'F');

    doc.setTextColor(224, 153, 0);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('CSYS MOULD - METROLOGÍA CMM 3D', 15, 20);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text(`Proyecto ID: ${activeProject.id}`, 140, 20);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.text(`Cliente: ${activeProject.client}`, 15, 50);
    doc.text(`Molde: ${activeProject.moldName}`, 15, 58);
    doc.text(`Acero: ${activeProject.steelGrade}`, 15, 66);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('RESULTADOS DE INSPECCIÓN DIMENSIONAL (ZEISS CMM - PLANTA BARCELONA):', 15, 82);

    const measurements = [
      { param: 'Diámetro Núcleo Central', nominal: '25.000 mm', actual: '25.001 mm', dev: '+0.001 mm', status: 'OK' },
      { param: 'Profundidad de Cavidad', nominal: '42.500 mm', actual: '42.499 mm', dev: '-0.001 mm', status: 'OK' },
      { param: 'Paso de Pasadores Expulsores', nominal: '8.000 mm', actual: '8.000 mm', dev: '0.000 mm', status: 'OK' },
      { param: 'Concentricidad de Tapón', nominal: '0.005 mm', actual: '0.002 mm', dev: 'CONFORME', status: 'OK' }
    ];

    let y = 95;
    doc.setFont('helvetica', 'normal');
    measurements.forEach((m, idx) => {
      doc.text(`${idx + 1}. ${m.param}: Nom=${m.nominal} | Real=${m.actual} | Dev=${m.dev} [${m.status}]`, 15, y);
      y += 8;
    });

    doc.setFillColor(254, 243, 199);
    doc.rect(15, y + 10, 180, 20, 'F');
    doc.setTextColor(180, 83, 9);
    doc.setFont('helvetica', 'bold');
    doc.text('CERTIFICADO DE CONFORMIDAD METROLÓGICA ACEPTADO 100%', 25, y + 23);

    doc.save(`CSYS_Informe_CMM_${activeProject.id}.pdf`);
  };

  return (
    <section id="tracking" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold">
            <Activity className="w-3.5 h-3.5" /> PORTAL DE CLIENTE & PLANTA EN TIEMPO REAL
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Seguimiento de Producción de Moldes en Vivo
          </h2>
          <p className="text-sm text-slate-300">
            Ingresa tu código de proyecto para consultar el porcentaje de avance CNC/EDM y certificados CMM de nuestra nave en Barcelona.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex items-center gap-2 p-2 rounded-2xl glass-panel border border-amber-500/40 shadow-xl">
            <Search className="w-5 h-5 text-amber-400 ml-3" />
            <input
              type="text"
              placeholder="Introduce tu código (Ej: CSYS-MOLD-772, CSYS-AUTO-104)"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-transparent px-3 py-2 text-white text-xs font-mono focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
            >
              Consultar
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-[11px] text-slate-500 font-mono">Demos disponibles:</span>
            {Object.keys(DEMO_PROJECTS).map((code) => (
              <button
                key={code}
                onClick={() => {
                  setSearchCode(code);
                  setActiveProject(DEMO_PROJECTS[code]);
                  setNotFound(false);
                }}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-400 font-mono text-[11px] hover:border-amber-500/40"
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Project Card Dashboard */}
        {activeProject && !notFound && (
          <div className="glass-panel-amber rounded-3xl border border-amber-500/30 shadow-2xl p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
            
            {/* Project Header Info */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                    {activeProject.id}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{activeProject.client}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{activeProject.moldName}</h3>
              </div>

              {/* Progress Circle & Status */}
              <div className="flex items-center gap-4 bg-slate-950/90 p-4 rounded-2xl border border-slate-800">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Estado Actual</span>
                  <span className="text-sm font-bold text-amber-400">{activeProject.status}</span>
                  <span className="text-[10px] text-slate-500 block">Entrega Estimada: {activeProject.deliveryDate}</span>
                </div>
                <div className="relative w-14 h-14 rounded-full bg-slate-950 flex items-center justify-center border-2 border-amber-500 font-mono font-bold text-amber-400 text-sm">
                  {activeProject.progressPercent}%
                </div>
              </div>
            </div>

            {/* Milestones Gantt Steps Timeline */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Línea de Tiempo y Etapas de Fabricación
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeProject.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      step.status === 'completed'
                        ? 'bg-slate-900/80 border-emerald-500/30 text-slate-200'
                        : step.status === 'in_progress'
                        ? 'bg-amber-950/40 border-amber-500/50 text-white shadow-lg shadow-amber-950/50'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400">Etapa 0{idx + 1}</span>
                      {step.status === 'completed' && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> OK
                        </span>
                      )}
                      {step.status === 'in_progress' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono animate-pulse flex items-center gap-1">
                          <Clock className="w-3 h-3" /> En Proceso
                        </span>
                      )}
                      {step.status === 'pending' && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 text-[10px] font-mono">
                          Pendiente
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-bold mb-1">{step.name}</p>
                    <span className="text-[10px] font-mono opacity-60 block">{step.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Certifications & Downloadable Artifacts */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Medición verificada por brazos CMM y metrología óptica ZEISS en Llinars del Vallès</span>
              </div>

              <button
                onClick={downloadCmmReport}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-amber-300 hover:text-white transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-400" /> Descargar Informe CMM (PDF)
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
