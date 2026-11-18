import React, { useEffect, useRef, useState } from 'react';

// ==============================================================================
// Vídeo de fondo del hero, optimizado para que la landing cargue fluida:
// - Vídeos recomprimidos (720p en escritorio, 360p en móvil, sin audio)
// - Imagen fija (poster) inmediata mientras carga el vídeo
// - El vídeo empieza a descargarse cuando la página ya terminó de cargar
// - Se pausa al salir de la pantalla o cambiar de pestaña
// - Con "reducir movimiento" o "ahorro de datos" se muestra solo la imagen
// ==============================================================================

const VIDEO_COUNT = 4;
const POSTER = '/multimedia/bg_poster.jpg';

const isSmallScreen = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
const videoSrc = (i, small) => `/multimedia/bg_video${i + 1}${small ? '_m' : ''}.mp4`;

const shouldSkipVideo = () => {
  if (typeof window === 'undefined') return true;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection?.saveData;
  return Boolean(reduced || saveData);
};

export default function VideoBackground() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [enabled, setEnabled] = useState(false); // se activa tras la carga de la página
  const [visible, setVisible] = useState(false); // el vídeo se muestra cuando ya puede reproducirse
  const [small] = useState(isSmallScreen);

  // Esperar a que la página termine de cargar (y al navegador libre) antes de pedir el vídeo
  useEffect(() => {
    if (shouldSkipVideo()) return undefined;
    let idleId;
    let timeoutId;
    const start = () => {
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(() => setEnabled(true), { timeout: 1500 });
      else timeoutId = window.setTimeout(() => setEnabled(true), 300);
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  // Pausar cuando el hero sale de pantalla o la pestaña está oculta
  useEffect(() => {
    if (!enabled) return undefined;
    const container = containerRef.current;
    let onScreen = true;
    const sync = () => {
      const video = videoRef.current;
      if (!video) return;
      if (onScreen && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    if (container) io.observe(container);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [enabled]);

  // Precargar el siguiente vídeo poco antes de que termine el actual
  useEffect(() => {
    if (!enabled) return undefined;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'video';
    link.href = videoSrc((index + 1) % VIDEO_COUNT, small);
    const timer = window.setTimeout(() => document.head.appendChild(link), 4000);
    return () => {
      window.clearTimeout(timer);
      link.remove();
    };
  }, [enabled, index, small]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 bg-black"
    >
      {/* Imagen fija inmediata (se ve mientras carga el vídeo) */}
      <img
        src={POSTER}
        alt=""
        aria-hidden="true"
        fetchpriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {enabled && (
        <video
          ref={videoRef}
          key={index}
          src={videoSrc(index, small)}
          poster={POSTER}
          autoPlay
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setVisible(true)}
          onEnded={() => setIndex((i) => (i + 1) % VIDEO_COUNT)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Oscurecido para que el texto se lea bien (sin desenfoque, que es costoso) */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/80" />
    </div>
  );
}
