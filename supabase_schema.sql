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

-- 3. CREACIÓN DE LA TABLA DE REGISTRO DE ACCIONES DE LEADS (lead_actions)
CREATE TABLE IF NOT EXISTS public.lead_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id TEXT NOT NULL,
    company_name TEXT NOT NULL,
    action_type TEXT NOT NULL, -- 'FAVORITE_TOGGLED' | 'DOSSIER_VIEWED' | 'STUDY_360_VIEWED' | 'HELP_REPORT_VIEWED' | 'EMAIL_SENT'
    action_detail TEXT,
    performed_by TEXT DEFAULT 'Claudio Arriaga Silva / Abraham Lozano',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ACTIVAR ROW LEVEL SECURITY (RLS) CON PERMISOS DE LECTURA Y ESCRITURA PÚBLICOS
ALTER TABLE public.potential_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_scan_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_actions ENABLE ROW LEVEL SECURITY;

-- Políticas de Acceso Público para potential_leads
CREATE POLICY "Permitir lectura publica potential_leads" ON public.potential_leads FOR SELECT USING (true);
CREATE POLICY "Permitir insercion publica potential_leads" ON public.potential_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualizacion publica potential_leads" ON public.potential_leads FOR UPDATE USING (true);
CREATE POLICY "Permitir eliminacion publica potential_leads" ON public.potential_leads FOR DELETE USING (true);

-- Políticas de Acceso Público para bot_scan_history
CREATE POLICY "Permitir lectura publica bot_scan_history" ON public.bot_scan_history FOR SELECT USING (true);
CREATE POLICY "Permitir insercion publica bot_scan_history" ON public.bot_scan_history FOR INSERT WITH CHECK (true);

-- Políticas de Acceso Público para lead_actions
CREATE POLICY "Permitir lectura publica lead_actions" ON public.lead_actions FOR SELECT USING (true);
CREATE POLICY "Permitir insercion publica lead_actions" ON public.lead_actions FOR INSERT WITH CHECK (true);

-- 5. INSERTAR O ACTUALIZAR (UPSERT) LAS STARTUPS MAESTRAS DE CLIENTES POTENCIALES
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
)
ON CONFLICT (id) DO UPDATE SET
    company_name = EXCLUDED.company_name,
    closing_probability_score = EXCLUDED.closing_probability_score,
    website = EXCLUDED.website,
    linkedin = EXCLUDED.linkedin,
    updated_at = NOW();

-- MENSAJE DE CONFIRMACIÓN
SELECT 'TABLAS potential_leads, bot_scan_history Y lead_actions CREADAS CON ÉXITO EN SUPABASE' AS resultado;
