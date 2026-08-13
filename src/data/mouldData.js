export const COMPANY_INFO = {
  name: "CSYS MOULD",
  tagline: "Especializados en Micro-Inyección de Plásticos y Desarrollo de Moldes para Productos Tecnológicos de Alta Precisión",
  subMotto: "De la idea a la fabricación, brindamos soluciones técnicas a la conformación de plástico",
  description: "Especialistas en micro-inyección de plásticos, diseño y desarrollo de moldes de tolerancias micrométricas (±0.002mm) para productos tecnológicos de alta precisión, médica, automoción y electrónica.",
  foundedYear: 1965,
  heritage: "Comenzó con un sueño y mucho esfuerzo entre padre e hijo en un pequeño taller de Badalona en 1965. Hoy contamos con más de 60 años de trayectoria impecable.",
  spainPlant: {
    address: "C/ Sant Celoni 54, Nave L1, POLÍGONO INDUSTRIAL CAN PRAT",
    postalCode: "08450",
    city: "Llinars del Vallès, Barcelona (España)",
    area: "500 m² de nave propia",
    capacity: "Moldes de hasta 10 Toneladas y puente grúa de gran tonelaje",
    locationDesc: "Ubicados a 40 minutos de Barcelona, integrados en la naturaleza del Vallès Oriental."
  },
  chinaHubs: {
    locations: "Dongguan & Shenzhen",
    desc: "Centros de fabricación asociados de alta velocidad para multiplicar la capacidad productiva en tiempo récord."
  },
  contacts: {
    phoneOffice: "(+34) 934 607 266",
    emailInfo: "info@csysmould.com",
    claudio: {
      name: "Claudio",
      role: "Director / Socio Fundador",
      email: "claudio@csysmould.com",
      phone: "+34 696 76 41 27",
      photo: "/multimedia/director_claudio.jpg"
    },
    abraham: {
      name: "Abraham Lozano",
      role: "Director / Socio Fundador",
      email: "abraham@csysmould.com",
      phone: "+34 651 96 18 66",
      photo: "/multimedia/director_abraham.jpg"
    },
    techPartner: {
      company: "TJ Developer",
      role: "Desarrollo de Software y Automatización Avanzada con IA",
      email: "Tsteam.fit@gmail.com"
    }
  }
};

export const REAL_PROJECTS = [
  {
    id: "proj-lynxsensor",
    title: "Micro-Sensor Lynx Industrial",
    category: "Micro-Inyección & Desarrollo de Moldes",
    material: "PA66+30% GF (Micro-Tolerancia)",
    cavities: 16,
    image: "/multimedia/project_lynxsensor_real.jpg",
    description: "Desarrollo integral de molde y micro-inyección tecnológica con tolerancia estricta de ±0.002mm para conectores y sensores industriales.",
    features: [
      "Diseño CAD 3D & Simulación de Llenado Moldflow previo",
      "Micro-inyección de plásticos con peso por pieza desde 0.05 gramos",
      "Tolerancia dimensional micrométrica ±0.002 mm garantizada",
      "Control 100% por óptica ZEISS y metrología CMM"
    ]
  },
  {
    id: "proj-babycup",
    title: "Baby Cup Ergonómico",
    category: "Desarrollo de Moldes Médicos",
    material: "PP Alimentario / Silicona Grado Médico",
    cavities: 8,
    image: "/multimedia/project_babycup_real.jpg",
    description: "Desarrollo completo de molde para vaso de entrenamiento infantil con sellado hermético e inyección libre de BPA.",
    features: [
      "Acero inoxidable S136 pulido óptico SPI-A1",
      "Certificado alimentario FDA y marcado CE",
      "Ciclo de inyección optimizado de 8.2 segundos",
      "Línea de partición imperceptible para máxima seguridad"
    ]
  },
  {
    id: "proj-lockbox",
    title: "Lockbox Security System",
    category: "Desarrollo de Moldes Electrónicos",
    material: "ABS / PC Retardante de Llama UL94-V0",
    cavities: 4,
    image: "/multimedia/project_lockbox_real.jpg",
    description: "Diseño y desarrollo de molde para caja de seguridad termoplástica reforzada anti-impacto con inserts metálicos sobremoldeados.",
    features: [
      "Sobremoldeo de insertos de latón de alta precisión",
      "Acero H13 con tratamiento térmico 54 HRC",
      "Texturizado mate Mold-Tech MT-11020",
      "Tolerancia dimensional estricta ±0.003mm"
    ]
  },
  {
    id: "proj-guetta",
    title: "Guetta Componente Óptico",
    category: "Micro-Óptica & Consumo",
    material: "Policarbonato Transparente (PC High Clarity)",
    cavities: 2,
    image: "/multimedia/project_guetta_real.jpg",
    description: "Desarrollo de molde para pieza estética tecnológica de acabado cristalino sin tensiones internas para dispositivos LED.",
    features: [
      "Refrigeración conformal 3D impresa en metal DMLS",
      "Sin marcas de ráfagas ni rechupados en caras vistas",
      "Mecanizado por electroerosión por penetración de acabado ultrafino",
      "Control metrológico en brazo CMM ZEISS"
    ]
  },
  {
    id: "proj-myway",
    title: "My Way Experience Device",
    category: "Desarrollo de Moldes 2K",
    material: "PC + TPE Elastómero Suave",
    cavities: 4,
    image: "/multimedia/project_myway_real.jpg",
    description: "Desarrollo de molde giratorio de doble inyección (2K) con sellado flexible estanco para tecnología wearable.",
    features: [
      "Molde rotativo 180° con plato hidroneumático",
      "Integración de componentes electrónicos internos",
      "Prototipado rápido y fabricación final garantizada a 1M ciclos",
      "Ingeniería completa desde la idea inicial al producto final"
    ]
  }
];

