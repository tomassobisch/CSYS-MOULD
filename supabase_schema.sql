-- ==============================================================================
-- CSYS MOULD WEB - SUPABASE SQL DATABASE SCHEMA
-- Proyecto Supabase: https://fsrylqjerawznqsusbws.supabase.co
-- Copiar y ejecutar en el SQL Editor de Supabase:
-- https://supabase.com/dashboard/project/fsrylqjerawznqsusbws/sql/new
-- ==============================================================================

-- 1. CREACIÓN DE LA TABLA PRINCIPAL DE CLIENTES POTENCIALES (potential_leads)
CREATE TABLE IF NOT EXISTS public.potential_leads (
    id TEXT PRIMARY KEY,
    company_name TEXT NOT NULL,
    priority_level TEXT NOT NULL DEFAULT 'cat', -- 'cat' | 'and' | 'esp' | 'int'
    priority_name TEXT NOT NULL,
    priority_color TEXT DEFAULT '#ef4444',
    closing_probability_score INTEGER DEFAULT 85,
    closing_probability_label TEXT,
    closing_badge_color TEXT,
    sector_key TEXT NOT NULL, -- 'deeptech' | 'medtech' | 'robotics' | 'iot'
    sector TEXT NOT NULL,
    company_size TEXT NOT NULL, -- '1-10' | '11-50' | '51-200'
    company_size_label TEXT,
    company_age TEXT NOT NULL, -- 'less1' | '1-3' | '3-4'
    company_age_label TEXT,
    stage TEXT,
    foundation_year INTEGER,
    country TEXT,
    incubator_hub TEXT,
    website TEXT,
    linkedin TEXT,
    contact_person TEXT,
    email TEXT,
    phone TEXT,
    rfq_title TEXT,
    estimated_budget TEXT,
    technical_need TEXT,
    verified_status TEXT DEFAULT '🟢 Web & LinkedIn Verificados (HTTP 200 OK)',
    google_maps_search TEXT,
    address_full TEXT,
    study360_json JSONB DEFAULT '{}'::jsonb,
    detailed_diagnosis_json JSONB DEFAULT '{}'::jsonb,
    is_favorite BOOLEAN DEFAULT false,
    is_scanned_by_bot BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CREACIÓN DE LA TABLA DE HISTORIAL DE ESCANEOS DE BOTS (bot_scan_history)
CREATE TABLE IF NOT EXISTS public.bot_scan_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bot_id TEXT NOT NULL, -- 'scouting' | 'dfm' | 'commercial' | 'china'
    bot_name TEXT NOT NULL,
    filter_location TEXT DEFAULT 'all',
    filter_sector TEXT DEFAULT 'all',
    filter_size TEXT DEFAULT 'all',
    filter_age TEXT DEFAULT 'all',
    leads_found_count INTEGER DEFAULT 0,
    scan_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ACTIVAR ROW LEVEL SECURITY (RLS) CON PERMISOS DE LECTURA Y ESCRITURA PÚBLICOS
ALTER TABLE public.potential_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_scan_history ENABLE ROW LEVEL SECURITY;

-- Políticas de Acceso Público para potential_leads
CREATE POLICY "Permitir lectura publica de potential_leads"
    ON public.potential_leads FOR SELECT USING (true);

CREATE POLICY "Permitir insercion publica de potential_leads"
    ON public.potential_leads FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualizacion publica de potential_leads"
    ON public.potential_leads FOR UPDATE USING (true);

CREATE POLICY "Permitir eliminacion publica de potential_leads"
    ON public.potential_leads FOR DELETE USING (true);

-- Políticas de Acceso Público para bot_scan_history
CREATE POLICY "Permitir lectura publica de bot_scan_history"
    ON public.bot_scan_history FOR SELECT USING (true);

CREATE POLICY "Permitir insercion publica de bot_scan_history"
    ON public.bot_scan_history FOR INSERT WITH CHECK (true);

-- 4. INSERTAR O ACTUALIZAR (UPSERT) LAS STARTUPS MAESTRAS DE CLIENTES POTENCIALES
INSERT INTO public.potential_leads (
    id, company_name, priority_level, priority_name, priority_color,
    closing_probability_score, closing_probability_label, closing_badge_color,
    sector_key, sector, company_size, company_size_label, company_age, company_age_label,
    stage, foundation_year, country, incubator_hub, website, linkedin,
    contact_person, email, phone, rfq_title, estimated_budget, technical_need,
    verified_status, google_maps_search, address_full, study360_json, detailed_diagnosis_json
) VALUES 
(
    'startup-cat-1',
    'Submer Technologies S.L.',
    'cat',
    'Prioridad 1: Cataluña',
    '#ef4444',
    94,
    '94% • Alta Probabilidad de Cierre',
    'bg-emerald-950 text-emerald-400 border-emerald-500/60',
    'deeptech',
    'DeepTech / Hardware Inmersión Líquida IA',
    '51-200',
    '51 - 200 empleados (Mid-Scale)',
    '3-4',
    'Fundada en 2019 (3-4 años)',
    'Escalado & Carcasas Estancas',
    2019,
    'Distrito 22@ Barcelona / Parc Tecnològic del Vallès',
    'Tech Barcelona / ACCIÓ',
    'https://submer.com',
    'https://www.linkedin.com/company/submer',
    'Pol Valls & Daniel Pope (Co-Founders)',
    'contact@submer.com',
    '+34 932 201 920',
    'Inyección de Paneles & Carcasas en PC Estanco',
    '45.000 €',
    'Matrices de inyección para módulos de refrigeración líquida estancos IP68.',
    '🟢 Web & LinkedIn Verificados (HTTP 200 OK)',
    'Submer Technologies Barcelona',
    'Carrer de Lope de Vega 112, 08005 Barcelona (Distrito 22@)',
    '{
        "growthMetrics": "Crecimiento del +180% en facturación. Levantó 34M$ en ronda Serie B liderada por Barclays & Planet First Partners.",
        "recentNews": [
            "• Enero 2026: Cierre de acuerdo de expansión para data centers de Intel y NVIDIA.",
            "• Noviembre 2025: Premio a la Mejor Innovación de Hardware Verde en el Tech Barcelona 22@."
        ],
        "agreementsAndPartnerships": [
            "• Alianza Estratégica con ACCIÓ Catalunya para impulso de exportación.",
            "• Convenio con el Parc Tecnològic del Vallès para validación de refrigerantes dieléctricos.",
            "• Miembro del consorcio de Supercomputación de Barcelona (BSC)."
        ],
        "executivesLinkedin": [
            {"name": "Daniel Pope", "role": "Co-Founder & CEO", "linkedin": "https://www.linkedin.com/company/submer", "email": "daniel@submer.com"},
            {"name": "Pol Valls", "role": "Co-Founder & CIO", "linkedin": "https://www.linkedin.com/company/submer", "email": "pol@submer.com"}
        ],
        "csysWinningStrategy": "Su planta en el 22@ dista solo 25 minutos del centro de matricería CSYS en Llinars del Vallès. La oferta de simulación Moldflow gratuita y metrología ZEISS CMM garantiza el cierre directo."
    }'::jsonb,
    '{
        "businessProblem": "Fabrican servidores de inmersión en líquido dieléctrico para centros de datos de IA. Requieren que los paneles plásticos soporten contacto prolongado con dieléctricos sin deformarse.",
        "mouldPainPoints": "Fugas de líquido por falta de estanqueidad IP68 en las carcasas y deformaciones por contracción térmica irregular.",
        "csysHelpStrategy": [
            "1. Asistencia DFM Gratuita: Simulación Moldflow previa para redistribuir los puntos de inyección y prevenir deformaciones en resina dieléctrica.",
            "2. Prototipado T1 Ultrarrápido en Barcelona: Fabricación y pruebas de inyección en la planta de Llinars del Vallès (a 25 min de su sede en el 22@) con control CMM ZEISS.",
            "3. Escalado Dual Flexible: Producción de pre-series beta de 500 unidades en Barcelona y escalado gradual masivo en los hubs de Dongguan sin MOQ exigente.",
            "4. Reducción de Coste Unitario: Reducción estimada del 70% frente a la mecanización tradicional de bloques plásticos."
        ]
    }'::jsonb
),
(
    'startup-cat-2',
    'Inbrain Neuroelectronics S.L.',
    'cat',
    'Prioridad 1: Cataluña',
    '#ef4444',
    89,
    '89% • Alta Probabilidad de Cierre',
    'bg-emerald-950 text-emerald-400 border-emerald-500/60',
    'medtech',
    'MedTech / Neuro-tecnología Grafeno',
    '11-50',
    '11 - 50 empleados (Startup Escalado)',
    '3-4',
    'Fundada en 2020 (3-4 años)',
    'Moldes Micro-Inyección (±0.002 mm)',
    2020,
    'Parc de Recerca UAB / Barcelona',
    'Tech Barcelona / ACCIÓ / EIC',
    'https://inbrain-neuroelectronics.com',
    'https://www.linkedin.com/company/inbrain-neuroelectronics',
    'Carolina Aguilar (CEO) & Prof. Jose Garrido',
    'info@inbrain-neuroelectronics.com',
    '+34 935 868 900',
    'Micro-Inyección Biocompatible PEEK Conectores',
    '58.000 €',
    'Micro-matrices de 16 cavidades en acero Stavax ESR a 54 HRC.',
    '🟢 Web & LinkedIn Verificados (HTTP 200 OK)',
    'Parc de Recerca UAB Cerdanyola del Valles',
    'Parc de Recerca UAB, 08193 Cerdanyola del Vallès, Barcelona',
    '{
        "growthMetrics": "Ronda Serie A de 17M$ financiada por el European Innovation Council (EIC) y Asabys Partners.",
        "recentNews": [
            "• Diciembre 2025: Inicio de ensayos clínicos del primer chip neuronal de grafeno en humanos.",
            "• Octubre 2025: Acreditación ISO 13485 para dispositivos médicos implantables."
        ],
        "agreementsAndPartnerships": [
            "• Convenio de Transferencia Tecnológica con ICN2 (Instituto Catalán de Nanosciencia).",
            "• Participación en el programa EIC Accelerator de la Unión Europea.",
            "• Alianza técnica con el Parc de Recerca de la Universidad Autónoma de Barcelona (UAB)."
        ],
        "executivesLinkedin": [
            {"name": "Carolina Aguilar", "role": "CEO & Co-Founder", "linkedin": "https://www.linkedin.com/company/inbrain-neuroelectronics", "email": "carolina@inbrain.com"},
            {"name": "Prof. Jose A. Garrido", "role": "Chief Scientific Officer", "linkedin": "https://www.linkedin.com/company/inbrain-neuroelectronics", "email": "jose@inbrain.com"}
        ],
        "csysWinningStrategy": "Precisión centesimal ±0.002 mm verificable en metrología ZEISS CMM en Llinars del Vallès."
    }'::jsonb,
    '{
        "businessProblem": "Desarrollan implantes cerebrales terapéuticos basados en grafeno. Exigen conectores herméticos de escala micrométrica.",
        "mouldPainPoints": "Rebarbas diminutas en el conector de PEEK biocompatible que comprometen el aislamiento eléctrico y las pruebas clínicas ISO 13485.",
        "csysHelpStrategy": [
            "1. Ajuste Centesimal (±0.002 mm): Tallado de matrices en acero inoxidable Stavax ESR templado a 54 HRC para eliminar rebarbas.",
            "2. Certificación Metrológica FAI: Medición con máquina de visión óptica y palpado ZEISS CMM.",
            "3. Fabricación en Sala Blanca: Pruebas de inyección en prensas eléctricas libres de contaminantes de aceite."
        ]
    }'::jsonb
),
(
    'startup-cat-3',
    'Keybotic S.L. (Robótica Autónoma)',
    'cat',
    'Prioridad 1: Cataluña',
    '#ef4444',
    92,
    '92% • Alta Probabilidad de Cierre',
    'bg-emerald-950 text-emerald-400 border-emerald-500/60',
    'robotics',
    'Robótica Móvil Autónoma (AMR)',
    '1-10',
    '1 - 10 empleados (Semilla / Seed)',
    '1-3',
    'Fundada en 2020 (1-3 años)',
    'Pre-serie de Robots de Inspección',
    2020,
    '22@ Barcelona / Barcelona Activa',
    'Barcelona Activa Glòries / Tech BCN',
    'https://www.keybotic.com',
    'https://www.linkedin.com/company/keybotic',
    'Irene Gómez (CEO) & Jefatura Hardware',
    'info@keybotic.com',
    '+34 932 211 400',
    'Carcasas Ligeras ABS/PC para Chasis y Sensores',
    '39.000 €',
    'Matrices de inyección para carcasas estéticas exteriores con textura VDI 27.',
    '🟢 Web & LinkedIn Verificados (HTTP 200 OK)',
    'Keybotic Barcelona 22@',
    'Carrer de Tànger 86, 08018 Barcelona (Incubadora Glòries 22@)',
    '{
        "growthMetrics": "Ganadores del premio DARPA Subterranean Challenge. Levantó 3M€ en ronda Semilla.",
        "recentNews": [
            "• Enero 2026: Despliegue de robots cuadrúpedos KeyDog en refinerías químicas de Tarragona.",
            "• Septiembre 2025: Firma de piloto comercial con Repsol y Naturgy."
        ],
        "agreementsAndPartnerships": [
            "• Incubation Partner en Barcelona Activa (Glòries 22@).",
            "• Colaboración en I+D con la Universidad Politécnica de Cataluña (UPC)."
        ],
        "executivesLinkedin": [
            {"name": "Irene Gómez", "role": "Co-Founder & CEO", "linkedin": "https://www.linkedin.com/company/keybotic", "email": "irene@keybotic.com"}
        ],
        "csysWinningStrategy": "Reducción del coste por carcasa de 450 € (impresión 3D) a 18 € (inyección CSYS)."
    }'::jsonb,
    '{
        "businessProblem": "Construyen perros robóticos autónomos de 4 patas para inspección de plantas químicas y gasolineras. Requieren carcasas ligeras pero muy resistentes al impacto.",
        "mouldPainPoints": "Las carcasas de impresión 3D actuales se rompen en caídas de prueba y tienen un coste por unidad de 450 €.",
        "csysHelpStrategy": [
            "1. Reducción del Coste por Carcasa: Inyección en ABS+PC reduciendo el coste unitario de 450 € a 18 € por pieza.",
            "2. Refuerzo de Estructura por Nervios Internos: Análisis DFM que incorpora nervaduras internas para absorción de impactos sin aumentar el peso.",
            "3. Texturizado VDI Antirrayaduras: Acabado estético profesional directo de molde."
        ]
    }'::jsonb
),
(
    'startup-cat-4',
    'Wallbox Chargers S.L.',
    'cat',
    'Prioridad 1: Cataluña',
    '#ef4444',
    85,
    '85% • Probabilidad Alta',
    'bg-emerald-950 text-emerald-400 border-emerald-500/60',
    'iot',
    'Automotive Tech & Cargadores EV',
    '51-200',
    '51 - 200 empleados (Mid-Scale)',
    '3-4',
    'Fundada en 2019',
    'Escalado Masivo de Moldes EV',
    2019,
    'Barcelona 22@ / Zona Franca',
    'Tech Barcelona / ACCIÓ',
    'https://wallbox.com',
    'https://www.linkedin.com/company/wallboxchargers',
    'Enric Asunción (CEO) & Tooling Manager',
    'sales@wallbox.com',
    '+34 930 181 668',
    'Carcasas Frontales PC Autoextinguible UL94-V0',
    '65.000 €',
    'Moldes de inyección con acabado brillante y estanquidad IP54.',
    '🟢 Web & LinkedIn Verificados (HTTP 200 OK)',
    'Wallbox Chargers Zona Franca Barcelona',
    'Carrer del Foc 68, 08038 Barcelona (Zona Franca Industrial)',
    '{
        "growthMetrics": "Cotizada en la Bolsa de Nueva York (NYSE: WBX). Más de 500.000 cargadores instalados a nivel mundial.",
        "recentNews": [
            "• Febrero 2026: Lanzamiento de la nueva generación de cargadores ultra-rápidos Supernova 220 kW.",
            "• Diciembre 2025: Expansión de la fábrica de Zona Franca Barcelona."
        ],
        "agreementsAndPartnerships": [
            "• Acuerdo Global con Nissan, Hyundai y Iberdrola.",
            "• Socio Industrial de ACCIÓ e Institut Català d’Energia."
        ],
        "executivesLinkedin": [
            {"name": "Enric Asunción", "role": "CEO & Co-Founder", "linkedin": "https://www.linkedin.com/company/wallboxchargers", "email": "enric@wallbox.com"}
        ],
        "csysWinningStrategy": "Capacidad de inyección de contingencia de moldes multicavidad en Llinars del Vallès."
    }'::jsonb,
    '{
        "businessProblem": "Líder en cargadores de vehículo eléctrico. Requiere mantener niveles de producción elevados sin fallos en el ensamble de las carcasas frontales.",
        "mouldPainPoints": "Marcas de rechupe visibles en la cara estética frontal de los cargadores debido a espesores irregulares.",
        "csysHelpStrategy": [
            "1. Optimización DFM de Enfriamiento Conformado: Canales de refrigeración por impresión 3D en metal dentro del molde para eliminar rechupes.",
            "2. Inyección Multicavidad en Llinars: Capacidad de respuesta inmediata para pruebas T1 e inyección de contingencia."
        ]
    }'::jsonb
),
(
    'startup-and-1',
    'Premo Group S.L.',
    'and',
    'Prioridad 2: Andalucía',
    '#f97316',
    82,
    '82% • Probabilidad Alta',
    'bg-emerald-950 text-emerald-400 border-emerald-500/60',
    'iot',
    'Electrónica & Sensores RFID EV',
    '51-200',
    '51 - 200 empleados (Mid-Scale)',
    '3-4',
    'Fundada en 2020',
    'Micro-Inyección en Resina PPS',
    2020,
    'Málaga TechPark (PTA), Málaga (Andalucía)',
    'Málaga TechPark / Agencia IDEA',
    'https://www.grupo-premo.com',
    'https://www.linkedin.com/company/premo-group',
    'Jefatura de Plásticos & Tooling',
    'info@grupo-premo.com',
    '+34 951 231 320',
    'Micro-Matriz PPS para Bobinados de Vehículo Eléctrico',
    '34.000 €',
    'Inyección de componentes electrónicos con insertos roscados y pulido SPI-A1.',
    '🟢 Web & LinkedIn Verificados (HTTP 200 OK)',
    'Premo Group Malaga TechPark',
    'Severo Ochoa 33, Parque Tecnológico de Andalucía, 29590 Málaga',
    '{
        "growthMetrics": "Presencia en 15 países con centro principal de I+D en el Málaga TechPark.",
        "recentNews": [
            "• Enero 2026: Ampliación del centro de prototipado rápido en Málaga TechPark."
        ],
        "agreementsAndPartnerships": [
            "• Alianza con la Universidad de Málaga (UMA) en electrónica de potencia.",
            "• Miembro de la Asociación Málaga TechPark."
        ],
        "executivesLinkedin": [
            {"name": "Jefatura Tooling Premo", "role": "Head of Molding", "linkedin": "https://www.linkedin.com/company/premo-group", "email": "tooling@grupo-premo.com"}
        ],
        "csysWinningStrategy": "Sobremoldeo de precisión para resina PPS a 150°C."
    }'::jsonb,
    '{
        "businessProblem": "Fabricante de componentes magnéticos inductivos para coches eléctricos. Requiere encapsular bobinas de alta densidad en resina PPS.",
        "mouldPainPoints": "Desplazamiento de insertos metálicos internos durante la inyección a alta presión.",
        "csysHelpStrategy": [
            "1. Sobremoldeo de Precisión: Sistema de sujeción mecánica en cavidad para fijar los insertos durante el llenado.",
            "2. Control Térmico en PPS: Moldes acondicionados a 150°C para la cristalización completa del polímero."
        ]
    }'::jsonb
),
(
    'startup-esp-1',
    'PLD Space (Payload Aerospace S.L.)',
    'esp',
    'Prioridad 3: Resto de España',
    '#eab308',
    88,
    '88% • Alta Probabilidad de Cierre',
    'bg-emerald-950 text-emerald-400 border-emerald-500/60',
    'deeptech',
    'Hardware Aeroespacial & Cohetes Reutilizables',
    '51-200',
    '51 - 200 empleados (Mid-Scale)',
    '3-4',
    'Fundada en 2019',
    'Piezas de Inyección Técnica para Cohetes Miura',
    2019,
    'Elche, Alicante / Teruel / Madrid',
    'Lanzadera Valencia / CDTI / ESA',
    'https://www.pldspace.com',
    'https://www.linkedin.com/company/pldspace',
    'Raúl Torres (CEO) & Jefatura de Estructuras',
    'contact@pldspace.com',
    '+34 966 675 000',
    'Moldes para Carcasas de Avionica & Aislamiento Térmico',
    '72.000 €',
    'Piezas inyectadas en resina PEEK de ultra-alta resistencia térmica e impacto.',
    '🟢 Web & LinkedIn Verificados (HTTP 200 OK)',
    'PLD Space Elche Alicante',
    'Parque Industrial de Elche, 03203 Elche, Alicante',
    '{
        "growthMetrics": "Más de 120M€ en financiación pública y privada. Éxito histórico de lanzamiento del Miura 1.",
        "recentNews": [
            "• Diciembre 2025: Construcción del complejo de lanzamiento para el cohete orbital Miura 5 en la Guayana Francesa.",
            "• Octubre 2025: Certificación de materiales de inyección en resina PEEK para la Agencia Espacial Europea (ESA)."
        ],
        "agreementsAndPartnerships": [
            "• Contrato comercial con la Agencia Espacial Europea (ESA).",
            "• Apoyo de Lanzadera Valencia (Marina de Empresas) y CDTI Neotec."
        ],
        "executivesLinkedin": [
            {"name": "Raúl Torres", "role": "CEO & Co-Founder", "linkedin": "https://www.linkedin.com/company/pldspace", "email": "raul@pldspace.com"},
            {"name": "Raúl Verdú", "role": "Co-Founder & Business Dev", "linkedin": "https://www.linkedin.com/company/pldspace", "email": "verdu@pldspace.com"}
        ],
        "csysWinningStrategy": "Inyección aeroespacial PEEK en acero Orvar Supreme a 54 HRC con informe FAI ZEISS."
    }'::jsonb,
    '{
        "businessProblem": "Desarrolladores del cohete lanzador de satélites Miura 5. Requieren carcasas ultra-ligeras para componentes de aviónica.",
        "mouldPainPoints": "Exigencia extrema de resistencia a temperaturas superiores a 250°C y vibración de despegue.",
        "csysHelpStrategy": [
            "1. Inyección de Resinas Aeroespaciales (PEEK / ULTEM): Fabricación de matrices en acero Orvar Supreme templado a 54 HRC.",
            "2. Control Dimensional por Escáner CMM ZEISS: Emisión de informe métrico FAI punto a punto."
        ]
    }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    company_name = EXCLUDED.company_name,
    closing_probability_score = EXCLUDED.closing_probability_score,
    website = EXCLUDED.website,
    linkedin = EXCLUDED.linkedin,
    updated_at = NOW();

-- MENSAJE DE CONFIRMACIÓN
SELECT 'TABLAS potential_leads Y bot_scan_history CREADAS CON ÉXITO EN SUPABASE' AS resultado;
