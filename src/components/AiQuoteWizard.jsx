import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import { PLASTIC_MATERIALS, COMPANY_INFO } from '../data/mouldData';
import { Calculator, Sparkles, Check, ArrowRight, Download, Cpu, ShieldCheck, RefreshCw, FileText, Zap, Box } from 'lucide-react';

export default function AiQuoteWizard({ prefilledMold = null, onClose }) {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState('Automoción');
  const [dimensions, setDimensions] = useState({ length: 120, width: 80, height: 45 });
  const [material, setMaterial] = useState('ABS');
  const [cavities, setCavities] = useState(4);
  const [features, setFeatures] = useState({
    hotRunner: true,
    conformalCooling: false,
    mirrorPolish: true,
    moldTechTexture: false,
    unscrewingCore: false
  });

  const [clientInfo, setClientInfo] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: ''
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [quoteResult, setQuoteResult] = useState(null);

  useEffect(() => {
    if (prefilledMold) {
      setCavities(prefilledMold.cavities);
      if (prefilledMold.hotRunner && prefilledMold.hotRunner !== 'N/A') {
        setFeatures(prev => ({ ...prev, hotRunner: true }));
      }
    }
  }, [prefilledMold]);

  // AI Calculation Algorithm
  const calculateQuote = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const volumeCm3 = (dimensions.length * dimensions.width * dimensions.height) / 1000;
      const baseCostPerCavity = Math.max(1200, volumeCm3 * 15);
      
      let cavityMultiplier = 1;
      if (cavities === 2) cavityMultiplier = 1.7;
      if (cavities === 4) cavityMultiplier = 2.9;
      if (cavities === 8) cavityMultiplier = 4.8;
      if (cavities === 16) cavityMultiplier = 7.5;
      if (cavities === 32) cavityMultiplier = 12.0;

      let extraFeaturesCost = 0;
      if (features.hotRunner) extraFeaturesCost += 3500;
      if (features.conformalCooling) extraFeaturesCost += 4200;
      if (features.mirrorPolish) extraFeaturesCost += 1800;
      if (features.moldTechTexture) extraFeaturesCost += 1200;
      if (features.unscrewingCore) extraFeaturesCost += 4800;

      const totalEstimatedCost = Math.round((baseCostPerCavity * cavityMultiplier) + extraFeaturesCost);

      const projAreaCm2 = (dimensions.length * dimensions.width) / 100;
      const matFactor = material === 'PA66+GF30' || material === 'PEEK' ? 0.65 : 0.45;
      const estimatedTonnage = Math.max(50, Math.round(projAreaCm2 * cavities * matFactor));

      const leadTimeWeeks = cavities > 8 ? 6 : 4;

      let steelGrade = "Acero S136 ESR (Stainless 52 HRC)";
      if (material === 'PA66+GF30') steelGrade = "Acero H13 (54 HRC Resistente Abrasión)";
      if (features.mirrorPolish) steelGrade = "Acero S136 ESR Pulido Espejo SPI-A1";

      const estimatedWeightKg = Math.round((dimensions.length * dimensions.width * dimensions.height * cavities * 7.85) / 10000) + 250;

      const result = {
        totalEstimatedCost,
        estimatedTonnage,
        leadTimeWeeks,
        steelGrade,
        estimatedWeightKg,
        volumeCm3: Math.round(volumeCm3),
        quoteId: `CSYS-AI-${Math.floor(100000 + Math.random() * 900000)}`
      };

      setQuoteResult(result);
      setIsCalculating(false);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

    }, 800);
  };

  // Generate Commercial PDF proposal
  const downloadPdfQuote = () => {
    if (!quoteResult) return;
    const doc = new jsPDF();

    // Background header bar
    doc.setFillColor(3, 7, 18);
    doc.rect(0, 0, 210, 42, 'F');

    doc.setTextColor(224, 153, 0); // CSYS Gold
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('CSYS MOULD', 15, 20);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text('De la idea a la fabricacion - Planta Llinars del Valles (Barcelona)', 15, 28);
    doc.text(`Cotizacion N: ${quoteResult.quoteId}`, 130, 20);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 130, 28);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('RESUMEN DE COTIZACIÓN TÉCNICA E INDUSTRIAL', 15, 55);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Empresa / Cliente: ${clientInfo.company || 'Cliente Registrado'}`, 15, 65);
    doc.text(`Contacto Directo: ${clientInfo.contactName || 'N/A'}`, 15, 72);
    doc.text(`Sector Industrial: ${industry}`, 15, 79);
    doc.text(`Material Plástico: ${material}`, 15, 86);

    doc.setDrawColor(224, 153, 0);
    doc.line(15, 93, 195, 93);

    doc.setFont('helvetica', 'bold');
    doc.text('ESPECIFICACIONES TÉCNICAS DEL MOLDE CSYS MOULD', 15, 105);

    doc.setFont('helvetica', 'normal');
    doc.text(`• Dimensiones Pieza: ${dimensions.length} x ${dimensions.width} x ${dimensions.height} mm`, 15, 115);
    doc.text(`• Número de Cavidades: ${cavities} Cavidades`, 15, 122);
    doc.text(`• Acero de Molde Certificado: ${quoteResult.steelGrade}`, 15, 129);
    doc.text(`• Fuerza de Cierre Requerida: ${quoteResult.estimatedTonnage} Toneladas`, 15, 136);
    doc.text(`• Peso Estimado del Molde: ${quoteResult.estimatedWeightKg} kg`, 15, 143);
    doc.text(`• Tiempo de Fabricación Est.: ${quoteResult.leadTimeWeeks} Semanas`, 15, 150);

    doc.setFillColor(254, 243, 199);
    doc.rect(15, 160, 180, 30, 'F');
    doc.setDrawColor(224, 153, 0);
    doc.rect(15, 160, 180, 30, 'S');

    doc.setTextColor(180, 83, 9);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('PRESUPUESTO ESTIMADO BASE:', 25, 173);
    doc.setFontSize(18);
    doc.text(`${quoteResult.totalEstimatedCost.toLocaleString()} € (+IVA)`, 25, 183);

    doc.setTextColor(100, 116, 139);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text('Directores: Claudio (claudio@csysmould.com) y Abraham Lozano (abraham@csysmould.com)', 15, 205);
    doc.text('Planta Llinars del Valles: (+34) 934 607 266 | Ecosistema IA por TJ Developer: Tsteam.fit@gmail.com', 15, 212);

    doc.save(`CSYS_MOULD_Presupuesto_${quoteResult.quoteId}.pdf`);
  };

  return (
    <section id="calculator" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold">
            <Calculator className="w-3.5 h-3.5" /> ALGORITMO IA DE COTIZACIÓN DE MOLDES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Calculadora e Estimador en Tiempo Real
          </h2>
          <p className="text-sm text-slate-300">
            Ingresa las especificaciones de tu pieza plástica y recibe un desglose técnico instantáneo de costes, acero ideal y toneladas de inyectora.
          </p>
        </div>

        {/* Wizard Form Wrapper */}
        <div className="glass-panel-amber rounded-3xl border border-amber-500/30 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
          
          {/* Step Indicator */}
          {!quoteResult && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex items-center gap-2 text-xs font-bold font-mono ${
                    step >= s ? 'text-amber-400' : 'text-slate-600'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                    step === s
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 font-bold'
                      : step > s
                      ? 'bg-amber-950 text-amber-400 border-amber-500/40'
                      : 'bg-slate-900 border-slate-800 text-slate-600'
                  }`}>
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  <span className="hidden sm:inline">
                    {s === 1 ? 'Pieza & Sector' : s === 2 ? 'Dimensiones & Material' : s === 3 ? 'Cavidades' : 'Equipamiento'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* STEP 1: Industry Selection */}
          {step === 1 && !quoteResult && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Box className="w-5 h-5 text-amber-400" /> Selecciona el Sector Industrial
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Automoción', 'Médica / Pharma', 'Envase & Tapas', 'Electrónica', 'Electrodomésticos', 'Construcción', 'Aeroespacial', 'Juguetes'].map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustry(ind)}
                    className={`p-4 rounded-2xl border text-xs font-bold text-left transition-all ${
                      industry === ind
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/30"
                >
                  Siguiente: Geometría & Material <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Dimensions & Material */}
          {step === 2 && !quoteResult && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-400" /> Dimensiones Envolventes de la Pieza (mm)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Largo (mm)</label>
                  <input
                    type="number"
                    value={dimensions.length}
                    onChange={(e) => setDimensions({ ...dimensions, length: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Ancho (mm)</label>
                  <input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Alto (mm)</label>
                  <input
                    type="number"
                    value={dimensions.height}
                    onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <label className="text-xs font-mono text-slate-400 block">Material Plástico Seleccionado</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PLASTIC_MATERIALS.map((mat) => (
                    <button
                      key={mat.code}
                      onClick={() => setMaterial(mat.code)}
                      className={`p-3 rounded-xl border text-xs text-left transition-all ${
                        material === mat.code
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold font-mono block">{mat.code}</span>
                      <span className="text-[10px] text-slate-400 truncate block">{mat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/30"
                >
                  Siguiente: Número Cavidades <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Cavities Count */}
          {step === 3 && !quoteResult && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" /> Configuración de Cavidades del Molde
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 4, 8, 16, 32, 64].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCavities(c)}
                    className={`p-5 rounded-2xl border text-center transition-all ${
                      cavities === c
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20 scale-105'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-2xl font-extrabold font-mono block text-white">{c}</span>
                    <span className="text-[11px] text-slate-400 uppercase font-mono">Cavidades</span>
                  </button>
                ))}
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/30"
                >
                  Siguiente: Equipamiento Especial <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Features & Contact Info */}
          {step === 4 && !quoteResult && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> Características de Ingeniería Adicionales
              </h3>

              <div className="space-y-2">
                {[
                  { id: 'hotrunner', title: 'Sistema Canal Caliente (Hot Runner Manifold)', desc: 'Cero desperdicio de mazarota, llenado equilibrado' },
                  { id: 'conformalCooling', title: 'Refrigeración Conformal 3D (Conformal Cooling)', desc: 'Canales impresos en metal 3D DMLS' },
                  { id: 'mirrorPolish', title: 'Acabado Pulido Espejo SPI-A1 / Lentes', desc: 'Rugosidad Ra < 0.01 µm para cristalinos' },
                  { id: 'moldTechTexture', title: 'Texturizado Mold-Tech Grabado Láser', desc: 'Grabado de grano estético en matriz' },
                  { id: 'unscrewingCore', title: 'Desmoldeo Mecánico por Husillo / Roscas', desc: 'Para tapones roscados automáticos' }
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={features[item.id]}
                      onChange={(e) => setFeatures({ ...features, [item.id]: e.target.checked })}
                      className="mt-1 rounded accent-amber-400 w-4 h-4"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-200 block">{item.title}</span>
                      <span className="text-[11px] text-slate-400">{item.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nombre de Empresa (Ej: MedTech S.L.)"
                  value={clientInfo.company}
                  onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email de contacto (Ej: compras@medtech.com)"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Atrás
                </button>

                <button
                  onClick={calculateQuote}
                  disabled={isCalculating}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-xl shadow-amber-500/30 hover:scale-105 transition-all"
                >
                  {isCalculating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Procesando Algoritmo IA...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-slate-950" /> Generar Cotización CSYS MOULD
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* QUOTE RESULT DISPLAY */}
          {quoteResult && (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400">ID Cotización: {quoteResult.quoteId}</span>
                    <h3 className="text-xl font-bold text-white">Estimación Técnica y Comercial Completada</h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setQuoteResult(null);
                    setStep(1);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white text-xs font-mono"
                >
                  Recalcular
                </button>
              </div>

              {/* Price Callout Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 border border-amber-500/40 text-center space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Zap className="w-32 h-32 text-amber-400" />
                </div>

                <p className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                  Coste Estimado Total del Molde
                </p>
                <p className="text-4xl sm:text-5xl font-extrabold text-white font-tech">
                  {quoteResult.totalEstimatedCost.toLocaleString()} € <span className="text-xs text-slate-400 font-sans">+ IVA</span>
                </p>
                <p className="text-xs text-slate-300">
                  Garantía de fabricación bajo tolerancia <span className="text-amber-400 font-mono font-bold">±0.002mm</span> & 1,500,000 ciclos
                </p>
              </div>

              {/* Key Specs Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Fuerza Cierre Requerida</span>
                  <span className="text-base font-bold text-amber-300 font-tech">{quoteResult.estimatedTonnage} Toneladas</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Acero de Molde Ideal</span>
                  <span className="text-xs font-bold text-emerald-400">{quoteResult.steelGrade}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Peso Estimado Molde</span>
                  <span className="text-base font-bold text-cyan-400 font-mono">{quoteResult.estimatedWeightKg} kg</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Plazo de Entrega T1</span>
                  <span className="text-base font-bold text-white font-tech">{quoteResult.leadTimeWeeks} Semanas</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                <p className="text-xs text-slate-400">
                  Planta Llinars del Vallès (Barcelona) • Contacto: <span className="text-amber-400 font-mono">claudio@csysmould.com</span> / <span className="text-amber-400 font-mono">abraham@csysmould.com</span>
                </p>

                <button
                  onClick={downloadPdfQuote}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 hover:scale-105 transition-all"
                >
                  <Download className="w-4 h-4" /> Descargar Presupuesto PDF Certificado
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
