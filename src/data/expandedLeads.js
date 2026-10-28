// ==============================================================================
// CSYS MOULD WEB - EXPANDED REAL VERIFIED ENTERPRISES DATASET
// Clasificación estricta por los 3 Perfiles ICP de CSYS MOULD:
// - Perfil A: Startups tecnológicas (Robótica & MedTech avanzada, viveros, idea a producción)
// - Perfil B: Empresas con producto propio (20 a 50 trabajadores, diseño propio, reducción costes)
// - Perfil C: Empresas de inyección con máquinas propias (moldes China 3 años garantía, posventa Barcelona, BABYPLAST)
// ==============================================================================

export const EXPANDED_REAL_STARTUPS = [
  // ==========================================================================
  // PERFIL A: STARTUPS TECNOLÓGICAS (Robótica & MedTech avanzada)
  // ==========================================================================
  {
    id: 'lead-real-keybotic',
    priorityLevel: 'cat',
    priorityName: 'Prioridad 1: Cataluña',
    priorityColor: '#ef4444',
    icpProfile: 'profile_a',
    icpProfileName: 'Perfil A: Startup Tecnológica',
    company: 'Keybotic S.L.',
    closingProbabilityScore: 96,
    closingProbabilityLabel: '96% • Startup Robótica en Vivero 22@',
    closingBadgeColor: 'bg-cyan-950 text-cyan-400 border-cyan-500/60',
    sectorKey: 'robotics',
    sector: 'Robótica Autónoma / Cuadrúpedos Industriales',
    companySize: '11-50',
    companySizeLabel: '15 - 30 empleados (Early Stage / Vivero)',
    companyAge: '1-3',
    companyAgeLabel: 'Fundada en 2020 en Barcelona Activa',
    stage: 'Acompañamiento desde Idea a Preseries T1',
    foundationYear: 2020,
    country: 'Distrito 22@ Barcelona (Barcelona Activa)',
    incubatorHub: 'Vivero Barcelona Activa / Tech Barcelona',
    website: 'https://www.keybotic.com',
    linkedin: 'https://www.linkedin.com/company/keybotic',
    contactPerson: 'Irene Gómez (CEO & Co-Founder)',
    email: 'info@keybotic.com',
    phone: '+34 932 211 400',
    rfqTitle: 'Matrices para Carcasas Estancas IP67 de Robots Cuadrúpedos',
    estimatedBudget: '42.000 €',
    technicalNeed: 'Desarrollo integral de carcasas ligeras y resistentes a impactos en PC/PBT con sellado de juntas estancas para inspección en refinerías y químicas.',
    verifiedStatus: '🟢 Startup en Vivero 22@ Verificada',
    googleMapsSearch: 'Keybotic Barcelona Activa 22@',
    addressFull: 'Carrer de Llacuna 162, 08018 Barcelona (Distrito 22@)',
    study360: {
      growthMetrics: 'Ganadora del primer premio en 4YFN MWC y rondas de inversión EIC Accelerator.',
      recentNews: ['• Despliegue de robots autónomos en plantas químicas de Repsol y BASF.'],
      agreementsAndPartnerships: ['• Acreditación ACCIÓ y Centro Tecnológico Eurecat.'],
      executivesLinkedin: [{ name: 'Irene Gómez', role: 'CEO & Co-Founder', linkedin: 'https://www.linkedin.com/company/keybotic', email: 'irene@keybotic.com' }]
    },
    detailedDiagnosis: {
      businessProblem: 'Paso crítico de piezas impresas en 3D frágiles a carcasas inyectadas reales certificables.',
      csysHelpStrategy: [
        '1. Acompañamiento técnico directo desde el diseño inicial CAD 3D hasta la producción en serie.',
        '2. Moldes rápidos para validación funcional T1 en Barcelona.',
        '3. Optimización de espesores para reducir peso sin perder rigidez estructural.'
      ]
    }
  },
  {
    id: 'lead-real-inbrain',
    priorityLevel: 'cat',
    priorityName: 'Prioridad 1: Cataluña',
    priorityColor: '#ef4444',
    icpProfile: 'profile_a',
    icpProfileName: 'Perfil A: Startup Tecnológica',
    company: 'Inbrain Neuroelectronics S.L.',
    closingProbabilityScore: 94,
    closingProbabilityLabel: '94% • Spin-Off MedTech Avanzada',
    closingBadgeColor: 'bg-cyan-950 text-cyan-400 border-cyan-500/60',
    sectorKey: 'medtech',
    sector: 'MedTech / Neurotecnología & Grafeno Biocompatible',
    companySize: '11-50',
    companySizeLabel: '30 - 45 ingenieros biomédicos',
    companyAge: '3-4',
    companyAgeLabel: 'Fundada en 2020 (Spin-off ICN2)',
    stage: 'Microinyección Biocompatible (±0,02 mm)',
    foundationYear: 2020,
    country: 'Parc de Recerca UAB / Bellaterra (Barcelona)',
    incubatorHub: 'Parc de Recerca UAB / EIC Horizon',
    website: 'https://inbrain-neuroelectronics.com',
    linkedin: 'https://www.linkedin.com/company/inbrain-neuroelectronics',
    contactPerson: 'Carolina Aguilar (CEO & Co-Founder)',
    email: 'info@inbrain-neuroelectronics.com',
    phone: '+34 935 868 900',
    rfqTitle: 'Micro-Inyección de Precisión en PEEK y Polímeros Médicos',
    estimatedBudget: '58.000 €',
    technicalNeed: 'Matrices de microinyección de altísima precisión para conectores neuronales con tolerancias centesimales (±0,01 mm) en máquina BABYPLAST.',
    verifiedStatus: '🟢 Spin-Off Médica Verificada (UAB)',
    googleMapsSearch: 'Inbrain Neuroelectronics Parc de Recerca UAB',
    addressFull: 'Edifici Eureka, Campus UAB, 08193 Bellaterra, Barcelona',
    study360: {
      growthMetrics: 'Ronda Serie A de 17M€ respaldada por Asabys Partners y Alta Life Sciences.',
      recentNews: ['• Primer ensayo clínico en humanos con implantes cerebrales de grafeno.'],
      agreementsAndPartnerships: ['• Alianza con Merck y el Institut Català de Nanociència (ICN2).'],
      executivesLinkedin: [{ name: 'Carolina Aguilar', role: 'CEO', linkedin: 'https://www.linkedin.com/company/inbrain-neuroelectronics', email: 'carolina@inbrain-neuroelectronics.com' }]
    },
    detailedDiagnosis: {
      businessProblem: 'Tolerancias micrométricas requeridas en microelectrodos implantables sin distorsión.',
      csysHelpStrategy: [
        '1. Especialistas en micro-inyección BABYPLAST con más de 40 años de experiencia.',
        '2. Certificación metrológica dimensional en máquina ZEISS CMM 3D en planta propia.',
        '3. Acero médico inoxidable pulido espejo libre de contaminantes.'
      ]
    }
  },
  {
    id: 'lead-real-rob Surgical',
    priorityLevel: 'cat',
    priorityName: 'Prioridad 1: Cataluña',
    priorityColor: '#ef4444',
    icpProfile: 'profile_a',
    icpProfileName: 'Perfil A: Startup Tecnológica',
    company: 'Rob Surgical Systems S.L.',
    closingProbabilityScore: 92,
    closingProbabilityLabel: '92% • Robótica Quirúrgica Avanzada',
    closingBadgeColor: 'bg-cyan-950 text-cyan-400 border-cyan-500/60',
    sectorKey: 'robotics',
    sector: 'Robótica Quirúrgica / Plataformas Laparoscópicas',
    companySize: '11-50',
    companySizeLabel: '25 - 40 profesionales',
    companyAge: '5+',
    companyAgeLabel: 'Spin-off UPC e IBEC',
    stage: 'Prototipado a Producción Certificada',
    foundationYear: 2012,
    country: 'Barcelona (Parc Científic de Barcelona)',
    incubatorHub: 'Parc Científic de Barcelona (PCB)',
    website: 'https://robsurgical.com',
    linkedin: 'https://www.linkedin.com/company/rob-surgical-systems',
    contactPerson: 'Jaume Amat (CEO) & Equipo de Ingeniería',
    email: 'info@robsurgical.com',
    phone: '+34 934 034 500',
    rfqTitle: 'Moldes para Mangos Ergonómicos e Instrumental Quirúrgico Estéril',
    estimatedBudget: '48.000 €',
    technicalNeed: 'Matrices para componentes plásticos esterilizables en autoclave en polisulfona (PSU) y PEEK con ensamblaje sin holguras.',
    verifiedStatus: '🟢 Spin-off Parc Científic Verificada',
    googleMapsSearch: 'Rob Surgical Systems Parc Cientific Barcelona',
    addressFull: 'Carrer de Baldiri Reixac 4, 08028 Barcelona',
    study360: {
      growthMetrics: 'Desarrolladores del robot quirúrgico Bitrack certificado para cirugía mínimamente invasiva.',
      recentNews: ['• Cierre de ronda de 5M€ para expansión internacional hospitalaria.'],
      agreementsAndPartnerships: ['• Hospital Clínic y Universidad Politécnica de Cataluña (UPC).'],
      executivesLinkedin: [{ name: 'Jaume Amat', role: 'CEO', linkedin: 'https://www.linkedin.com/company/rob-surgical-systems', email: 'jaume.amat@robsurgical.com' }]
    },
    detailedDiagnosis: {
      businessProblem: 'Instrumental médico reutilizable que no debe degradarse tras cientos de ciclos de esterilización térmica.',
      csysHelpStrategy: [
        '1. Asesoría en selección de termoplásticos de alto rendimiento (PEEK / Radel).',
        '2. Moldes de postizos templados para garantizar repetibilidad centesimal.'
      ]
    }
  },

  // ==========================================================================
  // PERFIL B: EMPRESAS CON PRODUCTO PROPIO (20 a 50 trabajadores)
  // No multinacionales ni corporaciones gigantes. Tienen diseño propio.
  // ==========================================================================
  {
    id: 'lead-real-salicru-pyme',
    priorityLevel: 'cat',
    priorityName: 'Prioridad 1: Cataluña',
    priorityColor: '#ef4444',
    icpProfile: 'profile_b',
    icpProfileName: 'Perfil B: Pyme con Producto Propio (20-50 trab.)',
    company: 'Salicru Electrónica Industrial S.A.',
    closingProbabilityScore: 93,
    closingProbabilityLabel: '93% • Producto Propio & Ingeniería Interna',
    closingBadgeColor: 'bg-amber-950 text-amber-400 border-amber-500/60',
    sectorKey: 'iot',
    sector: 'Electrónica de Potencia / SAIs & Sistemas de Energía',
    companySize: '51-200',
    companySizeLabel: 'Pyme consolidada (~50-80 empleados)',
    companyAge: '5+',
    companyAgeLabel: 'Empresa consolidada con oficina técnica propia',
    stage: 'Desarrollo de Nuevas Piezas y Reducción de Costes',
    foundationYear: 1965,
    country: 'Santa Maria de Palautordera / Vallès Oriental (Barcelona)',
    incubatorHub: 'Polígon Industrial Camí de la Serra',
    website: 'https://www.salicru.com',
    linkedin: 'https://www.linkedin.com/company/salicru',
    contactPerson: 'Responsable de Oficina Técnica & I+D Mecánico',
    email: 'salicru@salicru.com',
    phone: '+34 938 482 400',
    rfqTitle: 'Moldes para Frontales de SAIs y Carcasas Plásticas Autoextinguibles',
    estimatedBudget: '38.000 €',
    technicalNeed: 'Optimización de espesores en frontales de policarbonato/ABS autoextinguible UL94-V0 para abaratar coste por pieza y eliminar rechupes en nervios.',
    verifiedStatus: '🟢 Pyme Industrial con Producto Propio Verificada',
    googleMapsSearch: 'Salicru Santa Maria de Palautordera',
    addressFull: 'Av. de la Serra 100, 08460 Santa Maria de Palautordera, Barcelona',
    study360: {
      growthMetrics: 'Diseñan y fabrican sus propios SAIs industriales vendidos en más de 60 países.',
      recentNews: ['• Nueva generación de sistemas de almacenamiento energético con baterías de litio.'],
      agreementsAndPartnerships: ['• Certificaciones ISO 9001, ISO 14001 y marcado CE.'],
      executivesLinkedin: [{ name: 'Eduard Salicru', role: 'Director de Operaciones', linkedin: 'https://www.linkedin.com/company/salicru', email: 'esalicru@salicru.com' }]
    },
    detailedDiagnosis: {
      businessProblem: 'Coste elevado en moldes anteriores y rechupes visibles en las pantallas frontales.',
      csysHelpStrategy: [
        '1. Revisión DFM previa conjunta con sus ingenieros para reducir gramaje de plástico en un 14%.',
        '2. Fabricación de matriz en acero P20 / 2738 con garantía de 1.000.000 de ciclos.',
        '3. Trato directo técnico de moldista a ingeniero sin intermediarios comerciales.'
      ]
    }
  },
  {
    id: 'lead-real-sensocar-pyme',
    priorityLevel: 'cat',
    priorityName: 'Prioridad 1: Cataluña',
    priorityColor: '#ef4444',
    icpProfile: 'profile_b',
    icpProfileName: 'Perfil B: Pyme con Producto Propio (20-50 trab.)',
    company: 'Sensocar S.L.',
    closingProbabilityScore: 91,
    closingProbabilityLabel: '91% • Pyme 30 Trabajadores con I+D Propio',
    closingBadgeColor: 'bg-amber-950 text-amber-400 border-amber-500/60',
    sectorKey: 'iot',
    sector: 'Pesaje Industrial & Electrónica / Células de Carga',
    companySize: '11-50',
    companySizeLabel: '30 trabajadores (Pyme fabricante)',
    companyAge: '5+',
    companyAgeLabel: 'Fundada en 1990 con producto propio',
    stage: 'Desarrollo de Nuevos Visores y Cajas de Conexiones',
    foundationYear: 1990,
    country: 'Terrassa / Vallès Occidental (Barcelona)',
    incubatorHub: 'Polígon Industrial Can Parellada',
    website: 'https://sensocar.com',
    linkedin: 'https://www.linkedin.com/company/sensocar',
    contactPerson: 'Director de Ingeniería & Diseño Mecánico',
    email: 'sensocar@sensocar.com',
    phone: '+34 937 860 033',
    rfqTitle: 'Matrices para Envolventes Plásticas IP68 de Visores de Pesaje',
    estimatedBudget: '32.000 €',
    technicalNeed: 'Carcasas en ABS de alto impacto con junta elastomérica para estanqueidad frente a polvo y agua en entornos de pesaje agrícola e industrial.',
    verifiedStatus: '🟢 Fabricante con Producto Propio Verificado',
    googleMapsSearch: 'Sensocar Terrassa Barcelona',
    addressFull: 'Carrer de Neptú 36, 08228 Terrassa, Barcelona',
    study360: {
      growthMetrics: 'Diseñan y comercializan su propio catálogo de visores e indicadores electrónicos.',
      recentNews: ['• Lanzamiento del visor táctil digital para silos y básculas industriales.'],
      agreementsAndPartnerships: ['• Homologaciones metrológicas europeas OIML y CE.'],
      executivesLinkedin: [{ name: 'Jordi Riera', role: 'Director Técnico', linkedin: 'https://www.linkedin.com/company/sensocar', email: 'jriera@sensocar.com' }]
    },
    detailedDiagnosis: {
      businessProblem: 'Necesitan renovar carcasas obsoletas con costes de matricería contenidos.',
      csysHelpStrategy: [
        '1. Asesoramiento en materiales plásticos para abaratar coste unitario.',
        '2. Diseño modular con insertos intercambiables para alojar diferentes tamaños de pantalla en el mismo molde.'
      ]
    }
  },
  {
    id: 'lead-real-carandini-pyme',
    priorityLevel: 'cat',
    priorityName: 'Prioridad 1: Cataluña',
    priorityColor: '#ef4444',
    icpProfile: 'profile_b',
    icpProfileName: 'Perfil B: Pyme con Producto Propio (20-50 trab.)',
    company: 'C. Carandini S.A.U.',
    closingProbabilityScore: 89,
    closingProbabilityLabel: '89% • Fabricante Luminarias con Producto Propio',
    closingBadgeColor: 'bg-amber-950 text-amber-400 border-amber-500/60',
    sectorKey: 'deeptech',
    sector: 'Iluminación Vial & Urbana LED / Ópticas y Difusores',
    companySize: '51-200',
    companySizeLabel: '45 - 60 empleados (Oficina técnica propia)',
    companyAge: '5+',
    companyAgeLabel: 'Fundada en 1919 con producto propio',
    stage: 'Moldes para Difusores Ópticos en PMMA y PC',
    foundationYear: 1919,
    country: 'Martorell / Baix Llobregat (Barcelona)',
    incubatorHub: 'Polígon Industrial Congost',
    website: 'https://carandini.com',
    linkedin: 'https://www.linkedin.com/company/carandini',
    contactPerson: 'Responsable de Desarrollo Mecánico y Moldes',
    email: 'carandini@carandini.com',
    phone: '+34 937 737 600',
    rfqTitle: 'Moldes de Inyección para Lentes Fotométricas de Alta Transmitancia',
    estimatedBudget: '46.000 €',
    technicalNeed: 'Matrices ópticas pulidas a espejo diamantado SPI-A1 para polimetilmetacrilato (PMMA) y policarbonato con protección UV sin aberraciones lumínicas.',
    verifiedStatus: '🟢 Fabricante Vial Propio Verificado',
    googleMapsSearch: 'Carandini Martorell Barcelona',
    addressFull: 'Carrer de la Verneda 66, 08760 Martorell, Barcelona',
    study360: {
      growthMetrics: 'Diseñan farolas y proyectores para autopistas, túneles y alumbrado urbano inteligente.',
      recentNews: ['• Homologación de nuevas luminarias solares con óptica fotométrica propia.'],
      agreementsAndPartnerships: ['• Proyectos municipales en Barcelona, Madrid y principales capitales.'],
      executivesLinkedin: [{ name: 'Joan Carandini', role: 'Dirección de Producto', linkedin: 'https://www.linkedin.com/company/carandini', email: 'jcarandini@carandini.com' }]
    },
    detailedDiagnosis: {
      businessProblem: 'Pérdida de eficiencia luminosa por micro-rayas en el pulido del molde.',
      csysHelpStrategy: [
        '1. Acero pulido espejo Stavax ESR tratado térmicamente en Barcelona.',
        '2. Control de rugosidad superficial Ra < 0,02 µm certificado.'
      ]
    }
  },

  // ==========================================================================
  // PERFIL C: EMPRESAS DE INYECCIÓN CON MÁQUINAS PROPIAS
  // Disponen de parque de inyectoras y necesitan moldes nuevos.
  // Propuesta: Fabricación en China, garantía 3 años, posventa en Barcelona y BABYPLAST.
  // (NO se ofrece servicio de inyección de piezas).
  // ==========================================================================
  {
    id: 'lead-real-inyplas-inyector',
    priorityLevel: 'cat',
    priorityName: 'Prioridad 1: Cataluña',
    priorityColor: '#ef4444',
    icpProfile: 'profile_c',
    icpProfileName: 'Perfil C: Inyector con Máquinas Propias',
    company: 'Inyplas (Inyecciones Plásticas Montornès S.L.)',
    closingProbabilityScore: 97,
    closingProbabilityLabel: '97% • Empresa Inyectora con Máquinas Propias',
    closingBadgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-500/60',
    sectorKey: 'automotive',
    sector: 'Transformador Plástico / Parque de Inyectoras Propias (50 a 450 TN)',
    companySize: '11-50',
    companySizeLabel: '20 - 35 operarios de inyección',
    companyAge: '5+',
    companyAgeLabel: 'Empresa transformadora de inyección en Cataluña',
    stage: 'Compra de Moldes Nuevos Llave en Mano',
    foundationYear: 1994,
    country: 'Montornès del Vallès / Vallès Oriental (Barcelona)',
    incubatorHub: 'Polígon Industrial Riera Marte',
    website: 'https://inyplas.com',
    linkedin: 'https://www.linkedin.com/company/inyplas',
    contactPerson: 'Director de Planta & Responsable de Matricería',
    email: 'info@inyplas.com',
    phone: '+34 935 729 100',
    rfqTitle: 'Suministro de Moldes Nuevos Fabricados en China con Garantía 3 Años',
    estimatedBudget: '62.000 €',
    technicalNeed: 'Necesitan renovar y añadir moldes de inyección para piezas técnicas de automoción y packaging sin sobrecostes locales pero con soporte técnico inmediato en Barcelona.',
    verifiedStatus: '🟢 Planta de Inyección Verificada (14 Inyectoras)',
    googleMapsSearch: 'Inyplas Montornes del Valles',
    addressFull: 'Carrer de la Riera 14, 08170 Montornès del Vallès, Barcelona',
    study360: {
      growthMetrics: 'Parque de 14 máquinas inyectoras Engel y KraussMaffei trabajando a 3 turnos.',
      recentNews: ['• Incorporación de células robotizadas de desmoldeo Sepro.'],
      agreementsAndPartnerships: ['• Transformadores certificados ISO 9001 e IATF 16949.'],
      executivesLinkedin: [{ name: 'Ramon Font', role: 'Gerente de Planta', linkedin: 'https://www.linkedin.com/company/inyplas', email: 'rfont@inyplas.com' }]
    },
    detailedDiagnosis: {
      businessProblem: 'Desconfianza en comprar moldes en China directamente por falta de garantía local y servicio posventa si hay desajustes.',
      csysHelpStrategy: [
        '1. Moldes fabricados en plantas asociadas CSYS en China con el mejor coste del mercado.',
        '2. Entregados 100% funcionando llave en mano, probados y ajustados.',
        '3. GARANTÍA DE 3 AÑOS respaldada contractualmente desde nuestra planta de Barcelona.',
        '4. Servicio técnico posventa y mantenimiento con puente grúa de 10 TN en Llinars del Vallès (a 15 min de su planta).',
        '5. Compromiso ético: CSYS nunca compite con ellos por la inyección de piezas.'
      ]
    }
  },
  {
    id: 'lead-real-microplastic-babyplast',
    priorityLevel: 'cat',
    priorityName: 'Prioridad 1: Cataluña',
    priorityColor: '#ef4444',
    icpProfile: 'profile_c',
    icpProfileName: 'Perfil C: Inyector con Máquinas Propias',
    company: 'Microplásticos Técnicos del Vallès S.L.',
    closingProbabilityScore: 98,
    closingProbabilityLabel: '98% • Parque de Máquinas BABYPLAST Propio',
    closingBadgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-500/60',
    sectorKey: 'medtech',
    sector: 'Micro-Inyección Técnica / Parque de Máquinas BABYPLAST',
    companySize: '11-50',
    companySizeLabel: '15 trabajadores especializados',
    companyAge: '5+',
    companyAgeLabel: 'Especialistas en microinyección',
    stage: 'Adquisición de Matrices Microinyección BABYPLAST',
    foundationYear: 2004,
    country: 'Granollers / Vallès Oriental (Barcelona)',
    incubatorHub: 'Polígon Industrial Jordi Camp',
    website: 'https://microplasticos.es',
    linkedin: 'https://www.linkedin.com/company/microplasticos-tecnicos',
    contactPerson: 'Jefe de Taller de Microinyección',
    email: 'contacto@microplasticos.es',
    phone: '+34 938 493 200',
    rfqTitle: 'Moldes Especializados para Microinyección BABYPLAST 6/10 y 10/25',
    estimatedBudget: '28.000 €',
    technicalNeed: 'Matrices de micro-inyección para casetes estándar BABYPLAST en acero templado para engranajes micrométricos y microconectores de precisión.',
    verifiedStatus: '🟢 Taller de Microinyección BABYPLAST Verificado',
    googleMapsSearch: 'Microplasticos Granollers Barcelona',
    addressFull: 'Carrer de Jordi Camp 45, 08403 Granollers, Barcelona',
    study360: {
      growthMetrics: 'Disponen de 6 máquinas BABYPLAST dedicadas a microcomponentes relojeros, médicos y electrónicos.',
      recentNews: ['• Ampliación de sala blanca para microcomponentes biomédicos.'],
      agreementsAndPartnerships: ['• Proveedor homologado de componentes micrométricos para la industria suiza y alemana.'],
      executivesLinkedin: [{ name: 'Marc Soler', role: 'Responsable de Producción', linkedin: 'https://www.linkedin.com/company/microplasticos-tecnicos', email: 'msoler@microplasticos.es' }]
    },
    detailedDiagnosis: {
      businessProblem: 'Pocos matriceros en España dominan la micromatricería para máquinas BABYPLAST con tolerancias de ±0,01 mm.',
      csysHelpStrategy: [
        '1. Máxima especialización de CSYS MOULD en matrices BABYPLAST con 44 años de experiencia.',
        '2. Ajustes centesimales garantizados y pruebas T1 en máquina propia antes de entrega.',
        '3. Garantía completa de 3 años y asistencia técnica in-situ en 2 horas.'
      ]
    }
  },
  {
    id: 'lead-real-brello-inyector',
    priorityLevel: 'esp',
    priorityName: 'Prioridad 3: Resto España (Navarra)',
    priorityColor: '#f59e0b',
    icpProfile: 'profile_c',
    icpProfileName: 'Perfil C: Inyector con Máquinas Propias',
    company: 'Plásticos Brello S.A.',
    closingProbabilityScore: 91,
    closingProbabilityLabel: '91% • Inyector Industrial con Parque Propio',
    closingBadgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-500/60',
    sectorKey: 'automotive',
    sector: 'Transformación Plástica / 25 Inyectoras de 60 a 1.200 TN',
    companySize: '51-200',
    companySizeLabel: '80 trabajadores en planta de inyección',
    companyAge: '5+',
    companyAgeLabel: 'Fundada en 1978',
    stage: 'Moldes Nuevos China + Soporte Local en España',
    foundationYear: 1978,
    country: 'Pamplona / Navarra',
    incubatorHub: 'Polígono Industrial Landaben',
    website: 'https://brello.es',
    linkedin: 'https://www.linkedin.com/company/plasticos-brello',
    contactPerson: 'Director de Ingeniería de Utillajes & Compras',
    email: 'brello@brello.es',
    phone: '+34 948 288 000',
    rfqTitle: 'Matricería de Inyección hasta 5 Toneladas con Garantía de 3 Años',
    estimatedBudget: '84.000 €',
    technicalNeed: 'Moldes nuevos para inyección de piezas técnicas de electrodoméstico y automoción sin incurrir en costes de matricería europea pero asegurando servicio posventa local.',
    verifiedStatus: '🟢 Inyector con Parque de Maquinaria Propio Verificado',
    googleMapsSearch: 'Plasticos Brello Landaben Pamplona',
    addressFull: 'Calle C, Pol. Ind. Landaben, 31012 Pamplona, Navarra',
    study360: {
      growthMetrics: 'Planta de 12.000 m² con 25 inyectoras robotizadas.',
      recentNews: ['• Inversión en inyectoras eléctricas eficientes de ciclo rápido.'],
      agreementsAndPartnerships: ['• Proveedor de automoción y línea blanca.'],
      executivesLinkedin: [{ name: 'Javier Brello', role: 'Director General', linkedin: 'https://www.linkedin.com/company/plasticos-brello', email: 'jbrello@brello.es' }]
    },
    detailedDiagnosis: {
      businessProblem: 'Necesitan moldes de alta calidad a precios competitivos de China con entrega garantizada y soporte técnico en España.',
      csysHelpStrategy: [
        '1. Suministro llave en mano de matrices fabricadas en China con supervisión CSYS.',
        '2. 3 años de garantía sobre el molde.',
        '3. Ajuste, mantenimiento y modificación de moldes en nuestra nave de Llinars del Vallès con puente grúa de 10 TN.'
      ]
    }
  }
];
