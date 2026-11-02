// CSYS MOULD WEB - Verificación de credenciales corporativas
// Las contraseñas NO se guardan en claro: solo su hash PBKDF2-SHA256 (310.000 iteraciones, sal única).
// Para cambiar una contraseña: `node scripts/hash-password.mjs "nueva-contraseña"` y pega salt/hash aquí.

const ITERATIONS = 310000;

const DIRECTOR_PROFILE = {
  company: 'CSYS MOULD Dirección Corporativa',
  role: 'director',
  avatar: '/multimedia/team_photo.jpg',
};

const CORPORATE_ACCOUNTS = [
  {
    usernames: ['claudio@csysmould.com', 'claudio'],
    profile: { name: 'Claudio Arriaga Silva', email: 'claudio@csysmould.com' },
    salt: 'a17a3a48ae7d37d424801e959c7e6772',
    hash: '14a1ffef7f74cfb1f5a7feaf0107b8a1d78bad854842392a5fd5e78b0c034416',
  },
  {
    usernames: ['abraham@csysmould.com', 'abraham'],
    profile: { name: 'Abraham Lozano', email: 'abraham@csysmould.com' },
    salt: '65bf68ec509080ea91839c4782c88a0b',
    hash: 'd0f5f6fb07a1cb3cf78fd22f5ca300f2f4ebdf2e76130e2bdd7742adce70184f',
  },
];

// Contraseña genérica para otros correos @csysmould.com
const SHARED_CORPORATE_SECRET = {
  salt: 'acb8cdb26851429e406cca7b243ec480',
  hash: '407063c57d0dd880d55123f338e7c47318b1d9eb3853a75501288749de63b0f6',
};

const toHex = (buffer) => Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, '0')).join('');

async function pbkdf2Hex(password, saltHex) {
  const enc = new TextEncoder();
  const salt = new Uint8Array(saltHex.match(/../g).map((h) => parseInt(h, 16)));
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITERATIONS }, key, 256);
  return toHex(bits);
}

// Comparación en tiempo constante para no filtrar información por tiempos
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const matches = async (password, { salt, hash }) => safeEqual(await pbkdf2Hex(password, salt), hash);

/**
 * Verifica credenciales corporativas.
 * @returns {Promise<{ ok: true, user: object } | { ok: false, error: string }>}
 */
export async function verifyCorporateLogin(email, password) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = password.trim();
  const invalid = { ok: false, error: 'Credenciales corporativas inválidas.' };

  if (!cleanPass) return invalid;

  const account = CORPORATE_ACCOUNTS.find((a) => a.usernames.includes(cleanEmail));
  if (account) {
    return (await matches(cleanPass, account))
      ? { ok: true, user: { ...account.profile, ...DIRECTOR_PROFILE } }
      : invalid;
  }

  if (cleanEmail.endsWith('@csysmould.com')) {
    const secrets = [SHARED_CORPORATE_SECRET, ...CORPORATE_ACCOUNTS];
    for (const secret of secrets) {
      if (await matches(cleanPass, secret)) {
        return { ok: true, user: { name: 'Claudio Arriaga Silva', email: cleanEmail, ...DIRECTOR_PROFILE } };
      }
    }
    return invalid;
  }

  return { ok: false, error: 'Acceso denegado. Introduzca sus credenciales directivas.' };
}
