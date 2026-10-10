import React from 'react';
import { IMAGES, COMPANY_PHONE_RAW } from '../data/mockData';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Gavel,
  Truck,
  Images,
  MessageCircle,
} from 'lucide-react';

interface HeroSectionProps {
  onQuoteClick: () => void;
  onGalleryClick: () => void;
  lang?: 'en' | 'es';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onQuoteClick,
  onGalleryClick,
  lang = 'es',
}) => {
  return (
    <section className="relative w-full bg-[#16181D] overflow-hidden border-b border-[#2B2F38]">
      {/* Subtle structural grid background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#2B2F38 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Prop & Authority */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#1F2229] text-[#9E9E98] font-mono text-xs border border-[#2B2F38]">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[#F5F4F0] uppercase font-bold tracking-wide">
                {lang === 'es'
                  ? 'Operaciones en Condado de Bexar & Texas Hill Country'
                  : 'Bexar County & Texas Hill Country Operations'}
              </span>
            </div>

            <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#F5F4F0] leading-[1.08]">
              {lang === 'es' ? (
                <>
                  Contratistas Comerciales y Residenciales en{' '}
                  <span className="text-[#cc0000]">San Antonio, TX</span>
                </>
              ) : (
                <>
                  Premier Commercial & Residential Contractors in{' '}
                  <span className="text-[#cc0000]">San Antonio, TX</span>
                </>
              )}
            </h1>

            <p className="font-['Work_Sans'] text-base sm:text-lg text-[#9E9E98] max-w-2xl leading-relaxed">
              {lang === 'es'
                ? 'Remodelaciones de alto nivel, enmarcado estructural (framing), demolición controlada, acabados de lujo y gestión integral de obra. Cada proyecto es único: calculamos presupuestos personalizados según tus planos arquitectónicos, condiciones del terreno y cronograma.'
                : 'Bespoke remodeling, structural framing, demolition, luxury finishes, and turnkey construction management. Every project is unique—custom quotes engineered specifically to your architectural blueprint, site conditions, and timeline.'}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-1 text-[#9E9E98] font-mono text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 text-[#F5F4F0]">
                <ShieldCheck className="w-4 h-4 text-[#cc0000]" />
                <span>{lang === 'es' ? 'Sin tarifas genéricas infladas' : 'No generic flat rates'}</span>
              </span>
              <span className="text-[#2B2F38] hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 text-[#F5F4F0]">
                <CheckCircle className="w-4 h-4 text-[#cc0000]" />
                <span>{lang === 'es' ? 'Inspección técnica en sitio' : 'On-site comprehensive assessment'}</span>
              </span>
              <span className="text-[#2B2F38] hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 text-[#F5F4F0]">
                <Gavel className="w-4 h-4 text-[#cc0000]" />
                <span>{lang === 'es' ? 'Licencia & Seguro en Texas' : 'Licensed & Insured in Bexar Co.'}</span>
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 bg-[#cc0000] hover:bg-[#E60000] text-[#F5F4F0] font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider px-6 py-4 rounded transition-all shadow-lg shadow-red-950/40"
              >
                <span>
                  {lang === 'es'
                    ? 'Solicitar Cotización Personalizada'
                    : 'Request Custom Quote / On-Site Estimate'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGalleryClick}
                className="inline-flex items-center justify-center gap-2 bg-[#1F2229] hover:bg-[#292a2d] text-[#F5F4F0] font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider px-6 py-4 rounded border border-[#2B2F38] hover:border-[#cc0000] transition-all"
              >
                <Images className="w-4 h-4 text-[#9E9E98]" />
                <span>{lang === 'es' ? 'Ver Galería de Obras' : 'Explore Project Gallery'}</span>
              </button>

              <a
                href={`https://wa.me/${COMPANY_PHONE_RAW}?text=Hola%20Ricardo%2C%20quiero%20cotizar%20un%20proyecto%20de%20construcción%2Fremodelación`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider px-4 py-4 rounded border border-[#25D366]/40 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="pt-2 flex items-center gap-3 text-[#9E9E98] font-mono text-xs">
              <span className="text-[#22C55E] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                {lang === 'es' ? 'DESPACHO ACTIVO' : 'ACTIVE DISPATCH'}
              </span>
              <span>
                {lang === 'es'
                  ? 'Camiones de carga y remolques de demolición desplegados en North Loop 1604, I-10 & HWY 281'
                  : 'Commercial rigs & staging trailers staged across North Loop 1604, I-10 & HWY 281'}
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Rigs Showcase */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative bg-[#1F2229] rounded-lg border border-[#2B2F38] overflow-hidden shadow-2xl group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#121316]">
                <img
                  src={IMAGES.fleetTruck}
                  alt="Scorpion Performance Rig and Hauling Fleet On-Site San Antonio"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-80" />
              </div>

              {/* Heavy Rig Badge overlay */}
              <div className="p-5 bg-[#16181D] border-t border-[#2B2F38] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#cc0000] font-bold flex items-center gap-1.5">
                    <Truck className="w-4 h-4" />
                    <span>FIELD UNIT #04 // DEPLOYED</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#1F2229] text-[#9E9E98] font-mono text-[10px] border border-[#2B2F38] uppercase">
                    {lang === 'es' ? 'DEMOLICIÓN & LOGÍSTICA' : 'HEAVY DEMO & STAGING'}
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#F5F4F0] uppercase">
                  {lang === 'es'
                    ? 'Flota Propia Lista en San Antonio'
                    : 'Fleet & Operations Ready Across Greater San Antonio'}
                </h3>
                <p className="font-['Work_Sans'] text-xs text-[#9E9E98] leading-relaxed">
                  {lang === 'es'
                    ? 'Movilización directa equipada con remolques de volteo (dump trailers), mantas de protección de superficies X-Board y equipo estructural para un inicio de obra inmediato.'
                    : 'Direct mobilization equipped with dump trailers, surface protection gear, and high-spec structural equipment for prompt job commencement.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
