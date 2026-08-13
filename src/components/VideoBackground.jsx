import React, { useRef, useEffect } from 'react';

export default function VideoBackground() {
  const canvasRef = useRef(null);

  // High-Tech Laser Measurement & Metrology Simulation Engine
  useEffect(() => {
    let animationFrameId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;

    // 3D Laser Point Cloud particles (Cyan #00f0ff, Amber #e09900, Magenta #ff007f)
    const colors = ['#00f0ff', '#e09900', '#ff007f', '#10b981'];
    const pointCloud = Array.from({ length: 120 }, () => ({
      x: Math.random() * (canvas.width || 1200),
      y: Math.random() * (canvas.height || 800),
      z: Math.random() * 200,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.8 + 0.2
    }));

    const render = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Deep Black Background
      ctx.fillStyle = '#010204';
      ctx.fillRect(0, 0, w, h);

      // 1. High-Tech Laser Metrology Grid Mesh
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const cx = w / 2;
      const cy = h / 2;

      // === 3D LASER SCANNING & METROLOGY CMM ===
      ctx.strokeStyle = 'rgba(224, 153, 0, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 180 + Math.sin(frame * 0.03) * 15, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(cx, cy, 240 + Math.cos(frame * 0.02) * 20, frame * 0.02, frame * 0.02 + Math.PI * 1.5);
      ctx.stroke();

      // Scanning Laser Beams
      const scanY = (frame * 3.5) % h;
      ctx.strokeStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(w, scanY);
      ctx.stroke();

      const scanX = (frame * 2.5) % w;
      ctx.strokeStyle = '#e09900';
      ctx.shadowColor = '#e09900';
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, h);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // CMM Digital Measuring Probe Point
      const probeX = cx + Math.sin(frame * 0.04) * 120;
      const probeY = cy + Math.cos(frame * 0.04) * 120;

      ctx.fillStyle = '#ff007f';
      ctx.shadowColor = '#ff007f';
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.arc(probeX, probeY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Target Reticle Crosshair
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(probeX, probeY, 20, 0, Math.PI * 2);
      ctx.moveTo(probeX - 30, probeY); ctx.lineTo(probeX + 30, probeY);
      ctx.moveTo(probeX, probeY - 30); ctx.lineTo(probeX, probeY + 30);
      ctx.stroke();

      // Render 3D Point Cloud Particles
      pointCloud.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 bg-black">
      
      {/* Clean Dynamic Laser & Metrology Canvas Engine Without Any Pill Controls */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-10 opacity-95"
      />

      {/* Dark Vignette Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70 pointer-events-none z-10" />

    </div>
  );
}
