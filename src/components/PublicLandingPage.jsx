import React, { useRef } from 'react';
import { Shield, Lock, MapPin, Mail, ArrowRight, CheckCircle2, Award, Globe, ShieldCheck, Factory } from 'lucide-react';
import VideoBackground from './VideoBackground';
import RealPhotoGallery from './RealPhotoGallery';
import DrivePhotoCarousel from './DrivePhotoCarousel';
import LeadSurvey from './LeadSurvey';
import ContactSection from './ContactSection';
import { useTechAnimations, CountUp } from '../lib/useTechAnimations';
import { useLang } from '../lib/i18n';

export default function PublicLandingPage({ onOpenLogin, onOpenContact, onOpenEmailModal }) {
  const rootRef = useRef(null);
  const { t } = useLang();
  useTechAnimations(rootRef);

  return (
    <div ref={rootRef} className="tech-landing space-y-16 sm:space-y-20 bg-black text-slate-100">
      
      {/* 1. PUBLIC HERO SECTION - PURELY INFORMATIVE WITH IMMEDIATE ACTION BUTTON */}
      <section id="hero" className="relative pt-36 pb-20 overflow-hidden min-h-[92vh] flex items-center bg-black">
        <VideoBackground />
        <div className="tech-grid-bg" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN: HERO TEXT & CONTENT */}
            <div data-reveal="left" className="lg:col-span-7 space-y-6 text-left">
              
              {/* Specialty Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/90 border border-amber-500/60 text-xs sm:text-sm font-semibold text-amber-300 shadow-2xl backdrop-blur-xl">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
                <span className="text-white font-mono font-bold">{t('DESARROLLO DE MOLDES & MICRO-INYECCIÓN', 'MOULD DEVELOPMENT & MICRO-INJECTION')}</span>
                <span className="text-amber-400 font-extrabold uppercase hidden sm:inline">| {t('Alta Precisión', 'High Precision')}</span>
              </div>

              {/* Headline - EXACT FROM SCREENSHOT */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {t('Expertos en Diseño y Fabricación de ', 'Experts in the Design and Manufacture of ')}<span className="text-gradient-amber">{t('Productos Plásticos', 'Plastic Products')}</span>
              </h1>

              {/* Subheadline */}
              <div className="space-y-2 pt-1">
                <p className="text-lg sm:text-xl font-bold text-slate-100">
                  {t('44 años fabricando moldes para ', '44 years building moulds for ')}<span className="text-amber-400 font-extrabold">NISSAN</span>, <span className="text-amber-400 font-extrabold">SEAT</span>, <span className="text-amber-400 font-extrabold">TOUS</span>{t(' y muchas más…', ' and many more…')}
                </p>
                <p className="text-sm sm:text-base text-slate-300 font-mono font-medium">
                  {t('Moldistas hasta 5 TN · Especialistas en Microinyección BABYPLAST', 'Moulds up to 5 t · BABYPLAST Micro-Injection Specialists')}
                </p>
              </div>

              {/* IMMEDIATE HERO CALL TO ACTION BUTTON */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenEmailModal?.({
                    subject: t('Solicitud de Información y Presupuesto CSYS MOULD', 'CSYS MOULD Information & Quote Request'),
                    body: t(
                      'Estimado equipo técnico de CSYS MOULD,\n\nMe gustaría solicitar información y presupuesto para un proyecto de moldes / inyección plástica.\n\nEmpresa:\nTeléfono:\nDetalles preliminares:',
                      'Dear CSYS MOULD technical team,\n\nI would like to request information and a quote for a mould / plastic injection project.\n\nCompany:\nPhone:\nPreliminary details:'
                    )
                  })}
                  className="cta-pulse w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 text-slate-950 font-extrabold text-sm sm:text-base shadow-2xl shadow-amber-500/50 hover:shadow-amber-400/70 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <Mail className="w-5 h-5 text-slate-950" />
                  <span>{t('Contáctanos, comienza a trabajar con nosotros o entérate de más', 'Contact us, start working with us or learn more')}</span>
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </button>

                {/* Secondary CTAs */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={onOpenContact}
                    className="h-11 px-4 sm:px-5 rounded-xl bg-black border border-slate-700/80 hover:border-amber-500/50 text-slate-200 hover:text-white font-bold text-xs shadow-lg hover:bg-slate-900 transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span><span className="sm:hidden">{t('Contacto', 'Contact')}</span><span className="hidden sm:inline">{t('Formulario de Contacto', 'Contact Form')}</span></span>
                  </button>

                  <button
                    onClick={onOpenLogin}
                    className="h-11 px-4 sm:px-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 text-amber-300 font-bold text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>{t('Portal Clientes', 'Client Portal')}</span>
                  </button>
                </div>
              </div>

              {/* Key Guarantees */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-4 font-mono">
                <span className="flex items-center gap-1.5 text-slate-200">
                  <MapPin className="w-4 h-4 text-amber-400" /> Llinars del Vallès (Barcelona - 500 m²)
                </span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('Tolerancia Controlada ±0,02 mm', 'Controlled Tolerance ±0.02 mm')}
                </span>
              </div>

            </div>

            {/* RIGHT COLUMN: HERO RECUADRO CON ABRAHAM EN SU POSICIÓN Y CLAUDIO AJUSTADO DE FORMA ARMÓNICA */}
            <div data-reveal="right" className="lg:col-span-5 relative">
              <div className="bg-black p-2.5 sm:p-3.5 rounded-3xl border-2 border-amber-500/80 shadow-2xl shadow-amber-500/20 relative overflow-hidden group">
                
                {/* HUD Corner Brackets */}
                <div className="hud-corner-tl" />
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />
                <div className="hud-corner-br" />

                {/* Laser Scan Line inside clean frame */}
                <div className="scanline-laser" />

                {/* HERO FRAMED IMAGE CONTAINER */}
                <div className="relative h-96 sm:h-[430px] rounded-2xl overflow-hidden bg-black flex flex-col items-center justify-end p-0">
                  
                  {/* Background Real Photo PNG */}
                  <img
                    src="/multimedia/dsc02858_real.png"
                    alt={t('Planta Real CSYS MOULD', 'CSYS MOULD plant')}
                    className="absolute inset-0 w-full h-full object-cover opacity-25 filter brightness-90"
                  />

                  {/* LOGO WATERMARK BEHIND */}
                  <img
                    src="/multimedia/logo_blanco.png"
                    alt={t('Marca de agua CSYS MOULD', 'CSYS MOULD watermark')}
                    className="absolute inset-0 m-auto max-h-44 opacity-15 filter blur-[0.5px] drop-shadow-[0_0_20px_rgba(224,153,0,0.5)] pointer-events-none"
                  />
                  
                  {/* Abraham & Claudio PNG Cutout Portrait */}
                  <div className="relative z-10 h-full w-full flex items-end justify-center pt-0 pb-0">
                    <img
                      src="/multimedia/IMG_2008.PNG"
                      alt={t('Claudio Arriaga y Abraham Lozano - Socios CSYS MOULD', 'Claudio Arriaga and Abraham Lozano - CSYS MOULD partners')}
                      className="h-full w-full object-contain object-bottom filter drop-shadow-[0_0_25px_rgba(224,153,0,0.85)] relative z-10 group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>

                  {/* ELEGANT PNG BRANDING BADGE OVERLAPPING & COVERING THE BOTTOM CORNER CUT SEAMLESSLY */}
                  <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-2.5 rounded-b-2xl bg-gradient-to-t from-black via-black/95 to-black/80 border-t border-amber-500/40 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <img src="/multimedia/logo_blanco.png" alt="CSYS MOULD Logo Badge" className="h-4 sm:h-5 object-contain" />
                      <span className="text-[10px] sm:text-[11px] font-mono text-white font-bold">Claudio Arriaga & Abraham Lozano</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-amber-400 font-extrabold">{t('SOCIOS DE CSYSMOULD', 'CSYSMOULD PARTNERS')}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Plant Stats Bar - TOLERANCIA MICRO INYECCIÓN 0,02 mm */}
          <div className="reveal-stagger grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <div className="bg-black p-5 rounded-2xl border border-amber-500/40 text-center shadow-xl">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-tech mb-1">{t('±0,02', '±0.02')} <span className="text-xs text-amber-300 font-mono">mm</span></p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{t('Tolerancia Micro-Inyección', 'Micro-Injection Tolerance')}</p>
            </div>
            <div className="bg-black p-5 rounded-2xl border border-amber-500/40 text-center shadow-xl">
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-tech mb-1"><CountUp to={500} /> <span className="text-xs text-amber-400 font-mono">m²</span></p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{t('Planta Propia Barcelona', 'Own Plant in Barcelona')}</p>
            </div>
            <div className="bg-black p-5 rounded-2xl border border-amber-500/40 text-center shadow-xl">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-tech mb-1"><CountUp to={10} /> <span className="text-xs text-emerald-300 font-mono">Ton</span></p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{t('Puente Grúa Gran Tonelaje', 'Heavy-Duty Overhead Crane')}</p>
            </div>
            <div className="bg-black p-5 rounded-2xl border border-amber-500/40 text-center shadow-xl">
              <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-tech mb-1">2 Hubs</p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{t('Centros China (Dongguan/Shenzhen)', 'China Hubs (Dongguan/Shenzhen)')}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HIGHLIGHTED SECTION: CHINA ASSOCIATED MANUFACTURING HUBS (DONGGUAN & SHENZHEN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-black to-slate-950 rounded-3xl border-2 border-amber-500/60 p-8 sm:p-12 space-y-8 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold">
                <Globe className="w-3.5 h-3.5" /> {t('FABRICACIÓN DUAL ESPAÑA & HUBS EN CHINA', 'DUAL MANUFACTURING: SPAIN & CHINA HUBS')}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {t('Centros de Fabricación Asociados en ', 'Partner Manufacturing Centres in ')}<span className="text-amber-400">Dongguan & Shenzhen</span>
              </h2>
              
              {/* EXACT BOLD FORMATTING FROM USER SCREENSHOT 1 */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {t(
                  <>Para responder a <strong className="text-white font-extrabold">proyectos de gran volumen o con plazos exigentes,</strong> combinamos la fabricación en nuestro Taller de <strong className="text-white font-extrabold">500 m² en Llinars del Vallès (Barcelona)</strong> con la gran capacidad productiva de nuestros <strong className="text-white font-extrabold">centros asociados en Dongguan y Shenzhen (China).</strong></>,
                  <>To handle <strong className="text-white font-extrabold">high-volume projects or tight deadlines,</strong> we combine manufacturing at our <strong className="text-white font-extrabold">500 m² workshop in Llinars del Vallès (Barcelona)</strong> with the large production capacity of our <strong className="text-white font-extrabold">partner centres in Dongguan and Shenzhen (China).</strong></>
                )}
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal pt-1">
                {t(
                  <>Esta estructura nos permite <strong className="text-white font-extrabold">adaptar la capacidad de producción a las necesidades de cada proyecto,</strong> manteniendo siempre la coordinación y el control desde nuestro equipo en Barcelona.</>,
                  <>This structure lets us <strong className="text-white font-extrabold">scale production capacity to each project's needs,</strong> while coordination and control always stay with our team in Barcelona.</>
                )}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-amber-500/40 shrink-0 space-y-3 text-center">
              <Factory className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-2xl font-extrabold text-white font-tech">{t('Capacidad Multiplicada', 'Multiplied Capacity')}</p>
              <p className="text-xs font-mono text-slate-400">{t('Control de Calidad CMM en España', 'CMM Quality Control in Spain')}</p>
              <button
                type="button"
                onClick={() => onOpenEmailModal?.({
                  subject: t('Consulta Fabricación Dual y Hubs China', 'Enquiry: Dual Manufacturing & China Hubs'),
                  body: t(
                    'Estimado equipo técnico de CSYS MOULD,\n\nNos interesa conocer más sobre la capacidad de fabricación dual en Barcelona y centros asociados en Dongguan y Shenzhen (China).\n\nEmpresa:\nVolumen estimado de piezas / moldes:\nPlazo objetivo:',
                    'Dear CSYS MOULD technical team,\n\nWe would like to know more about your dual manufacturing capacity in Barcelona and partner centres in Dongguan and Shenzhen (China).\n\nCompany:\nEstimated volume of parts / moulds:\nTarget lead time:'
                  )
                })}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500 border border-amber-500/40 text-amber-300 hover:text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" /> {t('Contactar', 'Contact')}
              </button>
            </div>
          </div>

          {/* 3 FEATURE CARDS WITH EQUALIZED HEIGHT & BALANCED VISUAL LAYOUT */}
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 text-xs pt-6 border-t border-slate-900 items-stretch">
            
            {/* CARD 1 */}
            <div className="p-6 rounded-2xl bg-black border border-slate-800 flex flex-col justify-between h-full space-y-4 hover:border-amber-500/40 transition-all shadow-xl">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" /> {t('Control de Calidad en Barcelona', 'Quality Control in Barcelona')}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {t(
                    <>Todo molde o muestra procedente de nuestros centros asociados en Dongguan & Shenzhen pasa un <strong className="text-white font-extrabold">control dimensional</strong> en nuestras instalaciones de Barcelona.</>,
                    <>Every mould or sample from our partner centres in Dongguan & Shenzhen goes through <strong className="text-white font-extrabold">dimensional inspection</strong> at our Barcelona facilities.</>
                  )}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-900/80">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 text-[11px] font-mono font-semibold border border-slate-800 flex items-center gap-1.5 w-fit">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {t('Verificación Metrológica 100%', '100% Metrology Verification')}
                </span>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="p-6 rounded-2xl bg-black border border-slate-800 flex flex-col justify-between h-full space-y-4 hover:border-amber-500/40 transition-all shadow-xl">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" /> {t('Optimización Directa de Costes', 'Direct Cost Optimisation')}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {t(
                    <>Permite a nuestros clientes reducir costes en moldes multicavidad de gran envergadura, manteniendo siempre la <strong className="text-white font-extrabold">garantía y el respaldo técnico de CSYS MOULD.</strong></>,
                    <>It lets our clients cut costs on large multi-cavity moulds, always keeping the <strong className="text-white font-extrabold">warranty and technical backing of CSYS MOULD.</strong></>
                  )}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-900/80">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 text-[11px] font-mono font-semibold border border-slate-800 flex items-center gap-1.5 w-fit">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> {t('Eficiencia en Grandes Volúmenes', 'High-Volume Efficiency')}
                </span>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="p-6 rounded-2xl bg-black border border-slate-800 flex flex-col justify-between h-full space-y-4 hover:border-emerald-500/40 transition-all shadow-xl">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" /> {t('Soporte & Mantenimiento Local', 'Local Support & Maintenance')}
                </h4>
                <div className="space-y-2 text-slate-300 leading-relaxed">
                  <p>
                    {t(
                      <><strong className="text-white font-extrabold">Garantía indefinida</strong> en todos nuestros moldes mientras <strong className="text-white font-extrabold">CSYS MOULD o nuestros asociados se encarguen de la producción</strong>, incluyendo soporte, mantenimiento y puesta a punto en nuestras instalaciones de <strong className="text-white font-extrabold">Barcelona.</strong></>,
                      <><strong className="text-white font-extrabold">Unlimited warranty</strong> on all our moulds while <strong className="text-white font-extrabold">CSYS MOULD or our partners run production</strong>, including support, maintenance and tuning at our <strong className="text-white font-extrabold">Barcelona</strong> facilities.</>
                    )}
                  </p>
                  <p className="text-slate-300 border-t border-slate-900/80 pt-2">
                    {t(
                      <>Si la producción la realiza directamente el cliente o una empresa externa, nuestros moldes cuentan con una <strong className="text-white font-extrabold">garantía de 3 años.</strong></>,
                      <>If production is run by the client or a third party, our moulds come with a <strong className="text-white font-extrabold">3-year warranty.</strong></>
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900/80">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 text-[11px] font-mono font-semibold border border-slate-800 flex items-center gap-1.5 w-fit">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /> {t('Cobertura & Puesta a Punto Local', 'Local Coverage & Tuning')}
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CARRUSEL DE FOTOS (GOOGLE DRIVE) */}
      <DrivePhotoCarousel />

      {/* 3. REAL PHOTO GALLERY SECTION */}
      <RealPhotoGallery />

      {/* 4. SURVEY SECTION */}
      <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <LeadSurvey />
      </div>

      {/* 5. CONTACT SECTION */}
      <ContactSection onOpenEmailModal={onOpenEmailModal} />

    </div>
  );
}
