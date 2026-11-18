import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Calendar, Sparkles, Building, Target, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getEmailComposeUrl } from '../lib/emailService';
import { useLang } from '../lib/i18n';

export default function LeadSurvey() {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState('');
  const [objective, setObjective] = useState('');
  const [timeline, setTimeline] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [completed, setCompleted] = useState(false);

  const industries = [
    { id: 'medtech', label: t('Médica / MedTech & Salud', 'Medical / MedTech & Health') },
    { id: 'automotive', label: t('Automoción & Transporte', 'Automotive & Transport') },
    { id: 'electronics', label: t('Electrónica & Sensores Industriales', 'Electronics & Industrial Sensors') },
    { id: 'consumer', label: t('Diseño, Consumo & Packaging', 'Design, Consumer Goods & Packaging') },
    { id: 'microoptics', label: t('Micro-Óptica & Tecnología de Precisión', 'Micro-Optics & Precision Technology') }
  ];

  const objectives = [
    { id: 'new_mold', label: t('Desarrollo de nuevo molde desde cero (CAD 3D / DFM)', 'New mould developed from scratch (3D CAD / DFM)') },
    { id: 'micro_injection', label: t('Micro-Inyección de piezas de alta precisión (±0,02 mm)', 'Micro-injection of high-precision parts (±0.02 mm)') },
    { id: 'mold_optimization', label: t('Optimización y reducción de tiempo de ciclo en molde existente', 'Optimisation and cycle-time reduction of an existing mould') },
    { id: 'volume_production', label: t('Fabricación en volumen (Planta Barcelona / China Hubs)', 'Volume production (Barcelona plant / China hubs)') }
  ];

  const timelines = [
    { id: 'urgent', label: t('Inmediato (Menos de 30 días)', 'Immediate (under 30 days)') },
    { id: 'short', label: t('1 a 3 meses', '1 to 3 months') },
    { id: 'annual', label: t('Planificación anual / Estudio preliminar', 'Annual planning / Preliminary study') }
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

  const requestSubject = t(`Solicitud de Cotización y Reunión Técnica - ${industry}`, `Quote & Technical Meeting Request - ${industry}`);
  const requestBody = t(
    `Estimado equipo técnico de CSYS MOULD,\n\nMi empresa pertenece a la industria: ${industry}.\nObjetivo: ${objective}.\nPlazo estimado: ${timeline}.\n\nMi correo de contacto: ${contactEmail}\nTeléfono directo: ${contactPhone}.\n\nSolicito propuesta técnica y agendar una breve reunión.`,
    `Dear CSYS MOULD technical team,\n\nMy company is in the following industry: ${industry}.\nGoal: ${objective}.\nEstimated timeline: ${timeline}.\n\nMy contact email: ${contactEmail}\nDirect phone: ${contactPhone}.\n\nI would like a technical proposal and to schedule a short meeting.`
  );
  const mailtoLink = getEmailComposeUrl({ to: 'abraham@csysmould.com', subject: requestSubject, body: requestBody, client: 'mailto' });

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
              <Sparkles className="w-3.5 h-3.5" /> {t('EVALUACIÓN DE PROYECTO & COTIZACIÓN', 'PROJECT ASSESSMENT & QUOTE')}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
              {t('Responde a este formulario rápido y accede a la información instantánea o cotiza tu proyecto', 'Answer this quick form to get instant information or a quote for your project')}
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
                <span className={`px-3 py-1 rounded-full ${step >= 1 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900'}`}>{t('1. Industria', '1. Industry')}</span>
                <span>→</span>
                <span className={`px-3 py-1 rounded-full ${step >= 2 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900'}`}>{t('2. Objetivo', '2. Goal')}</span>
                <span>→</span>
                <span className={`px-3 py-1 rounded-full ${step >= 3 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900'}`}>{t('3. Plazo', '3. Timeline')}</span>
                <span>→</span>
                <span className={`px-3 py-1 rounded-full ${step >= 4 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900'}`}>{t('4. Cotizar / Agendar', '4. Quote / Book')}</span>
              </div>
            )}

            {/* Form Container */}
            <div className="max-w-2xl mx-auto bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 text-xs space-y-6">
              
              {/* STEP 1: INDUSTRY */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Building className="w-4 h-4 text-amber-400" /> {t('1. ¿De qué industria proviene tu empresa?', '1. Which industry is your company in?')}
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
                      <span>{t('Siguiente Pregunta', 'Next Question')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: OBJECTIVE */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-400" /> {t('2. ¿Cuál es el objetivo principal de tu proyecto?', '2. What is the main goal of your project?')}
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
                      {t('← Volver', '← Back')}
                    </button>
                    <button
                      type="button"
                      disabled={!objective}
                      onClick={handleNext}
                      className="px-6 py-3 rounded-xl bg-amber-500 disabled:opacity-50 text-slate-950 font-bold flex items-center gap-2"
                    >
                      <span>{t('Siguiente Pregunta', 'Next Question')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: TIMELINE */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" /> {t('3. ¿En qué plazo necesitas poner en marcha la fabricación?', '3. When do you need manufacturing to start?')}
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
                      {t('← Volver', '← Back')}
                    </button>
                    <button
                      type="button"
                      disabled={!timeline}
                      onClick={handleNext}
                      className="px-6 py-3 rounded-xl bg-amber-500 disabled:opacity-50 text-slate-950 font-bold flex items-center gap-2"
                    >
                      <span>{t('Acceder a Información & Cotizar', 'Get Information & Quote')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: CONTACT & BOOKING */}
              {step === 4 && !completed && (
                <form onSubmit={handleComplete} className="space-y-4 animate-in fade-in">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" /> {t('4. Solicitar Cotización & Agendar con Dirección', '4. Request a Quote & Book with Management')}
                  </h3>

                  <div className="p-4 rounded-xl bg-black border border-slate-800 space-y-1 font-mono text-[11px] text-slate-300">
                    <p><strong className="text-amber-400">{t('Industria:', 'Industry:')}</strong> {industry}</p>
                    <p><strong className="text-amber-400">{t('Objetivo:', 'Goal:')}</strong> {objective}</p>
                    <p><strong className="text-amber-400">{t('Plazo:', 'Timeline:')}</strong> {timeline}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-slate-400 block mb-1">{t('Correo Electrónico de Contacto *', 'Contact Email *')}</label>
                      <input
                        type="email"
                        required
                        placeholder={t('ejemplo@empresa.com', 'example@company.com')}
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">{t('Teléfono Directo *', 'Direct Phone *')}</label>
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

                  <div className="pt-3 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={getEmailComposeUrl({
                          to: 'abraham@csysmould.com',
                          subject: requestSubject,
                          body: requestBody,
                          client: 'gmail'
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-950/60 transition-all cursor-pointer"
                      >
                        <span className="w-5 h-5 rounded-md bg-white/20 font-black text-xs flex items-center justify-center">G</span>
                        <span>{t('Enviar Solicitud por Gmail', 'Send Request via Gmail')}</span>
                      </a>

                      <a
                        href={getEmailComposeUrl({
                          to: 'abraham@csysmould.com',
                          subject: requestSubject,
                          body: requestBody,
                          client: 'outlook'
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-950/60 transition-all cursor-pointer"
                      >
                        <span className="w-5 h-5 rounded-md bg-white/20 font-black text-xs flex items-center justify-center">O</span>
                        <span>{t('Enviar Solicitud por Outlook', 'Send Request via Outlook')}</span>
                      </a>
                    </div>

                    <div className="text-center pt-1">
                      <a
                        href={mailtoLink}
                        className="text-[11px] text-slate-400 hover:text-amber-400 font-mono underline"
                      >
                        {t('O abrir con la app de correo predeterminada del sistema (mailto)', 'Or open with your default email app (mailto)')}
                      </a>
                    </div>
                  </div>
                </form>
              )}

              {/* COMPLETED SUCCESS MESSAGE */}
              {completed && (
                <div className="text-center py-6 space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">{t('¡Cotización & Registro Exitoso!', 'Quote Request Received!')}</h4>
                  <p className="text-xs text-slate-300">
                    {t('Nos pondremos en contacto directamente a ', 'We will contact you directly at ')}<strong className="text-amber-400">{contactEmail}</strong>{t(' o ', ' or ')}<strong className="text-amber-400">{contactPhone}</strong>{t(' para formalizar la propuesta técnica.', ' to finalise the technical proposal.')}
                  </p>
                  <button
                    onClick={() => {
                      setStep(1);
                      setCompleted(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono font-bold"
                  >
                    {t('Volver a evaluar', 'Start over')}
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
