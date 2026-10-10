import React from 'react';
import { IMAGES } from '../data/mockData';
import { ArrowUpRight, Check, ArrowRight, Wrench } from 'lucide-react';

interface CapabilitiesSectionProps {
  onSelectService: (serviceName: string) => void;
  lang?: 'en' | 'es';
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  onSelectService,
  lang = 'es',
}) => {
  const services = [
    {
      id: 'kitchen-remodel',
      title:
        lang === 'es'
          ? 'Remodelación Integral de Cocinas e Interiores'
          : 'Turnkey Kitchen & Interior Remodeling',
      location: 'Active Site // Sonterra',
      image: IMAGES.kitchenRemodel,
      desc:
        lang === 'es'
          ? 'Reconfiguración completa de distribuciones interiores, instalación de gabinetes a medida, mampostería en barras desayunadoras, revestimiento en piedra y vigas estructurales abiertas.'
          : 'Complete reconfiguration of interior layouts, custom cabinetry installation, breakfast bar masonry, stone cladding, and open-concept structural beam integration.',
      deliverables:
        lang === 'es'
          ? [
              'Revestimiento en piedra de isla & cubiertas de granito',
              'Remoción de muros divisorios de carga',
              'Conexiones especializadas de electrodomésticos de lujo',
            ]
          : [
              'Island stone refacing & bar tops',
              'Structural partition wall removal',
              'Luxury appliance staging & hookups',
            ],
    },
    {
      id: 'ceilings-lighting',
      title:
        lang === 'es'
          ? 'Cielos Arquitectónicos & Sistemas de Iluminación'
          : 'Architectural Ceilings & Lighting',
      location: 'Active Site // The Dominion',
      image: IMAGES.trayCeiling,
      desc:
        lang === 'es'
          ? 'Estructuración de cielos artesonados (tray ceilings) octogonales de alta gama, iluminación perimetral LED integrada en fosa, cableado de candelabros, dimmers inteligentes y acabado de yeso fino.'
          : 'High-end octagonal tray ceiling framing, integrated ambient LED cove lighting, pendant wiring, smart dimmer circuits, and precision drywall finishing.',
      deliverables:
        lang === 'es'
          ? [
              'Enmarcado de cielos escalonados multinivel',
              'Matrices de iluminación empotrada LED de alta eficiencia',
              'Acabados y texturas de tablaroca hechos a mano',
            ]
          : [
              'Multi-tier coffered & tray framing',
              'Recessed high-efficiency LED arrays',
              'Hand-textured drywall & trim profiles',
            ],
    },
    {
      id: 'bath-suites',
      title:
        lang === 'es'
          ? 'Baños Principales & Suites de Plomería de Lujo'
          : 'Luxury Bath & Plumbing Suites',
      location: 'Active Site // Alamo Heights',
      image: IMAGES.luxuryBath,
      desc:
        lang === 'es'
          ? 'Tocadores dobles personalizados, cubiertas de mármol y cuarzo, canceles de vidrio templado sin marco, sistemas de drenaje lineal y plomería certificada de desbaste y terminación.'
          : 'Custom double vanities, marble surface tops, frameless glass enclosures, linear drainage systems, and certified rough-in and finish plumbing.',
      deliverables:
        lang === 'es'
          ? [
              'Conversión a regaderas tipo walk-in sin escalón',
              'Tocadores dobles de grado ebanistería residencial',
              'Ensambles impermeables certificados Schluter/Wedi',
            ]
          : [
              'Zero-threshold walk-in shower conversions',
              'Dual-sink furniture-grade vanity sets',
              'Waterproof Schluter/Wedi assemblies',
            ],
    },
  ];

  return (
    <section id="services" className="w-full bg-[#16181D] py-16 lg:py-24 border-b border-[#2B2F38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase text-[#cc0000] font-semibold tracking-wider flex items-center gap-2">
              <span className="inline-block w-3 h-[2px] bg-[#cc0000]" />
              <span>{lang === 'es' ? 'Divisiones Principales & Alcance' : 'Core Divisions & Scopes'}</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#F5F4F0] uppercase tracking-tight">
              {lang === 'es'
                ? 'Capacidades de Construcción Especializada'
                : 'Specialized Contracting Capabilities'}
            </h2>
            <p className="font-['Work_Sans'] text-sm sm:text-base text-[#9E9E98] max-w-xl">
              {lang === 'es'
                ? 'Propuestas técnicas personalizadas para renovaciones residenciales, remodelación de mansiones y habilitación de locales comerciales.'
                : 'Custom proposals generated for residential transformations, luxury estate remodels, and commercial retail build-outs.'}
            </p>
          </div>

          <a
            href="#quote-consultation"
            className="inline-flex items-center gap-2 text-[#F5F4F0] font-['Space_Grotesk'] text-xs font-bold uppercase hover:text-[#cc0000] transition-colors py-2"
          >
            <span>
              {lang === 'es' ? 'Agendar inspección en terreno' : 'Schedule an on-site walkthrough'}
            </span>
            <ArrowUpRight className="w-4 h-4 text-[#cc0000]" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-[#1F2229] rounded-lg border border-[#2B2F38] overflow-hidden flex flex-col justify-between group hover:border-[#cc0000]/80 transition-all shadow-xl"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-[#121316]">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#16181D]/90 backdrop-blur px-2.5 py-1 rounded text-[#F5F4F0] font-mono text-[10px] border border-[#2B2F38] uppercase">
                    {s.location}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#F5F4F0] uppercase border-l-2 border-[#cc0000] pl-2.5">
                    {s.title}
                  </h3>
                  <p className="font-['Work_Sans'] text-xs text-[#9E9E98] leading-relaxed">
                    {s.desc}
                  </p>

                  <div className="pt-2">
                    <span className="font-mono text-[10px] text-[#9E9E98] block uppercase mb-1.5 font-bold">
                      {lang === 'es' ? 'Entregables Clave:' : 'Key Deliverables:'}
                    </span>
                    <ul className="text-[#F5F4F0] font-['Work_Sans'] text-xs space-y-1.5">
                      {s.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#cc0000] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectService(s.title)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#16181D] hover:bg-[#cc0000] hover:text-[#F5F4F0] text-[#F5F4F0] font-['Space_Grotesk'] font-bold text-xs uppercase py-2.5 rounded border border-[#2B2F38] transition-colors"
                >
                  <span>{lang === 'es' ? 'Evaluar este proyecto' : 'Request Scope Evaluation'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial banner */}
        <div className="mt-10 p-5 rounded-lg bg-[#121316] border border-[#2B2F38] flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-[#1F2229] border border-[#2B2F38] flex items-center justify-center text-[#D4AF37] shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <div className="font-['Space_Grotesk'] font-bold text-xs uppercase text-[#F5F4F0]">
                {lang === 'es'
                  ? 'División Comercial & Estructural'
                  : 'Commercial & Structural Division'}
              </div>
              <p className="font-['Work_Sans'] text-xs text-[#9E9E98]">
                {lang === 'es'
                  ? 'Estructura metálica (metal stud framing), cielo acústico modular, remodelación de oficinas y naves, demolición integral con retiro inmediato.'
                  : 'Steel stud framing, acoustic ceiling tiles, commercial tenant improvements, and full demolition & haul-off services.'}
              </p>
            </div>
          </div>
          <a
            href="#quote-consultation"
            className="font-mono text-xs text-[#cc0000] uppercase hover:text-[#E60000] underline flex items-center gap-1 shrink-0 font-bold"
          >
            {lang === 'es' ? 'ENVIAR ESPECIFICACIONES RFP COMERCIAL →' : 'SUBMIT COMMERCIAL RFP SPECS →'}
          </a>
        </div>
      </div>
    </section>
  );
};
