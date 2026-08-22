import React, { useState } from 'react';
import { REAL_FACTORY_PHOTOS } from '../data/mouldData';
import { Camera, MapPin, Shield, CheckCircle, Eye, X, ZoomIn, ArrowRight } from 'lucide-react';

export default function RealPhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="gallery" className="py-16 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header - EXACT TITLE AND SUBTITLE FROM SCREENSHOT */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold">
            <Camera className="w-3.5 h-3.5" /> FOTOGRAFÍAS REALES DE NUESTRAS INSTALACIONES Y MOLDES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Planta de Barcelona & Moldistas en Vivo
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Conoce nuestras instalaciones de <strong className="text-white font-extrabold">500 m²</strong> (puente grúa de 10 Toneladas) Oficina de Diseño e Ingeniería propia, maquinaria de última generación
          </p>
        </div>

        {/* Real Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REAL_FACTORY_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group glass-panel rounded-3xl border border-slate-800 overflow-hidden cursor-pointer hover:border-amber-500/50 transition-all duration-300 glass-panel-hover flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/90 text-amber-300 text-[11px] font-mono border border-amber-500/40 font-bold">
                  {photo.category}
                </span>

                {/* Hover Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-xs">
                  <div className="p-3 rounded-2xl bg-amber-500 text-slate-950 font-bold shadow-xl flex items-center gap-2 text-xs">
                    <ZoomIn className="w-4 h-4" /> Ampliar Fotografía Real
                  </div>
                </div>
              </div>

              {/* Photo Description */}
              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {photo.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Expanded Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-slate-950 border-2 border-amber-500/70 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs font-mono z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-96 sm:h-[480px] rounded-2xl overflow-hidden bg-black border border-slate-800">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{selectedPhoto.category}</span>
              <h3 className="text-xl font-bold text-white">{selectedPhoto.title}</h3>
              <p className="text-xs text-slate-300">{selectedPhoto.desc}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Cerrar Imagen
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
