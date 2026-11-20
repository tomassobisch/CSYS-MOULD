-- ==============================================================================
-- CSYS MOULD · CRM DE EMPRESAS CONTACTADAS (BOT 4)
-- Una fila por empresa contactada. Ejecutar UNA VEZ en Supabase:
--   Panel de Supabase -> SQL Editor -> New query -> pegar todo -> Run
-- Es seguro ejecutarlo más de una vez.
-- ==============================================================================

-- 1. TABLA
CREATE TABLE IF NOT EXISTS public.crm_contacts (
    lead_id            TEXT PRIMARY KEY,
    company_name       TEXT NOT NULL,
    email              TEXT DEFAULT '',
    contact_person     TEXT DEFAULT '',
    greeting_name      TEXT DEFAULT '',
    phone              TEXT DEFAULT '',
    website            TEXT DEFAULT '',
    country            TEXT DEFAULT '',
    icp_profile        TEXT DEFAULT '',
    icp_profile_name   TEXT DEFAULT '',
    status             TEXT NOT NULL DEFAULT 'contacted'
                       CHECK (status IN ('contacted', 'followup', 'replied', 'meeting', 'won', 'lost')),
    first_contact_at   TIMESTAMPTZ,
    last_contact_at    TIMESTAMPTZ,
    next_follow_up_at  TIMESTAMPTZ,
    emails_sent        INTEGER NOT NULL DEFAULT 0,
    touches            JSONB NOT NULL DEFAULT '[]'::jsonb,   -- historial de correos enviados
    notes              TEXT DEFAULT '',
    deleted            BOOLEAN NOT NULL DEFAULT FALSE,        -- quitada del CRM
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS crm_contacts_status_idx ON public.crm_contacts (status);
CREATE INDEX IF NOT EXISTS crm_contacts_next_follow_up_idx ON public.crm_contacts (next_follow_up_at);

-- 2. PERMISOS (mismo criterio que el resto de tablas del panel)
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir lectura publica crm_contacts" ON public.crm_contacts;
CREATE POLICY "Permitir lectura publica crm_contacts" ON public.crm_contacts FOR SELECT USING (true);
DROP POLICY IF EXISTS "Permitir insercion publica crm_contacts" ON public.crm_contacts;
CREATE POLICY "Permitir insercion publica crm_contacts" ON public.crm_contacts FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Permitir actualizacion publica crm_contacts" ON public.crm_contacts;
CREATE POLICY "Permitir actualizacion publica crm_contacts" ON public.crm_contacts FOR UPDATE USING (true);

-- 3. MIGRAR LAS EMPRESAS YA CONTACTADAS (guardadas hasta ahora en lead_actions)
INSERT INTO public.crm_contacts (
    lead_id, company_name, email, contact_person, greeting_name, phone, website, country,
    icp_profile, icp_profile_name, status, first_contact_at, last_contact_at, next_follow_up_at,
    emails_sent, touches, notes, deleted, updated_at
)
SELECT
    d->>'leadId',
    COALESCE(NULLIF(d->>'company', ''), latest.company_name),
    COALESCE(d->>'email', ''),
    COALESCE(d->>'contactPerson', ''),
    COALESCE(d->>'greetingName', ''),
    COALESCE(d->>'phone', ''),
    COALESCE(d->>'website', ''),
    COALESCE(d->>'country', ''),
    COALESCE(d->>'icpProfile', ''),
    COALESCE(d->>'icpProfileName', ''),
    CASE WHEN d->>'status' IN ('contacted', 'followup', 'replied', 'meeting', 'won', 'lost')
         THEN d->>'status' ELSE 'contacted' END,
    NULLIF(d->>'firstContactAt', '')::timestamptz,
    NULLIF(d->>'lastContactAt', '')::timestamptz,
    NULLIF(d->>'nextFollowUpAt', '')::timestamptz,
    COALESCE(jsonb_array_length(d->'touches'), 0),
    COALESCE(d->'touches', '[]'::jsonb),
    COALESCE(d->>'notes', ''),
    COALESCE((d->>'deleted')::boolean, FALSE),
    COALESCE(NULLIF(d->>'updatedAt', '')::timestamptz, latest.created_at)
FROM (
    SELECT DISTINCT ON (lead_id) lead_id, company_name, created_at, action_detail::jsonb AS d
    FROM public.lead_actions
    WHERE action_type = 'CRM_CONTACT'
    ORDER BY lead_id, created_at DESC
) AS latest
WHERE d->>'leadId' IS NOT NULL
ON CONFLICT (lead_id) DO NOTHING;

-- 4. COMPROBACIÓN: debería listar las empresas contactadas
SELECT company_name, status, emails_sent, first_contact_at, next_follow_up_at
FROM public.crm_contacts
WHERE deleted = FALSE
ORDER BY last_contact_at DESC;
