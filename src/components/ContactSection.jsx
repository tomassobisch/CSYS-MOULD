import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mouldData';
import { Mail, Send, CheckCircle2, UserCheck, Building } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getPreferredEmailClient, setPreferredEmailClient, openEmailClient } from '../lib/emailService';
import { useLang } from '../lib/i18n';

export default function ContactSection({ onOpenEmailModal }) {
  const { t } = useLang();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    moldType: 'Micro-Inyección Tecnológica',
    message: ''
  });

  const [emailClient, setEmailClient] = useState(() => getPreferredEmailClient() || 'gmail');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = t(
      `Solicitud de Presupuesto - ${formData.company || formData.name} (${formData.moldType})`,
      `Quote Request - ${formData.company || formData.name} (${formData.moldType})`
    );
    const body = t(
      `Estimado equipo técnico de CSYS MOULD,\n\nLes contacto a través de la web para solicitar presupuesto con los siguientes datos:\n\n• Nombre: ${formData.name}\n• Empresa: ${formData.company}\n• Email: ${formData.email}\n• Teléfono: ${formData.phone || 'No especificado'}\n• Tipo de Proyecto: ${formData.moldType}\n\nDetalles del Proyecto / Mensaje:\n${formData.message}\n\nQuedo a la espera de su respuesta técnica y cotización.\n\nAtentamente,\n${formData.name}`,
      `Dear CSYS MOULD technical team,\n\nI am contacting you through your website to request a quote with the following details:\n\n• Name: ${formData.name}\n• Company: ${formData.company}\n• Email: ${formData.email}\n• Phone: ${formData.phone || 'Not specified'}\n• Project type: ${formData.moldType}\n\nProject details / Message:\n${formData.message}\n\nI look forward to your technical reply and quote.\n\nKind regards,\n${formData.name}`
    );

    openEmailClient({
      to: 'abraham@csysmould.com',
      subject,
      body,
      client: emailClient
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - EXACT MODIFICATIONS FROM SCREENSHOT */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold">
            <UserCheck className="w-3.5 h-3.5" /> {t('SOCIOS DE CSYSMOULD', 'CSYSMOULD PARTNERS')}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            {t('Claudio Arriaga y Abraham Lozano', 'Claudio Arriaga and Abraham Lozano')}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal pt-2">
            {t(
              <>Atención <strong className="text-white font-extrabold">directa y personalizada</strong> de los socios <strong className="text-white font-extrabold">Claudio Arriaga, responsable de Gestión de Clientes,</strong> y <strong className="text-white font-extrabold">Abraham Lozano, Director de Taller,</strong> presentes en cada fase del proyecto: <strong className="text-white font-extrabold">desde la primera idea hasta el producto definitivo en manos del cliente.</strong></>,
              <><strong className="text-white font-extrabold">Direct, personal attention</strong> from partners <strong className="text-white font-extrabold">Claudio Arriaga, Client Relations Manager,</strong> and <strong className="text-white font-extrabold">Abraham Lozano, Workshop Director,</strong> involved in every stage of the project: <strong className="text-white font-extrabold">from the first idea to the finished product in the client's hands.</strong></>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Directors Contact Cards & Real Photos */}
          <div className="reveal-stagger lg:col-span-5 space-y-6">
            
            {/* Director 1: Claudio Arriaga */}
            <div className="glass-panel-amber p-6 rounded-3xl border border-amber-500/30 flex items-center gap-5 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 shadow-xl">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-500/50 shrink-0 shadow-lg">
                <img
                  src={COMPANY_INFO.contacts.claudio.photo}
                  alt={t('Claudio Arriaga - Socio Gestión de Clientes', 'Claudio Arriaga - Partner, Client Relations')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{t('SOCIO / GESTIÓN DE CLIENTES', 'PARTNER / CLIENT RELATIONS')}</span>
                <h3 className="text-base font-bold text-white">Claudio Arriaga</h3>
                <p className="text-slate-300 font-mono">
                  Email: <a href={`mailto:${COMPANY_INFO.contacts.claudio.email}`} className="text-amber-400 hover:underline">{COMPANY_INFO.contacts.claudio.email}</a>
                </p>
              </div>
            </div>

            {/* Director 2: Abraham Lozano */}
            <div className="glass-panel-amber p-6 rounded-3xl border border-amber-500/30 flex items-center gap-5 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 shadow-xl">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-500/50 shrink-0 shadow-lg">
                <img
                  src={COMPANY_INFO.contacts.abraham.photo}
                  alt={t('Abraham Lozano - Socio Director de Taller', 'Abraham Lozano - Partner, Workshop Director')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{t('SOCIO / DIRECTOR DE TALLER', 'PARTNER / WORKSHOP DIRECTOR')}</span>
                <h3 className="text-base font-bold text-white">Abraham Lozano</h3>
                <p className="text-slate-300 font-mono">
                  Email: <a href={`mailto:${COMPANY_INFO.contacts.abraham.email}`} className="text-amber-400 hover:underline">{COMPANY_INFO.contacts.abraham.email}</a>
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenEmailModal?.({
                      to: 'abraham@csysmould.com',
                      subject: t('Consulta Técnica CSYS MOULD', 'CSYS MOULD Technical Enquiry'),
                      body: t('Estimado equipo técnico de CSYS MOULD,\n\nMe pongo en contacto para consultar sobre:\n\n', 'Dear CSYS MOULD technical team,\n\nI am getting in touch to ask about:\n\n')
                    })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 border border-amber-500/40 text-amber-300 hover:text-slate-950 font-bold text-xs transition-all cursor-pointer"
                    title={t('Contactar por correo', 'Contact by email')}
                  >
                    <Mail className="w-3.5 h-3.5" /> {t('Contactar', 'Contact')}
                  </button>
                </div>
              </div>
            </div>

            {/* Plant Facility Card */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                <Building className="w-4 h-4 text-amber-400" /> {t('PLANTA PROPIA ESPAÑA (500 m²)', 'OWN PLANT IN SPAIN (500 m²)')}
              </div>
              <p className="text-slate-200 font-bold">{COMPANY_INFO.spainPlant.address}</p>
              <p className="text-slate-400">{t(COMPANY_INFO.spainPlant.city, COMPANY_INFO.spainPlant.city.replace("España", "Spain"))}</p>
              <p className="text-slate-400 font-mono pt-1">
                {t('Tel. Oficina: ', 'Office phone: ')}<a href="tel:+34696764127" className="text-amber-400 font-bold hover:underline">+34 696 76 41 27</a>
              </p>
              <p className="text-emerald-400 font-bold pt-1">{t('Plantas asociadas en China: Dongguan & Shenzhen', 'Partner plants in China: Dongguan & Shenzhen')}</p>
            </div>

          </div>

          {/* Direct Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-amber rounded-3xl border border-amber-500/40 p-6 sm:p-8 space-y-6 shadow-2xl bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950">
              
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-400" /> {t('Solicitud de Presupuesto Directo a los Socios', 'Request a Quote Directly from the Partners')}
              </h3>

              {submitted ? (
                <div className="p-8 text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">{t('¡Mensaje Recibido Correctamente!', 'Message Received!')}</h4>
                  <p className="text-sm text-slate-300">
                    {t('Claudio Arriaga o Abraham Lozano se pondrán en contacto contigo en un plazo máximo de 24 horas laborables.', 'Claudio Arriaga or Abraham Lozano will get back to you within 24 working hours.')}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    {t('Enviar otro mensaje', 'Send another message')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 block mb-1 font-bold">{t('Tu Nombre Completo *', 'Your Full Name *')}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('Ej: Carlos Gómez', 'e.g. John Smith')}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 block mb-1 font-bold">{t('Empresa *', 'Company *')}</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={t('Ej: MedTech Innovations', 'e.g. MedTech Innovations')}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 block mb-1 font-bold">{t('Email de Contacto *', 'Contact Email *')}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t('carlos@empresa.com', 'john@company.com')}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 block mb-1 font-bold">{t('Teléfono de Contacto', 'Contact Phone')}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+34 600 000 000"
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1 font-bold">{t('Tipo de Proyecto / Requerimiento', 'Project Type / Requirement')}</label>
                    <select
                      value={formData.moldType}
                      onChange={(e) => setFormData({ ...formData, moldType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="Micro-Inyección Tecnológica">{t('Micro-Inyección Tecnológica (±0,02 mm)', 'Technical Micro-Injection (±0.02 mm)')}</option>
                      <option value="Desarrollo Molde Médico / Sala Blanca">{t('Desarrollo Molde Médico / Sala Blanca', 'Medical / Cleanroom Mould Development')}</option>
                      <option value="Molde Electrónica / Autoextinguible">{t('Molde Electrónica / Autoextinguible UL94-V0', 'Electronics / Flame-Retardant UL94-V0 Mould')}</option>
                      <option value="Molde 2K / Doble Inyección">{t('Molde 2K / Doble Inyección', '2K / Two-Shot Injection Mould')}</option>
                      <option value="Consultoría DFM / Análisis Moldflow">{t('Consultoría DFM / Análisis Moldflow', 'DFM Consulting / Moldflow Analysis')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1 font-bold">{t('Mensaje o Detalles del Proyecto', 'Message or Project Details')}</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('Describe la pieza plástica, material deseado, número de cavidades estimado...', 'Describe the plastic part, desired material, estimated number of cavities...')}
                      className="w-full p-4 rounded-xl bg-black border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Email Service Selector */}
                  <div className="p-3.5 rounded-2xl bg-black border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-bold text-xs flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-amber-400" /> {t('Selecciona tu servicio de correo preferido:', 'Choose your preferred email service:')}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEmailClient('gmail');
                          setPreferredEmailClient('gmail');
                        }}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          emailClient === 'gmail'
                            ? 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/70 shadow-md shadow-amber-950/40'
                            : 'bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 border border-slate-800'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Gmail Web
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEmailClient('outlook');
                          setPreferredEmailClient('outlook');
                        }}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          emailClient === 'outlook'
                            ? 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/70 shadow-md shadow-amber-950/40'
                            : 'bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 border border-slate-800'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Outlook Web
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEmailClient('mailto');
                          setPreferredEmailClient('mailto');
                        }}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          emailClient === 'mailto'
                            ? 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/70 shadow-md shadow-amber-950/40'
                            : 'bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 border border-slate-800'
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5" /> {t('App Sistema', 'System App')}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{t('Abriendo redactor de correo...', 'Opening email composer...')}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>{t('Enviar Solicitud', 'Send Request')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
