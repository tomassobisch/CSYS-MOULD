import React, { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Images, Pause, Play } from 'lucide-react';
import { REAL_FACTORY_PHOTOS } from '../data/mouldData';
import { useLang } from '../lib/i18n';

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
  const { t } = useLang();
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
    <section id="carousel" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div className="space-y-4 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold">
          <Images className="w-3.5 h-3.5" /> {t('UN POCO DE NOSOTROS', 'A LITTLE ABOUT US')}
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          {t('Un equipo que vive ', 'A team that lives ')}<span className="text-amber-400">{t('el oficio del molde', 'the craft of mould-making')}</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {t(
            'Somos un taller de Llinars del Vallès (Barcelona) con más de 40 años fabricando moldes. Diseñamos, mecanizamos y ajustamos cada molde con nuestro propio equipo, y acompañamos a cada cliente desde la idea hasta la primera pieza inyectada.',
            'We are a workshop in Llinars del Vallès (Barcelona) with over 40 years of mould-making. We design, machine and fine-tune every mould with our own team, and support each client from the first idea to the first injected part.'
          )}
        </p>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {t('Estas son fotos reales de nuestro día a día: el taller, las personas y los trabajos que salen de aquí.', 'These are real photos of our day-to-day: the workshop, the people and the work that comes out of it.')}
        </p>
      </div>

      <div
        className="relative rounded-3xl border-2 border-amber-500/60 bg-black overflow-hidden shadow-2xl shadow-amber-500/10 aspect-[4/3] w-full max-w-xl mx-auto lg:mx-0"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-mono">
            {t('Cargando fotos…', 'Loading photos…')}
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
              aria-label={t('Foto anterior', 'Previous photo')}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 border border-amber-500/50 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t('Foto siguiente', 'Next photo')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 border border-amber-500/50 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? t('Reanudar', 'Resume') : t('Pausar', 'Pause')}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/70 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          </>
        )}

      </div>
      </div>
    </section>
  );
}
