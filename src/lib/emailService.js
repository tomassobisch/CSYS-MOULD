/**
 * Email compose helper supporting Gmail Web, Outlook Web, and default mailto
 */

export const getEmailComposeUrl = ({
  to = 'abraham@csysmould.com',
  subject = '',
  body = '',
  client = 'gmail'
}) => {
  const encTo = encodeURIComponent(to);
  const encSubject = encodeURIComponent(subject);
  const encBody = encodeURIComponent(body);

  switch (client) {
    case 'gmail':
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${encTo}&su=${encSubject}&body=${encBody}`;
    case 'outlook':
      return `https://outlook.office.com/mail/deeplink/compose?to=${encTo}&subject=${encSubject}&body=${encBody}`;
    case 'outlook-live':
      return `https://outlook.live.com/mail/0/deeplink/compose?to=${encTo}&subject=${encSubject}&body=${encBody}`;
    case 'mailto':
    default:
      return `mailto:${encTo}?subject=${encSubject}&body=${encBody}`;
  }
};

export const getPreferredEmailClient = () => {
  try {
    return localStorage.getItem('csys_preferred_email_client') || 'gmail'; // Default to Gmail if none set
  } catch (e) {
    return 'gmail';
  }
};

export const setPreferredEmailClient = (client) => {
  try {
    if (client) {
      localStorage.setItem('csys_preferred_email_client', client);
    } else {
      localStorage.removeItem('csys_preferred_email_client');
    }
  } catch (e) {}
};

export const openEmailClient = ({
  to = 'abraham@csysmould.com',
  subject = '',
  body = '',
  client = null
}) => {
  const chosen = client || getPreferredEmailClient() || 'gmail';
  const url = getEmailComposeUrl({ to, subject, body, client: chosen });

  if (chosen === 'mailto') {
    window.location.href = url;
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
