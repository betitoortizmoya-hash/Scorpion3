import React from 'react';
import { ScorpionLogo } from './ScorpionLogo';
import { COMPANY_PHONE, COMPANY_PHONE_RAW, COMPANY_EMAIL, COMPANY_ADDRESS } from '../data/mockData';
import {
  ShieldCheck,
  Award,
  Star,
  Languages,
  Phone,
  Mail,
  MapPin,
  KeyRound,
  Hammer,
  Radio,
  MessageCircle,
} from 'lucide-react';

interface ServiceAreasFooterProps {
  onOpenPortal: () => void;
  lang?: 'en' | 'es';
}

export const ServiceAreasFooter: React.FC<ServiceAreasFooterProps> = ({
  onOpenPortal,
  lang = 'es',
}) => {
  const corridors = [
    { name: 'Stone Oak', zip: '78258 / 78260' },
    { name: 'The Dominion', zip: '78257' },
    { name: 'Alamo Heights', zip: '78209' },
    { name: 'Boerne', zip: '78006 / 78015' },
    { name: 'Helotes', zip: '78023' },
    { name: 'Timberwood', zip: '78260' },
    { name: 'Schertz / Cibolo', zip: '78154 / 78108' },
    { name: 'Downtown SA', zip: '78201 / 78205' },
  ];

  const credentials = [
    {
      title: 'OSHA 30 Compliant',
      desc: lang === 'es' ? 'Seguridad estricta e higiene de obra' : 'Strict job safety & site hygiene',
      icon: ShieldCheck,
    },
    {
      title: 'TX GC Registered',
      desc: lang === 'es' ? 'Afianzado & Póliza Sombrilla de $5M' : 'Bonded & $5M umbrella coverage',
      icon: Award,
    },
    {
      title: '5-Star Track Record',
      desc: lang === 'es' ? 'Clientes verificados en San Antonio' : 'Verified San Antonio clientele',
      icon: Star,
    },
    {
      title: 'Bilingual Crew',
      desc: lang === 'es' ? 'Atención fluida en Español e Inglés' : 'Direct English & Español support',
      icon: Languages,
    },
  ];

  return (
    <>
      {/* SAN ANTONIO SERVICE AREAS & FIELD CREDENTIALS */}
      <section className="w-full bg-[#121316] py-16 border-b border-[#2B2F38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top: Service Regions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase text-[#F5F4F0] border-l-2 border-[#cc0000] pl-2.5">
                {lang === 'es'
                  ? 'Corredores de Servicio Prioritarios en el Condado de Bexar y Hill Country'
                  : 'Priority Bexar County & Hill Country Service Corridors'}
              </h3>
              <span className="font-mono text-xs text-[#9E9E98] hidden sm:inline">
                SAN ANTONIO METRO HUB
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {corridors.map((c) => (
                <div
                  key={c.name}
                  className="bg-[#16181D] p-3 rounded-lg border border-[#2B2F38] text-center hover:border-[#cc0000] transition-colors"
                >
                  <span className="font-mono text-xs text-[#F5F4F0] block font-bold truncate">
                    {c.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#9E9E98] block mt-0.5">{c.zip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-[#2B2F38]">
            {credentials.map((cred, idx) => {
              const Icon = cred.icon;
              return (
                <div key={idx} className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-[#16181D] border border-[#2B2F38] flex items-center justify-center text-[#cc0000] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-['Space_Grotesk'] text-xs font-bold uppercase text-[#F5F4F0]">
                      {cred.title}
                    </div>
                    <div className="font-['Work_Sans'] text-xs text-[#9E9E98]">{cred.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUICK CONTRACTOR PORTAL ACCESS & DIRECT HOTLINE BANNER */}
      <section className="w-full bg-[#0d0e11] py-10 border-b border-[#2B2F38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#16181D] border border-[#2B2F38] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#1F2229] border border-[#2B2F38] flex items-center justify-center text-[#cc0000] shrink-0">
                <Hammer className="w-6 h-6" />
              </div>
              <div>
                <div className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#F5F4F0] uppercase">
                  {lang === 'es'
                    ? 'Portal de Despacho & Terminal de Contratistas'
                    : 'Contractor & Subcontractor Staging Portal'}
                </div>
                <p className="font-['Work_Sans'] text-xs text-[#9E9E98] mt-0.5">
                  {lang === 'es'
                    ? 'Subcontratistas, proveedores y equipo de campo: ingresa para revisar asignaciones de obra y expedientes de despacho.'
                    : 'Subcontractors, material distributors, and commercial trades: sign in to review staging assignments and site dispatch packets.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                className="inline-flex items-center gap-2 text-[#F5F4F0] hover:text-[#ffb4a8] transition-colors font-mono text-xs px-3 py-2 bg-[#1F2229] rounded border border-[#2B2F38]"
                href={`tel:${COMPANY_PHONE_RAW}`}
              >
                <Phone className="w-3.5 h-3.5 text-[#cc0000]" />
                <span>{COMPANY_PHONE}</span>
              </a>

              <a
                className="inline-flex items-center gap-2 text-white bg-[#25D366] hover:bg-[#20ba59] transition-colors font-mono text-xs px-3.5 py-2 rounded shadow-md"
                href={`https://wa.me/${COMPANY_PHONE_RAW}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={onOpenPortal}
                className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#E60000] text-[#F5F4F0] font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors shrink-0 shadow-md"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'Acceder al Portal' : 'Access Portal'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#0d0e11] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <ScorpionLogo size="md" />
              <p className="font-['Work_Sans'] text-xs text-[#9E9E98] leading-relaxed">
                {lang === 'es'
                  ? 'Confiabilidad estructural comercial, ejecución institucional y artesanía en mansiones y fincas de San Antonio.'
                  : 'Commercial-grade structural reliability, institutional execution, and residential estate craftsmanship engineered across San Antonio.'}
              </p>
              <div className="flex items-center gap-2 font-mono text-xs text-[#22C55E]">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>
                  {lang === 'es' ? 'CUADRILLAS ACTIVAS EN SAN ANTONIO' : 'FIELD CREWS ACTIVE IN GREATER SA'}
                </span>
              </div>
            </div>

            {/* Column 2: Coverage Areas */}
            <div>
              <h4 className="font-['Space_Grotesk'] text-xs font-bold uppercase text-[#F5F4F0] border-l-2 border-[#cc0000] pl-2 mb-4">
                {lang === 'es' ? 'Zonas de Cobertura' : 'Coverage Areas'}
              </h4>
              <ul className="font-['Work_Sans'] text-xs text-[#9E9E98] space-y-2">
                <li>Stone Oak & Sonterra</li>
                <li>Alamo Heights & Terrell Hills</li>
                <li>Boerne & Fair Oaks Ranch</li>
                <li>Helotes & Grey Forest</li>
                <li>New Braunfels & Schertz</li>
                <li>The Dominion & La Cantera</li>
              </ul>
            </div>

            {/* Column 3: Field Credentials */}
            <div>
              <h4 className="font-['Space_Grotesk'] text-xs font-bold uppercase text-[#F5F4F0] border-l-2 border-[#cc0000] pl-2 mb-4">
                {lang === 'es' ? 'Credenciales Técnicas' : 'Field Credentials'}
              </h4>
              <div className="font-['Work_Sans'] text-xs text-[#9E9E98] space-y-2">
                <p>
                  <span className="text-[#F5F4F0] font-medium">TX Reg Contractor:</span>{' '}
                  <span className="font-mono text-[#D4AF37]">#TX-48912 / #TX-884029-C</span>
                </p>
                <p>
                  <span className="text-[#F5F4F0] font-medium">Póliza Sombrilla:</span> $5,000,000 Comercial
                </p>
                <p>
                  <span className="text-[#F5F4F0] font-medium">Horario de Campo:</span> Lun-Vie: 06:30 - 18:00
                </p>
                <div className="pt-2">
                  <span className="inline-block px-2.5 py-1 bg-[#1F2229] border border-[#2B2F38] rounded font-mono text-[10px] text-[#F5F4F0]">
                    SE HABLA ESPAÑOL // BILINGUAL SUPPORT
                  </span>
                </div>
              </div>
            </div>

            {/* Column 4: Direct Channels */}
            <div>
              <h4 className="font-['Space_Grotesk'] text-xs font-bold uppercase text-[#F5F4F0] border-l-2 border-[#cc0000] pl-2 mb-4">
                {lang === 'es' ? 'Canales Directos' : 'Direct Channels'}
              </h4>
              <div className="space-y-2.5 font-mono text-xs text-[#9E9E98]">
                <a
                  href={`tel:${COMPANY_PHONE_RAW}`}
                  className="flex items-center gap-2 text-[#F5F4F0] hover:text-[#ffb4a8] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#cc0000]" />
                  <span>{COMPANY_PHONE}</span>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_PHONE_RAW}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp: {COMPANY_PHONE}</span>
                </a>

                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="flex items-center gap-2 hover:text-[#F5F4F0] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#cc0000]" />
                  <span>{COMPANY_EMAIL}</span>
                </a>

                <div className="flex items-start gap-2 pt-2 text-[#9E9E98]">
                  <MapPin className="w-3.5 h-3.5 text-[#cc0000] shrink-0 mt-0.5" />
                  <p className="font-['Work_Sans'] text-xs">
                    Base de Operaciones & Patio de Maquinaria:
                    <br />
                    {COMPANY_ADDRESS}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#2B2F38] flex flex-col md:flex-row items-center justify-between gap-4 text-[#9E9E98] font-mono text-[11px]">
            <div>© 2025-2026 SCORPION PERFORMANCE CONTRACTORS LLC. ALL RIGHTS RESERVED.</div>
            <div className="flex items-center gap-6">
              <a href="#services" className="hover:text-[#F5F4F0] transition-colors uppercase">
                {lang === 'es' ? 'Servicios' : 'Services'}
              </a>
              <a href="#job-portfolio" className="hover:text-[#F5F4F0] transition-colors uppercase">
                {lang === 'es' ? 'Galería' : 'Project Gallery'}
              </a>
              <button
                onClick={onOpenPortal}
                className="hover:text-[#cc0000] transition-colors uppercase font-bold"
              >
                {lang === 'es' ? 'Acceso Operaciones' : 'Operations Login'}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