export const REAL_FACTORY_PHOTOS = [
  {
    id: "gallery-1",
    title: "Inspección de Modelo CAD 3D",
    category: "Ingeniería & DFM",
    image: "/multimedia/hero_mold_framed.jpg",
    desc: "Ingeniero examinando modelo tridimensional de matriz de alta precisión en puesto de trabajo."
  },
  {
    id: "gallery-2",
    title: "Mecanizado CNC 5 Ejes de Matriz de Acero",
    category: "Matricería",
    image: "/multimedia/factory_cnc_machining.jpg",
    desc: "Fresado de cavidades de acero S136 con refrigeración de taladrina en nave de 500 m² (Llinars del Vallès)."
  },
  {
    id: "gallery-3",
    title: "Metrología CMM ZEISS & Óptica",
    category: "Control Calidad",
    image: "/multimedia/mold_inspection_zeiss.jpg",
    desc: "Verificación tridimensional de cotas micrométricas (±0.002 mm) antes de pruebas T1."
  },
  {
    id: "gallery-4",
    title: "Planta Industrial Llinars del Vallès",
    category: "Instalaciones 500 m²",
    image: "/multimedia/factory_plant_llinars.jpg",
    desc: "Nave propia equipada con puente grúa de 10 Toneladas para moldes de gran tonelaje."
  },
  {
    id: "gallery-5",
    title: "Cavidades de Molde Inoxidable",
    category: "Moldes Alta Cadencia",
    image: "/multimedia/real_mold_cavity_1.jpg",
    desc: "Detalle de postizos e insertos templados pulidos a espejo SPI-A1."
  },
  {
    id: "gallery-6",
    title: "Trabajo en Equipo & Desarrollo CAD",
    category: "Oficina Técnica",
    image: "/multimedia/real_team_meeting.jpg",
    desc: "Revisión conjunta de planos de inyección con Claudio y Abraham Lozano."
  }
];

export const MOLD_CATALOG = [
  ...REAL_PROJECTS.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    industry: p.category,
    steel: p.features[1] || "Acero S136 ESR (52 HRC)",
    cavities: p.cavities,
    cycleTime: "7.5 seg",
    lifespan: "1,500,000+ ciclos",
    tolerance: "±0.002 mm",
    hotRunner: "Yudo / Mold-Masters",
    image: p.image,
    description: p.description,
    features: p.features
  }))
];

export const DEMO_PROJECTS = {
  "CSYS-MOLD-772": {
    id: "CSYS-MOLD-772",
    client: "MedTech Innovations S.L.",
    moldName: "Desarrollo Molde Sensor 16-Cav",
    status: "Mecanizado CNC / EDM 78%",
    deliveryDate: "18 de Agosto, 2026",
    progressPercent: 78,
    steelGrade: "S136 ESR stainless",
    cavities: 16,
    injectionTonnage: "120 Toneladas",
    steps: [
      { name: "Estudio de Requisitos & Análisis DFM Micro-Inyección", status: "completed", date: "02 Jul 2026" },
      { name: "Diseño CAD 3D & Simulación Moldflow", status: "completed", date: "10 Jul 2026" },
      { name: "Mecanizado CNC 5 Ejes en Llinars del Vallès", status: "in_progress", date: "En curso (78%)" },
      { name: "Ajuste Manual, Pulido Espejo SPI-A1 & Montaje", status: "pending", date: "Previsto: 05 Ago" },
      { name: "Pruebas T1 en Inyectora & Muestreo", status: "pending", date: "Previsto: 12 Ago" },
      { name: "Certificación Metrología CMM ZEISS & Entrega", status: "pending", date: "Previsto: 18 Ago" }
    ]
  }
};

export const PLASTIC_MATERIALS = [
  { code: "ABS", name: "Acrilonitrilo Butadieno Estireno", shrinkage: "0.4 - 0.7%", temp: "220-260°C", desc: "Gran tenacidad y acabado estético." },
  { code: "PP", name: "Polipropileno (Grado Alimentario / Médico)", shrinkage: "1.2 - 2.0%", temp: "200-250°C", desc: "Excelente resistencia química y flexibilidad." },
  { code: "PC", name: "Policarbonato Alta Transparencia", shrinkage: "0.5 - 0.7%", temp: "280-320°C", desc: "Claridad cristalina sin tensiones térmicas." },
  { code: "PA66+GF30", name: "Poliamida 66 + 30% Fibra Vidrio", shrinkage: "0.3 - 0.5%", temp: "270-300°C", desc: "Elevada rigidez mecánica para componentes tecnológicos." },
  { code: "PEEK", name: "Poliéter Éter Cetona (Micro-Piezas)", shrinkage: "1.0 - 1.5%", temp: "360-400°C", desc: "Polímero de ultra-alto rendimiento para productos de alta precisión." }
];

export const AI_KNOWLEDGE_BASE = [
  {
    topic: "Desarrollo de Moldes y Micro-Inyección",
    answer: "En **CSYS MOULD** nos encargamos del **desarrollo integral de moldes** y la **micro-inyección de plásticos para productos tecnológicos de alta precisión**, abarcando desde la idea inicial, simulación CAD 3D Moldflow, fabricación de matriz en Llinars del Vallès (500m²) hasta la producción final con tolerancias de **±0.002 mm**."
  }
];
