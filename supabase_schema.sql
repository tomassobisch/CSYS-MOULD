-- ==============================================================================
-- CSYS MOULD WEB - SUPABASE SQL DATABASE SCHEMA POR BOTS DEDICADOS
-- Proyecto Supabase: https://fsrylqjerawznqsusbws.supabase.co
-- Copiar y ejecutar en el SQL Editor de Supabase:
-- https://supabase.com/dashboard/project/fsrylqjerawznqsusbws/sql/new
-- ==============================================================================

-- 1. TABLA PRINCIPAL DE CLIENTES POTENCIALES (potential_leads)
CREATE TABLE IF NOT EXISTS public.potential_leads (
    id TEXT PRIMARY KEY,
    company_name TEXT NOT NULL,
    priority_level TEXT NOT NULL DEFAULT 'cat',
    priority_name TEXT NOT NULL,
    priority_color TEXT DEFAULT '#ef4444',
    closing_probability_score INTEGER DEFAULT 85,
    closing_probability_label TEXT,
    closing_badge_color TEXT,
    sector_key TEXT NOT NULL,
    sector TEXT NOT NULL,
    company_size TEXT NOT NULL,
    company_size_label TEXT,
    company_age TEXT NOT NULL,
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

-- 2. BASE DE DATOS DEDICADA PARA BOT 2: ESTUDIOS 360° Y PROBABILIDADES DE CIERRE (bot2_closing_studies)
CREATE TABLE IF NOT EXISTS public.bot2_closing_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id TEXT NOT NULL,
    company_name TEXT NOT NULL,
    closing_probability_score INTEGER NOT NULL,
    growth_metrics TEXT,
    recent_news JSONB DEFAULT '[]'::jsonb,
    agreements_partnerships JSONB DEFAULT '[]'::jsonb,
    founders_linkedin JSONB DEFAULT '[]'::jsonb,
    csys_winning_strategy TEXT,
    generated_by TEXT DEFAULT 'Bot 2: Predictor de Cierre & Estudio 360°',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BASE DE DATOS DEDICADA PARA BOT 1: DOSSIERES ICP E INFORMES DFM DE AYUDA (bot1_scout_dossiers)
CREATE TABLE IF NOT EXISTS public.bot1_scout_dossiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id TEXT NOT NULL,
    company_name TEXT NOT NULL,
    incubator_hub TEXT,
    technical_need TEXT,
    business_problem TEXT,
    csys_help_strategy JSONB DEFAULT '[]'::jsonb,
    generated_by TEXT DEFAULT 'Bot 1: Hardware & DeepTech Scout',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BASE DE DATOS DEDICADA PARA REGISTRO DE HISTORIAL DE ESCANEOS POR BOT (bot_scan_history)
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

-- 5. BASE DE DATOS DEDICADA PARA REGISTRO DE ACCIONES (lead_actions)
CREATE TABLE IF NOT EXISTS public.lead_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id TEXT NOT NULL,
    company_name TEXT NOT NULL,
    action_type TEXT NOT NULL,
    action_detail TEXT,
    performed_by TEXT DEFAULT 'Claudio Arriaga Silva / Abraham Lozano',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PERMISOS RLS CON ELIMINACIÓN PREVIA DE POLÍTICAS EXISTENTES
ALTER TABLE public.potential_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot2_closing_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot1_scout_dossiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_scan_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_actions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir lectura publica potential_leads" ON public.potential_leads;
CREATE POLICY "Permitir lectura publica potential_leads" ON public.potential_leads FOR SELECT USING (true);
DROP POLICY IF EXISTS "Permitir insercion publica potential_leads" ON public.potential_leads;
CREATE POLICY "Permitir insercion publica potential_leads" ON public.potential_leads FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Permitir actualizacion publica potential_leads" ON public.potential_leads;
CREATE POLICY "Permitir actualizacion publica potential_leads" ON public.potential_leads FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Permitir lectura publica bot2_closing_studies" ON public.bot2_closing_studies;
CREATE POLICY "Permitir lectura publica bot2_closing_studies" ON public.bot2_closing_studies FOR SELECT USING (true);
DROP POLICY IF EXISTS "Permitir insercion publica bot2_closing_studies" ON public.bot2_closing_studies;
CREATE POLICY "Permitir insercion publica bot2_closing_studies" ON public.bot2_closing_studies FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura publica bot1_scout_dossiers" ON public.bot1_scout_dossiers;
CREATE POLICY "Permitir lectura publica bot1_scout_dossiers" ON public.bot1_scout_dossiers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Permitir insercion publica bot1_scout_dossiers" ON public.bot1_scout_dossiers;
CREATE POLICY "Permitir insercion publica bot1_scout_dossiers" ON public.bot1_scout_dossiers FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura publica bot_scan_history" ON public.bot_scan_history;
CREATE POLICY "Permitir lectura publica bot_scan_history" ON public.bot_scan_history FOR SELECT USING (true);
DROP POLICY IF EXISTS "Permitir insercion publica bot_scan_history" ON public.bot_scan_history;
CREATE POLICY "Permitir insercion publica bot_scan_history" ON public.bot_scan_history FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura publica lead_actions" ON public.lead_actions;
CREATE POLICY "Permitir lectura publica lead_actions" ON public.lead_actions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Permitir insercion publica lead_actions" ON public.lead_actions;
CREATE POLICY "Permitir insercion publica lead_actions" ON public.lead_actions FOR INSERT WITH CHECK (true);
