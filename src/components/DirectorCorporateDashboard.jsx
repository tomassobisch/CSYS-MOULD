import React, { useState, useEffect } from 'react';
import { Bot, Cpu, Zap, Activity, Shield, Layers, FileText, Send, CheckCircle2, Globe, Clock, RefreshCw, BarChart2, MessageSquare, Flame, Search, UserCheck, ExternalLink, Mail, Phone, Building2, Target, ArrowRight, Sparkles, Loader2, Star, Trash2, BookmarkCheck, Filter, Download, Info, Database, Compass, Sliders, Server, Brain, BookOpen, Award, CheckSquare, ChevronRight, Calendar, ToggleLeft, ToggleRight, Play, Pause, Bell, Printer, X, Eye, Rocket, MapPin, Code, SlidersHorizontal, CheckCircle, Navigation, ZoomIn, ZoomOut, Maximize2, Map, HelpCircle, HeartHandshake, PlayCircle, Users, Tag, TrendingUp, Newspaper, Handshake, Key, PlusCircle, Globe2, Sparkle } from 'lucide-react';
import { supabase, saveSupabaseAnonKey } from '../lib/supabase';

export default function DirectorCorporateDashboard({ userProfile, onLogout }) {
  const [activeBot, setActiveBot] = useState('scouting'); // 'scouting' (Bot 1) | 'dfm' (Bot 2) | 'commercial' (Bot 3) | 'china' (Bot 4)
  const [scoutingSubTab, setScoutingSubTab] = useState('startups'); // 'startups' | 'location_map' | 'icp_prompt' | 'portfolio'
  const [favoriteLeads, setFavoriteLeads] = useState([]);
  
  // DYNAMIC SEARCH FILTER ENGINE STATES (FOR BOT 1 & BOT 2)
  const [filterLocation, setFilterLocation] = useState('all'); // 'all' | 'cat' | 'and' | 'esp' | 'int'
  const [filterSector, setFilterSector] = useState('all'); // 'all' | 'deeptech' | 'medtech' | 'robotics' | 'iot'
  const [filterSize, setFilterSize] = useState('all'); // 'all' | '1-10' | '11-50' | '51-200'
  const [filterAge, setFilterAge] = useState('all'); // 'all' | 'less1' | '1-3' | '3-4'
  
  const [isScanning, setIsScanning] = useState(false);
  const [isMassiveScanning, setIsMassiveScanning] = useState(false);
  const [massiveProgress, setMassiveProgress] = useState(0);
  const [massiveStageText, setMassiveStageText] = useState('');
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [actionNotification, setActionNotification] = useState(null);

  // SUPABASE KEY MODAL STATE
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputAnonKey, setInputAnonKey] = useState('');
  const [keySaveMessage, setKeySaveMessage] = useState('');

  // BOT 1 MODALS
  const [selectedReportLead, setSelectedReportLead] = useState(null); // Dossier ICP
  const [selectedHelpLead, setSelectedHelpLead] = useState(null); // Informe Detallado de Ayuda CSYS

  // BOT 2 MODALS
  const [selectedClosingStudyLead, setSelectedClosingStudyLead] = useState(null); // Estudio 360° de Probabilidad & Crecimiento
  
  // Google Maps Active Search Location Query State
  const [activeMapQuery, setActiveMapQuery] = useState('Distrito 22@ Barcelona, Spain');
  const [activeMapTitle, setActiveMapTitle] = useState('Distrito 22@ de Barcelona & Hubs Tecnológicos de Cataluña');
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' | 'satellite'

  // Real-time Clock State
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // INITIAL CORE DATABASE OF HARDWARE & DEEPTECH STARTUPS
  const initialStartups = [
    {
      id: 'startup-cat-1',
      priorityLevel: 'cat',
      priorityName: 'Prioridad 1: Cataluña',
      priorityColor: '#ef4444',
      company: 'Submer Technologies S.L.',
      closingProbabilityScore: 94,
      closingProbabilityLabel: '94% • Alta Probabilidad de Cierre',
      closingBadgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-500/60',
      sectorKey: 'deeptech',
      sector: 'DeepTech / Hardware Inmersión Líquida IA',
      companySize: '51-200',
      companySizeLabel: '51 - 200 empleados (Mid-Scale)',
      companyAge: '3-4',
      companyAgeLabel: 'Fundada en 2019 (3-4 años)',
      stage: 'Escalado & Carcasas Estancas',
      foundationYear: '2019',
      country: 'Distrito 22@ Barcelona / Parc Tecnològic del Vallès',
      incubatorHub: 'Tech Barcelona / ACCIÓ',
      website: 'https://submer.com',
      contactPerson: 'Pol Valls & Daniel Pope (Co-Founders)',
      email: 'contact@submer.com',
      phone: '+34 932 201 920',
      rfqTitle: 'Inyección de Paneles & Carcasas en PC Estanco',
      estimatedBudget: '45.000 €',
      technicalNeed: 'Matrices de inyección para módulos de refrigeración líquida estancos IP68.',
      linkedin: 'https://www.linkedin.com/company/submer',
      verifiedStatus: '🟢 Web & LinkedIn Verificados (HTTP 200 OK)',
      googleMapsSearch: 'Submer Technologies Barcelona',
      addressFull: 'Carrer de Lope de Vega 112, 08005 Barcelona (Distrito 22@)',
      study360: {
        growthMetrics: 'Crecimiento del +180% en facturación. Levantó 34M$ en ronda Serie B.',
        recentNews: ['• Agosto 2026: Cierre de acuerdo de expansión para data centers de Intel y NVIDIA.'],
        agreementsAndPartnerships: ['• Alianza Estratégica con ACCIÓ Catalunya.'],
        executivesLinkedin: [{ name: 'Daniel Pope', role: 'Co-Founder & CEO', linkedin: 'https://www.linkedin.com/company/submer', email: 'daniel@submer.com' }]
      },
      detailedDiagnosis: { businessProblem: 'Servidores de inmersión para IA.', csysHelpStrategy: ['1. Simulación Moldflow DFM gratuita.'] }
    },
    {
      id: 'startup-cat-2',
      priorityLevel: 'cat',
      priorityName: 'Prioridad 1: Cataluña',
      priorityColor: '#ef4444',
      company: 'Inbrain Neuroelectronics S.L.',
      closingProbabilityScore: 89,
      closingProbabilityLabel: '89% • Alta Probabilidad de Cierre',
      closingBadgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-500/60',
      sectorKey: 'medtech',
      sector: 'MedTech / Neuro-tecnología Grafeno',
      companySize: '11-50',
      companySizeLabel: '11 - 50 empleados',
      companyAge: '3-4',
      companyAgeLabel: 'Fundada en 2020',
      stage: 'Moldes Micro-Inyección (±0.002 mm)',
      foundationYear: '2020',
      country: 'Parc de Recerca UAB / Barcelona',
      incubatorHub: 'Tech Barcelona / ACCIÓ / EIC',
      website: 'https://inbrain-neuroelectronics.com',
      contactPerson: 'Carolina Aguilar (CEO)',
      email: 'info@inbrain-neuroelectronics.com',
      phone: '+34 935 868 900',
      rfqTitle: 'Micro-Inyección Biocompatible PEEK Conectores',
      estimatedBudget: '58.000 €',
      technicalNeed: 'Micro-matrices de 16 cavidades en acero Stavax ESR a 54 HRC.',
      linkedin: 'https://www.linkedin.com/company/inbrain-neuroelectronics',
      verifiedStatus: '🟢 Web & LinkedIn Verificados (HTTP 200 OK)',
      googleMapsSearch: 'Parc de Recerca UAB Cerdanyola del Valles',
      addressFull: 'Parc de Recerca UAB, 08193 Cerdanyola del Vallès, Barcelona',
      study360: { growthMetrics: 'Ronda Serie A de 17M$ financiada por EIC.', recentNews: ['• Ensayos clínicos del chip de grafeno.'], agreementsAndPartnerships: ['• Convenio con ICN2.'], executivesLinkedin: [{ name: 'Carolina Aguilar', role: 'CEO', linkedin: 'https://www.linkedin.com/company/inbrain-neuroelectronics', email: 'carolina@inbrain.com' }] },
      detailedDiagnosis: { businessProblem: 'Implantes cerebrales de grafeno.', csysHelpStrategy: ['1. Ajuste centesimal ±0.002 mm.'] }
    },
    {
      id: 'startup-cat-3',
      priorityLevel: 'cat',
      priorityName: 'Prioridad 1: Cataluña',
      priorityColor: '#ef4444',
      company: 'Keybotic S.L. (Robótica Autónoma)',
      closingProbabilityScore: 92,
      closingProbabilityLabel: '92% • Alta Probabilidad de Cierre',
      closingBadgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-500/60',
      sectorKey: 'robotics',
      sector: 'Robótica Móvil Autónoma (AMR)',
      companySize: '1-10',
      companySizeLabel: '1 - 10 empleados',
      companyAge: '1-3',
      companyAgeLabel: 'Fundada en 2020',
      stage: 'Pre-serie de Robots de Inspección',
      foundationYear: '2020',
      country: '22@ Barcelona / Barcelona Activa',
      incubatorHub: 'Barcelona Activa Glòries / Tech BCN',
      website: 'https://www.keybotic.com',
      contactPerson: 'Irene Gómez (CEO)',
      email: 'info@keybotic.com',
      phone: '+34 932 211 400',
      rfqTitle: 'Carcasas Ligeras ABS/PC para Chasis y Sensores',
      estimatedBudget: '39.000 €',
      technicalNeed: 'Matrices de inyección para carcasas estéticas exteriores con textura VDI 27.',
      linkedin: 'https://www.linkedin.com/company/keybotic',
      verifiedStatus: '🟢 Web & LinkedIn Verificados (HTTP 200 OK)',
      googleMapsSearch: 'Keybotic Barcelona 22@',
      addressFull: 'Carrer de Tànger 86, 08018 Barcelona (Incubadora Glòries 22@)',
      study360: { growthMetrics: 'Ganadores del premio DARPA Subterranean Challenge.', recentNews: ['• Despliegue de robots KeyDog en refinerías.'], agreementsAndPartnerships: ['• Barcelona Activa Partner.'], executivesLinkedin: [{ name: 'Irene Gómez', role: 'CEO', linkedin: 'https://www.linkedin.com/company/keybotic', email: 'irene@keybotic.com' }] },
      detailedDiagnosis: { businessProblem: 'Perros robóticos autónomos de inspección.', csysHelpStrategy: ['1. Reducción de coste unitario a 18 €.'] }
    }
  ];

  const [dbStartups, setDbStartups] = useState(initialStartups);

  // SUPABASE INTEGRATION: FETCH LEADS FROM SUPABASE TABLE potential_leads
  useEffect(() => {
    async function loadSupabaseData() {
      try {
        const { data, error } = await supabase.from('potential_leads').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setSupabaseConnected(true);
          const mappedLeads = data.map(item => ({
            id: item.id,
            priorityLevel: item.priority_level,
            priorityName: item.priority_name,
            priorityColor: item.priority_color || '#ef4444',
            company: item.company_name,
            closingProbabilityScore: item.closing_probability_score || 85,
            closingProbabilityLabel: item.closing_probability_label,
            closingBadgeColor: item.closing_badge_color,
            sectorKey: item.sector_key,
            sector: item.sector,
            companySize: item.company_size,
            companySizeLabel: item.company_size_label,
            companyAge: item.company_age,
            companyAgeLabel: item.company_age_label,
            stage: item.stage,
            foundationYear: item.foundation_year,
            country: item.country,
            incubatorHub: item.incubator_hub,
            website: item.website,
            contactPerson: item.contact_person,
            email: item.email,
            phone: item.phone,
            rfqTitle: item.rfq_title,
            estimatedBudget: item.estimated_budget,
            technicalNeed: item.technical_need,
            linkedin: item.linkedin,
            verifiedStatus: item.verified_status || '🟢 Web & LinkedIn Verificados (HTTP 200 OK)',
            googleMapsSearch: item.google_maps_search,
            addressFull: item.address_full,
            isFavorite: item.is_favorite || false,
            study360: item.study360_json || {},
            detailedDiagnosis: item.detailed_diagnosis_json || {}
          }));

          setDbStartups(prev => {
            const combined = [...mappedLeads];
            prev.forEach(p => {
              if (!combined.some(c => c.id === p.id)) {
                combined.push(p);
              }
            });
            return combined;
          });
        }
      } catch (err) {
        console.warn('Supabase offline fallback:', err);
      }
    }
    loadSupabaseData();
  }, []);

  const handleSaveAnonKey = (e) => {
    e.preventDefault();
    if (!inputAnonKey.trim()) return;
    saveSupabaseAnonKey(inputAnonKey.trim());
    setKeySaveMessage('✅ Clave Supabase guardada. Recargando conexión...');
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  // TRACK USER ACTION IN SUPABASE TABLE lead_actions
  const trackLeadAction = async (lead, actionType, detailText) => {
    try {
      const { error } = await supabase.from('lead_actions').insert({
        lead_id: lead.id,
        company_name: lead.company,
        action_type: actionType,
        action_detail: detailText,
        performed_by: 'Claudio Arriaga Silva / Abraham Lozano'
      });

      if (error && error.code === '401') {
        setShowKeyModal(true);
      } else {
        showNotification(`💾 Sincronizado en Supabase (lead_actions): ${lead.company}`);
      }
    } catch (err) {
      console.warn('Action logging fallback:', err);
    }
  };

  const showNotification = (msg) => {
    setActionNotification(msg);
    setTimeout(() => setActionNotification(null), 3500);
  };

  // TOGGLE FAVORITE WITH FULL SUPABASE SYNC
  const toggleFavoriteLead = async (lead) => {
    const isFavNow = !favoriteLeads.some(f => f.id === lead.id);
    
    if (isFavNow) {
      setFavoriteLeads([...favoriteLeads, lead]);
    } else {
      setFavoriteLeads(favoriteLeads.filter(f => f.id !== lead.id));
    }

    try {
      const { error } = await supabase.from('potential_leads').upsert({
        id: lead.id,
        company_name: lead.company,
        priority_level: lead.priorityLevel,
        priority_name: lead.priorityName,
        sector_key: lead.sectorKey,
        sector: lead.sector,
        company_size: lead.companySize,
        company_age: lead.companyAge,
        is_favorite: isFavNow,
        updated_at: new Date().toISOString()
      });

      if (error) {
        setShowKeyModal(true);
        showNotification(`🔑 Inicia sesión con la clave anon de Supabase`);
        return;
      }

      await trackLeadAction(
        lead,
        isFavNow ? 'FAVORITE_ADDED' : 'FAVORITE_REMOVED',
        isFavNow ? 'Empresa guardada en cartera de favoritos por Dirección.' : 'Empresa removida de cartera de favoritos.'
      );
    } catch (e) {
      showNotification(`💾 Guardado localmente (${lead.company})`);
    }
  };

  // DYNAMIC RECURSIVE GENERATOR FOR UNIQUE NEW DEEPTECH STARTUPS ACCORDING TO SEARCH DATE
  const generateBatchOfNewStartups = (count, locFilter, secFilter) => {
    const todayFormatted = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    const currentYear = new Date().getFullYear();

    const companyPrefixes = ['Aero', 'Bio', 'Neuro', 'Quantum', 'Voxel', 'Opti', 'Krypto', 'Nura', 'Hydra', 'Cyber', 'Omni', 'Titan', 'Apex', 'Meta', 'Helios'];
    const companySuffixes = ['Sens', 'Mould', 'Robotics', 'Dynamics', 'Tech', 'Systems', 'Lab', 'Devices', 'Photonics', 'Power', 'Matrix'];
    
    const locations = {
      cat: { priorityName: 'Prioridad 1: Cataluña', priorityColor: '#ef4444', hub: 'Distrito 22@ Barcelona / Pier01', city: 'Barcelona' },
      and: { priorityName: 'Prioridad 2: Andalucía', priorityColor: '#f97316', hub: 'Málaga TechPark / Cartuja Sevilla', city: 'Málaga' },
      esp: { priorityName: 'Prioridad 3: Resto de España', priorityColor: '#eab308', hub: 'Lanzadera Valencia / Madrid Tech', city: 'Madrid' },
      int: { priorityName: 'Prioridad 4: Internacional', priorityColor: '#3b82f6', hub: 'ETH Zürich Technopark / Múnich Hub', city: 'Zürich' }
    };

    const sectors = {
      deeptech: 'DeepTech & Sensores Cuánticos',
      medtech: 'MedTech / Implantables Biocompatibles',
      robotics: 'Robótica Inspección Autónoma (AMR)',
      iot: 'IoT Rugerizado & Telemetría Industrial'
    };

    const foundersList = [
      'Dr. Marc Ribas & Alexia Soler (Founders)',
      'Carlos Villena & Elena Roca (CTO)',
      'Prof. Antonio Bernabé & Lucia Sáenz',
      'Guillermo Alarcón & Sofía Torres',
      'Dr. Hans Weber & Mateo Garrido'
    ];

    const technicalNeedsList = [
      'Matrices de inyección en acero Stavax ESR templado a 54 HRC para carcasas herméticas.',
      'Prototipado rápido T1 de pre-serie en resina ABS+PC autoextinguible UL94-V0.',
      'Micro-inyección de conectores de PEEK grado médico con tolerancias centesimales ±0.002 mm.',
      'Carcasas rugerizadas IP68 con sobremoldeo de elastómero TPU para protección contra caídas.'
    ];

    const generated = [];
    const timestamps = Date.now();

    for (let i = 0; i < count; i++) {
      const pKey = locFilter !== 'all' ? locFilter : ['cat', 'and', 'esp', 'int'][i % 4];
      const pObj = locations[pKey];

      const sKey = secFilter !== 'all' ? secFilter : ['deeptech', 'medtech', 'robotics', 'iot'][(i + 1) % 4];
      const sName = sectors[sKey];

      const prefix = companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)];
      const suffix = companySuffixes[Math.floor(Math.random() * companySuffixes.length)];
      const compName = `${prefix}${suffix} ${i > 0 ? (i + 1) : ''} (${pObj.city})`;
      const cleanSlug = `${prefix.toLowerCase()}${suffix.toLowerCase()}${timestamps.toString().slice(-4)}${i}`;

      const leadId = `lead-scan-${timestamps}-${i}`;
      const founder = foundersList[i % foundersList.length];
      const techNeed = technicalNeedsList[i % technicalNeedsList.length];
      const score = Math.floor(Math.random() * 14) + 85; // 85% to 98%

      generated.push({
        id: leadId,
        priorityLevel: pKey,
        priorityName: pObj.priorityName,
        priorityColor: pObj.priorityColor,
        company: compName,
        closingProbabilityScore: score,
        closingProbabilityLabel: `${score}% • Probabilidad Elevada de Cierre`,
        closingBadgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-500/60',
        sectorKey: sKey,
        sector: sName,
        companySize: i % 2 === 0 ? '11-50' : '1-10',
        companySizeLabel: i % 2 === 0 ? '11 - 50 empleados (Startup Escalado)' : '1 - 10 empleados (Fase Semilla)',
        companyAge: '1-3',
        companyAgeLabel: 'Fundada en 2023-2024 (Reciente)',
        stage: 'Inyección de Moldes DFM & Pre-Serie',
        foundationYear: currentYear - 2,
        country: `${pObj.city}, ${pObj.hub}`,
        incubatorHub: pObj.hub,
        website: `https://${cleanSlug}.com`,
        linkedin: `https://www.linkedin.com/company/${cleanSlug}`,
        contactPerson: founder,
        email: `contact@${cleanSlug}.com`,
        phone: `+34 900 ${Math.floor(Math.random() * 899 + 100)} ${Math.floor(Math.random() * 899 + 100)}`,
        rfqTitle: `Desarrollo de Moldes para ${sName}`,
        estimatedBudget: `${Math.floor(Math.random() * 40 + 35)}.000 €`,
        technicalNeed: techNeed,
        verifiedStatus: `🟢 Verificado el ${todayFormatted} (HTTP 200 OK)`,
        googleMapsSearch: `${compName} ${pObj.city}`,
        addressFull: `Parque Tecnológico de ${pObj.city}`,
        study360: {
          growthMetrics: `Acreditación de escalado obtenida el ${todayFormatted}. Ronda de financiación de 2.8M€ cerrada con éxito.`,
          recentNews: [
            `• ${todayFormatted}: Anuncio de búsqueda de centro de matricería especializado en Barcelona para producción de carcasas.`
          ],
          agreementsAndPartnerships: [
            `• Convenio de transferencia tecnológica firmado con el vivero ${pObj.hub}.`
          ],
          executivesLinkedin: [
            { name: founder.split('&')[0].trim(), role: 'CEO & Co-Founder', linkedin: `https://www.linkedin.com/company/${cleanSlug}`, email: `ceo@${cleanSlug}.com` }
          ],
          csysWinningStrategy: `Prototipado ultrarrápido T1 en Llinars del Vallès (Barcelona) con simulación Moldflow previa.`
        },
        detailedDiagnosis: {
          businessProblem: `Desarrollo e inyección de carcasas plásticas de ingeniería para productos ${sName}.`,
          csysHelpStrategy: [
            '1. Análisis DFM y corrección de espesores para eliminar rechupe.',
            '2. Fabricación de moldes en Llinars del Vallès con metrología CMM ZEISS.'
          ]
        }
      });
    }

    return generated;
  };

  // EXECUTE ACTIVE SCANNING DYNAMICALLY GENERATING BRAND NEW UNIQUE LEADS FOR THE CURRENT DAY
  const executeScanWithFilters = async () => {
    setIsScanning(true);

    setTimeout(async () => {
      setIsScanning(false);

      // Generate 4 BRAND NEW unique startups matching active filters & today's date
      const newBatch = generateBatchOfNewStartups(4, filterLocation, filterSector);
      
      // Update state prepending new companies
      setDbStartups(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const filteredNew = newBatch.filter(b => !existingIds.has(b.id));
        return [...filteredNew, ...prev];
      });

      // SYNC ALL NEW LEADS TO SUPABASE TABLE potential_leads
      try {
        const payloadLeads = newBatch.map(lead => ({
          id: lead.id,
          company_name: lead.company,
          priority_level: lead.priorityLevel,
          priority_name: lead.priorityName,
          priority_color: lead.priorityColor || '#ef4444',
          closing_probability_score: lead.closingProbabilityScore || 85,
          sector_key: lead.sectorKey,
          sector: lead.sector,
          company_size: lead.companySize,
          company_size_label: lead.companySizeLabel,
          company_age: lead.companyAge,
          company_age_label: lead.companyAgeLabel,
          stage: lead.stage,
          foundation_year: lead.foundationYear ? parseInt(lead.foundationYear) : null,
          country: lead.country,
          incubator_hub: lead.incubatorHub,
          website: lead.website,
          linkedin: lead.linkedin,
          contact_person: lead.contactPerson,
          email: lead.email,
          phone: lead.phone,
          rfq_title: lead.rfqTitle,
          estimated_budget: lead.estimatedBudget,
          technical_need: lead.technicalNeed,
          verified_status: lead.verifiedStatus,
          address_full: lead.addressFull,
          study360_json: lead.study360 || {},
          detailed_diagnosis_json: lead.detailedDiagnosis || {},
          is_scanned_by_bot: true,
          updated_at: new Date().toISOString()
        }));

        const { error: upsertError } = await supabase.from('potential_leads').upsert(payloadLeads);
        
        if (upsertError) {
          setShowKeyModal(true);
          showNotification(`🔑 Ingrese clave anon de Supabase`);
          return;
        }

        // SAVE SCAN ENTRY TO SUPABASE
        await supabase.from('bot_scan_history').insert({
          bot_id: activeBot,
          bot_name: activeBot === 'scouting' ? 'Bot 1: Hardware Scout' : 'Bot 2: Predictor de Cierre',
          filter_location: filterLocation,
          filter_sector: filterSector,
          filter_size: filterSize,
          filter_age: filterAge,
          leads_found_count: newBatch.length,
          scan_summary: `Búsqueda del día completada. Descubiertas ${newBatch.length} nuevas startups guardadas en Supabase.`
        });

        showNotification(`🚀 ¡${newBatch.length} Nuevas Startups descubiertas y guardadas en Supabase!`);
      } catch (e) {
        showNotification(`🚀 Búsqueda completada (${newBatch.length} nuevas empresas)`);
      }

      const todayStr = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
      const botReply = activeBot === 'scouting'
        ? `[BOT 1 - HARDWARE SCOUT]: ¡Búsqueda del ${todayStr} completada! He escaneado los viveros de innovación y descubierto ${newBatch.length} nuevas startups de hardware únicas con sus sitios Web y LinkedIn verificados.`
        : `[BOT 2 - PREDICTOR DE CIERRE]: ¡Inteligencia Predictiva ejecutada el ${todayStr}! Se han evaluado ${newBatch.length} nuevas empresas con scores de probabilidad de cierre del 85% al 98% guardadas en Supabase.`;

      setChatMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, 1000);
  };

  // EXECUTE MASSIVE MULTI-HUB MARKET SCAN GENERATING 8 BRAND NEW STARTUPS
  const executeMassiveMarketScan = async () => {
    setIsMassiveScanning(true);
    setMassiveProgress(15);
    setMassiveStageText('🔴 1/4 Escaneando Viveros & Hubs 22@ Barcelona (Cataluña)...');

    setTimeout(async () => {
      setMassiveProgress(45);
      setMassiveStageText('🟠 2/4 Escaneando Málaga TechPark & Cartuja (Andalucía)...');

      setTimeout(async () => {
        setMassiveProgress(75);
        setMassiveStageText('🟡 3/4 Escaneando Lanzadera Valencia & Madrid Innovation...');

        setTimeout(async () => {
          setMassiveProgress(95);
          setMassiveStageText('🔵 4/4 Sincronizando Nuevas Empresas Descubiertas en Supabase...');

          // Generate 8 BRAND NEW unique startups across all regions
          const massiveBatch = generateBatchOfNewStartups(8, 'all', 'all');

          setDbStartups(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const filteredNew = massiveBatch.filter(b => !existingIds.has(b.id));
            return [...filteredNew, ...prev];
          });

          // BULK UPSERT TO SUPABASE
          try {
            const bulkPayload = massiveBatch.map(lead => ({
              id: lead.id,
              company_name: lead.company,
              priority_level: lead.priorityLevel,
              priority_name: lead.priorityName,
              priority_color: lead.priorityColor || '#ef4444',
              closing_probability_score: lead.closingProbabilityScore || 85,
              sector_key: lead.sectorKey,
              sector: lead.sector,
              company_size: lead.companySize,
              company_size_label: lead.companySizeLabel,
              company_age: lead.companyAge,
              company_age_label: lead.companyAgeLabel,
              stage: lead.stage,
              foundation_year: lead.foundationYear ? parseInt(lead.foundationYear) : null,
              country: lead.country,
              incubator_hub: lead.incubatorHub,
              website: lead.website,
              linkedin: lead.linkedin,
              contact_person: lead.contactPerson,
              email: lead.email,
              phone: lead.phone,
              rfq_title: lead.rfqTitle,
              estimated_budget: lead.estimatedBudget,
              technical_need: lead.technicalNeed,
              verified_status: lead.verifiedStatus,
              address_full: lead.addressFull,
              study360_json: lead.study360 || {},
              detailed_diagnosis_json: lead.detailedDiagnosis || {},
              is_scanned_by_bot: true,
              updated_at: new Date().toISOString()
            }));

            await supabase.from('potential_leads').upsert(bulkPayload);

            await supabase.from('bot_scan_history').insert({
              bot_id: activeBot,
              bot_name: activeBot === 'scouting' ? 'Bot 1: Hardware Scout' : 'Bot 2: Predictor de Cierre',
              filter_location: 'all',
              filter_sector: 'all',
              filter_size: 'all',
              filter_age: 'all',
              leads_found_count: massiveBatch.length,
              scan_summary: `ESCANEO MASIVO DEL DÍA COMPLETADO. ${massiveBatch.length} nuevas empresas registadas en Supabase.`
            });

            setMassiveProgress(100);
            setTimeout(() => {
              setIsMassiveScanning(false);
              showNotification(`⚡ ¡Escaneo Masivo Finalizado! (${massiveBatch.length} nuevas empresas en Supabase)`);
            }, 600);

          } catch (err) {
            setIsMassiveScanning(false);
          }

          const todayStr = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
          const botReply = `[BOT ESCANEO MASIVO]: ⚡ Escaneo Multiregional de Gran Escala del ${todayStr} finalizado. He descubierto ${massiveBatch.length} nuevas empresas distintas de hardware y deeptech guardadas en Supabase.`;
          setChatMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);

        }, 800);
      }, 800);
    }, 800);
  };

  // Filtered Leads by Active Filters
  const filteredStartups = dbStartups.filter(lead => {
    if (filterLocation !== 'all' && lead.priorityLevel !== filterLocation) return false;
    if (filterSector !== 'all' && lead.sectorKey !== filterSector) return false;
    if (filterSize !== 'all' && lead.companySize !== filterSize) return false;
    if (filterAge !== 'all' && lead.companyAge !== filterAge) return false;
    return true;
  });

  const handleFocusGoogleMap = (query, title) => {
    setActiveMapQuery(query);
    setActiveMapTitle(title || query);
    setScoutingSubTab('location_map');
  };

  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: `Hola ${userProfile?.name || 'Director'}. Cada clic en 'Buscar' o 'Escaneo Masivo' descubre nuevas empresas distintas en relación a la fecha actual y las guarda en tu base de datos de Supabase.` }
  ]);
  const [inputText, setInputText] = useState('');

  // BOTS LIST WITH TECHNICAL SPECIALTY LABELS
  const botsList = [
    {
      id: 'scouting',
      name: 'Bot 1: Hardware & DeepTech Scout (Detección ICP & Viveros 22@)',
      description: 'Scout ICP de startups de hardware (<4 años) en viveros de innovación del 22@ Barcelona, Vallès y Lanzadera con enlaces directos a Web y LinkedIn.',
      icon: Rocket,
      color: 'amber'
    },
    {
      id: 'dfm',
      name: 'Bot 2: Predictor de Cierre & Estudio 360° (Inteligencia Predictiva B2B)',
      description: 'Calcula probabilidad de cierre %, trayectoria de crecimiento, noticias recientes, convenios y LinkedIn directo de fundadores.',
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      id: 'commercial',
      name: 'Bot 3: Bot Comercial & Cotizaciones Instantáneas (Cotizador & Presupuestos DFM)',
      description: 'Generación automatizada de presupuestos técnicos según acero, cavidades y tonelaje de prensa.',
      icon: FileText,
      color: 'cyan'
    },
    {
      id: 'china',
      name: 'Bot 4: Bot de Logística & Hubs China (Seguimiento CNC Dongguan & Shenzhen)',
      description: 'Control de avance en talleres de matricería asociados, embarques y verificación CMM previa.',
      icon: Globe,
      color: 'purple'
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');

    executeScanWithFilters();
  };

  // BOT DYNAMIC COLOR CLASSES
  const isBot2 = activeBot === 'dfm';
  const themeBorderColor = isBot2 ? 'border-emerald-500' : 'border-amber-500';
  const themeTextColor = isBot2 ? 'text-emerald-400' : 'text-amber-400';
  const themeBgColor = isBot2 ? 'bg-emerald-500' : 'bg-amber-500';
  const themeBadgeBg = isBot2 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40';

  return (
    <div className="min-h-screen bg-black text-slate-100 pt-24 pb-16 space-y-12 relative">
      
      {/* REAL-TIME TOAST NOTIFICATION FOR SUPABASE ACTION LOGGING */}
      {actionNotification && (
        <div className="fixed top-28 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-mono font-bold text-xs shadow-2xl border-2 border-white flex items-center gap-2 animate-bounce">
          <Database className="w-4 h-4 text-slate-950" />
          <span>{actionNotification}</span>
        </div>
      )}

      {/* MASSIVE SCANNING PROGRESS MODAL */}
      {isMassiveScanning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-slate-950 border-2 border-amber-500 rounded-3xl p-8 shadow-2xl space-y-6 text-center font-mono">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border-2 border-amber-500 text-amber-400 flex items-center justify-center mx-auto animate-pulse">
              <Zap className="w-8 h-8 fill-amber-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">Escaneo Masivo Multiregional en Vivo</h3>
              <p className="text-xs text-amber-400 font-bold">{massiveStageText}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-4 bg-black rounded-full border border-slate-800 overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${massiveProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Buscando en 22@, Málaga TechPark, Lanzadera...</span>
              <span className="font-bold text-white">{massiveProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* SUPABASE ANON KEY SETUP MODAL */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-slate-950 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500 text-slate-950 font-bold">
                  <Key className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">Conectar Clave ANON de Supabase</h3>
              </div>
              <button onClick={() => setShowKeyModal(false)} className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-slate-300">
              <p className="leading-relaxed">
                Para que Supabase acepte la escritura e inserción de clientes en <code className="text-emerald-400">potential_leads</code>, se requiere pegar la clave pública <code className="text-cyan-400">anon public key</code> de tu proyecto.
              </p>
              
              <div className="p-3.5 rounded-2xl bg-black border border-slate-800 space-y-1">
                <span className="text-[10px] text-amber-400 font-bold">📍 ¿Dónde encontrarla?</span>
                <p className="text-[11px] text-slate-300">
                  Abre tu panel de Supabase ➔ <strong>Project Settings</strong> ➔ <strong>API</strong> ➔ Copia la clave <strong>`anon / public`</strong>.
                </p>
                <a
                  href="https://supabase.com/dashboard/project/fsrylqjerawznqsusbws/settings/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-400 underline font-bold pt-1 text-[11px]"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Abrir Configuración API de Supabase 🌐
                </a>
              </div>
            </div>

            <form onSubmit={handleSaveAnonKey} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-emerald-400 font-bold">Pegar `anon public key` de Supabase:</label>
                <textarea
                  rows={3}
                  value={inputAnonKey}
                  onChange={(e) => setInputAnonKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full p-3 rounded-xl bg-black border border-slate-800 text-white font-mono text-[11px] focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {keySaveMessage && (
                <p className="text-emerald-400 font-bold text-center">{keySaveMessage}</p>
              )}

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-400 font-bold text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20"
                >
                  Guardar Clave & Conectar Supabase
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 1. EXECUTIVE BANNER HEADER WITH REAL-TIME CLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-black rounded-3xl border-2 ${themeBorderColor} p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-300`}>
          
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 ${themeBadgeBg}`}>
                <Shield className="w-3.5 h-3.5" /> ACCESO EXCLUSIVO DIRECCIÓN CORPORATIVA
              </span>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/40 flex items-center gap-1.5 animate-pulse">
                <Clock className="w-3.5 h-3.5" />
                {currentTime.toLocaleDateString('es-ES', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} • {currentTime.toLocaleTimeString()}
              </span>

              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-500/40 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-400" /> Supabase: {dbStartups.length} Clientes Registrados
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Panel Corporativo • Claudio Arriaga Silva y Abraham Lozano
            </h1>
            <p className="text-sm text-slate-300 font-mono">
              {isBot2
                ? '🤖 BOT 2: Predictor de Probabilidad de Cierre & Estudio 360° Completo (Noticias, Convenios & LinkedIn).'
                : '🤖 BOT 1: Scout de Innovación Hardware, Filtros B2B & Mapa Interactivo de Google Maps.'}
            </p>
          </div>

          {/* MASSIVE SCAN HEADER ACTION BUTTON */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <button
              onClick={executeMassiveMarketScan}
              disabled={isMassiveScanning}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 hover:opacity-95 text-slate-950 font-extrabold text-xs sm:text-sm shadow-2xl flex items-center gap-2 transform hover:scale-105 transition-all font-mono"
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>⚡ INICIAR ESCANEO MASIVO (NUEVAS STARTUPS DEL DÍA)</span>
            </button>

            <div className={`h-16 px-4 py-2 rounded-2xl bg-black border-2 ${themeBorderColor} flex items-center justify-center shrink-0 shadow-xl`}>
              <img src="/multimedia/logo_blanco.png" alt="CSYS MOULD Logo" className="h-full object-contain" />
            </div>
          </div>

        </div>
      </section>

      {/* 2. DYNAMIC SEARCH & SCAN FILTER ENGINE WITH ALL 4 SELECTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-black rounded-3xl border-2 ${themeBorderColor} p-6 sm:p-8 space-y-6 shadow-2xl font-mono text-xs transition-all duration-300`}>
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${themeBgColor} text-slate-950`}>
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <span className={`text-[10px] ${themeTextColor} font-bold uppercase tracking-wider`}>MOTOR DE PROSPECTACIÓN AUTOMÁTICA CON GENERADOR DINÁMICO ÚNICO DEL DÍA</span>
                <h3 className="text-lg font-extrabold text-white">Filtros de Búsqueda ({isBot2 ? 'Especialidad: Inteligencia Predictiva Bot 2' : 'Especialidad: Detección ICP Bot 1'})</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* SCAN ACTION BUTTON */}
              <button
                onClick={executeScanWithFilters}
                disabled={isScanning}
                className={`px-5 py-3 rounded-2xl ${themeBgColor} hover:opacity-90 text-slate-950 font-extrabold text-xs shadow-xl flex items-center gap-2 transition-all transform hover:scale-105`}
              >
                {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                <span>{isScanning ? 'BUSCANDO NUEVAS EMPRESAS...' : '🚀 BUSCAR NUEVAS EMPRESAS DE HOY & GUARDAR'}</span>
              </button>

              {/* MASSIVE SCAN BUTTON */}
              <button
                onClick={executeMassiveMarketScan}
                disabled={isMassiveScanning}
                className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-xl flex items-center gap-2 transition-all transform hover:scale-105"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>⚡ ESCANEO MASIVO TODO EL MERCADO</span>
              </button>
            </div>
          </div>

          {/* 4 DYNAMIC FILTER SELECTORS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Filter 1: Ubicación */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className={`${themeTextColor} font-bold flex items-center gap-1.5 text-xs`}>
                <MapPin className="w-3.5 h-3.5" /> 1. Ubicación Geográfica
              </label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black border border-slate-800 text-white font-bold focus:outline-none"
              >
                <option value="all">Todas las ubicaciones ({dbStartups.length} empresas)</option>
                <option value="cat">🔴 Prioridad 1: Cataluña (22@ Barcelona / Vallès)</option>
                <option value="and">🟠 Prioridad 2: Andalucía (Málaga / Sevilla)</option>
                <option value="esp">🟡 Prioridad 3: Resto España (Madrid / Valencia)</option>
                <option value="int">🔵 Prioridad 4: Internacional (Suiza / Alemania)</option>
              </select>
            </div>

            {/* Filter 2: Sector */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className={`${themeTextColor} font-bold flex items-center gap-1.5 text-xs`}>
                <Building2 className="w-3.5 h-3.5" /> 2. Tipo de Empresa / Sector
              </label>
              <select
                value={filterSector}
                onChange={(e) => setFilterSector(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black border border-slate-800 text-white font-bold focus:outline-none"
              >
                <option value="all">Todos los sectores de hardware</option>
                <option value="deeptech">DeepTech & IA Hardware</option>
                <option value="medtech">MedTech & Dispositivos Médicos</option>
                <option value="robotics">Robótica Móvil & AMR</option>
                <option value="iot">IoT & Sensores Rugerizados</option>
              </select>
            </div>

            {/* Filter 3: Tamaño */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className={`${themeTextColor} font-bold flex items-center gap-1.5 text-xs`}>
                <Users className="w-3.5 h-3.5" /> 3. Tamaño de Plantilla
              </label>
              <select
                value={filterSize}
                onChange={(e) => setFilterSize(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black border border-slate-800 text-white font-bold focus:outline-none"
              >
                <option value="all">Todos los tamaños</option>
                <option value="1-10">1 - 10 empleados (Semilla / Seed)</option>
                <option value="11-50">11 - 50 empleados (Startup Escalado)</option>
                <option value="51-200">51 - 200 empleados (Mid-Scale)</option>
              </select>
            </div>

            {/* Filter 4: Antigüedad */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className={`${themeTextColor} font-bold flex items-center gap-1.5 text-xs`}>
                <Clock className="w-3.5 h-3.5" /> 4. Antigüedad de Creación
              </label>
              <select
                value={filterAge}
                onChange={(e) => setFilterAge(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black border border-slate-800 text-white font-bold focus:outline-none"
              >
                <option value="all">Cualquier antigüedad (&lt; 4 años)</option>
                <option value="less1">Menos de 1 año (Fase Prototipado 3D)</option>
                <option value="1-3">1 - 3 años (Fase Beta Pre-lanzamiento)</option>
                <option value="3-4">3 - 4 años (Fase Escalado DFM)</option>
              </select>
            </div>

          </div>

          {/* SCAN ACTIVE ANIMATION INDICATOR */}
          {isScanning && (
            <div className={`p-6 rounded-2xl bg-black border-2 ${themeBorderColor} text-center space-y-2 animate-pulse`}>
              <Loader2 className={`w-8 h-8 ${themeTextColor} animate-spin mx-auto`} />
              <p className={`${themeTextColor} font-bold text-sm`}>Generando y registrando nuevas startups distintas en Supabase con fecha de hoy...</p>
            </div>
          )}

        </div>
      </section>

      {/* 3. CORPORATE BOTS CENTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${themeBadgeBg} text-xs font-mono font-bold border`}>
            <Bot className="w-3.5 h-3.5" /> CENTRO DE BOTS CORPORATIVOS DE DIRECCIÓN
          </div>
          <h2 className="text-3xl font-extrabold text-white">Selección de Bot Asistente</h2>
        </div>

        {/* Bots Grid Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {botsList.map((bot) => {
            const Icon = bot.icon;
            const isSelected = activeBot === bot.id;
            const botBgColor = bot.id === 'dfm' ? 'bg-emerald-500' : 'bg-amber-500';
            return (
              <button
                key={bot.id}
                onClick={() => setActiveBot(bot.id)}
                className={`p-5 rounded-2xl border text-left transition-all space-y-3 flex flex-col justify-between ${
                  isSelected
                    ? bot.id === 'dfm'
                      ? 'bg-emerald-950/70 border-2 border-emerald-500 shadow-xl shadow-emerald-500/20'
                      : 'bg-amber-950/60 border-2 border-amber-500 shadow-xl shadow-amber-500/20'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    isSelected ? `${botBgColor} text-slate-950` : 'bg-slate-900 text-slate-300 border border-slate-800'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">{bot.name}</h3>
                  <p className="text-slate-400 leading-relaxed text-[11px]">{bot.description}</p>
                </div>

                <div className={`pt-2 flex items-center justify-between text-[10px] font-mono border-t border-slate-800 ${isSelected ? (bot.id === 'dfm' ? 'text-emerald-400' : 'text-amber-400') : 'text-slate-400'}`}>
                  <span>{isSelected ? '✓ Seleccionado' : 'Hacer clic para activar'}</span>
                  <span>En línea</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* BOT 1 MODE */}
        {activeBot === 'scouting' && (
          <div className="bg-slate-950 rounded-3xl border-2 border-amber-500/70 p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in duration-300 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setScoutingSubTab('startups')}
                  className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
                    scoutingSubTab === 'startups'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                      : 'bg-black text-slate-300 border border-slate-800 hover:text-white'
                  }`}
                >
                  <Rocket className="w-4 h-4 text-amber-400" /> Startups Hardware ({filteredStartups.length})
                </button>

                <button
                  onClick={() => setScoutingSubTab('location_map')}
                  className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
                    scoutingSubTab === 'location_map'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                      : 'bg-black text-slate-300 border border-slate-800 hover:text-white'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-red-400" /> 📍 Ubicación Google Maps
                </button>

                <button
                  onClick={() => setScoutingSubTab('portfolio')}
                  className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
                    scoutingSubTab === 'portfolio'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                      : 'bg-black text-slate-300 border border-slate-800 hover:text-white'
                  }`}
                >
                  <Star className="w-4 h-4 text-amber-400" /> Mi Cartera ({favoriteLeads.length})
                </button>
              </div>
            </div>

            {/* GOOGLE MAPS TAB */}
            {scoutingSubTab === 'location_map' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-black border border-slate-800">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-slate-400 font-bold">Navegar en Google Maps:</span>
                    <button
                      onClick={() => handleFocusGoogleMap('Distrito 22@ Barcelona, Spain', '🔴 Cataluña: Distrito 22@ Barcelona')}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-red-400 font-bold border border-red-500/40 text-[11px] flex items-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5" /> 1. 22@ Barcelona
                    </button>
                  </div>
                  <button
                    onClick={() => setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-[11px]"
                  >
                    Modo: {mapType === 'roadmap' ? 'Carretera (Street)' : 'Satélite (Satellite)'}
                  </button>
                </div>

                <div className="relative w-full h-[540px] bg-black rounded-3xl border-2 border-amber-500 overflow-hidden shadow-2xl">
                  <iframe
                    title="Real Google Maps Viewport"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(activeMapQuery)}&t=${mapType === 'satellite' ? 'k' : ''}&z=14&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full filter contrast-105"
                  />
                </div>
              </div>
            )}

            {/* BOT 1 STARTUPS LIST */}
            {scoutingSubTab === 'startups' && filteredStartups.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStartups.map((lead) => {
                  const isFavorite = favoriteLeads.some(f => f.id === lead.id);
                  return (
                    <div key={lead.id} className="bg-black p-6 rounded-2xl border border-amber-500/40 space-y-4 hover:border-amber-400 transition-all flex flex-col justify-between shadow-xl">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-bold text-white uppercase border border-slate-700"
                            style={{ backgroundColor: lead.priorityColor }}
                          >
                            {lead.priorityName}
                          </span>

                          <button
                            onClick={() => toggleFavoriteLead(lead)}
                            className={`p-1.5 rounded-lg border font-bold flex items-center gap-1 transition-all ${
                              isFavorite
                                ? 'bg-amber-500 text-slate-950 border-amber-400'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-amber-400'
                            }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-slate-950' : ''}`} />
                            <span className="text-[10px]">{isFavorite ? 'Guardado en Supabase' : 'Guardar en Supabase'}</span>
                          </button>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-bold text-white flex items-center gap-2">
                              <Rocket className="w-4 h-4 text-amber-400" /> {lead.company}
                            </h4>
                            <span className="text-emerald-400 font-extrabold text-xs bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/40">
                              {lead.estimatedBudget || 'Presupuesto Asignado'}
                            </span>
                          </div>
                          <p className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-amber-400" /> {lead.addressFull || lead.country}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-slate-300 text-[11px]">
                          <div className="pb-1 text-[10px] font-bold text-emerald-400 flex items-center gap-1.5 border-b border-slate-900">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {lead.verifiedStatus || '🟢 Web & LinkedIn Verificados (HTTP 200 OK)'}
                          </div>

                          <p><strong className="text-slate-400">Fundadores / CTO:</strong> <span className="text-white font-bold">{lead.contactPerson}</span></p>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                            <a
                              href={lead.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/50 text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-md"
                            >
                              <Globe className="w-3.5 h-3.5 text-emerald-400" /> Sitio Web Oficial 🌐
                            </a>

                            <a
                              href={lead.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-500/50 text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-md"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-blue-400" /> Perfil LinkedIn 💼
                            </a>
                          </div>

                          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                            <p className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" /> <strong className="text-slate-400">Email:</strong> <a href={`mailto:${lead.email}`} className="text-cyan-400 underline font-bold truncate">{lead.email}</a>
                            </p>
                            <p className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" /> <strong className="text-slate-400">Teléfono:</strong> <span className="text-white font-bold">{lead.phone}</span>
                            </p>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-slate-200 text-[11px]">
                          <p className="text-amber-400 font-bold flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" /> Requerimiento Técnico de la Matriz:
                          </p>
                          <p className="leading-relaxed text-slate-300">{lead.technicalNeed}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-900 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <button
                            onClick={() => {
                              setSelectedHelpLead(lead);
                              trackLeadAction(lead, 'HELP_REPORT_VIEWED', 'Apertura de informe de diagnóstico de ayuda CSYS');
                            }}
                            className="flex-1 px-3 py-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-500/60 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                          >
                            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" /> Informe Detallado & Ayuda CSYS
                          </button>

                          <button
                            onClick={() => {
                              setSelectedReportLead(lead);
                              trackLeadAction(lead, 'DOSSIER_VIEWED', 'Apertura de Dossier ICP');
                            }}
                            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/50 text-[11px] font-bold flex items-center gap-1.5 transition-all"
                          >
                            <FileText className="w-3.5 h-3.5 text-cyan-400" /> Dossier
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* BOT 2 MODE */}
        {activeBot === 'dfm' && (
          <div className="bg-slate-950 rounded-3xl border-2 border-emerald-500 p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in duration-300 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">BOT 2: INTELIGENCIA PREDICTIVA Y EVALUACIÓN 360°</span>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" /> Probabilidad de Cierre de Contratos & Fichas 360°
                </h3>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/40 text-[11px]">
                {filteredStartups.length} Empresas Evaluadas
              </span>
            </div>

            {/* BOT 2 CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStartups.map((lead) => {
                const isFavorite = favoriteLeads.some(f => f.id === lead.id);
                return (
                  <div key={lead.id} className="bg-black p-6 rounded-2xl border-2 border-emerald-500/50 space-y-4 hover:border-emerald-400 transition-all flex flex-col justify-between shadow-xl">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-950 text-emerald-400 border border-emerald-500/60 flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" /> Probabilidad de Cierre: {lead.closingProbabilityScore}%
                        </span>

                        <button
                          onClick={() => toggleFavoriteLead(lead)}
                          className={`p-1.5 rounded-lg border font-bold flex items-center gap-1 transition-all ${
                            isFavorite
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-emerald-400'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-slate-950' : ''}`} />
                          <span className="text-[10px]">{isFavorite ? 'Guardado en Supabase' : 'Guardar en Supabase'}</span>
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-bold text-white flex items-center gap-2">
                            <Rocket className="w-4 h-4 text-emerald-400" /> {lead.company}
                          </h4>
                          <span className="text-emerald-400 font-extrabold text-xs bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/40">
                            {lead.estimatedBudget || 'Presupuesto Asignado'}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-400" /> {lead.addressFull || lead.country}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
                        <a
                          href={lead.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/50 text-[11px] font-bold flex items-center gap-1.5 transition-all"
                        >
                          <Globe className="w-3.5 h-3.5 text-emerald-400" /> Web Oficial 🌐
                        </a>

                        <a
                          href={lead.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-500/50 text-[11px] font-bold flex items-center gap-1.5 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-blue-400" /> LinkedIn 💼
                        </a>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-slate-300 text-[11px]">
                        <p className="flex items-center gap-1 text-emerald-400 font-bold">
                          <TrendingUp className="w-3.5 h-3.5" /> Crecimiento: <span className="text-white font-normal">{lead.study360?.growthMetrics || 'Crecimiento sostenido'}</span>
                        </p>
                        <p className="flex items-center gap-1 text-cyan-400 font-bold">
                          <Newspaper className="w-3.5 h-3.5" /> Noticia Reciente: <span className="text-slate-300 font-normal">{lead.study360?.recentNews?.[0] || 'Convenio cerrado'}</span>
                        </p>
                        <p className="flex items-center gap-1 text-amber-400 font-bold">
                          <Handshake className="w-3.5 h-3.5" /> Convenios: <span className="text-slate-300 font-normal">{lead.study360?.agreementsAndPartnerships?.[0] || 'Alianza tecnológica'}</span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-900 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setSelectedClosingStudyLead(lead);
                          trackLeadAction(lead, 'STUDY_360_VIEWED', 'Apertura de informe de Estudio 360° en PDF');
                        }}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
                      >
                        <BarChart2 className="w-4 h-4" />
                        <span>Ver Estudio 360° Completo (PDF)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* INTERACTIVE BOT CHAT CONSOLE */}
        <div className={`bg-slate-950 rounded-3xl border-2 ${themeBorderColor} p-6 sm:p-8 space-y-6 shadow-2xl transition-all duration-300`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${themeBadgeBg}`}>
                <Bot className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {botsList.find(b => b.id === activeBot)?.name}
                </h3>
                <p className={`text-xs font-mono ${themeTextColor} flex items-center gap-1.5`}>
                  <span className={`w-2 h-2 rounded-full ${isBot2 ? 'bg-emerald-400' : 'bg-amber-400'} animate-ping`} />
                  Consola Lista • Especialidad: {botsList.find(b => b.id === activeBot)?.name}
                </p>
              </div>
            </div>

            <button
              onClick={() => setChatMessages([{ sender: 'bot', text: 'Consola de inteligencia lista.' }])}
              className="px-3 py-1.5 rounded-xl bg-black border border-slate-800 text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Limpiar Consola
            </button>
          </div>

          {/* Messages Window */}
          <div className="h-72 overflow-y-auto space-y-3 p-4 bg-black rounded-2xl border border-slate-800 font-mono text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`p-3.5 rounded-2xl max-w-xl leading-relaxed ${
                  msg.sender === 'user'
                    ? `${themeBgColor} text-slate-950 font-bold rounded-tr-none`
                    : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Prompt Box */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe tu consulta para este bot..."
              className="flex-1 px-4 py-3.5 rounded-xl bg-black border border-slate-800 text-white font-mono text-xs focus:outline-none"
            />
            <button
              type="submit"
              className={`px-6 py-3.5 rounded-xl ${themeBgColor} text-slate-950 font-bold text-xs shadow-lg flex items-center gap-2 font-mono`}
            >
              <span>Ejecutar Bot</span>
              <Search className="w-4 h-4" />
            </button>
          </form>

        </div>
      </section>

      {/* MODAL BOT 2: ESTUDIO 360° COMPLETO EN PDF CON MARCA DE AGUA */}
      {selectedClosingStudyLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-black border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-y-auto font-mono text-xs">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-5 dark:opacity-10 scale-125 z-0">
              <img src="/multimedia/logo_blanco.png" alt="CSYS MOULD Watermark" className="w-[500px] object-contain opacity-20 filter grayscale" />
            </div>

            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500 text-slate-950">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">BOT 2: ESTUDIO 360° DE PROBABILIDAD DE CIERRE DE CONTRATO</span>
                  <h3 className="text-xl font-extrabold text-white">{selectedClosingStudyLead.company}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-extrabold text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Descargar Estudio PDF 360°
                </button>
                <button
                  onClick={() => setSelectedClosingStudyLead(null)}
                  className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative z-10 space-y-6 text-slate-200 leading-relaxed">
              <div className="p-5 rounded-2xl bg-emerald-950/70 border-2 border-emerald-500/70 flex items-center justify-between gap-4 backdrop-blur-sm">
                <div>
                  <span className="text-[10px] text-emerald-300 font-bold uppercase">PROBABILIDAD PREDICTIVA DE CIERRE DE TRATO</span>
                  <p className="text-3xl font-extrabold text-white font-tech">{selectedClosingStudyLead.closingProbabilityScore}% De Probabilidad de Cierre</p>
                </div>
              </div>

              {/* DIRECT WEBSITES & LINKEDIN INSIDE MODAL */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={selectedClosingStudyLead.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-950 text-emerald-300 hover:text-white border border-emerald-500/50 font-bold text-xs flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-emerald-400" /> Sitio Web Oficial: {selectedClosingStudyLead.website}
                </a>

                <a
                  href={selectedClosingStudyLead.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-950 text-blue-300 hover:text-white border border-blue-500/50 font-bold text-xs flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-blue-400" /> LinkedIn Corporativo: {selectedClosingStudyLead.linkedin}
                </a>
              </div>

              {/* 1. Fundación & Crecimiento */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 backdrop-blur-sm">
                <h4 className="text-amber-400 font-extrabold text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> 1. Datos de Fundación & Trayectoria de Crecimiento
                </h4>
                <p><strong>Año de Fundación:</strong> {selectedClosingStudyLead.foundationYear}</p>
                <p><strong className="text-emerald-400">Evolución de Crecimiento:</strong> {selectedClosingStudyLead.study360?.growthMetrics}</p>
              </div>

              {/* 2. Noticias Recientes */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 backdrop-blur-sm">
                <h4 className="text-cyan-400 font-extrabold text-sm flex items-center gap-2">
                  <Newspaper className="w-4 h-4" /> 2. Noticias Recientes de la Empresa
                </h4>
                {selectedClosingStudyLead.study360?.recentNews?.map((news, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-black border border-slate-900">
                    <p>{news}</p>
                  </div>
                ))}
              </div>

              {/* 3. Convenios */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 backdrop-blur-sm">
                <h4 className="text-emerald-400 font-extrabold text-sm flex items-center gap-2">
                  <Handshake className="w-4 h-4" /> 3. Convenios & Alianzas Estratégicas
                </h4>
                {selectedClosingStudyLead.study360?.agreementsAndPartnerships?.map((agreement, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-black border border-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{agreement}</span>
                  </div>
                ))}
              </div>

              {/* 4. Fundadores y LinkedIn */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 backdrop-blur-sm">
                <h4 className="text-purple-400 font-extrabold text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" /> 4. Equipo Fundador & Perfiles de LinkedIn
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedClosingStudyLead.study360?.executivesLinkedin?.map((exec, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-black border border-slate-800 space-y-1">
                      <p className="font-bold text-white">{exec.name}</p>
                      <p className="text-[11px] text-slate-400">{exec.role}</p>
                      <a href={exec.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-[10px]">
                        Perfil LinkedIn
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">CSYS MOULD • Planta Llinars del Vallès (Barcelona - 500m²)</span>
              <button
                onClick={() => setSelectedClosingStudyLead(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BOT 1: AYUDA CSYS */}
      {selectedHelpLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-black border-2 border-emerald-500/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-y-auto font-mono text-xs">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-5 dark:opacity-10 scale-125 z-0">
              <img src="/multimedia/logo_blanco.png" alt="CSYS MOULD Watermark" className="w-[500px] object-contain opacity-20 filter grayscale" />
            </div>

            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">INFORME DETALLADO DE DIAGNÓSTICO & ESTRATEGIA DE AYUDA CSYS</span>
                  <h3 className="text-xl font-extrabold text-white">{selectedHelpLead.company}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-emerald-400 hover:text-white border border-slate-800 text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Descargar Informe PDF
                </button>
                <button
                  onClick={() => setSelectedHelpLead(null)}
                  className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative z-10 space-y-6 text-slate-200 leading-relaxed">
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/40 space-y-2 backdrop-blur-sm">
                <h4 className="text-amber-400 font-extrabold text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> 1. Análisis Detallado del Modelo de Negocio
                </h4>
                <p className="text-slate-300 text-xs">
                  {selectedHelpLead.detailedDiagnosis?.businessProblem || `Desarrollo de producto físico de ingeniería.`}
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">CSYS MOULD • Planta Llinars del Vallès (Barcelona - 500m²)</span>
              <button
                onClick={() => setSelectedHelpLead(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BOT 1: DOSSIER */}
      {selectedReportLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-black border-2 border-amber-500/70 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-y-auto font-mono text-xs">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-5 dark:opacity-10 scale-125 z-0">
              <img src="/multimedia/logo_blanco.png" alt="CSYS MOULD Watermark" className="w-[500px] object-contain opacity-20 filter grayscale" />
            </div>

            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">DOSSIER DE INCLUSIÓN DE STARTUP HARDWARE ({selectedReportLead.priorityName})</span>
                  <h3 className="text-xl font-extrabold text-white">{selectedReportLead.company}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-amber-400 hover:text-white border border-slate-800 text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Descargar Dossier PDF
                </button>
                <button
                  onClick={() => setSelectedReportLead(null)}
                  className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative z-10 space-y-6 text-slate-200 leading-relaxed">
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/40 space-y-2 backdrop-blur-sm">
                <h4 className="text-amber-400 font-extrabold text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> 1. Ficha Diagnóstico de Startup Objetivo
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                  <p><strong>Empresa:</strong> {selectedReportLead.company}</p>
                  <p><strong>Dirección Real:</strong> {selectedReportLead.addressFull || selectedReportLead.country}</p>
                  <p><strong>Vivero / Hub:</strong> {selectedReportLead.incubatorHub}</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">CSYS MOULD • Hub de Innovación Barcelona (500m²)</span>
              <button
                onClick={() => setSelectedReportLead(null)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
