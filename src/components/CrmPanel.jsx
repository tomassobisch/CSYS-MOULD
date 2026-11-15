import React, { useMemo, useState } from 'react';
import {
  Mail, CalendarClock, CalendarPlus, Send, Trash2, Users, AlertTriangle, MessageSquare,
  Trophy, Percent, History, ChevronDown, Globe, Phone, Inbox, ArrowRight
} from 'lucide-react';
import {
  CRM_STATUSES, CLOSED_STATUSES, activeContacts, startOfToday, googleCalendarReminderUrl
} from '../lib/crmStore';

// ------------------------------------------------------------------------------
// Etiqueta del tipo de empresa (Perfil ICP A / B / C)
// ------------------------------------------------------------------------------
const ICP_STYLES = {
  profile_a: { cls: 'bg-cyan-950 text-cyan-400 border-cyan-500/50', name: 'Perfil A: Startup Tecnológica' },
  profile_b: { cls: 'bg-amber-950 text-amber-400 border-amber-500/50', name: 'Perfil B: Producto Propio' },
  profile_c: { cls: 'bg-emerald-950 text-emerald-400 border-emerald-500/50', name: 'Perfil C: Inyector con Máquinas' }
};

export function IcpBadge({ profile, name }) {
  const style = ICP_STYLES[profile];
  if (!style) return null;
  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase border ${style.cls}`}>
      {name || style.name}
    </span>
  );
}

export function StatusBadge({ status }) {
  const s = CRM_STATUSES[status] || CRM_STATUSES.contacted;
  return <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${s.color}`}>{s.label}</span>;
}

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

const toDateInput = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const isDue = (c) => {
  if (!c.nextFollowUpAt || CLOSED_STATUSES.includes(c.status)) return false;
  const endOfToday = startOfToday();
  endOfToday.setDate(endOfToday.getDate() + 1);
  return new Date(c.nextFollowUpAt) < endOfToday;
};

