import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Calendar, Mail, Phone, Sparkles, Building, Target, Clock, ShieldCheck, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LeadSurvey() {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState('');
  const [objective, setObjective] = useState('');
  const [timeline, setTimeline] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [completed, setCompleted] = useState(false);

  const industries = [
    { id: 'medtech', label: 'Médica / MedTech & Salud' },
    { id: 'automotive', label: 'Automoción & Transporte' },
    { id: 'electronics', label: 'Electrónica & Sensores Industriales' },
    { id: 'consumer', label: 'Diseño, Consumo & Packaging' },
    { id: 'microoptics', label: 'Micro-Óptica & Tecnología de Precisión' }
  ];

  const objectives = [
    { id: 'new_mold', label: 'Desarrollo de nuevo molde desde cero (CAD 3D / DFM)' },
    { id: 'micro_injection', label: 'Micro-Inyección de piezas de alta precisión (±0.002mm)' },
    { id: 'mold_optimization', label: 'Optimización y reducción de tiempo de ciclo en molde existente' },
    { id: 'volume_production', label: 'Fabricación en volumen (Planta Barcelona / China Hubs)' }
  ];

  const timelines = [
    { id: 'urgent', label: 'Inmediato (Menos de 30 días)' },
    { id: 'short', label: '1 a 3 meses' },
    { id: 'annual', label: 'Planificación anual / Estudio preliminar' }
  ];

  const handleNext = () => {
    if (step === 1 && !industry) return;
    if (step === 2 && !objective) return;
    if (step === 3 && !timeline) return;
    setStep(step + 1);
  };

  const handleComplete = (e) => {
    e.preventDefault();
    setCompleted(true);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
  };

  const mailtoLink = `mailto:info@csysmould.com?subject=Solicitud%20de%20Cotizaci%C3%B3n%20y%20Reuni%C3%B3n%20T%C3%A9cnica%20-${encodeURIComponent(industry)}&body=Hola%20Claudio%20y%20Abraham,%0A%0AMi%20empresa%20pertenece%20a%20la%20industria:%20${encodeURIComponent(industry)}.%0AObjetivo:%20${encodeURIComponent(objective)}.%0APlazo:%20${encodeURIComponent(timeline)}.%0A%0AMi%20correo:%20${encodeURIComponent(contactEmail)}%0ATel%C3%A9fono:%20${encodeURIComponent(contactPhone)}.%0A%0AMe%20gustar%C3%ADa%20recibir%20cotizaci%C3%B3n%20y%20agendar%20una%20reuni%C3%B3n.`;

  return (
    <section id="survey" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-black rounded-3xl border-2 border-amber-500/70 p-6 sm:p-10 space-y-6 shadow-2xl shadow-amber-950/40 relative overflow-hidden">
        
        {/* COLLAPSIBLE HEADER BUTTON */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-4 cursor-pointer group"
        >
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold border border-amber-500/40">
              <Sparkles className="w-3.5 h-3.5" /> EVALUACIÓN DE PROYECTO & COTIZACIÓN
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
              Responde a este formulario rápido y accede a la información instantánea o cotiza tu proyecto
            </h2>
          </div>

          <button
            type="button"
            className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400 group-hover:border-amber-500/50 transition-all shrink-0"
          >
            {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
        </div>

        {/* EXPANDABLE SURVEY CONTENT */}
        {isOpen && (
          <div className="space-y-6 pt-4 border-t border-slate-900 animate-in fade-in duration-300">
            
            {/* Step Indicator */}
            {!completed && (
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-400">
                <span className={`px-3 py-1 rounded-full ${step >= 1 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900'}`}>1. Industria</span>
                <span>→</span>
                <span className={`px-3 py-1 rounded-full ${step >= 2 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900'}`}>2. Objetivo</span>
                <span>→</span>
                <span className={`px-3 py-1 rounded-full ${step >= 3 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900'}`}>3. Plazo</span>
                <span>→</span>
                <span className={`px-3 py-1 rounded-full ${step >= 4 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900'}`}>4. Cotizar / Agendar</span>
              </div>
            )}

            {/* Form Container */}
            <div className="max-w-2xl mx-auto bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 text-xs space-y-6">
              
              {/* STEP 1: INDUSTRY */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Building className="w-4 h-4 text-amber-400" /> 1. ¿De qué industria proviene tu empresa?
                  </h3>
                  <div className="space-y-2">
                    {industries.map((ind) => (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => setIndustry(ind.label)}
                        className={`w-full p-3 rounded-xl border text-left font-mono transition-all flex items-center justify-between ${
                          industry === ind.label
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'bg-black border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>{ind.label}</span>
                        {industry === ind.label && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={!industry}
                      onClick={handleNext}
                      className="px-6 py-3 rounded-xl bg-amber-500 disabled:opacity-50 text-slate-950 font-bold flex items-center gap-2"
                    >
                      <span>Siguiente Pregunta</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: OBJECTIVE */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-400" /> 2. ¿Cuál es el objetivo principal de tu proyecto?
                  </h3>
                  <div className="space-y-2">
                    {objectives.map((obj) => (
                      <button
                        key={obj.id}
                        type="button"
                        onClick={() => setObjective(obj.label)}
                        className={`w-full p-3 rounded-xl border text-left font-mono transition-all flex items-center justify-between ${
                          objective === obj.label
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'bg-black border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>{obj.label}</span>
                        {objective === obj.label && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-slate-400 hover:text-white"
                    >
                      ← Volver
                    </button>
                    <button
                      type="button"
                      disabled={!objective}
                      onClick={handleNext}
                      className="px-6 py-3 rounded-xl bg-amber-500 disabled:opacity-50 text-slate-950 font-bold flex items-center gap-2"
                    >
                      <span>Siguiente Pregunta</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: TIMELINE */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" /> 3. ¿En qué plazo necesitas poner en marcha la fabricación?
                  </h3>
                  <div className="space-y-2">
                    {timelines.map((tm) => (
                      <button
                        key={tm.id}
                        type="button"
                        onClick={() => setTimeline(tm.label)}
                        className={`w-full p-3 rounded-xl border text-left font-mono transition-all flex items-center justify-between ${
                          timeline === tm.label
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'bg-black border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>{tm.label}</span>
                        {timeline === tm.label && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-slate-400 hover:text-white"
                    >
                      ← Volver
                    </button>
                    <button
                      type="button"
                      disabled={!timeline}
                      onClick={handleNext}
                      className="px-6 py-3 rounded-xl bg-amber-500 disabled:opacity-50 text-slate-950 font-bold flex items-center gap-2"
                    >
                      <span>Acceder a Información & Cotizar</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: CONTACT & BOOKING */}
              {step === 4 && !completed && (
                <form onSubmit={handleComplete} className="space-y-4 animate-in fade-in">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" /> 4. Solicitar Cotización & Agendar con Dirección
                  </h3>

                  <div className="p-4 rounded-xl bg-black border border-slate-800 space-y-1 font-mono text-[11px] text-slate-300">
                    <p><strong className="text-amber-400">Industria:</strong> {industry}</p>
                    <p><strong className="text-amber-400">Objetivo:</strong> {objective}</p>
                    <p><strong className="text-amber-400">Plazo:</strong> {timeline}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-slate-400 block mb-1">Correo Electrónico de Contacto *</label>
                      <input
                        type="email"
                        required
                        placeholder="ejemplo@empresa.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Teléfono Directo *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+34 600 000 000"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={mailtoLink}
                      className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30"
                    >
                      <Mail className="w-4 h-4" /> Solicitar Cotización Instantánea por Correo (info@csysmould.com)
                    </a>
                  </div>
                </form>
              )}

              {/* COMPLETED SUCCESS MESSAGE */}
              {completed && (
                <div className="text-center py-6 space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">¡Cotización & Registro Exitoso!</h4>
                  <p className="text-xs text-slate-300">
                    Nos pondremos en contacto directamente a <strong className="text-amber-400">{contactEmail}</strong> o <strong className="text-amber-400">{contactPhone}</strong> para formalizar la propuesta técnica.
                  </p>
                  <button
                    onClick={() => {
                      setStep(1);
                      setCompleted(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono font-bold"
                  >
                    Volver a evaluar
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
