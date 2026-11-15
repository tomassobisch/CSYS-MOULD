import React from 'react';
import { Users } from 'lucide-react';

const TEAM = [
  {
    name: 'Abraham Lozano',
    role: 'Gerente · Grupo CSYS',
    photo: '/multimedia/team_abraham.png'
  },
  {
    name: 'Claudio Arriaga',
    role: 'Socio · CSYS MOULD',
    photo: '/multimedia/team_claudio.png'
  }
];

export default function TeamSection() {
  return (
    <section id="team" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold">
          <Users className="w-3.5 h-3.5" /> NUESTRO EQUIPO
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Las personas detrás de cada molde</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {TEAM.map((person) => (
          <figure
            key={person.name}
            className="group rounded-3xl border-2 border-amber-500/50 hover:border-amber-400 bg-gradient-to-b from-slate-900 to-black overflow-hidden shadow-2xl shadow-amber-500/10 transition-all"
          >
            <div className="relative h-80 sm:h-96 flex items-end justify-center overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.25),transparent_70%)]" />
              <img
                src={person.photo}
                alt={person.name}
                loading="lazy"
                className="relative h-full w-auto object-contain object-bottom group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <figcaption className="p-5 text-center border-t border-amber-500/30 bg-black">
              <p className="text-lg font-extrabold text-white">{person.name}</p>
              <p className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mt-1">{person.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
