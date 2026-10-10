import React from 'react';
import { Compass, Layers, Shield, FileSpreadsheet, Check } from 'lucide-react';

interface ValuePillarsProps {
  lang?: 'en' | 'es';
}

export const ValuePillars: React.FC<ValuePillarsProps> = ({ lang = 'es' }) => {
  const pillars = [
    {
      num: '01',
      title: lang === 'es' ? 'Exigencias Arquitectónicas Únicas' : 'Unique Architectural Demands',
      desc:
        lang === 'es'
          ? 'Desde cimientos en roca caliza de San Antonio hasta bóvedas de cielo octogonales y vigas de carga, cada huella estructural exige cálculos a medida.'
          : 'From San Antonio limestone foundations to octagonal tray ceiling vaults and load-bearing alterations, each structural footprint requires custom calculations.',
      footer: lang === 'es' ? 'Cero suposiciones estructurales' : 'Zero structural assumptions',
      icon: Compass,
    },
    {
      num: '02',
      title: lang === 'es' ? 'Adquisición de Materiales Selectos' : 'Custom Material Sourcing',
      desc:
        lang === 'es'
          ? 'Especificamos granitos naturales seleccionados a mano, azulejos artesanales, acero comercial y carpintería de diseño ajustada a tu visión real.'
          : 'We spec hand-selected natural granites, artisan tiles, commercial steel, and architectural millwork matched exactly to client vision rather than pre-packaged contractor bundles.',
      footer: lang === 'es' ? 'Relaciones directas con canteras y distribuidores' : 'Direct supplier relationships',
      icon: Layers,
    },
    {
      num: '03',
      title: lang === 'es' ? 'Preparación y Protección del Sitio' : 'Precision Site Prep & Protection',
      desc:
        lang === 'es'
          ? 'Presupuestamos nivelación de contrapisos, barreras de vapor y protección de pisos pesada (X-Board) para que tus áreas habitables permanezcan impecables.'
          : 'We budget for meticulous substrate leveling, moisture barrier compliance, and commercial grade floor protection (X-Board) so existing living areas stay pristine.',
      footer: lang === 'es' ? 'Contención total de polvo y áreas limpias' : 'Complete site containment',
      icon: Shield,
    },
    {
      num: '04',
      title: lang === 'es' ? 'Desglose Ítem por Ítem Transparente' : 'Transparent Line-Item Breakdown',
      desc:
        lang === 'es'
          ? 'Cada propuesta desglosa mano de obra, hitos de permisos de San Antonio, materiales brutos y acarreo de escombros en remolque propio sin sorpresas.'
          : 'Every bid articulates labor stages, permit milestones, raw materials, and haul-away provisions. You review an honest, enforceable engineering contract with zero hidden fees.',
      footer: lang === 'es' ? 'Facturación por etapas verificadas' : 'Itemized milestone invoicing',
      icon: FileSpreadsheet,
    },
  ];

  return (
    <section id="why-choose-us" className="w-full bg-[#121316] py-16 lg:py-24 border-b border-[#2B2F38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-2">
            <div className="font-mono text-xs uppercase text-[#cc0000] font-semibold tracking-wider flex items-center gap-2">
              <span className="inline-block w-3 h-[2px] bg-[#cc0000]" />
              <span>
                {lang === 'es' ? 'Protocolo de Ingeniería y Precisión' : 'Precision Engineering Protocol'}
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#F5F4F0] uppercase tracking-tight">
              {lang === 'es'
                ? 'Por Qué Ofrecemos Cotizaciones a Medida y No Tarifas Planas'
                : 'Why We Provide Customized Quotes, Not Flat Rates'}
            </h2>
            <p className="font-['Work_Sans'] text-sm sm:text-base text-[#9E9E98] leading-relaxed">
              {lang === 'es'
                ? 'Los precios prefabricados generan sobrecostos imprevistos o mano de obra comprometida. En Scorpion, cada presupuesto se calcula analizando la física estructural real, estabilidad del contrapiso y especificaciones del propietario.'
                : 'Cookie-cutter pricing creates surprise change orders or compromised craft. At Scorpion, every bid is calculated after examining real structural physics, substrate stability, and owner specifications.'}
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end">
            <span className="font-mono text-4xl font-bold text-[#9E9E98]/20">01 — 04</span>
            <span className="font-mono text-[10px] text-[#9E9E98] uppercase">
              {lang === 'es' ? 'ESTÁNDAR DE ESTIMACIÓN TÉCNICA' : 'ENGINEERED ESTIMATION STANDARD'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="bg-[#16181D] p-6 rounded-lg border border-[#2B2F38] hover:border-[#cc0000]/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded bg-[#1F2229] border border-[#2B2F38] flex items-center justify-center text-[#cc0000] mb-5 group-hover:bg-[#cc0000] group-hover:text-[#F5F4F0] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-mono text-[11px] text-[#9E9E98] uppercase mb-1">
                    {lang === 'es' ? 'Pilar' : 'Pillar'} {p.num}
                  </div>
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#F5F4F0] uppercase mb-2">
                    {p.title}
                  </h3>
                  <p className="font-['Work_Sans'] text-xs text-[#9E9E98] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-[#2B2F38] font-mono text-[11px] text-[#9E9E98] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                  <span>{p.footer}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
