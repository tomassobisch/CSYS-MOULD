// ==============================================================================
// CSYS MOULD WEB - B2B COMMERCIAL EMAIL TEMPLATES (BOT 3)
// Modelos de correo oficiales redactados por Abraham Lozano (Gerente · Grupo CSYS)
// Clasificados de forma estricta por los 3 Perfiles ICP de CSYS MOULD:
// - Email A: Perfil A (Startups tecnológicas - Robótica & MedTech en viveros)
// - Email B: Perfil B (Empresas con producto propio - Pymes 20 a 50 trabajadores)
// - Email C: Perfil C (Empresas de inyección con máquinas propias - Moldes China 3 años garantía + BABYPLAST)
// ==============================================================================

export const B2B_EMAIL_TEMPLATES = {
  profile_a: {
    id: 'profile_a',
    code: 'Email A',
    title: 'Startups Tecnológicas',
    icpName: 'Perfil A: Startups Tecnológicas',
    subtitle: 'Robótica & Tecnología Médica Avanzada',
    description: 'Startups y empresas tecnológicas en sus primeras etapas, incluidas las ubicadas en viveros de empresas, que desarrollan proyectos de robótica o tecnología médica avanzada. Podemos acompañarlas en cualquier fase, desde la idea inicial hasta la producción.',
    subject: 'Experiencia de fabricación para nuevos proyectos tecnológicos',
    badgeColor: 'bg-cyan-950 text-cyan-400 border border-cyan-500/50',
    activeBg: 'bg-cyan-950/70 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-950/50',
    tagColor: 'text-cyan-400',
    getBody: (companyName) => `Hola, ${companyName || 'vuestro equipo'}:

Me gustaría presentarme brevemente. Soy Abraham Lozano, gerente del Grupo CSYS, y os escribo para ofreceros mi experiencia y la de todo mi equipo, por si podemos ayudaros en alguno de vuestros desarrollos.

Llevamos casi 60 años desarrollando y fabricando en Barcelona. Contamos con ingeniería y diseño industrial propios, ofrecemos prototipos, inyección de plásticos de última generación, silicona de grado FDA, mecanizados de alta precisión en todo tipo de metales y moldes para pequeñas series.

Fabricamos aquí en Barcelona y también con las mejores empresas de Shenzhen, en China. Contamos con 16 años de experiencia en este país y un gestor de control de calidad en esta ciudad.

Hemos fabricado piezas para Indra, Airbus y otras muchas empresas conocidas. También contamos con una dilatada experiencia en proyectos de robótica quirúrgica.

Si en algún momento necesitáis apoyo en vuestro proyecto, estaré encantado de que lo comentemos por email o en una breve llamada.

Un saludo,

Abraham Lozano
Gerente · Grupo CSYS
www.csysmould.com`
  },

  profile_b: {
    id: 'profile_b',
    code: 'Email B',
    title: 'Empresas con Producto Propio',
    icpName: 'Perfil B: Empresas con Producto Propio (20-50 trab.)',
    subtitle: 'Pymes de 20 a 50 trabajadores con diseño propio',
    description: 'Empresas consolidadas con producto propio, idealmente de 20 a 50 trabajadores y con su propio equipo de diseño o ingeniería. El enfoque es apoyar el desarrollo de nuevas piezas de plástico y reducir costes de fabricación, aportando experiencia en materiales, moldes e inyección. No se dirige a multinacionales ni a grandes corporaciones.',
    subject: 'Apoyo a vuestra ingeniería en nuevos proyectos de plástico',
    badgeColor: 'bg-amber-950 text-amber-400 border border-amber-500/50',
    activeBg: 'bg-amber-950/70 border-amber-400 text-amber-300 shadow-lg shadow-amber-950/50',
    tagColor: 'text-amber-400',
    getBody: (companyName) => `Hola, ${companyName || 'vuestro equipo'}:

Me gustaría presentarme brevemente. Soy Abraham Lozano, gerente del Grupo CSYS, y os escribo para ofreceros mi experiencia y la de todo mi equipo como apoyo a vuestra ingeniería en el desarrollo de nuevas piezas de plástico.

Llevamos casi 60 años desarrollando y fabricando para las mejores marcas en Barcelona. Aportamos experiencia en materiales, moldes para pequeñas series y grandes producciones e inyección de piezas, buscando soluciones que faciliten la fabricación y reduzcan costes.

También trabajamos con plásticos de última generación, biocompatibles, biodegradables y reciclables según la necesidad de cada proyecto.

Fabricamos aquí en Barcelona y también con empresas de Shenzhen, en China, donde contamos con 16 años de experiencia y un gestor de control de calidad en esta ciudad. Esto nos permite ofrecer alternativas de fabricación con precios muy competitivos.

Si tenéis algún nuevo proyecto en marcha, estaremos encantados de estudiarlo con vosotros y prepararos un presupuesto sin compromiso. Podéis responder a este email o, si lo preferís, concertamos una breve llamada.

Un saludo,

Abraham Lozano
Gerente · Grupo CSYS
www.csysmould.com`
  },

  profile_c: {
    id: 'profile_c',
    code: 'Email C',
    title: 'Inyectores con Máquinas Propias',
    icpName: 'Perfil C: Inyectores con Máquinas Propias',
    subtitle: 'Moldes China garantía 3 años + BABYPLAST',
    description: 'Empresas de inyección de plástico con máquinas propias que necesitan moldes nuevos. La propuesta se centra en moldes fabricados en China, entregados funcionando y con garantía de 3 años, con servicio posventa en Barcelona. Incluye la especialización en moldes para microinyección BABYPLAST; no se ofrece producción de piezas por inyección a este perfil.',
    subject: 'Moldes fabricados en China con servicio posventa en Barcelona',
    badgeColor: 'bg-emerald-950 text-emerald-400 border border-emerald-500/50',
    activeBg: 'bg-emerald-950/70 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-950/50',
    tagColor: 'text-emerald-400',
    getBody: (companyName) => `Hola, ${companyName || 'vuestro equipo'}:

Me gustaría presentarme brevemente. Soy Abraham Lozano, gerente del Grupo CSYS, y os escribo para ofreceros mi experiencia y la de todo mi equipo en la fabricación de moldes en China, con servicio posventa en nuestro taller de Barcelona.

Llevamos casi 60 años desarrollando y fabricando para las mejores marcas. Contamos con 16 años de experiencia en China y 400 moldes importados, trabajando con empresas de Shenzhen, donde disponemos de un gestor de control de calidad.

Ofrecemos moldes para pequeñas series y grandes producciones a precios muy competitivos, con especialización en moldes para microinyección BABYPLAST. Los moldes se entregan funcionando y con una garantía de 3 años, para producir en vuestras propias máquinas.

Desde nuestro taller de Barcelona atendemos las necesidades de ajuste, reparación, modificación y mantenimiento, con un equipo cercano al que podéis acudir después de la entrega.

Si tenéis algún nuevo proyecto en marcha, estaremos encantados de estudiarlo con vosotros y prepararos un presupuesto sin compromiso. Podéis responder a este email o, si lo preferís, concertamos una breve llamada.

Un saludo,

Abraham Lozano
Gerente · Grupo CSYS
www.csysmould.com`
  }
};
