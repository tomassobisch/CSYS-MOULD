import React from 'react';
import { COMPANY_INFO, REAL_PROJECTS } from '../data/mouldData';
import { Shield, Lock, MapPin, Phone, Mail, ArrowRight, CheckCircle2, Sparkles, UserCheck, Layers, Cpu, Zap, Cog, Activity, Eye, Camera, Check, Award, Clock, Globe, ShieldCheck, Factory } from 'lucide-react';
import VideoBackground from './VideoBackground';
import RealPhotoGallery from './RealPhotoGallery';
import LeadSurvey from './LeadSurvey';
import ContactSection from './ContactSection';

export default function PublicLandingPage({ onOpenLogin, onOpenContact }) {
  return (
    <div className="space-y-24 bg-black text-slate-100">
      
      {/* 1. PUBLIC HERO SECTION - PURELY INFORMATIVE WITH IMMEDIATE ACTION BUTTON */}
      <section id="hero" className="relative pt-36 pb-20 overflow-hidden min-h-[92vh] flex items-center bg-black">
        <VideoBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN: HERO TEXT & CONTENT */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Specialty Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/90 border border-amber-500/60 text-xs sm:text-sm font-semibold text-amber-300 shadow-2xl backdrop-blur-xl">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
                <span className="text-white font-mono font-bold">DESARROLLO DE MOLDES & MICRO-INYECCIÓN</span>
                <span className="text-amber-400 font-extrabold uppercase hidden sm:inline">| Alta Precisión</span>
              </div>

              {/* Headline - EXACT FROM SCREENSHOT */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Expertos en Diseño y Fabricación de <span className="text-gradient-amber">Productos Plásticos</span>
              </h1>

              {/* Subheadline - EXACT FROM SCREENSHOT */}
              <div className="space-y-2 pt-1">
                <p className="text-lg sm:text-xl font-bold text-slate-100">
                  60 años creando para las mejores marcas
                </p>
                <p className="text-sm sm:text-base text-slate-300 font-mono font-medium">
                  Moldistas hasta 5 TN · Especialistas en Microinyección BABYPLAST
                </p>
              </div>

              {/* IMMEDIATE HERO CALL TO ACTION BUTTON */}
              <div className="space-y-3 pt-2">
                <a
                  href="mailto:info@csysmould.com?subject=Solicitud%20de%20Informaci%C3%B3n%20y%20Presupuesto%20CSYS%20MOULD"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 text-slate-950 font-extrabold text-sm sm:text-base shadow-2xl shadow-amber-500/50 hover:shadow-amber-400/70 hover:scale-[1.02] transition-all duration-300"
                >
                  <Mail className="w-5 h-5 text-slate-950" />
                  <span>Contáctanos, comienza a trabajar con nosotros o entérate de más</span>
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </a>

                {/* Secondary CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={onOpenContact}
                    className="px-5 py-2.5 rounded-xl bg-black border border-slate-700/80 hover:border-amber-500/50 text-slate-200 hover:text-white font-bold text-xs shadow-lg hover:bg-slate-900 transition-all backdrop-blur-md flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span>Ir al Formulario Directo (info@csysmould.com)</span>
                  </button>

                  <button
                    onClick={onOpenLogin}
                    className="px-5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-amber-300 font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>Portal Privado de Clientes</span>
                  </button>
                </div>
              </div>

              {/* Key Guarantees */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-4 font-mono">
                <span className="flex items-center gap-1.5 text-slate-200">
                  <MapPin className="w-4 h-4 text-amber-400" /> Llinars del Vallès (Barcelona - 500 m²)
                </span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tolerancia Controlada ±0,02 mm
                </span>
              </div>

            </div>

            {/* RIGHT COLUMN: HERO RECUADRO CON ABRAHAM POSICIONADO MÁS ABAJO */}
            <div className="lg:col-span-5 relative">
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
                    alt="Planta Real CSYS MOULD"
                    className="absolute inset-0 w-full h-full object-cover opacity-25 filter brightness-90"
                  />

                  {/* LOGO WATERMARK BEHIND */}
                  <img
                    src="/multimedia/logo_blanco.png"
                    alt="Marca de agua CSYS MOULD"
                    className="absolute inset-0 m-auto max-h-44 opacity-15 filter blur-[0.5px] drop-shadow-[0_0_20px_rgba(224,153,0,0.5)] pointer-events-none"
                  />
                  
                  {/* Both Abaham.png & Claudio.PNG PNG Cutout Portraits with Abraham Positioned Further Down */}
                  <div className="relative z-10 h-full w-full flex items-end justify-center pt-0 pb-0">
                    
                    {/* Abraham PNG (Left side, shifted noticeably further down) */}
                    <img
                      src="/multimedia/Abaham.png"
                      alt="Abraham Lozano - Socio CSYS MOULD"
                      className="h-[101%] sm:h-[103%] max-w-[55%] object-contain filter drop-shadow-[0_0_25px_rgba(224,153,0,0.85)] relative z-10 translate-y-12 sm:translate-y-16 -mr-8 sm:-mr-12"
                    />

                    {/* Claudio PNG (Right side, in front) */}
                    <img
                      src="/multimedia/Claudio.PNG"
                      alt="Claudio Arriaga - Socio CSYS MOULD"
                      className="h-[96%] max-w-[52%] object-contain filter drop-shadow-[0_0_25px_rgba(224,153,0,0.85)] relative z-20 translate-y-5 sm:translate-y-6 scale-[1.0] group-hover:scale-[1.03] transition-transform duration-500"
                    />

                  </div>

                  {/* ELEGANT PNG BRANDING BADGE OVERLAPPING & COVERING THE BOTTOM CORNER CUT SEAMLESSLY */}
                  <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-2.5 rounded-b-2xl bg-gradient-to-t from-black via-black/95 to-black/80 border-t border-amber-500/40 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <img src="/multimedia/logo_blanco.png" alt="CSYS MOULD Logo Badge" className="h-4 sm:h-5 object-contain" />
                      <span className="text-[10px] sm:text-[11px] font-mono text-white font-bold">Claudio Arriaga & Abraham Lozano</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-amber-400 font-extrabold">SOCIOS DE CSYSMOULD</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Plant Stats Bar - TOLERANCIA MICRO INYECCIÓN 0,02 mm */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <div className="bg-black p-5 rounded-2xl border border-amber-500/40 text-center shadow-xl">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-tech mb-1">±0,02 <span className="text-xs text-amber-300 font-mono">mm</span></p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Tolerancia Micro-Inyección</p>
            </div>
            <div className="bg-black p-5 rounded-2xl border border-amber-500/40 text-center shadow-xl">
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-tech mb-1">500 <span className="text-xs text-amber-400 font-mono">m²</span></p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Planta Propia Barcelona</p>
            </div>
            <div className="bg-black p-5 rounded-2xl border border-amber-500/40 text-center shadow-xl">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-tech mb-1">10 <span className="text-xs text-emerald-300 font-mono">Ton</span></p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Puente Grúa Gran Tonelaje</p>
            </div>
            <div className="bg-black p-5 rounded-2xl border border-amber-500/40 text-center shadow-xl">
              <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-tech mb-1">2 Hubs</p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Centros China (Dongguan/Shenzhen)</p>
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
                <Globe className="w-3.5 h-3.5" /> FABRICACIÓN DUAL ESPAÑA & HUBS EN CHINA
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Centros de Fabricación Asociados en <span className="text-amber-400">Dongguan & Shenzhen</span>
              </h2>
              
              {/* EXACT BOLD FORMATTING FROM USER SCREENSHOT 1 */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Para responder a <strong className="text-white font-extrabold">proyectos de gran volumen o con plazos exigentes,</strong> combinamos la fabricación en nuestro Taller de <strong className="text-white font-extrabold">500 m² en Llinars del Vallès (Barcelona)</strong> con la gran capacidad productiva de nuestros <strong className="text-white font-extrabold">centros asociados en Dongguan y Shenzhen (China).</strong>
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal pt-1">
                Esta estructura nos permite <strong className="text-white font-extrabold">adaptar la capacidad de producción a las necesidades de cada proyecto,</strong> manteniendo siempre la coordinación y el control desde nuestro equipo en Barcelona.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-amber-500/40 shrink-0 space-y-2 text-center">
              <Factory className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-2xl font-extrabold text-white font-tech">Capacidad Multiplicada</p>
              <p className="text-xs font-mono text-slate-400">Control de Calidad CMM en España</p>
            </div>
          </div>

          {/* 3 FEATURE CARDS WITH EQUALIZED HEIGHT & BALANCED VISUAL LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs pt-6 border-t border-slate-900 items-stretch">
            
            {/* CARD 1 */}
            <div className="p-6 rounded-2xl bg-black border border-slate-800 flex flex-col justify-between h-full space-y-4 hover:border-amber-500/40 transition-all shadow-xl">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" /> Control de Calidad en Barcelona
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Todo molde o muestra procedente de nuestros centros asociados en Dongguan & Shenzhen pasa un <strong className="text-white font-extrabold">control dimensional</strong> en nuestras instalaciones de Barcelona.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-900/80">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 text-[11px] font-mono font-semibold border border-slate-800 flex items-center gap-1.5 w-fit">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verificación Metrológica 100%
                </span>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="p-6 rounded-2xl bg-black border border-slate-800 flex flex-col justify-between h-full space-y-4 hover:border-amber-500/40 transition-all shadow-xl">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" /> Optimización Directa de Costes
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Permite a nuestros clientes reducir costes en moldes multicavidad de gran envergadura, manteniendo siempre la <strong className="text-white font-extrabold">garantía y el respaldo técnico de CSYS MOULD.</strong>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-900/80">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 text-[11px] font-mono font-semibold border border-slate-800 flex items-center gap-1.5 w-fit">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> Eficiencia en Grandes Volúmenes
                </span>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="p-6 rounded-2xl bg-black border border-slate-800 flex flex-col justify-between h-full space-y-4 hover:border-emerald-500/40 transition-all shadow-xl">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" /> Soporte & Mantenimiento Local
                </h4>
                <div className="space-y-2 text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-white font-extrabold">Garantía indefinida</strong> en todos nuestros moldes mientras <strong className="text-white font-extrabold">CSYS MOULD o nuestros asociados se encarguen de la producción</strong>, incluyendo soporte, mantenimiento y puesta a punto en nuestras instalaciones de <strong className="text-white font-extrabold">Barcelona.</strong>
                  </p>
                  <p className="text-slate-300 border-t border-slate-900/80 pt-2">
                    Si la producción la realiza directamente el cliente o una empresa externa, nuestros moldes cuentan con una <strong className="text-white font-extrabold">garantía de 3 años.</strong>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900/80">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 text-[11px] font-mono font-semibold border border-slate-800 flex items-center gap-1.5 w-fit">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /> Cobertura & Puesta a Punto Local
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. REAL PHOTO GALLERY SECTION */}
      <section id="gallery">
        <RealPhotoGallery />
      </section>

      {/* 4. SURVEY SECTION */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadSurvey onOpenContact={onOpenContact} />
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact">
        <ContactSection />
      </section>

    </div>
  );
}
