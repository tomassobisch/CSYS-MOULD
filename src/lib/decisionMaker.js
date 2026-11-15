// ==============================================================================
// Detecta al CEO / persona responsable de una empresa (datos del Bot 2: Estudio 360°)
// para dirigir el saludo del correo a esa persona en lugar de a la empresa.
// ==============================================================================

// Palabras que indican un cargo o departamento, no el nombre de una persona
const GENERIC_WORDS = /\b(direcci[oó]n|director|directora|directivo|gerencia|gerente|responsable|jefatura|jefe|jefa|departamento|dpto|equipo|contacto|corporativo|oficina|nombre|fundador|fundadora|ceo|cto|coo|head|manager|planta|producci[oó]n|operaciones|t[eé]cnica|compras|ingenier[ií]a|matricer[ií]a|utillajes|team|info)\b/i;

// Cargos con prioridad para dirigir el correo (más alto = más prioridad)
const ROLE_PRIORITY = [
  [/\bceo\b|chief executive|consejer[oa] delegad[oa]/i, 5],
  [/fundador|founder|co-founder/i, 4],
  [/director general|managing director|gerente|general manager/i, 3],
  [/\bcto\b|director t[eé]cnic|head of (tooling|manufacturing|engineering)|plant (manager|director)|jefe de planta/i, 2]
];

/** true si el texto parece el nombre real de una persona (p. ej. "Irene Gómez"). */
export function isPersonName(text) {
  if (!text || typeof text !== 'string') return false;
  const clean = text.trim();
  if (clean.length < 3 || clean.length > 60 || GENERIC_WORDS.test(clean) || /[@/\d]/.test(clean)) return false;
  const words = clean.split(/\s+/);
  if (words.length < 2 || words.length > 5) return false;
  // Cada palabra empieza en mayúscula, salvo partículas (de, del, la, i, y…)
  return words.every((w) => /^\p{Lu}/u.test(w) || /^(de|del|la|las|los|i|y|van|von|da|do|dos)$/i.test(w));
}

const rolePriority = (role = '') => {
  for (const [re, p] of ROLE_PRIORITY) if (re.test(role)) return p;
  return 1;
};

/**
 * Devuelve la persona a la que dirigir el correo, o null si no hay un nombre real.
 * @returns {{ name: string, firstName: string, role: string } | null}
 */
export function getDecisionMaker(lead) {
  if (!lead) return null;
  const candidates = [];

  const execs = Array.isArray(lead.study360?.executivesLinkedin) ? lead.study360.executivesLinkedin : [];
  execs.forEach((e) => {
    if (isPersonName(e?.name)) candidates.push({ name: e.name.trim(), role: e.role || '', priority: rolePriority(e.role) + 1 });
  });

  if (isPersonName(lead.contactPerson)) {
    candidates.push({ name: lead.contactPerson.trim(), role: '', priority: 1 });
  }

  if (!candidates.length) return null;
  candidates.sort((a, b) => b.priority - a.priority);
  const best = candidates[0];
  return { name: best.name, firstName: best.name.split(/\s+/)[0], role: best.role };
}

/** Nombre a usar en el saludo "Hola, X:" (nombre de pila de la persona o, si no hay, la empresa). */
export function getGreetingName(lead, fallbackCompany) {
  const dm = getDecisionMaker(lead);
  return dm ? dm.firstName : fallbackCompany || lead?.company || '';
}
