import React, { useState } from 'react';
import { IMAGES } from '../data/mockData';
import { Camera, X, ZoomIn } from 'lucide-react';

interface PortfolioGridProps {
  lang?: 'en' | 'es';
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ lang = 'es' }) => {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
    location: string;
    desc: string;
  } | null>(null);

  const projects = [
    {
      id: 'p1',
      title:
        lang === 'es'
          ? 'Flota Propia y Contención de Escombros en Sitio'
          : 'On-Site Fleet & Debris Containment',
      unit: 'UNIT 04',
      badgeColor: 'text-[#cc0000]',
      location: 'HEAVY LOGISTICS // BOERNE & NORTH LOOP',
      desc:
        lang === 'es'
          ? 'Camiones de trabajo dedicados y remolques de volteo de alta capacidad eliminan demoras de contenedores comerciales y protegen entradas vehiculares en residenciales exclusivos como Timberwood Park y Cordillera Ranch.'
          : 'Dedicated work trucks and high-capacity dump trailers eliminate dumpster delays and protect client driveways in upscale subdivisions like Timberwood Park and Cordillera Ranch.',
      image: IMAGES.fleetTruck,
      cols: 'lg:col-span-7',
      aspect: 'h-80 sm:h-96',
    },
    {
      id: 'p2',
      title:
        lang === 'es'
          ? 'Mampostería Interior y Escudo de Pisos X-Board'
          : 'Interior Masonry & Floor Shield',
      unit: 'PHASE II',
      badgeColor: 'text-[#22C55E]',
      location: 'THE DOMINION // STONE OAK',
      desc:
        lang === 'es'
          ? 'Protección de superficie pesada X-Board, perímetros encintados al milímetro y reestructuración de isla con piedra rústica para un diseño de concepto abierto.'
          : 'X-Board heavy duty surface protection, taped boundaries, and custom stone island restructuring for a private estate open layout.',
      image: IMAGES.kitchenRemodel,
      cols: 'lg:col-span-5',
      aspect: 'h-80 sm:h-96',
    },
    {
      id: 'p3',
      title:
        lang === 'es'
          ? 'Bóveda de Cielo Arquitectónico Artesanada'
          : 'Architectural Tray Ceiling Vault',
      unit: 'ELECTRICAL / DRYWALL',
      badgeColor: 'text-[#9E9E98]',
      location: 'ALAMO HEIGHTS // KITCHEN VAULT',
      desc:
        lang === 'es'
          ? 'Estructura octogonal escalonada con acabado texturizado a mano, luminarias empotradas al ras y cableado reforzado para lámparas colgantes.'
          : 'Octagonal stepped ceiling framework with hand-troweled texture, flush recessed lighting, and ornate pendant positioning.',
      image: IMAGES.trayCeiling,
      cols: 'lg:col-span-6',
      aspect: 'h-72 sm:h-80',
    },
    {
      id: 'p4',
      title:
        lang === 'es'
          ? 'Reacondicionamiento de Tocador Doble y Accesorios'
          : 'Dual Vanity & Fixture Refit',
      unit: 'FINISH STAGE',
      badgeColor: 'text-[#9E9E98]',
      location: 'TERRELL HILLS // MASTER SUITE',
      desc:
        lang === 'es'
          ? 'Recalibración de líneas de plomería, nivelación milimétrica de gabinetes, espejos enmarcados e integración de grifería de latón pulido.'
          : 'Plumbing recalibration, custom vanity alignment, framed mirror assemblies, and premium brass faucet integration.',
      image: IMAGES.luxuryBath,
      cols: 'lg:col-span-6',
      aspect: 'h-72 sm:h-80',
    },
  ];

  return (
    <section id="job-portfolio" className="w-full bg-[#121316] py-16 lg:py-24 border-b border-[#2B2F38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase text-[#cc0000] font-semibold tracking-wider flex items-center gap-2">
              <span className="inline-block w-3 h-[2px] bg-[#cc0000]" />
              <span>{lang === 'es' ? 'Documentación en Campo' : 'Field Documentation'}</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#F5F4F0] uppercase tracking-tight">
              {lang === 'es'
                ? 'Obras Reales y Proyectos Activos en San Antonio'
                : 'Real Job Sites & Active Projects'}
            </h2>
            <p className="font-['Work_Sans'] text-sm sm:text-base text-[#9E9E98] max-w-xl">
              {lang === 'es'
                ? 'Fotografías reales de obras en ejecución en el condado de Bexar. Preparación limpia, equipo ordenado y artesanía meticulosa desde la demolición hasta la entrega final.'
                : 'Unfiltered job site execution across Bexar County. Clean prep, organized equipment, and meticulous craftsmanship from teardown to final punch list.'}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#9E9E98] bg-[#16181D] px-3.5 py-2 rounded border border-[#2B2F38]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#22C55E]" />
            <span>{lang === 'es' ? 'EJECUCIÓN DOCUMENTADA DE CUADRILLA' : 'DOCUMENTED CREW EXECUTION'}</span>
          </div>
        </div>

        {/* Bento photographic grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className={`${p.cols} bg-[#16181D] rounded-lg border border-[#2B2F38] overflow-hidden flex flex-col group cursor-pointer hover:border-[#cc0000]/60 transition-all shadow-xl`}
              onClick={() =>
                setSelectedImage({
                  url: p.image,
                  title: p.title,
                  location: p.location,
                  desc: p.desc,
                })
              }
            >
              <div className={`relative ${p.aspect} w-full overflow-hidden bg-[#121316]`}>
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16181D] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 bg-[#121316]/90 backdrop-blur px-3 py-1 rounded text-[#F5F4F0] font-mono text-[10px] border border-[#2B2F38] uppercase">
                  {p.location}
                </div>
                <div className="absolute top-4 right-4 bg-[#16181D]/80 p-2 rounded text-[#F5F4F0] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5 space-y-1.5 bg-[#16181D] border-t border-[#2B2F38]">
                <div className="flex items-center justify-between">
                  <span className="font-['Space_Grotesk'] text-base font-bold text-[#F5F4F0] uppercase">
                    {p.title}
                  </span>
                  <span className={`font-mono text-xs font-bold ${p.badgeColor}`}>{p.unit}</span>
                </div>
                <p className="font-['Work_Sans'] text-xs text-[#9E9E98] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#16181D] border border-[#2B2F38] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-[#F5F4F0] hover:bg-[#cc0000] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 bg-[#16181D]">
              <div className="font-mono text-xs text-[#cc0000] mb-1 uppercase font-bold">
                {selectedImage.location}
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl font-bold uppercase text-[#F5F4F0]">
                {selectedImage.title}
              </h3>
              <p className="font-['Work_Sans'] text-sm text-[#9E9E98] mt-2">
                {selectedImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
