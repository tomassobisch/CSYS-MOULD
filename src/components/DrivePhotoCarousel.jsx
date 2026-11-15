import React, { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Images, Pause, Play } from 'lucide-react';
import { REAL_FACTORY_PHOTOS } from '../data/mouldData';

// ==============================================================================
// CARRUSEL DE FOTOS CONECTADO A LA CARPETA DE GOOGLE DRIVE "Fotografias para la web"
// Las fotos se leen desde /api/drive-photos (función de Vercel, sin API key).
// Cuando la fotógrafa sube fotos nuevas a la carpeta, aparecen solas (máx. ~5 min).
// Si falla la carga, usa las fotos locales de la planta.
// ==============================================================================

const AUTOPLAY_MS = 4500;

const prettyName = (name = '') =>
  name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim();

async function fetchDrivePhotos() {
  const res = await fetch('/api/drive-photos');
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  return (data.photos || []).map((p) => ({ id: p.id, image: p.image, title: prettyName(p.name) }));
}

const FALLBACK_PHOTOS = REAL_FACTORY_PHOTOS.map((p) => ({ id: p.id, image: p.image, title: p.title }));

export default function DrivePhotoCarousel() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false); // pausa manual
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchDrivePhotos()
      .then((list) => {
        if (!cancelled) setPhotos(list.length ? list : FALLBACK_PHOTOS);
      })
      .catch((err) => {
        console.warn('[DrivePhotoCarousel] No se pudo cargar la carpeta de Drive:', err);
        if (!cancelled) setPhotos(FALLBACK_PHOTOS);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const count = photos.length;
  const go = useCallback((dir) => setIndex((i) => (count ? (i + dir + count) % count : 0)), [count]);

  // Avance automático
  useEffect(() => {
    if (paused || hovered || count < 2) return;
    const t = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, hovered, count, go]);

  // Precarga la siguiente foto para que la transición sea fluida
  useEffect(() => {
    if (count < 2) return;
    const img = new Image();
    img.src = photos[(index + 1) % count].image;
  }, [index, count, photos]);

  return (
    <section id="carousel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold">
          <Images className="w-3.5 h-3.5" /> NUESTROS TRABAJOS
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Proyectos, moldes y piezas</h2>
      </div>

      <div
        className="relative rounded-3xl border-2 border-amber-500/60 bg-black overflow-hidden shadow-2xl shadow-amber-500/10 aspect-[4/3] sm:aspect-[16/9]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-mono">
            Cargando fotos…
          </div>
        )}

        {photos.map((photo, i) => (
          <img
            key={photo.id}
            src={i === index || i === (index + 1) % count ? photo.image : undefined}
            alt={photo.title || 'CSYS MOULD'}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 border border-amber-500/50 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 border border-amber-500/50 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Reanudar' : 'Pausar'}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/70 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          </>
        )}

        {count > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5 max-w-[90%]">
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir a la foto ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === index ? 'w-6 bg-amber-400' : 'w-2 bg-slate-500/70 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
