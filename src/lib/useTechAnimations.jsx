import { useEffect, useRef, useState } from 'react';

// ==============================================================================
// Animaciones "tech dark" de la landing:
// - Aparición al hacer scroll de cada bloque (y escalonada en las tarjetas)
// - Brillo que sigue al cursor sobre las tarjetas
// Respeta "reducir movimiento" del sistema operativo.
// ==============================================================================

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function useTechAnimations(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const targets = new Set();
    // Bloques principales: entran alternando desde la izquierda y la derecha
    [...root.children]
      .filter((el) => el.id !== 'hero')
      .forEach((el, i) => {
        // Si la sección tiene tarjetas en cascada, la sección solo aparece y las tarjetas se mueven
        if (!el.dataset.reveal) {
          el.dataset.reveal = el.querySelector('.reveal-stagger') ? 'fade' : i % 2 === 0 ? 'left' : 'right';
        }
        targets.add(el);
      });
    root.querySelectorAll('[data-reveal]').forEach((el) => targets.add(el));
    // Tarjetas en cascada (desde los laterales) + brillo al pasar el cursor
    root.querySelectorAll('.reveal-stagger').forEach((grid) => {
      [...grid.children].forEach((child, i) => {
        child.style.setProperty('--reveal-delay', `${Math.min(i, 8) * 120}ms`);
        if (!child.dataset.reveal) child.dataset.reveal = i % 2 === 0 ? 'left' : 'right';
        child.classList.add('tech-card');
        targets.add(child);
      });
    });

    const onMove = (e) => {
      const card = e.target.closest?.('.tech-card');
      if (!card || !root.contains(card)) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    root.addEventListener('pointermove', onMove);

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      return () => root.removeEventListener('pointermove', onMove);
    }

    // Al terminar la animación se quitan las clases y el elemento queda con su estilo original
    const cleanup = (e) => {
      if (e.target !== e.currentTarget) return;
      e.currentTarget.classList.remove('reveal', 'is-visible');
      e.currentTarget.removeEventListener('animationend', cleanup);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.addEventListener('animationend', cleanup);
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => {
      el.classList.add('reveal');
      io.observe(el);
    });

    return () => {
      io.disconnect();
      root.removeEventListener('pointermove', onMove);
      targets.forEach((el) => el.classList.remove('reveal', 'is-visible'));
    };
  }, [rootRef]);
}

/** Número que cuenta desde 0 hasta `to` cuando aparece en pantalla. */
export function CountUp({ to, duration = 1600 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(() => (prefersReducedMotion() ? to : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setValue(to);
      return undefined;
    }
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(to * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return <span ref={ref}>{value}</span>;
}
