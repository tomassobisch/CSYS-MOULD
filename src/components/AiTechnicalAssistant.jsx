import React, { useState, useRef, useEffect } from 'react';
import { AI_KNOWLEDGE_BASE, COMPANY_INFO } from '../data/mouldData';
import { Bot, Send, Sparkles, User, Cpu, ShieldAlert, CheckCircle, RefreshCw, Terminal } from 'lucide-react';

export default function AiTechnicalAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! Soy el **Asistente Virtual DFM de CSYS MOULD** desarrollado por TJ Developer. Puedo resolver consultas sobre diseño de piezas, historia desde 1965, planta de Llinars del Vallès (500m²), selección de acero (H13, S136, P20) o corrección de defectos de inyección. ¿En qué puedo ayudarte hoy?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickQuestions = [
    "¿Dónde se encuentra la planta de CSYS MOULD?",
    "¿Qué ángulo de desmoldeo usar para PA66-GF30?",
    "¿Cómo evitar rechupados en paredes gruesas?",
    "Diferencia entre acero S136 y H13"
  ];

  const handleSend = (textToSend = null) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "";
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes('planta') || lowerQuery.includes('dónde') || lowerQuery.includes('ubica') || lowerQuery.includes('llinars') || lowerQuery.includes('barcelona')) {
        botResponse = `Nuestra planta principal se encuentra en **Llinars del Vallès (Barcelona, España)**:
📍 **${COMPANY_INFO.spainPlant.address}**
• Nave propia de **500 m²** equipada con puente grúa para moldes de hasta **10 Toneladas**.
• También contamos con centros de producción asociados en **Dongguan y Shenzhen (China)** para producciones masivas de alta velocidad.`;
      } else if (lowerQuery.includes('ángulo') || lowerQuery.includes('desmoldeo') || lowerQuery.includes('draft')) {
        botResponse = `Para el plástico **PA66 con 30% fibra de vidrio (GF30)**, debido a la abrasividad y rigidez del material, te recomendamos aplicar un **ángulo de desmoldeo mínimo de 2.0° a 2.5°** por cada cara interior. Para nervios profundos, incrementarlo a **3°** y pulir la matriz en dirección de la expulsión.`;
      } else if (lowerQuery.includes('rechupado') || lowerQuery.includes('sink') || lowerQuery.includes('pared')) {
        botResponse = `Los **rechupados (sink marks)** se producen por un enfriamiento desigual en secciones gruesas. 

**Recomendaciones DFM de CSYS MOULD:**
1. Mantener el espesor de nervios internos entre el **50% y 60%** del espesor de la pared principal.
2. Añadir radio de acuerdo de **0.5mm a 1.0mm** en la base del nervio.
3. Aumentar la presión de mantenimiento (packing pressure) y tiempo de sostenimiento en la inyectora.`;
      } else if (lowerQuery.includes('s136') || lowerQuery.includes('h13') || lowerQuery.includes('acero')) {
        botResponse = `**Comparativa de Aceros de Molde CSYS MOULD:**

• **Acero S136 (420 Stainless):** Alta resistencia a la corrosión y apto para pulido espejo SPI-A1. Ideal para plásticos transparentes (PC/PMMA) y moldes médicos.
• **Acero H13 (52-54 HRC):** Excelente tenacidad y resistencia al choque térmico. Recomendado para materiales abrasivos (PA66-GF, PBT) y producción de más de 1,500,000 ciclos.`;
      } else {
        botResponse = `Gracias por tu consulta técnica. Según nuestros patrones de ingeniería en **CSYS MOULD**:
Para optimizar la matriz ante "${query}", nuestros ingenieros de proyecto simulan la distribución térmica mediante Moldflow. Puedes contactar directamente con nuestros directores **Claudio** (\`claudio@csysmould.com\`) o **Abraham Lozano** (\`abraham@csysmould.com\`), o escribir a **TJ Developer** en \`Tsteam.fit@gmail.com\`.`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <section id="bot" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold">
            <Bot className="w-3.5 h-3.5" /> ASISTENTE TÉCNICO VIRTUAL DFM
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Consultoría Técnica en Moldes con Inteligencia Artificial
          </h2>
          <p className="text-sm text-slate-300">
            Resuelve dudas de DFM, ubicación de planta y selección de aceros al instante.
          </p>
        </div>

        {/* Chat UI Container */}
        <div className="glass-panel-amber rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col h-[560px]">
          
          {/* Top Bar */}
          <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  Bot Técnico DFM CSYS MOULD
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                    Conectado con IA
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400 font-mono">Entrenado con 60 años de experiencia CSYS MOULD</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <Terminal className="w-4 h-4 text-amber-400" /> API: TJ Developer v2.4
            </div>
          </div>

          {/* Quick Questions Pills */}
          <div className="p-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-slate-500 font-mono shrink-0 pl-1">Sugeridos:</span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium shrink-0 hover:border-amber-500/40 transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-950/60">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                }`}>
                  <div className="whitespace-pre-line">{msg.text}</div>
                  <span className="text-[10px] opacity-60 block text-right mt-1 font-mono">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl text-xs text-slate-400 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" /> Consultando ingeniería CSYS MOULD...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center gap-3">
            <input
              type="text"
              placeholder="Escribe tu consulta sobre moldes, aceros o planta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
