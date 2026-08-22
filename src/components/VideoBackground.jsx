import React, { useRef, useEffect, useState } from 'react';

const BACKGROUND_VIDEOS = [
  '/multimedia/bg_video1.mp4',
  '/multimedia/bg_video2.mp4',
  '/multimedia/bg_video3.mp4',
  '/multimedia/bg_video4.mp4'
];

export default function VideoBackground() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Auto advance to next video in list when current video ends
  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_VIDEOS.length);
  };

  // Ensure video plays smoothly whenever index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Auto-play suppressed or waiting for user interaction:', err);
      });
    }
  }, [currentVideoIndex]);

  // High-Tech Laser Measurement & Metrology Simulation Engine Canvas
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
    const pointCloud = Array.from({ length: 100 }, () => ({
      x: Math.random() * (canvas.width || 1200),
      y: Math.random() * (canvas.height || 800),
      z: Math.random() * 200,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 2.5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.7 + 0.2
    }));

    const render = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. High-Tech Laser Metrology Grid Mesh
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 50;
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
      ctx.strokeStyle = 'rgba(224, 153, 0, 0.15)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, 180 + Math.sin(frame * 0.03) * 15, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(cx, cy, 240 + Math.cos(frame * 0.02) * 20, frame * 0.02, frame * 0.02 + Math.PI * 1.5);
      ctx.stroke();

      // Scanning Laser Beams
      const scanY = (frame * 3) % h;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 15;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(w, scanY);
      ctx.stroke();

      const scanX = (frame * 2) % w;
      ctx.strokeStyle = 'rgba(224, 153, 0, 0.6)';
      ctx.shadowColor = '#e09900';
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, h);
      ctx.stroke();
      ctx.shadowBlur = 0;

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
        ctx.shadowBlur = 6;
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
      
      {/* 1. REAL FACTORY BACKGROUND VIDEO IN CONTINUOUS LOOP */}
      <video
        ref={videoRef}
        key={BACKGROUND_VIDEOS[currentVideoIndex]}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] contrast-[1.1] transition-opacity duration-1000"
      >
        <source src={BACKGROUND_VIDEOS[currentVideoIndex]} type="video/mp4" />
      </video>

      {/* 2. BRUMA OSCURA (DARK MIST & ATMOSPHERIC FOG OVERLAY) */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-black/60 to-black" />

      {/* 3. HIGH-TECH LASER & METROLOGY CANVAS OVERLAY */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-10 opacity-90 mix-blend-screen"
      />

    </div>
  );
}
