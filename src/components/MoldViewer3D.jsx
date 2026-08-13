import React, { useRef, useEffect, useState } from 'react';
import { RotateCw, Eye, Flame, Layers, Sparkles, Sliders, Info, Zap, Activity, Gauge, Cpu } from 'lucide-react';

export default function MoldViewer3D({ activeTab = 'solid' }) {
  const canvasRef = useRef(null);
  const [explode, setExplode] = useState(35); // 0 to 100
  const [viewMode, setViewMode] = useState('solid'); // 'solid' | 'wireframe' | 'thermal' | 'xray'
  const [isRotating, setIsRotating] = useState(true);
  const [selectedPart, setSelectedPart] = useState('cavity');
  const [rotationAngle, setRotationAngle] = useState(30);
  const [pitchAngle, setPitchAngle] = useState(20);
  const [injectionProgress, setInjectionProgress] = useState(65); // Plastic melt fill percentage
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });

  // Component details dictionary
  const PART_DETAILS = {
    cavity: {
      name: "Placa Cavidad (Matriz Fija - Llinars del Vallès)",
      steel: "Acero S136 ESR (52 HRC)",
      desc: "Forma el contorno exterior estético de la pieza plástica. Superficie pulida espejo SPI-A1 con recubrimiento nitrurado anti-desgaste.",
      temp: "45°C - 55°C",
      pressure: "1,450 Bar"
    },
    core: {
      name: "Placa Macho / Núcleo Móvil",
      steel: "Acero H13 Premium (54 HRC)",
      desc: "Forma la geometría interior y costillas de la pieza. Montado sobre puente grúa de hasta 10 toneladas con guía micrométrica ±0.002mm.",
      temp: "50°C - 60°C",
      pressure: "1,200 Bar"
    },
    ejector: {
      name: "Sistema de Expulsión Sincronizada",
      steel: "Pasadores Nitrurados SKD61",
      desc: "Retorna automáticamente mediante muelles de compresión reforzados y pasadores de guía templados.",
      temp: "40°C",
      pressure: "450 Bar"
    },
    cooling: {
      name: "Circuito de Refrigeración Conformal 3D",
      steel: "Canales DMLS 3D en Acero",
      desc: "Canales espirales impresos en 3D directo en acero que reducen el tiempo de enfriamiento un 32% frente a canales taladrados rectos.",
      temp: "22°C (Agua Chiller)",
      pressure: "6 Bar (Caudal 45 L/min)"
    },
    hotrunner: {
      name: "Manifold Canal Caliente (Hot Runner)",
      steel: "Aleación Cupro-Bario & Inconel",
      desc: "Válvulas de aguja neumático-secuenciales (Sequential Valve Gate) para cero desperdicio de mazarota y llenado equilibrado.",
      temp: "240°C - 260°C",
      pressure: "1,600 Bar (Melt Pressure)"
    }
  };

  useEffect(() => {
    let animationFrameId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
    };
    resizeCanvas();

    let localAngle = rotationAngle;

    const render = () => {
      if (isRotating && !isDraggingRef.current) {
        localAngle += 0.4;
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2 + 10;
      const scale = Math.min(width, height) / 520;

      const rad = (localAngle * Math.PI) / 180;
      const pitchRad = (pitchAngle * Math.PI) / 180;

      // 3D Isometric projection helpers
      const project = (x, y, z) => {
        const x1 = x * Math.cos(rad) - z * Math.sin(rad);
        const z1 = x * Math.sin(rad) + z * Math.cos(rad);

        const y2 = y * Math.cos(pitchRad) - z1 * Math.sin(pitchRad);
        const z2 = y * Math.sin(pitchRad) + z1 * Math.cos(pitchRad);

        const perspective = 800 / (800 + z2);
        return {
          px: cx + x1 * scale * perspective,
          py: cy + y2 * scale * perspective,
          depth: z2
        };
      };

      const drawBox = (x, y, z, w, h, d, color, strokeColor, isHighlighted = false) => {
        const halfW = w / 2;
        const halfH = h / 2;
        const halfD = d / 2;

        const vertices = [
          project(x - halfW, y - halfH, z - halfD),
          project(x + halfW, y - halfH, z - halfD),
          project(x + halfW, y + halfH, z - halfD),
          project(x - halfW, y + halfH, z - halfD),
          project(x - halfW, y - halfH, z + halfD),
          project(x + halfW, y - halfH, z + halfD),
          project(x + halfW, y + halfH, z + halfD),
          project(x - halfW, y + halfH, z + halfD)
        ];

        const faces = [
          { verts: [0, 1, 2, 3], normZ: -1, name: "back" },
          { verts: [4, 5, 6, 7], normZ: 1, name: "front" },
          { verts: [0, 1, 5, 4], normY: -1, name: "top" },
          { verts: [2, 3, 7, 6], normY: 1, name: "bottom" },
          { verts: [0, 3, 7, 4], normX: -1, name: "left" },
          { verts: [1, 2, 6, 5], normX: 1, name: "right" }
        ];

        faces.forEach(f => {
          f.avgDepth = f.verts.reduce((sum, idx) => sum + vertices[idx].depth, 0) / 4;
        });
        faces.sort((a, b) => b.avgDepth - a.avgDepth);

        faces.forEach(f => {
          ctx.beginPath();
          ctx.moveTo(vertices[f.verts[0]].px, vertices[f.verts[0]].py);
          for (let i = 1; i < f.verts.length; i++) {
            ctx.lineTo(vertices[f.verts[i]].px, vertices[f.verts[i]].py);
          }
          ctx.closePath();

          if (viewMode === 'wireframe') {
            ctx.strokeStyle = strokeColor || '#e09900';
            ctx.lineWidth = isHighlighted ? 2.5 : 1;
            ctx.stroke();
          } else if (viewMode === 'thermal') {
            ctx.fillStyle = f.name === 'top' ? 'rgba(239, 68, 68, 0.85)' : 'rgba(245, 158, 11, 0.7)';
            ctx.fill();
            ctx.strokeStyle = '#ef4444';
            ctx.stroke();
          } else if (viewMode === 'xray') {
            ctx.fillStyle = isHighlighted ? 'rgba(224, 153, 0, 0.4)' : 'rgba(15, 23, 42, 0.3)';
            ctx.fill();
            ctx.strokeStyle = strokeColor || '#38bdf8';
            ctx.lineWidth = 1;
            ctx.stroke();
          } else {
            // Metallic Solid render
            ctx.fillStyle = isHighlighted ? '#e09900' : color;
            ctx.fill();
            ctx.strokeStyle = isHighlighted ? '#fbbf24' : (strokeColor || 'rgba(255,255,255,0.15)');
            ctx.lineWidth = isHighlighted ? 2 : 1;
            ctx.stroke();
          }
        });
      };

      const expOffset = (explode / 100) * 110;

      // 1. Hot Runner Manifold (Top Plate)
      drawBox(0, -140 - expOffset * 1.5, 0, 220, 35, 180, '#1e293b', '#e09900', selectedPart === 'hotrunner');

      // 2. Fixed Cavity Plate (Placa Cavidad Llinars)
      drawBox(0, -70 - expOffset, 0, 240, 65, 200, '#0f172a', '#38bdf8', selectedPart === 'cavity');

      // 3. Molded Plastic Part with Amber Molten Stream Effect
      const partY = 0;
      drawBox(0, partY, 0, 140, 25, 110, viewMode === 'thermal' ? '#dc2626' : '#e09900', '#fbbf24', true);

      // 4. Moving Core Plate (Placa Macho)
      drawBox(0, 70 + expOffset, 0, 240, 65, 200, '#0f172a', '#38bdf8', selectedPart === 'core');

      // 5. Ejector Plate (Placa Expulsora)
      drawBox(0, 150 + expOffset * 1.8, 0, 200, 25, 170, '#030712', '#64748b', selectedPart === 'ejector');

      // 6. Draw 4 Guide Pillars (Columnas de Guía)
      const pillars = [
        [-95, -70], [95, -70], [-95, 70], [95, 70]
      ];
      pillars.forEach(([px, pz]) => {
        const topP = project(px, -170 - expOffset * 1.5, pz);
        const botP = project(px, 170 + expOffset * 1.8, pz);
        ctx.beginPath();
        ctx.moveTo(topP.px, topP.py);
        ctx.lineTo(botP.px, botP.py);
        ctx.strokeStyle = viewMode === 'wireframe' ? '#fbbf24' : '#94a3b8';
        ctx.lineWidth = Math.max(2, 6 * scale);
        ctx.stroke();
      });

      // 7. Animated Cooling Fluid Lines
      const time = Date.now() / 400;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 6]);
      ctx.lineDashOffset = -time * 10;

      const p1 = project(-100, -70 - expOffset, 0);
      const p2 = project(100, -70 - expOffset, 0);
      ctx.beginPath();
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.stroke();

      const p3 = project(-100, 70 + expOffset, 0);
      const p4 = project(100, 70 + expOffset, 0);
      ctx.beginPath();
      ctx.moveTo(p3.px, p3.py);
      ctx.lineTo(p4.px, p4.py);
      ctx.stroke();

      ctx.setLineDash([]);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [explode, viewMode, isRotating, selectedPart, pitchAngle]);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    previousMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMouseRef.current.x;
    const deltaY = e.clientY - previousMouseRef.current.y;
    setRotationAngle(prev => prev + deltaX * 0.5);
    setPitchAngle(prev => Math.max(-60, Math.min(60, prev + deltaY * 0.5)));
    previousMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-panel-amber border border-amber-500/30 shadow-2xl p-4 sm:p-6">
      
      {/* HUD Corner Brackets */}
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Visualizador 3D CAD / Simulación de Inyección Molde
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                CSYS HUD 3D
              </span>
            </h3>
            <p className="text-xs text-slate-400">Simulación interactiva de llenado de polímero fundido y canales conformal</p>
          </div>
        </div>

        {/* Render View Mode Toggles */}
        <div className="flex items-center gap-1.5 bg-slate-950/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('solid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'solid' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Sólido
          </button>
          <button
            onClick={() => setViewMode('wireframe')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'wireframe' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> CAD Alámbrico
          </button>
          <button
            onClick={() => setViewMode('thermal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'thermal' ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Térmico
          </button>
          <button
            onClick={() => setViewMode('xray')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'xray' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> Rayos X
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Area with Telemetry Overlay */}
      <div className="relative w-full h-[400px] sm:h-[460px] rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center">
        
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid-tech opacity-40 pointer-events-none" />

        {/* Laser Scan Animation Line */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-laser-scan pointer-events-none" />

        {/* Telemetry HUD Top Left */}
        <div className="absolute top-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1 shadow-xl pointer-events-none">
          <p className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> TELEMETRÍA EN TIEMPO REAL
          </p>
          <p className="text-slate-400">Presión Inyección: <span className="text-white font-bold">{PART_DETAILS[selectedPart].pressure}</span></p>
          <p className="text-slate-400">Temp. Matriz: <span className="text-amber-400 font-bold">{PART_DETAILS[selectedPart].temp}</span></p>
          <p className="text-slate-400">Tolerancia Metrología: <span className="text-emerald-400 font-bold">±0.002mm</span></p>
        </div>

        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full h-full block relative z-10"
        />

        {/* Overlay Controls Bottom */}
        <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-slate-950/90 backdrop-blur-md p-2 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-lg transition-all ${isRotating ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-slate-900 text-slate-400'}`}
            title="Auto Rotación 360"
          >
            <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
          </button>

          <div className="h-4 w-[1px] bg-slate-800" />

          {/* Component selection buttons */}
          {Object.keys(PART_DETAILS).map(key => (
            <button
              key={key}
              onClick={() => setSelectedPart(key)}
              className={`px-2.5 py-1 rounded-md capitalize font-medium transition-all text-[11px] ${
                selectedPart === key
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Explode Slider Control Overlay */}
        <div className="absolute top-4 right-4 z-20 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs w-48 shadow-xl">
          <div className="flex items-center justify-between text-slate-300 font-semibold mb-2">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" /> Explosionado 3D
            </span>
            <span className="text-amber-400 font-mono font-bold">{explode}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={explode}
            onChange={(e) => setExplode(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>
      </div>

      {/* Component Details Card Footer */}
      <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">{PART_DETAILS[selectedPart].name}</h4>
            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-amber-300 font-mono border border-slate-800">
              {PART_DETAILS[selectedPart].steel}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{PART_DETAILS[selectedPart].desc}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0 font-mono">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Temperatura</p>
            <p className="text-xs font-bold text-amber-400">{PART_DETAILS[selectedPart].temp}</p>
          </div>
          <div className="text-right border-l border-slate-800 pl-4">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Presión Llenado</p>
            <p className="text-xs font-bold text-cyan-400">{PART_DETAILS[selectedPart].pressure}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
