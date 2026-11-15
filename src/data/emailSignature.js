// ==============================================================================
// FIRMA OFICIAL DE ABRAHAM LOZANO (HTML) PARA LOS CORREOS B2B DE LOS BOTS
// Logo, nombre, marca y botón redirigen a la web corporativa.
// ==============================================================================

export const SIGNATURE_WEBSITE_URL = 'https://www.csysmould.com';

export const SIGNATURE_HTML = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;border-collapse:collapse;"><tr>
<td valign="middle" style="padding:0 18px 0 0;"><a href="${SIGNATURE_WEBSITE_URL}" target="_blank" style="text-decoration:none;"><img src="https://lh3.googleusercontent.com/d/1m7XvEKGTnz0ZJrcl-tkv3JewpubkYR9Q" width="88" height="88" alt="CSYS MOULD" style="display:block;border:0;width:88px;height:88px;"></a></td>
<td valign="middle" style="border-left:3px solid #F5A21D;padding:2px 0 2px 18px;"><a href="${SIGNATURE_WEBSITE_URL}" target="_blank" style="text-decoration:none;"><span style="font-size:19px;font-weight:bold;color:#1a1a1a;">Abraham Lozano</span></a><br>
<a href="${SIGNATURE_WEBSITE_URL}" target="_blank" style="text-decoration:none;"><span style="font-size:13px;font-weight:bold;color:#F5A21D;letter-spacing:1px;">CSYS MOULD</span></a><br>
<span style="font-size:12px;color:#555555;line-height:18px;">Desarrollo de moldes &amp; micro-inyección de alta precisión</span><br>
<span style="font-size:12px;line-height:22px;color:#555555;"><a href="mailto:abraham@csysmould.com" style="color:#1a1a1a;text-decoration:none;">abraham@csysmould.com</a>&nbsp;<span style="color:#F5A21D;">|</span>&nbsp;<a href="${SIGNATURE_WEBSITE_URL}" target="_blank" style="text-decoration:none;"><span style="color:#1a1a1a;font-weight:bold;">www.csysmould.com</span></a></span><br>
<span style="font-size:12px;color:#888888;line-height:18px;">Llinars del Vallès (Barcelona)</span>
<table cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;border-collapse:collapse;"><tr><td bgcolor="#F5A21D" style="background:#F5A21D;border-radius:4px;"><a href="${SIGNATURE_WEBSITE_URL}" target="_blank" style="display:inline-block;padding:7px 14px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;color:#000000;text-decoration:none;">Visita nuestra web &rarr;</a></td></tr></table></td>
</tr></table>`;

// Versión texto plano (para URLs de Gmail/Outlook/mailto, que no admiten HTML).
// La URL completa con https:// hace que los clientes de correo la conviertan en enlace.
export const SIGNATURE_TEXT = `Abraham Lozano
CSYS MOULD · Gerente · Grupo CSYS
Desarrollo de moldes & micro-inyección de alta precisión
abraham@csysmould.com | ${SIGNATURE_WEBSITE_URL}
Llinars del Vallès (Barcelona)`;

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Cuerpo en texto plano + firma en texto plano. */
export const buildEmailText = (body = '') => `${body.trimEnd()}\n\n${SIGNATURE_TEXT}`;

/** Cuerpo convertido a HTML + firma HTML con enlaces a la web. */
export const buildEmailHtml = (body = '') => {
  const bodyHtml = escapeHtml(body.trimEnd()).replace(/\n/g, '<br>');
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;line-height:1.5;">${bodyHtml}</div><br>${SIGNATURE_HTML}`;
};

/**
 * Copia el correo completo (cuerpo + firma) como texto enriquecido.
 * Al pegarlo en Gmail/Outlook se conserva la firma con logo y enlaces.
 * Devuelve 'html' si se copió con formato, 'text' si solo texto plano, o false.
 */
export const copyEmailWithSignature = async (body = '') => {
  const html = buildEmailHtml(body);
  const text = buildEmailText(body);
  try {
    if (typeof window !== 'undefined' && window.ClipboardItem && navigator?.clipboard?.write) {
      await navigator.clipboard.write([
        new window.ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([text], { type: 'text/plain' })
        })
      ]);
      return 'html';
    }
  } catch {
    // continúa con el fallback
  }
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return 'text';
    }
  } catch {
    // sin acceso al portapapeles
  }
  return false;
};

const composeUrl = ({ to, subject, client }) => {
  const encTo = encodeURIComponent(to || '');
  const encSubject = encodeURIComponent(subject || '');
  switch (client) {
    case 'outlook':
      return `https://outlook.office.com/mail/deeplink/compose?to=${encTo}&subject=${encSubject}`;
    case 'mailto':
      return `mailto:${encTo}?subject=${encSubject}`;
    case 'gmail':
    default:
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${encTo}&su=${encSubject}`;
  }
};

/**
 * Copia el correo con la firma HTML al portapapeles y abre la redacción
 * (destinatario + asunto) con el cuerpo vacío, listo para pegar con Cmd+V / Ctrl+V.
 * Devuelve el resultado de la copia ('html' | 'text' | false).
 */
export const openComposeWithSignature = async ({ to, subject, body, client = 'gmail' }) => {
  // Abrimos la pestaña antes del await para que el navegador no la bloquee como popup
  const url = composeUrl({ to, subject, client });
  const win = client === 'mailto' ? null : window.open('about:blank', '_blank');
  const result = await copyEmailWithSignature(body);
  if (client === 'mailto') {
    window.location.href = url;
  } else if (win) {
    win.opener = null;
    win.location.href = url;
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return result;
};

export const signatureCopyMessage = (result) =>
  result === 'html'
    ? '✉️ Correo con firma copiado: haz clic en el cuerpo del mail y pega con Cmd+V (Ctrl+V)'
    : result === 'text'
      ? '⚠️ El navegador solo permitió copiar texto plano (sin firma con formato)'
      : '⚠️ No se pudo copiar al portapapeles';
