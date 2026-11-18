import React from 'react';
import { Mail, Phone, ArrowUp, FileText, Code2 } from 'lucide-react';
import { useLang } from '../lib/i18n';

export default function Footer({ onOpenEmailModal }) {
  const { t } = useLang();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-slate-900 pt-14 pb-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="h-10 px-2 rounded-xl bg-black border border-amber-500/40 flex items-center justify-center">
                <img src="/multimedia/logo_blanco.png" alt="CSYS MOULD Logo" className="h-full object-contain" />
              </div>
              <span className="text-lg font-bold text-white text-tech">CSYS MOULD</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('De la idea a la fabricación, brindamos soluciones técnicas a la conformación de plástico. Nave propia de 500m² en Llinars del Vallès (Barcelona).', 'From idea to manufacturing, we provide technical solutions for plastic forming. Our own 500 m² plant in Llinars del Vallès (Barcelona).')}
            </p>
          </div>

          {/* Location & Contact Info */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">{t('Contacto & Planta', 'Contact & Plant')}</h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="text-white font-bold">{t('Planta España (500 m²):', 'Spain Plant (500 m²):')}</p>
              <p>C/ Sant Celoni 54, Nave L1, POLÍGONO INDUSTRIAL CAN PRAT</p>
              <p>08450 Llinars del Vallès, Barcelona</p>
              <div className="pt-2 font-mono text-amber-400 space-y-1">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> 
                  <button
                    type="button"
                    onClick={() => onOpenEmailModal?.({ subject: t('Consulta desde Footer CSYS MOULD', 'CSYS MOULD Website Enquiry') })}
                    className="hover:underline text-left cursor-pointer"
                  >
                    abraham@csysmould.com
                  </button>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> <a href="tel:+34696764127" className="font-bold hover:underline">+34 696 76 41 27</a>
                </p>
              </div>
            </div>
          </div>

          {/* Cases & Specialty */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">{t('Especialidades', 'Specialities')}</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">{t('Micro-Inyección Tecnológica (±0,02 mm)', 'Technical Micro-Injection (±0.02 mm)')}</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">{t('Desarrollo CAD/CAM & Moldflow 3D', 'CAD/CAM Development & 3D Moldflow')}</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">{t('Moldes Médicos & Grado Alimentario', 'Medical & Food-Grade Moulds')}</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">{t('Moldes Electrónicos UL94-V0', 'UL94-V0 Electronics Moulds')}</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">{t('Galería Real de Instalaciones', 'Facilities Photo Gallery')}</a></li>
            </ul>
          </div>

          {/* Legal Information Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">{t('Información Legal & Datos', 'Legal Information & Data')}</h4>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono">
                <FileText className="w-3.5 h-3.5" /> {t('Protección de Datos & Consultas', 'Data Protection & Enquiries')}
              </div>
              <p className="leading-relaxed">
                {t('Si tienes dudas sobre los datos de la empresa o tratamiento de información, puedes contactarnos en', 'If you have questions about company data or how information is handled, contact us at')}{' '}
                <button
                  type="button"
                  onClick={() => onOpenEmailModal?.({ subject: t('Consulta Legal y Protección de Datos', 'Legal & Data Protection Enquiry') })}
                  className="text-amber-400 font-mono hover:underline cursor-pointer"
                >
                  abraham@csysmould.com
                </button>{' '}
                {t('o al teléfono ', 'or by phone at ')}<a href="tel:+34696764127" className="text-amber-400 font-mono font-bold hover:underline">+34 696 76 41 27</a>.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>
            {t('© 2026 CSYS MOULD. Todos los derechos reservados 2026. C/ Sant Celoni 54, Llinars del Vallès, Barcelona. Tel: ', '© 2026 CSYS MOULD. All rights reserved. C/ Sant Celoni 54, Llinars del Vallès, Barcelona. Phone: ')}<a href="tel:+34696764127" className="hover:text-amber-400 hover:underline">+34 696 76 41 27</a> | Email:{' '}
            <button
              type="button"
              onClick={() => onOpenEmailModal?.({ subject: t('Contacto Desde Web CSYS MOULD', 'Contact from CSYS MOULD Website') })}
              className="text-slate-300 hover:text-amber-400 hover:underline cursor-pointer"
            >
              abraham@csysmould.com
            </button>
          </p>
          
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-slate-950 border border-amber-500/40 text-amber-400 font-mono font-bold text-[11px] tracking-wide flex items-center gap-1.5 shadow-md shadow-amber-500/10">
              <Code2 className="w-3.5 h-3.5 text-amber-400" /> Powered by TJ Developer
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all flex items-center gap-1"
            >
              <span>{t('Subir', 'Top')}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
