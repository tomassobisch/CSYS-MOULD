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

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Desarrollo de Moldes y Micro-Inyección para <span className="text-gradient-amber">Productos Tecnológicos de Alta Precisión</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal drop-shadow-md">
                En CSYS MOULD estamos especializados en el <strong className="text-amber-400">diseño, desarrollo de moldes de inyección</strong> y micro-inyección de plásticos con tolerancias micrométricas (<strong className="text-amber-400 font-mono">±0.002 mm</strong>) para componentes tecnológicos de alta exigencia, automoción y electrónica.
              </p>

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
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tolerancia Controlada ±0.002 mm
                </span>
              </div>

            </div>

            {/* RIGHT COLUMN: CLEAN HERO RECUADRO WITH ORANGE BORDER AND ZERO OVERLAY TEXT */}
            <div className="lg:col-span-5 relative">
              <div className="bg-black p-3 sm:p-4 rounded-3xl border-2 border-amber-500/80 shadow-2xl shadow-amber-500/20 relative overflow-hidden group">
                
                {/* HUD Corner Brackets */}
                <div className="hud-corner-tl" />
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />
                <div className="hud-corner-br" />

                {/* Laser Scan Line inside clean frame */}
                <div className="scanline-laser" />

                {/* MOLD PNG IMAGE WITH OFFICIAL LOGO WATERMARK UNDERNEATH */}
                <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-black flex flex-col items-center justify-center p-2">
                  
                  {/* Background Real Photo PNG */}
                  <img
                    src="/multimedia/dsc02858_real.png"
                    alt="Molde Real CSYS MOULD"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 filter brightness-90"
                  />

                  {/* LOGO WATERMARK BEHIND MOLD IMAGE */}
                  <img
                    src="/multimedia/logo_blanco.png"
                    alt="Marca de agua CSYS MOULD"
                    className="absolute inset-0 m-auto max-h-40 opacity-15 filter blur-[0.5px] drop-shadow-[0_0_20px_rgba(224,153,0,0.5)] pointer-events-none"
                  />
                  
                  {/* Foreground Large Mold Subject PNG Cutout */}
                  <img
                    src="/multimedia/mold_subject.png"
                    alt="Sujeto de Molde PNG CSYS MOULD"
                    className="relative z-10 max-h-full max-w-full object-contain filter drop-shadow-[0_0_25px_rgba(224,153,0,0.85)] group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* ELEGANT PNG BRANDING BADGE UNDER PHOTO */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/90 backdrop-blur-md border border-amber-500/40">
                    <img src="/multimedia/logo_blanco.png" alt="CSYS MOULD Logo Badge" className="h-5 object-contain" />
                    <span className="text-[10px] font-mono text-amber-400 font-bold">GARANTÍA DE MATRIZ CSYS</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Plant Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <div className="bg-black p-5 rounded-2xl border border-amber-500/40 text-center shadow-xl">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-tech mb-1">±0.002 <span className="text-xs text-amber-300 font-mono">mm</span></p>
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
              <p className="text-sm text-slate-300 leading-relaxed">
                Para responder a proyectos de gran volumen o plazos acelerados, combinamos la **matricería de máxima precisión en nuestra nave de 500 m² en Llinars del Vallès (Barcelona)** con la enorme capacidad productiva de nuestros centros asociados en <strong className="text-white">Dongguan y Shenzhen</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-amber-500/40 shrink-0 space-y-2 text-center">
              <Factory className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-2xl font-extrabold text-white font-tech">Capacidad Multiplicada</p>
              <p className="text-xs font-mono text-slate-400">Control de Calidad CMM en España</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs pt-4 border-t border-slate-900">
            <div className="p-5 rounded-2xl bg-black border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Control de Calidad en Barcelona
              </h4>
              <p className="text-slate-300">
                Todo molde o muestra procedente de nuestras plantas asociadas en Dongguan y Shenzhen es verificado metrológicamente en nuestra planta de Barcelona antes de su aprobación final.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Optimización Directa de Costes
              </h4>
              <p className="text-slate-300">
                Permite a nuestros clientes obtener el máximo rendimiento económico en moldes multicavidad de gran envergadura manteniendo la garantía técnica de CSYS MOULD.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Soporte & Mantenimiento Local
              </h4>
              <p className="text-slate-300">
                Ofrecemos mantenimiento, modificaciones y puesta a punto continua directamente desde Llinars del Vallès durante toda la vida útil de la matriz.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CLAUDIO Y ABRAHAM - FEATURING REAL team.JPG PHOTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-black rounded-3xl border-2 border-amber-500/60 p-8 sm:p-12 space-y-8 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold border border-amber-500/40">
              <UserCheck className="w-3.5 h-3.5" /> SOCIOS FUNDADORES CSYS MOULD
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Claudio Arriaga Silva y Abraham Lozano
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Atención directa y personalizada por parte de los fundadores **Claudio Arriaga Silva** y **Abraham Lozano** en cada fase del diseño, desarrollo del molde y prueba en inyectora.
            </p>
          </div>

          {/* Full Complete Photo Showcase Container with team_photo.jpg */}
          <div className="max-w-4xl mx-auto bg-slate-950 p-6 sm:p-8 rounded-3xl border border-amber-500/50 space-y-6 shadow-2xl">
            
            {/* REAL TEAM PHOTO SHOWCASE */}
            <div className="relative h-80 sm:h-[460px] w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center border-2 border-amber-500/40 group">
              <img
                src="/multimedia/team_photo.jpg"
                alt="Claudio Arriaga Silva y Abraham Lozano - Foto del Equipo CSYS MOULD"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/90 backdrop-blur-md border border-amber-500/40 text-xs font-mono">
                <span className="text-white font-bold">Claudio Arriaga Silva & Abraham Lozano</span>
                <span className="text-amber-400 font-bold">Equipo CSYS MOULD</span>
              </div>
            </div>

            {/* Direct Contact Details & Confidentiality NDA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs pt-2">
              
              <div className="p-4 rounded-2xl bg-black border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" /> Contacto Directo con Dirección
                </h4>
                <p className="text-slate-300 font-mono">Claudio: <a href="mailto:claudio@csysmould.com" className="text-amber-400 hover:underline">claudio@csysmould.com</a></p>
                <p className="text-slate-300 font-mono">Abraham: <a href="mailto:abraham@csysmould.com" className="text-amber-400 hover:underline">abraham@csysmould.com</a></p>
                <p className="text-slate-300 font-mono">Teléfono Planta: <a href="tel:+34934607266" className="text-amber-400 font-bold hover:underline">(+34) 934.607.266</a></p>
              </div>

              <div className="p-4 rounded-2xl bg-black border border-amber-500/30 space-y-2">
                <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" /> Compromiso de Confidencialidad NDA
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Tratamiento totalmente confidencial de planos CAD 3D y especificaciones bajo acuerdo firmado de confidencialidad NDA.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. REAL PHOTO GALLERY SECTION */}
      <RealPhotoGallery />

      {/* 5. INTERACTIVE LEAD QUALIFICATION SURVEY & MEETING BOOKING */}
      <LeadSurvey />

      {/* 6. SPECIALIZED MOLD DEVELOPMENT & MICRO-INJECTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-3xl border border-amber-500/40 p-8 sm:p-10 space-y-8 shadow-2xl">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Cog className="w-4 h-4" /> INGENIERÍA DE MATRIZ & ALTA PRECISIÓN
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Desarrollo Integral de Moldes y Micro-Inyección
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Cubrimos todas las fases del proyecto: desde el estudio del producto, simulación 3D Moldflow, construcción del molde en acero templado hasta las pruebas T1 e inyección final.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Cog className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Desarrollo CAD/CAM</h4>
              <p className="text-slate-400 leading-relaxed">
                Diseño tridimensional a medida con análisis DFM previo para asegurar la óptima expulsión, partición de caras y canal caliente.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Micro-Inyección</h4>
              <p className="text-slate-400 leading-relaxed">
                Fabricación de micro-conectores, soportes ópticos LED, carcasas de sensores estancos IP67 y piezas miniaturizadas desde 0.05g.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Tolerancias ±0.002 mm</h4>
              <p className="text-slate-400 leading-relaxed">
                Mecanizado CNC 5 ejes y electroerosión EDM con metrología verificada en máquina de coordenadas ZEISS CMM.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Sobremoldeo Inserts</h4>
              <p className="text-slate-400 leading-relaxed">
                Integración automatizada de insertos metálicos roscados y contactos eléctricos directamente en la cavidad del molde.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. CLIENT ACCESS PROMOTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-3xl border border-amber-500/40 p-8 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
              <Lock className="w-3.5 h-3.5" /> ÁREA PRIVADA DE INGENIERÍA
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              ¿Ya eres cliente de CSYS MOULD?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Inicia sesión con tus credenciales corporativas para acceder al **Visualizador 3D CAD de Moldes**, **Simulador Financiero de ROI**, informes CMM ZEISS y **Rastreador CNC en Vivo**.
            </p>
          </div>

          <button
            onClick={onOpenLogin}
            className="shrink-0 px-8 py-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/30 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Lock className="w-4 h-4" /> Iniciar Sesión con Credenciales
          </button>

        </div>
      </section>

      {/* 8. FEATURED CASE STUDIES / PORTFOLIO WITH REAL PHOTOS */}
      <section id="catalog" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold">
            <Layers className="w-3.5 h-3.5" /> DESARROLLO DE MOLDES & PROYECTOS TÉCNICOS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Soluciones en Moldes de Inyección y Matricería
          </h2>
          <p className="text-sm text-slate-300">
            Algunos de los proyectos destacados desarrollados entre nuestra nave de Llinars del Vallès y centros de China.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REAL_PROJECTS.map((p) => (
            <div key={p.id} className="glass-panel rounded-3xl border border-slate-800 overflow-hidden glass-panel-hover flex flex-col justify-between bg-black/90">
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-950">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/90 text-amber-300 text-[11px] font-mono border border-amber-500/40 font-bold">
                    {p.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-white">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>
                  <div className="pt-2 space-y-1.5 border-t border-slate-800">
                    {p.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={onOpenContact}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-amber-400" /> Solicitar Información de este Proyecto
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CONTACT SECTION */}
      <ContactSection />

    </div>
  );
}
