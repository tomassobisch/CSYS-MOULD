// ==============================================================================
// CRM DE SEGUIMIENTO DE EMPRESAS CONTACTADAS (BOT 4)
// Persistencia: localStorage (inmediato) + Supabase tabla crm_contacts
// (una fila por empresa, ver supabase_crm_contacts.sql).
// Si la tabla crm_contacts todavía no existe, se usa la tabla lead_actions
// (action_type = 'CRM_CONTACT', con el estado completo en JSON) como respaldo.
// ==============================================================================
import { supabase } from './supabase';

const CRM_TABLE = 'crm_contacts';
const STORAGE_KEY = 'csys_crm_contacts';
const ACTION_TYPE = 'CRM_CONTACT';
export const DEFAULT_FOLLOW_UP_DAYS = 7;

export const CRM_STATUSES = {
  contacted: { label: 'Contactada', color: 'bg-cyan-950 text-cyan-300 border-cyan-500/50' },
  followup: { label: 'En seguimiento', color: 'bg-amber-950 text-amber-300 border-amber-500/50' },
  replied: { label: 'Respondió', color: 'bg-violet-950 text-violet-300 border-violet-500/50' },
  meeting: { label: 'Reunión / Presupuesto', color: 'bg-blue-950 text-blue-300 border-blue-500/50' },
  won: { label: 'Cliente ganado', color: 'bg-emerald-950 text-emerald-300 border-emerald-500/50' },
  lost: { label: 'Descartada', color: 'bg-slate-900 text-slate-400 border-slate-700' }
};

// Estados en los que ya no hace falta enviar seguimientos automáticos
export const CLOSED_STATUSES = ['replied', 'meeting', 'won', 'lost'];

export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

export const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const loadLocalCrm = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
  } catch {
    return {};
  }
};

const saveLocalCrm = (contacts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch {
    // sin almacenamiento local
  }
};

// --- Conversión entre el objeto del panel y la fila de crm_contacts ---
const toRow = (c) => ({
  lead_id: String(c.leadId),
  company_name: c.company || 'Empresa',
  email: c.email || '',
  contact_person: c.contactPerson || '',
  greeting_name: c.greetingName || '',
  phone: c.phone || '',
  website: c.website || '',
  country: c.country || '',
  icp_profile: c.icpProfile || '',
  icp_profile_name: c.icpProfileName || '',
  status: CRM_STATUSES[c.status] ? c.status : 'contacted',
  first_contact_at: c.firstContactAt || null,
  last_contact_at: c.lastContactAt || null,
  next_follow_up_at: c.nextFollowUpAt || null,
  emails_sent: (c.touches || []).length,
  touches: c.touches || [],
  notes: c.notes || '',
  deleted: Boolean(c.deleted),
  updated_at: c.updatedAt || new Date().toISOString()
});

const fromRow = (r) => ({
  leadId: r.lead_id,
  company: r.company_name,
  email: r.email || '',
  contactPerson: r.contact_person || '',
  greetingName: r.greeting_name || '',
  phone: r.phone || '',
  website: r.website || '',
  country: r.country || '',
  icpProfile: r.icp_profile || '',
  icpProfileName: r.icp_profile_name || '',
  status: r.status || 'contacted',
  firstContactAt: r.first_contact_at || '',
  lastContactAt: r.last_contact_at || '',
  nextFollowUpAt: r.next_follow_up_at || '',
  touches: Array.isArray(r.touches) ? r.touches : [],
  notes: r.notes || '',
  deleted: Boolean(r.deleted),
  updatedAt: r.updated_at
});

// null = aún no comprobado; true/false = la tabla crm_contacts existe o no
let crmTableAvailable = null;

// Gana la versión más reciente de cada contacto
const mergeNewest = (base, incoming) => {
  const merged = { ...base };
  incoming.forEach((remote) => {
    if (!remote?.leadId) return;
    const local = merged[remote.leadId];
    if (!local || new Date(remote.updatedAt || 0) >= new Date(local.updatedAt || 0)) {
      merged[remote.leadId] = remote;
    }
  });
  return merged;
};

