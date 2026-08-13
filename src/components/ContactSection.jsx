import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mouldData';
import { Mail, Phone, MapPin, Send, CheckCircle2, UserCheck, Shield, Clock, Building, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    moldType: 'Micro-Inyección Tecnológica',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold">
            <UserCheck className="w-3.5 h-3.5" /> ATENCIÓN DIRECTA DE DIRECCIÓN
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Contacta con Claudio o Abraham Lozano
          </h2>
          <p className="text-sm text-slate-300">
            Envíanos tus requerimientos o archivo CAD 3D para una valoración técnica directa y confidencial desde nuestra planta de <strong className="text-white">Llinars del Vallès (Barcelona)</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Directors Contact Cards & Real Photos */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Director 1: Claudio */}
            <div className="glass-panel-amber p-6 rounded-3xl border border-amber-500/30 flex items-center gap-5 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 shadow-xl">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-500/50 shrink-0 shadow-lg">
                <img
                  src={COMPANY_INFO.contacts.claudio.photo}
                  alt={COMPANY_INFO.contacts.claudio.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{COMPANY_INFO.contacts.claudio.role}</span>
                <h3 className="text-base font-bold text-white">{COMPANY_INFO.contacts.claudio.name}</h3>
                <p className="text-slate-300 font-mono">
                  Email: <a href={`mailto:${COMPANY_INFO.contacts.claudio.email}`} className="text-amber-400 hover:underline">{COMPANY_INFO.contacts.claudio.email}</a>
                </p>
                <p className="text-slate-300 font-mono">
                  Tel: <a href={`tel:${COMPANY_INFO.contacts.claudio.phone}`} className="text-amber-400 font-bold hover:underline">{COMPANY_INFO.contacts.claudio.phone}</a>
                </p>
              </div>
            </div>

            {/* Director 2: Abraham Lozano */}
            <div className="glass-panel-amber p-6 rounded-3xl border border-amber-500/30 flex items-center gap-5 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 shadow-xl">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-500/50 shrink-0 shadow-lg">
                <img
                  src={COMPANY_INFO.contacts.abraham.photo}
                  alt={COMPANY_INFO.contacts.abraham.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{COMPANY_INFO.contacts.abraham.role}</span>
                <h3 className="text-base font-bold text-white">{COMPANY_INFO.contacts.abraham.name}</h3>
                <p className="text-slate-300 font-mono">
                  Email: <a href={`mailto:${COMPANY_INFO.contacts.abraham.email}`} className="text-amber-400 hover:underline">{COMPANY_INFO.contacts.abraham.email}</a>
                </p>
                <p className="text-slate-300 font-mono">
                  Tel: <a href={`tel:${COMPANY_INFO.contacts.abraham.phone}`} className="text-amber-400 font-bold hover:underline">{COMPANY_INFO.contacts.abraham.phone}</a>
                </p>
              </div>
            </div>

            {/* Plant Facility Card */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                <Building className="w-4 h-4 text-amber-400" /> PLANTA PROPIA ESPAÑA (500 m²)
              </div>
              <p className="text-slate-200 font-bold">{COMPANY_INFO.spainPlant.address}</p>
              <p className="text-slate-400">{COMPANY_INFO.spainPlant.city}</p>
              <p className="text-slate-400 font-mono pt-1">Tel. Oficina: {COMPANY_INFO.contacts.phoneOffice}</p>
              <p className="text-emerald-400 font-bold pt-1">Plantas asociadas en China: Dongguan & Shenzhen</p>
            </div>

          </div>

          {/* Direct Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-amber rounded-3xl border border-amber-500/40 p-6 sm:p-8 space-y-6 shadow-2xl bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950">
              
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-400" /> Solicitud de Presupuesto Directo a Dirección
              </h3>

              {submitted ? (
                <div className="p-8 text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">¡Mensaje Recibido Correctamente!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Muchas gracias por contactar con CSYS MOULD. Claudio o Abraham Lozano revisarán tus especificaciones técnicas y se pondrán en contacto contigo a la brevedad.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-xs font-mono font-bold text-slate-300 hover:text-white"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 font-mono block mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Tu Nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 font-mono block mb-1">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        placeholder="correo@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 font-mono block mb-1">Teléfono Directo</label>
                      <input
                        type="tel"
                        placeholder="+34 600 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 font-mono block mb-1">Empresa / Organización</label>
                      <input
                        type="text"
                        placeholder="Nombre de Empresa"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 font-mono block mb-1">Tipo de Molde / Proyecto</label>
                    <select
                      value={formData.moldType}
                      onChange={(e) => setFormData({ ...formData, moldType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-amber-400 focus:outline-none"
                    >
                      <option value="Micro-Inyección Tecnológica">Micro-Inyección Tecnológica (±0.002mm)</option>
                      <option value="Desarrollo de Molde a Medida">Desarrollo Integral de Molde (CAD/CAM/Moldflow)</option>
                      <option value="Molde Médica / Infantil">Molde Médica / Infantil</option>
                      <option value="Molde Electrónica & Seguridad">Molde Electrónica & Seguridad</option>
                      <option value="Sobremoldeo 2K Multimaterial">Sobremoldeo 2K Multimaterial</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-mono block mb-1">Detalles del Proyecto & Especificaciones *</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Describe las características de la pieza, polímero deseado, número de cavidades, cadencia estimada..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-amber-400 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Enviando Mensaje...' : 'Enviar Solicitud a Claudio y Abraham Lozano'}
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
