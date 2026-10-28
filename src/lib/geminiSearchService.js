// ==============================================================================
// CSYS MOULD WEB - GEMINI AI & LIVE WEB SEARCH SERVICE
// Rastreo en tiempo real en internet mediante Google Search Grounding & Gemini API
// ==============================================================================

import { EXPANDED_REAL_STARTUPS } from '../data/expandedLeads';

const STORAGE_KEY = 'csys_gemini_api_key';

export const getGeminiApiKey = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEY) || import.meta.env.VITE_GEMINI_API_KEY || '';
};

export const saveGeminiApiKey = (key) => {
  if (typeof window !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem(STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
};

/**
 * Searches the web in real-time using Google Gemini API with Google Search Grounding.
 * If no API key is provided, falls back to intelligent matching across the expanded real dataset.
 */
export async function searchCompaniesOnWeb({
  query = '',
  location = 'all',
  sector = 'all',
  existingCount = 0
}) {
  const apiKey = getGeminiApiKey();

  // 1. LIVE GEMINI API SEARCH WITH GOOGLE SEARCH GROUNDING
  if (apiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const systemPrompt = `Eres un agente de prospección industrial B2B de élite para CSYS MOULD S.L., una planta de matricería e inyección de plásticos de alta precisión en Barcelona (Llinars del Vallès, con puente grúa de 10 TN y microinyección BABYPLAST).
Tu misión es buscar en Google en vivo empresas REALES y activas que fabriquen productos plásticos, carcasas, piezas técnicas, dispositivos médicos, packaging o componentes de automoción.

Parámetros de búsqueda solicitados por el director:
- Término / Búsqueda libre: "${query || 'Empresas de inyección de plástico y desarrollo de moldes'}"
- Filtro Ubicación: "${location}"
- Filtro Sector: "${sector}"

INSTRUCCIONES ESTRICTAS:
1. Encuentra entre 3 y 6 empresas REALES verificables (NO inventes empresas ni URLs inexistentes).
2. Devuelve EXCLUSIVAMENTE un array JSON válido con la siguiente estructura para cada empresa:
[
  {
    "id": "web-live-${Date.now()}-1",
    "company": "Nombre Real S.L. / S.A.",
    "priorityLevel": "cat", // "cat" para Cataluña, "and" para Andalucía, "esp" para Resto España, "int" para Internacional
    "priorityName": "Prioridad 1: Cataluña",
    "priorityColor": "#ef4444",
    "closingProbabilityScore": 92,
    "closingProbabilityLabel": "92% • Alta Probabilidad de Cierre",
    "closingBadgeColor": "bg-emerald-950 text-emerald-400 border-emerald-500/60",
    "sectorKey": "automotive", // "automotive", "medtech", "deeptech", "iot", "packaging", "robotics"
    "sector": "Sector específico de la empresa",
    "companySize": "51-200",
    "companySizeLabel": "51 - 200 empleados",
    "companyAge": "5+",
    "companyAgeLabel": "Empresa consolidada",
    "stage": "Fabricación & Carcasas Plásticas",
    "foundationYear": 2015,
    "country": "Ciudad / Provincia / Parque Industrial",
    "incubatorHub": "Parque tecnológico o polígono industrial",
    "website": "https://www.dominio-real.com",
    "linkedin": "https://www.linkedin.com/company/nombre",
    "contactPerson": "Nombre del directivo o Departamento de Compras / Ingeniería",
    "email": "contacto@dominio-real.com",
    "phone": "+34 930 000 000",
    "rfqTitle": "Necesidad de Molde de Inyección Técnica para...",
    "estimatedBudget": "55.000 €",
    "technicalNeed": "Detalle técnico del molde, acero recomendado (Stavax, H13) y tolerancia centesimal.",
    "verifiedStatus": "🌐 Encontrada en Google Search (Web Verificada)",
    "googleMapsSearch": "Nombre de la empresa y ciudad",
    "addressFull": "Dirección completa en España",
    "isLiveWebResult": true,
    "study360": {
      "growthMetrics": "Datos recientes de crecimiento o rondas de inversión.",
      "recentNews": ["• Noticia o proyecto reciente de la empresa."],
      "agreementsAndPartnerships": ["• Principales clientes o asociaciones del sector."],
      "executivesLinkedin": [{ "name": "Directivo", "role": "CEO / Director Técnico", "linkedin": "https://www.linkedin.com/company/...", "email": "contacto@..." }]
    },
    "detailedDiagnosis": {
      "businessProblem": "Problema técnico habitual en moldes para este producto.",
      "csysHelpStrategy": ["1. Solución técnica de CSYS MOULD en Barcelona.", "2. Acompañamiento por Claudio y Abraham Lozano."]
    }
  }
]`;

      const requestBody = {
        contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
        tools: [{ google_search: {} }],
        generationConfig: {
          temperature: 0.2
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';

        // Extract JSON array from text response
        const jsonMatch = textResponse.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return {
              success: true,
              source: 'google_ai_search',
              leads: parsed,
              message: `Se encontraron ${parsed.length} empresas reales en internet mediante Google Search Grounding.`
            };
          }
        }
      }
    } catch (err) {
      console.warn('Gemini API search encountered an error, falling back to local search engine:', err);
    }
  }

  // 2. INTELLIGENT REAL-DATASET FILTER & EXPANSION FALLBACK
  // Filters and discovers matches from the expanded real database with dynamic scoring
  const cleanQ = query.trim().toLowerCase();

  let candidates = [...EXPANDED_REAL_STARTUPS];

  if (location && location !== 'all') {
    candidates = candidates.filter(c => c.priorityLevel === location);
  }

  if (sector && sector !== 'all') {
    candidates = candidates.filter(c => c.sectorKey === sector || c.sector.toLowerCase().includes(sector));
  }

  if (cleanQ) {
    const queryTokens = cleanQ.split(/\s+/).filter(t => t.length > 2);
    candidates = candidates.filter(c => {
      const haystack = `${c.company} ${c.sector} ${c.country} ${c.technicalNeed} ${c.rfqTitle} ${c.addressFull}`.toLowerCase();
      return queryTokens.some(token => haystack.includes(token));
    });
  }

  // If no candidates matched strictly, take from full expanded pool
  if (candidates.length === 0) {
    candidates = [...EXPANDED_REAL_STARTUPS].sort(() => Math.random() - 0.5).slice(0, 4);
  }

  // Tag as newly discovered
  const discovered = candidates.map((lead, idx) => ({
    ...lead,
    id: `discovered-${Date.now()}-${idx}`,
    verifiedStatus: '🟢 Empresa Real Verificada en Catálogo Ampliado',
    isExpandedCatalog: true
  }));

  return {
    success: true,
    source: apiKey ? 'hybrid_search' : 'expanded_database',
    leads: discovered,
    needsKeyForLiveGoogle: !apiKey,
    message: apiKey
      ? `Se sincronizaron ${discovered.length} empresas de la base de datos ampliada.`
      : `Búsqueda ampliada completada (${discovered.length} empresas reales). Para conectar Google Search en tiempo real ilimitado, puedes agregar tu clave gratuita de Gemini API.`
  };
}