async function loadFromLeadActions() {
  const { data, error } = await supabase
    .from('lead_actions')
    .select('lead_id, action_detail, created_at')
    .eq('action_type', ACTION_TYPE)
    .order('created_at', { ascending: true })
    .limit(5000);
  if (error || !Array.isArray(data)) return null;
  return data
    .map((row) => {
      try {
        const c = JSON.parse(row.action_detail || '{}');
        return c?.leadId ? { ...c, updatedAt: c.updatedAt || row.created_at } : null;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

/** Descarga los contactos desde Supabase y los combina con los guardados en este navegador. */
export async function syncCrmFromSupabase(localContacts) {
  const { data, error } = await supabase.from(CRM_TABLE).select('*').limit(5000);
  let remote;
  if (!error && Array.isArray(data)) {
    crmTableAvailable = true;
    remote = data.map(fromRow);
  } else {
    crmTableAvailable = false;
    remote = await loadFromLeadActions();
    if (!remote) return localContacts;
  }
  const merged = mergeNewest(localContacts, remote);
  saveLocalCrm(merged);
  // Sube a la tabla nueva lo que solo estaba en este navegador
  if (crmTableAvailable) {
    const remoteIds = new Set(remote.map((c) => c.leadId));
    const missing = Object.values(merged).filter((c) => c?.leadId && !remoteIds.has(c.leadId));
    if (missing.length) supabase.from(CRM_TABLE).upsert(missing.map(toRow)).then(() => {});
  }
  return merged;
}

async function pushContact(contact) {
  try {
    if (crmTableAvailable !== false) {
      const { error } = await supabase.from(CRM_TABLE).upsert(toRow(contact));
      if (!error) {
        crmTableAvailable = true;
        return;
      }
      crmTableAvailable = false;
    }
    // Respaldo: tabla lead_actions (mientras no exista crm_contacts)
    await supabase.from('lead_actions').insert({
      lead_id: String(contact.leadId),
      company_name: contact.company || 'Empresa',
      action_type: ACTION_TYPE,
      action_detail: JSON.stringify(contact)
    });
  } catch (err) {
    console.warn('[CRM] Sin conexión con Supabase, guardado solo en local:', err);
  }
}

/** Guarda (crea o actualiza) un contacto y devuelve el nuevo mapa de contactos. */
export function saveContact(contacts, contact) {
  const updated = { ...contact, updatedAt: new Date().toISOString() };
  const next = { ...contacts, [contact.leadId]: updated };
  saveLocalCrm(next);
  pushContact(updated);
  return next;
}

const leadSnapshot = (lead) => ({
  leadId: String(lead.id),
  company: lead.company || 'Empresa',
  email: lead.email || '',
  contactPerson: lead.contactPerson || '',
  phone: lead.phone || '',
  website: lead.website || '',
  country: lead.addressFull || lead.country || '',
  icpProfile: lead.icpProfile || '',
  icpProfileName: lead.icpProfileName || '',
  greetingName: lead.greetingName || ''
});

/**
 * Registra un correo enviado a una empresa (primer contacto o seguimiento).
 * Programa automáticamente el próximo seguimiento a los N días.
 */
export function registerEmailSent(contacts, lead, { subject = '', template = '', client = '', kind = 'first' } = {}) {
  const now = new Date().toISOString();
  const prev = contacts[String(lead.id)];
  const base = prev && !prev.deleted ? prev : { ...leadSnapshot(lead), status: 'contacted', firstContactAt: now, touches: [], notes: '' };
  const touches = [...(base.touches || []), { date: now, kind, subject, template, client }];
  const keepStatus = CLOSED_STATUSES.includes(base.status);
  return saveContact(contacts, {
    ...base,
    ...leadSnapshot({ ...lead, icpProfile: lead.icpProfile || base.icpProfile, icpProfileName: lead.icpProfileName || base.icpProfileName }),
    deleted: false,
    touches,
    lastContactAt: now,
    status: keepStatus ? base.status : kind === 'followup' ? 'followup' : base.status || 'contacted',
    nextFollowUpAt: keepStatus ? base.nextFollowUpAt || '' : addDays(now, DEFAULT_FOLLOW_UP_DAYS)
  });
}

export function removeContact(contacts, leadId) {
  const prev = contacts[leadId];
  if (!prev) return contacts;
  return saveContact(contacts, { ...prev, deleted: true });
}

export const activeContacts = (contacts) =>
  Object.values(contacts || {})
    .filter((c) => c && !c.deleted)
    .sort((a, b) => new Date(b.lastContactAt || 0) - new Date(a.lastContactAt || 0));

/** Enlace de Google Calendar para recordar el seguimiento. */
export const googleCalendarReminderUrl = (contact) => {
  const start = new Date(contact.nextFollowUpAt || Date.now());
  start.setHours(9, 0, 0, 0);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Seguimiento CSYS MOULD: ${contact.company}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `Enviar correo de seguimiento a ${contact.contactPerson || contact.company} (${contact.email}).\nNotas: ${contact.notes || '-'}`
  });
  return `https://calendar.google.com/calendar/render?${params}`;
};
