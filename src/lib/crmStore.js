// ==============================================================================
// CRM DE SEGUIMIENTO DE EMPRESAS CONTACTADAS (BOT 4)
// Persistencia: localStorage (inmediato) + Supabase tabla lead_actions
// (action_type = 'CRM_CONTACT', action_detail = JSON con el estado completo).
// Se usa la última fila por empresa, así queda compartido entre dispositivos
// sin necesidad de crear tablas nuevas.
// ==============================================================================
import { supabase } from './supabase';

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

/** Descarga el último estado de cada contacto desde Supabase y lo combina con el local. */
export async function syncCrmFromSupabase(localContacts) {
  const { data, error } = await supabase
    .from('lead_actions')
    .select('lead_id, action_detail, created_at')
    .eq('action_type', ACTION_TYPE)
    .order('created_at', { ascending: true })
    .limit(5000);
  if (error || !Array.isArray(data)) return localContacts;

  const merged = { ...localContacts };
  for (const row of data) {
    try {
      const remote = JSON.parse(row.action_detail || '{}');
      if (!remote?.leadId) continue;
      const local = merged[remote.leadId];
      // Gana la versión más reciente
      if (!local || new Date(remote.updatedAt || row.created_at) >= new Date(local.updatedAt || 0)) {
        merged[remote.leadId] = remote;
      }
    } catch {
      // fila ilegible: se ignora
    }
  }
  // Los contactos eliminados se guardan con deleted: true
  saveLocalCrm(merged);
  return merged;
}

async function pushContact(contact) {
  try {
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
  icpProfileName: lead.icpProfileName || ''
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