// ------------------------------------------------------------------------------
// Carpeta "Contactadas" (Bot 1): empresas a las que ya se les envió correo
// ------------------------------------------------------------------------------
export function ContactedFolder({ contacts, onOpenCrm }) {
  const list = activeContacts(contacts);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40">
        <div>
          <h4 className="text-base font-extrabold text-cyan-300 flex items-center gap-2">
            <Inbox className="w-5 h-5 text-cyan-400" /> Empresas Contactadas
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed mt-1">
            Se guardan aquí automáticamente al enviar un correo desde el Bot 3. El seguimiento se gestiona en el CRM del Bot 4.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs shadow-md">
            {list.length} {list.length === 1 ? 'Empresa contactada' : 'Empresas contactadas'}
          </span>
          <button
            type="button"
            onClick={onOpenCrm}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            Abrir CRM (Bot 4) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-16 px-4 bg-black/60 rounded-3xl border border-dashed border-cyan-500/40 space-y-3">
          <Inbox className="w-10 h-10 text-cyan-400 mx-auto" />
          <h4 className="text-lg font-bold text-white">Todavía no hay empresas contactadas</h4>
          <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
            Cuando envíes un correo con los botones Gmail, Outlook o App Mail del Bot 3, la empresa aparecerá aquí.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((c) => (
            <div key={c.leadId} className="bg-black p-5 rounded-2xl border-2 border-cyan-500/50 space-y-3 shadow-xl">
              <div className="flex flex-wrap items-center gap-1.5">
                <IcpBadge profile={c.icpProfile} name={c.icpProfileName} />
                <StatusBadge status={c.status} />
                {isDue(c) && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold border bg-red-950 text-red-300 border-red-500/50">
                    Seguimiento pendiente
                  </span>
                )}
              </div>
              <h4 className="text-lg font-bold text-white">{c.company}</h4>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-cyan-400" /> {c.email || '—'} {c.contactPerson && <span className="text-slate-500">· {c.contactPerson}</span>}</p>
                <p><strong className="text-slate-400">Primer contacto:</strong> {fmtDate(c.firstContactAt)} · <strong className="text-slate-400">Correos enviados:</strong> {(c.touches || []).length}</p>
                <p><strong className="text-slate-400">Próximo seguimiento:</strong> {CLOSED_STATUSES.includes(c.status) ? '—' : fmtDate(c.nextFollowUpAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------------------
// CRM de seguimiento (Bot 4)
// ------------------------------------------------------------------------------
function Kpi({ icon: Icon, label, value, accent }) {
  return (
    <div className="p-4 rounded-2xl bg-black border border-slate-800 space-y-1">
      <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${accent}`}>
        <Icon className="w-3.5 h-3.5" /> {label}
      </div>
      <div className="text-2xl font-black text-white">{value}</div>
    </div>
  );
}

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'due', label: 'Seguimiento pendiente' },
  ...Object.entries(CRM_STATUSES).map(([id, s]) => ({ id, label: s.label }))
];

export function CrmFollowUpPanel({ contacts, onUpdateContact, onRemoveContact, onSendFollowUp }) {
  const [filter, setFilter] = useState('all');
  const [openHistory, setOpenHistory] = useState(null);
  const list = useMemo(() => activeContacts(contacts), [contacts]);

  const stats = useMemo(() => {
    const count = (st) => list.filter((c) => c.status === st).length;
    const engaged = count('replied') + count('meeting') + count('won');
    return {
      total: list.length,
      due: list.filter(isDue).length,
      scheduled: list.filter((c) => c.nextFollowUpAt && !CLOSED_STATUSES.includes(c.status) && !isDue(c)).length,
      replied: engaged,
      won: count('won'),
      emails: list.reduce((n, c) => n + (c.touches || []).length, 0),
      rate: list.length ? Math.round((engaged / list.length) * 100) : 0
    };
  }, [list]);

  const visible = list
    .filter((c) => (filter === 'all' ? true : filter === 'due' ? isDue(c) : c.status === filter))
    .sort((a, b) => {
      // Pendientes primero, luego por fecha de próximo seguimiento
      const da = isDue(a) ? 0 : 1;
      const db = isDue(b) ? 0 : 1;
      if (da !== db) return da - db;
      return new Date(a.nextFollowUpAt || '9999') - new Date(b.nextFollowUpAt || '9999');
    });

  const pipeline = Object.entries(CRM_STATUSES).map(([id, s]) => ({
    id,
    label: s.label,
    n: list.filter((c) => c.status === id).length
  }));

  return (
    <div className="bg-slate-950 rounded-3xl border-2 border-violet-500/70 p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in duration-300 font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-extrabold text-violet-300 flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-violet-400" /> CRM de Seguimiento de Empresas Contactadas
          </h3>
          <p className="text-slate-400 text-[11px] mt-1">
            Cada correo enviado desde el Bot 3 programa un seguimiento a los 7 días. Cambia la fecha, el estado o añade notas en cada empresa.
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Kpi icon={Users} label="Contactadas" value={stats.total} accent="text-cyan-400" />
        <Kpi icon={AlertTriangle} label="Pendientes hoy" value={stats.due} accent="text-red-400" />
        <Kpi icon={CalendarClock} label="Programados" value={stats.scheduled} accent="text-amber-400" />
        <Kpi icon={MessageSquare} label="Respondieron" value={stats.replied} accent="text-violet-400" />
        <Kpi icon={Trophy} label="Clientes ganados" value={stats.won} accent="text-emerald-400" />
        <Kpi icon={Percent} label="Tasa de respuesta" value={`${stats.rate}%`} accent="text-blue-400" />
      </div>

      {/* Embudo */}
      {stats.total > 0 && (
        <div className="space-y-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Embudo comercial · {stats.emails} correos enviados</span>
          <div className="flex w-full h-3 rounded-full overflow-hidden bg-slate-900 border border-slate-800">
            {pipeline.filter((p) => p.n > 0).map((p) => (
              <div
                key={p.id}
                title={`${p.label}: ${p.n}`}
                className={CRM_STATUSES[p.id].color.split(' ')[0]}
                style={{ width: `${(p.n / stats.total) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {pipeline.map((p) => (
              <span key={p.id} className="text-[10px] text-slate-400">
                <StatusBadge status={p.id} /> <strong className="text-white">{p.n}</strong>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-xl font-bold text-[11px] border transition-all cursor-pointer ${
              filter === f.id
                ? 'bg-violet-500 text-white border-violet-400'
                : 'bg-black text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            {f.label}
            {f.id === 'due' && stats.due > 0 && <span className="ml-1.5 px-1.5 rounded bg-red-500 text-white">{stats.due}</span>}
          </button>
        ))}
      </div>

      {/* Lista */}
      {list.length === 0 ? (
        <div className="text-center py-14 px-4 bg-black/60 rounded-3xl border border-dashed border-violet-500/40 space-y-3">
          <Inbox className="w-10 h-10 text-violet-400 mx-auto" />
          <h4 className="text-base font-bold text-white">El CRM está vacío</h4>
          <p className="text-slate-400 text-xs max-w-md mx-auto">
            Envía un correo a una empresa desde el Bot 3 y aparecerá aquí con su seguimiento programado.
          </p>
        </div>
      ) : visible.length === 0 ? (
        <p className="text-center text-slate-400 py-8">No hay empresas con este filtro.</p>
      ) : (
        <div className="space-y-3">
          {visible.map((c) => {
            const due = isDue(c);
            const closed = CLOSED_STATUSES.includes(c.status);
            const touches = c.touches || [];
            return (
              <div
                key={c.leadId}
                className={`p-4 rounded-2xl bg-black border-2 space-y-3 ${due ? 'border-red-500/70' : 'border-slate-800'}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <IcpBadge profile={c.icpProfile} name={c.icpProfileName} />
                      {due && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold border bg-red-950 text-red-300 border-red-500/50">
                          ⏰ Toca seguimiento
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-extrabold text-white">{c.company}</h4>
                    <p className="text-[11px] text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-cyan-400" /> {c.email || '—'}</span>
                      {c.contactPerson && <span>{c.contactPerson}</span>}
                      {c.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-amber-400" /> {c.phone}</span>}
                      {c.website && (
                        <a href={c.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-emerald-400 underline">
                          <Globe className="w-3 h-3" /> web
                        </a>
                      )}
                    </p>
                  </div>

                  <select
                    value={c.status}
                    onChange={(e) => onUpdateContact({ ...c, status: e.target.value })}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-violet-500/50 text-white font-bold text-[11px] cursor-pointer"
                  >
                    {Object.entries(CRM_STATUSES).map(([id, s]) => (
                      <option key={id} value={id}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-slate-300">
                    <p><strong className="text-slate-400">Primer contacto:</strong> {fmtDate(c.firstContactAt)}</p>
                    <p><strong className="text-slate-400">Último correo:</strong> {fmtDate(c.lastContactAt)}</p>
                    <p><strong className="text-slate-400">Correos enviados:</strong> {touches.length}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Próximo seguimiento</label>
                    <input
                      type="date"
                      value={toDateInput(c.nextFollowUpAt)}
                      disabled={closed}
                      onChange={(e) =>
                        onUpdateContact({
                          ...c,
                          nextFollowUpAt: e.target.value ? new Date(`${e.target.value}T09:00:00`).toISOString() : ''
                        })
                      }
                      className="w-full px-2 py-1.5 rounded-lg bg-black border border-slate-700 text-white text-[11px] disabled:opacity-40 [color-scheme:dark]"
                    />
                    {closed && <p className="text-[10px] text-slate-500">Sin seguimiento: estado "{CRM_STATUSES[c.status].label}"</p>}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Notas</label>
                    <textarea
                      rows={2}
                      defaultValue={c.notes || ''}
                      onBlur={(e) => e.target.value !== (c.notes || '') && onUpdateContact({ ...c, notes: e.target.value })}
                      placeholder="Ej: Pidió presupuesto para marzo…"
                      className="w-full px-2 py-1.5 rounded-lg bg-black border border-slate-700 text-white text-[11px] resize-y"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onSendFollowUp(c, 'gmail')}
                    className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Enviar seguimiento (Gmail)
                  </button>
                  <button
                    type="button"
                    onClick={() => onSendFollowUp(c, 'outlook')}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Outlook
                  </button>
                  {!closed && c.nextFollowUpAt && (
                    <a
                      href={googleCalendarReminderUrl(c)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-[11px] flex items-center gap-1.5 transition-all"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" /> Recordatorio en Google Calendar
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpenHistory(openHistory === c.leadId ? null : c.leadId)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5" /> Historial ({touches.length})
                    <ChevronDown className={`w-3 h-3 transition-transform ${openHistory === c.leadId ? 'rotate-180' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveContact(c)}
                    className="ml-auto px-3 py-2 rounded-xl bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-300 border border-slate-800 font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Quitar del CRM"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Quitar
                  </button>
                </div>

                {openHistory === c.leadId && (
                  <ul className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-[11px] text-slate-300">
                    {touches.length === 0 && <li className="text-slate-500">Sin correos registrados.</li>}
                    {[...touches].reverse().map((t, i) => (
                      <li key={i} className="flex flex-wrap gap-x-2">
                        <span className="text-slate-500">{fmtDate(t.date)}</span>
                        <span className={t.kind === 'followup' ? 'text-amber-300 font-bold' : 'text-cyan-300 font-bold'}>
                          {t.kind === 'followup' ? 'Seguimiento' : 'Primer contacto'}
                        </span>
                        <span className="text-white">{t.subject}</span>
                        {t.client && <span className="text-slate-500">({t.client})</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
