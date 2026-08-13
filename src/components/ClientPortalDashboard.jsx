import React, { useState } from 'react';
import MoldViewer3D from './MoldViewer3D';
import RoiCalculator from './RoiCalculator';
import LiveProjectTracker from './LiveProjectTracker';
import ProjectTrackerClient from './ProjectTrackerClient';
import AiTechnicalAssistant from './AiTechnicalAssistant';
import CatalogSection from './CatalogSection';
import { Newspaper, MessageSquare, TrendingUp, Cpu, Sparkles, CheckCircle2, Shield, ArrowRight, Layers, BookOpen, Lightbulb, Factory, ThumbsUp, Clock, Radio, Award, Calendar, ChevronDown, ChevronUp, FileText, Check, Share2, X } from 'lucide-react';

export default function ClientPortalDashboard({ userProfile, onOpenContact }) {
  const [activeTab, setActiveTab] = useState('tracking'); // 'tracking' | 'news' | 'newsletter' | 'roi' | '3d'
  const [expandedNewsId, setExpandedNewsId] = useState(null);
  const [expandedForumId, setExpandedForumId] = useState(null);

  const companyNews = [
    {
      id: 1,
      title: 'CSYS MOULD en la Feria Internacional Equiplast & Expoquimia Barcelona',
      category: 'EVENTOS & FERIAS',
      date: '15 de Julio, 2026',
      image: '/multimedia/dsc02858_real.png',
      summary: 'Claudio y Abraham Lozano presentan las nuevas matrices de micro-inyección de precisión con tolerancias de ±0.002 mm ante más de 400 líderes del sector.',
      fullContent: `
        <p class="mb-3">Durante la convención industrial celebrada en el recinto Gran Vía de Barcelona, CSYS MOULD exhibió sus últimas innovaciones en matrices para componentes de alta tecnología. Los socios fundadores Claudio y Abraham Lozano lideraron las demostraciones en vivo ante ingenieros y responsables de compras del sector MedTech y automoción.</p>
        <h4 class="font-bold text-amber-400 text-sm mb-2 font-mono">Puntos Clave Presentados:</h4>
        <ul class="list-disc pl-5 space-y-1 text-slate-300 mb-4">
          <li>Matrices de micro-inyección para piezas miniaturizadas desde 0.05 gramos.</li>
          <li>Acabados de cavidad en pulido espejo SPI-A1 mediante aceros inoxidables Stavax ESR a 54 HRC.</li>
          <li>Sistemas de alimentación con canales calientes de aguja Incoe que eliminan el mazarotillo de purga y ahorran hasta un 35% en resina de ingeniería (PEEK, PPS).</li>
        </ul>
        <p>Grandes firmas internacionales reafirmaron su alianza estratégica con nuestra nave propia de 500m² en Llinars del Vallès para el desarrollo de nuevos proyectos en 2026 y 2027.</p>
      `,
      tag: 'Feria Barcelona 2026'
    },
    {
      id: 2,
      title: 'Ampliación de Maquinaria CNC 5 Ejes en Nave Propia de Llinars del Vallès (500m²)',
      category: 'INNOVACIÓN EN PLANTA',
      date: '02 de Junio, 2026',
      image: '/multimedia/dsc02858_real.png',
      summary: 'Incorporación de nuevo centro de mecanizado de alta velocidad y máquina de electroerosión por penetración EDM de última generación.',
      fullContent: `
        <p class="mb-3">Con la adquisición de este nuevo centro de mecanizado de 5 ejes continuos, CSYS MOULD refuerza su capacidad técnica directa en Cataluña. La máquina permite realizar pasadas de acabado a 24.000 RPM en cavidades complejas con geometrías orgánicas.</p>
        <h4 class="font-bold text-amber-400 text-sm mb-2 font-mono">Beneficios para nuestros clientes:</h4>
        <ul class="list-disc pl-5 space-y-1 text-slate-300 mb-4">
          <li>Reducción del tiempo de ajuste manual en un 40%.</li>
          <li>Capacidad para matrices de hasta 10 Toneladas gracias al puente grúa de gran tonelaje instalado en Llinars.</li>
          <li>Verificación metrológica inmediata en máquina de coordenadas ZEISS CMM tras cada fase de desbaste y templado.</li>
        </ul>
        <p>Esta inversión asegura que todo proyecto mantenga las estrictas tolerancias de ±0.002 mm sin depender de subcontratas externas.</p>
      `,
      tag: 'Taller Llinars 500m²'
    },
    {
      id: 3,
      title: 'Éxito en Pruebas T1: Nuevo Molde de 16 Cavidades para Conectores Médicos',
      category: 'NUEVOS MOLDES',
      date: '18 de Mayo, 2026',
      image: '/multimedia/mold_subject.png',
      summary: 'Finalización de la fase de pruebas T1 reduciendo el tiempo de ciclo a solo 14.2 segundos con tasa de rechazo cero.',
      fullContent: `
        <p class="mb-3">El departamento de ingeniería de CSYS MOULD ha certificado las primeras muestras inyectadas en prensa de 120 Toneladas. El molde de 16 cavidades para micro-conectores bio-compatibles en PEEK ha superado con éxito las pruebas destructivas de tracción y estanqueidad.</p>
        <h4 class="font-bold text-amber-400 text-sm mb-2 font-mono">Resultados del Informe T1:</h4>
        <ul class="list-disc pl-5 space-y-1 text-slate-300 mb-4">
          <li>Tiempo de ciclo reducido de 22s a 14.2s mediante refrigeración conformada en cobre berilio.</li>
          <li>Cero rebabas en la línea de partición gracias al ajuste micrométrico en bancada de ajuste.</li>
          <li>Aprobación FAI (First Article Inspection) con informe CMM adjunto al expediente técnico del cliente.</li>
        </ul>
        <p>El cliente ha autorizado el envío inmediato de las primeras 50.000 unidades de producción.</p>
      `,
      tag: 'Innovación Médica'
    },
    {
      id: 4,
      title: 'Participación en la Convención Europea de Matricería de Alta Precisión (Fakuma/EuroMold)',
      category: 'CONVENCIONES INTERNACIONALES',
      date: '10 de Abril, 2026',
      image: '/multimedia/logo_blanco.png',
      summary: 'Encuentro técnico sobre sobremoldeo de insertos metálicos roscados y sostenibilidad de resinas bio-basadas.',
      fullContent: `
        <p class="mb-3">En el marco del certamen europeo de matricería e inyección, CSYS MOULD intervino en los paneles de debate dedicados al sobremoldeo automatizado de contactos eléctricos e insertos metálicos en componentes automotrices.</p>
        <h4 class="font-bold text-amber-400 text-sm mb-2 font-mono">Temas Destacados en la Conferencia:</h4>
        <ul class="list-disc pl-5 space-y-1 text-slate-300 mb-4">
          <li>Integración de manipuladores robóticos de alta velocidad para la alimentación de inserts.</li>
          <li>Optimización del equilibrio reológico en cavidades de pared delgada (0.4 mm).</li>
          <li>Estrategias de economía circular mediante el reciclaje de mazarotas en canal frío.</li>
        </ul>
        <p>Nuestra visión de combinar la fabricación directa en Barcelona con los hubs de capacidad masiva en Dongguan y Shenzhen fue elogiada como un modelo de eficiencia logística.</p>
      `,
      tag: 'Matricería Europea'
    }
  ];

  const newsletterArticles = [
    {
      id: 101,
      title: 'Tendencias 2026 en Micro-Inyección de Plásticos Tecnológicos',
      category: 'TENDENCIAS MOULD',
      date: 'Julio 2026',
      readTime: '4 min lectura',
      summary: 'Cómo las tolerancias micrométricas (±0.002 mm) y los aceros inoxidables Stavax ESR están transformando los componentes electrónicos y conectores médicos.',
      fullContent: `
        <p class="mb-3">La micro-inyección de plásticos representa una de las disciplinas más exigentes de la matricería moderna. La creciente miniaturización de dispositivos médicos, sensores estancos IP67 y componentes de automoción exige moldes capaces de trabajar con volúmenes de dosis inferiores a 0.1 g.</p>
        <h4 class="font-bold text-amber-400 text-sm mb-2 font-mono">Estrategias de Diseño DFM en CSYS MOULD:</h4>
        <ul class="list-disc pl-5 space-y-1 text-slate-300 mb-4">
          <li><strong>Aceros de Alta Tenacidad:</strong> Empleo exclusivo de aceros Stavax ESR y Orvar Supreme para garantizar durabilidad superior a 1.000.000 de ciclos sin desgaste.</li>
          <li><strong>Ventilación de Aire Micrométrica:</strong> Ranuras de salida de gases de 0.005 mm para prevenir el efecto diésel y quemaduras en extremos de llenado.</li>
          <li><strong>Canales Calientes con Válvula de Aguja:</strong> Inyección directa en el centro del componente con sello neumático positivo.</li>
        </ul>
        <p>En CSYS MOULD orientamos cada proyecto desde la fase inicial de CAD 3D para evitar costosas modificaciones posteriores.</p>
      `,
      tag: 'Valor Agregado CSYS'
    },
    {
      id: 102,
      title: '¿Cómo ayudamos a que la idea o proyecto de tu empresa funcione?',
      category: 'ASESORAMIENTO DFM',
      date: 'Julio 2026',
      readTime: '5 min lectura',
      summary: 'Desde el análisis inicial de planos CAD 3D hasta la optimización de desmoldeo y espesor constante de pared.',
      fullContent: `
        <p class="mb-3">Convertir un concepto o plano preliminar en un molde de inyección altamente rentable requiere un análisis de factibilidad riguroso (Design for Manufacturing - DFM). Muchas piezas fallan en producción por no prever contracciones asimétricas o ángulos de desmoldeo insuficientes.</p>
        <h4 class="font-bold text-amber-400 text-sm mb-2 font-mono">Pasos de Nuestro Asesoramiento Personalizado:</h4>
        <ul class="list-disc pl-5 space-y-1 text-slate-300 mb-4">
          <li><strong>Estudio de Ángulos de Salida:</strong> Garantizamos al menos 1.5° a 2° de inclinación en paredes verticales con textura SPI o VDI.</li>
          <li><strong>Simulación de Llenado Moldflow:</strong> Evaluamos la presión requerida y reubicamos las entradas de colada para eliminar líneas de rechaza estéticas.</li>
          <li><strong>Optimización del Sistema de Expulsión:</strong> Selección de expulsores laminares y placas flotantes para evitar marcas y deformaciones en la pieza final.</li>
        </ul>
        <p>Con el acompañamiento directo de Claudio y Abraham Lozano, garantizamos que tu producto salga al mercado a tiempo y dentro del presupuesto.</p>
      `,
      tag: 'Ingeniería Directa'
    },
    {
      id: 103,
      title: 'Ventajas de la Matricería Local en Barcelona (500m²) + Hubs en China',
      category: 'CAPACIDAD INDUSTRIAL',
      date: 'Julio 2026',
      readTime: '3 min lectura',
      summary: 'Combinar la rapidez de soporte técnico en España con la escalabilidad de volumen a coste optimizado.',
      fullContent: `
        <p class="mb-3">El modelo industrial de CSYS MOULD ofrece a cada empresa lo mejor de ambos mundos: la cercanía y rápida respuesta de nuestra nave de 500 m² en Llinars del Vallès (Barcelona) y la enorme capacidad de fabricación masiva en nuestros talleres asociados de Dongguan y Shenzhen.</p>
        <h4 class="font-bold text-amber-400 text-sm mb-2 font-mono">Garantía y Metrología Unificada:</h4>
        <ul class="list-disc pl-5 space-y-1 text-slate-300 mb-4">
          <li>Toda matriz fabricada en China es recibida e inspeccionada metrológicamente en Barcelona en nuestra máquina ZEISS CMM antes de la primera prueba T1.</li>
          <li>Cualquier modificación o mantenimiento posterior se realiza directamente en nuestro taller de Llinars del Vallès en 24-48 horas.</li>
          <li>Ahorro en costes de inversión de hasta un 30% en moldes multicavidad de gran tonelaje.</li>
        </ul>
        <p>Este sistema proporciona tranquilidad absoluta a los departamentos de compras e ingeniería de nuestros clientes.</p>
      `,
      tag: 'Producción Dual'
    }
  ];

  const toggleExpandNews = (id) => {
    setExpandedNewsId(expandedNewsId === id ? null : id);
  };

  const toggleExpandForum = (id) => {
    setExpandedForumId(expandedForumId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-black text-slate-100 pt-28 pb-16 space-y-12">
      
      {/* 1. WELCOME CLIENT HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-3xl border-2 border-amber-500/70 p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> PORTAL PRIVADO EXCLUSIVO DE CLIENTES
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Bienvenido, {userProfile?.name || 'Cliente Corporativo'}
            </h1>
            <p className="text-sm text-slate-300 font-mono">
              Noticias corporativas de CSYS MOULD, rastreo de proyectos en vivo, ferias industriales, avances en planta y simuladores técnicos.
            </p>
          </div>

          <div className="h-20 px-5 py-2.5 rounded-2xl bg-black border-2 border-amber-500/50 flex items-center justify-center shrink-0 shadow-xl shadow-amber-500/20">
            <img src="/multimedia/logo_blanco.png" alt="CSYS MOULD Logo" className="h-full object-contain" />
          </div>

        </div>
      </section>

      {/* 2. CLIENT NAVIGATION TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-slate-950 p-2 rounded-2xl border border-slate-800 font-mono text-xs">
          
          <button
            onClick={() => setActiveTab('tracking')}
            className={`py-3 px-3.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'tracking'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-black'
            }`}
          >
            <Clock className="w-4 h-4" /> Tracking Proyecto
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`py-3 px-3.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'news'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-black'
            }`}
          >
            <Radio className="w-4 h-4" /> CSYS MOULD Noticias
          </button>

          <button
            onClick={() => setActiveTab('newsletter')}
            className={`py-3 px-3.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'newsletter'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-black'
            }`}
          >
            <Newspaper className="w-4 h-4" /> Foro Tendencias
          </button>

          <button
            onClick={() => setActiveTab('roi')}
            className={`py-3 px-3.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'roi'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-black'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Simulador ROI
          </button>

          <button
            onClick={() => setActiveTab('3d')}
            className={`py-3 px-3.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === '3d'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-black'
            }`}
          >
            <Cpu className="w-4 h-4" /> Visor 3D CAD
          </button>

        </div>
      </section>

      {/* TAB CONTENT: PROJECT TRACKING */}
      {activeTab === 'tracking' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
          <ProjectTrackerClient />
          <AiTechnicalAssistant />
        </section>
      )}

      {/* TAB CONTENT: CSYS MOULD NOTICIAS WITH INTERACTIVE EXPANDABLE READER */}
      {activeTab === 'news' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold border border-amber-500/40">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" /> NOVEDADES Y ACTUALIDAD EMPRESARIAL
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              CSYS MOULD Noticias
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Haz clic en cualquier noticia para **desplegar la lectura completa** con detalles técnicos de ferias, avances en planta y nuevos moldes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {companyNews.map((item) => {
              const isExpanded = expandedNewsId === item.id;
              return (
                <div 
                  key={item.id} 
                  className={`bg-slate-950 rounded-3xl border transition-all duration-300 shadow-2xl overflow-hidden flex flex-col justify-between ${
                    isExpanded ? 'border-2 border-amber-500 shadow-amber-500/20' : 'border-amber-500/40 hover:border-amber-400'
                  }`}
                >
                  <div className="relative h-60 overflow-hidden bg-black flex items-center justify-center p-2 border-b border-slate-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-black/90 text-amber-300 text-xs font-mono font-bold border border-amber-500/50">
                      {item.category}
                    </span>

                    <span className="absolute top-4 right-4 text-xs font-mono text-slate-300 bg-black/80 px-2.5 py-1 rounded-md">
                      {item.date}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-amber-300 font-mono font-semibold">{item.summary}</p>

                    {/* EXPANDABLE FULL ARTICLE CONTENT */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-200 leading-relaxed font-sans animate-in fade-in duration-300 bg-black/60 p-4 rounded-2xl">
                        <div dangerouslySetInnerHTML={{ __html: item.fullContent }} />
                      </div>
                    )}
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between text-xs font-mono border-t border-slate-900">
                    <span className="text-amber-400 font-bold flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400" /> {item.tag}
                    </span>

                    <button
                      onClick={() => toggleExpandNews(item.id)}
                      className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 font-bold transition-all flex items-center gap-1.5"
                    >
                      <span>{isExpanded ? 'Contraer Noticia' : 'Leer Noticia Completa'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </section>
      )}

      {/* TAB CONTENT: FORO DE TENDENCIAS WITH INTERACTIVE EXPANDABLE READER */}
      {activeTab === 'newsletter' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold border border-amber-500/40">
              <BookOpen className="w-3.5 h-3.5" /> BOLETÍN TÉCNICO & VALOR AGREGADO
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Foro de Tendencias en Moldes y Fabricación Tecnológica
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Haz clic en cualquier artículo para **desplegar la guía técnica completa** y conocer cómo optimizamos el diseño DFM de tu empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsletterArticles.map((art) => {
              const isExpanded = expandedForumId === art.id;
              return (
                <div 
                  key={art.id} 
                  className={`bg-slate-950 rounded-3xl border p-6 space-y-4 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                    isExpanded ? 'border-2 border-amber-500 shadow-amber-500/20' : 'border-amber-500/40 hover:border-amber-400'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">{art.category}</span>
                      <span className="text-slate-400">{art.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white leading-snug">{art.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{art.summary}</p>
                    
                    {/* EXPANDABLE FULL FORUM ARTICLE CONTENT */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-800 space-y-3 text-xs text-slate-200 leading-relaxed animate-in fade-in duration-300 bg-black/60 p-4 rounded-2xl">
                        <div dangerouslySetInnerHTML={{ __html: art.fullContent }} />
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" /> {art.tag}
                    </span>

                    <button
                      onClick={() => toggleExpandForum(art.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-800 text-[11px] font-bold transition-all flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'Cerrar' : 'Leer Artículo'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </section>
      )}

      {/* TAB CONTENT: SIMULADOR ROI & RENTABILIDAD */}
      {activeTab === 'roi' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 animate-in fade-in">
          <RoiCalculator onOpenContact={() => {}} />
        </section>
      )}

      {/* TAB CONTENT: VISOR 3D CAD */}
      {activeTab === '3d' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in">
          <MoldViewer3D />
        </section>
      )}

      {/* CASOS DE ÉXITO DE LA EMPRESA */}
      <CatalogSection onSelectMoldForContact={() => {}} />

    </main>
  );
}
