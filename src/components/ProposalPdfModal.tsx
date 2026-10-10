import React from 'react';
import { ScorpionLogo } from './ScorpionLogo';
import { COMPANY_PHONE, COMPANY_PHONE_RAW, COMPANY_EMAIL, COMPANY_ADDRESS, GC_LICENSE } from '../data/mockData';
import { Printer, Download, MessageCircle, X, Check, ShieldCheck } from 'lucide-react';

interface ProposalData {
  proposalId: string;
  clientName: string;
  projectTitle: string;
  timeline: string;
  laborSubtotal: number;
  carpenterHours: number;
  laborHours: number;
  techHours: number;
  haulingSubtotal: number;
  dumpRuns: number;
  dustProtectionType: string;
  dumpFees: number;
  matSubtotal: number;
  matLumber: number;
  matFixtures: number;
  matHardware: number;
  overhead: number;
  grandTotal: number;
}

interface ProposalPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: ProposalData;
  lang?: 'en' | 'es';
}

export const ProposalPdfModal: React.FC<ProposalPdfModalProps> = ({
  isOpen,
  onClose,
  proposal,
  lang = 'es',
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppSend = () => {
    const text = `Hola ${proposal.clientName}, adjunto la propuesta oficial de Scorpion Performance Contractors para el proyecto "${proposal.projectTitle}" (Folio: ${proposal.proposalId}). Monto Total Estimado: $${proposal.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD. Ricardo Menchaca, Contratista General. WhatsApp: ${COMPANY_PHONE}`;
    window.open(`https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#16181D] border border-[#2B2F38] rounded-xl shadow-2xl flex flex-col my-auto max-h-[95vh] overflow-hidden">
        {/* Top Action Bar (hidden in print) */}
        <div className="no-print bg-[#1F2229] border-b border-[#2B2F38] px-6 py-3.5 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-[#F5F4F0]">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span>
              {lang === 'es' ? 'Vista Previa de Propuesta Oficial PDF' : 'Official PDF Proposal Preview'}:{' '}
              <strong className="text-[#D4AF37]">{proposal.proposalId}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppSend}
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-['Space_Grotesk'] font-bold uppercase px-3.5 py-2 rounded shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{lang === 'es' ? 'Enviar WhatsApp' : 'Send WhatsApp'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-[#cc0000] hover:bg-[#E60000] text-white text-xs font-['Space_Grotesk'] font-bold uppercase px-4 py-2 rounded shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'es' ? 'Imprimir / Guardar PDF' : 'Print / Save PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#9E9E98] hover:text-[#F5F4F0] rounded hover:bg-[#292a2d] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div
          id="printable-proposal"
          className="p-6 sm:p-10 overflow-y-auto bg-white text-neutral-900 font-sans print:p-0 print:m-0"
        >
          {/* Header */}
          <div className="border-b-2 border-neutral-900 pb-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded bg-neutral-900 flex items-center justify-center p-1 text-white">
                <ScorpionLogo size="sm" showText={false} />
              </div>
              <div>
                <h1 className="text-xl font-extrabold uppercase tracking-tight text-neutral-950 font-['Space_Grotesk']">
                  Scorpion Performance Contractors LLC
                </h1>
                <p className="text-xs text-neutral-600 font-mono">
                  General Commercial & Residential Contractors • {GC_LICENSE}
                </p>
                <p className="text-xs text-neutral-600">
                  {COMPANY_ADDRESS} • Tel/WhatsApp: {COMPANY_PHONE}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right font-mono text-xs">
              <div className="bg-neutral-100 px-3 py-1.5 rounded border border-neutral-300">
                <p className="text-neutral-500 uppercase font-bold text-[10px]">Proposal Number</p>
                <p className="text-neutral-950 font-bold text-sm text-[#cc0000]">{proposal.proposalId}</p>
              </div>
              <p className="text-neutral-600 mt-1">Date: {todayStr}</p>
              <p className="text-neutral-600">Valid: 30 Business Days</p>
            </div>
          </div>

          {/* Client & Project Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-neutral-50 rounded border border-neutral-200 mb-6 text-xs">
            <div>
              <p className="text-neutral-400 font-mono uppercase font-bold text-[10px]">Prepared For</p>
              <p className="font-bold text-neutral-900 text-sm mt-0.5">{proposal.clientName}</p>
              <p className="text-neutral-600">San Antonio Metropolitan Area / Bexar County, TX</p>
              <p className="text-neutral-600 font-mono mt-1">Lead Field Contractor: Ricardo Menchaca</p>
            </div>
            <div>
              <p className="text-neutral-400 font-mono uppercase font-bold text-[10px]">Project Scope Title</p>
              <p className="font-bold text-neutral-900 text-sm mt-0.5">{proposal.projectTitle}</p>
              <p className="text-neutral-600 font-mono">Target Schedule: {proposal.timeline}</p>
              <p className="text-neutral-600">Standard Billing: 3 Milestone Draws (35% / 35% / 30%)</p>
            </div>
          </div>

          {/* Itemized Line Items Table */}
          <div className="space-y-4 mb-6">
            <h2 className="text-xs font-mono uppercase font-bold text-neutral-700 tracking-wider">
              Itemized Scope of Work Breakdown
            </h2>

            <div className="border border-neutral-200 rounded overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-neutral-900 text-white font-mono uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Division / Description</th>
                    <th className="py-2.5 px-4 text-center">Unit / Specs</th>
                    <th className="py-2.5 px-4 text-right">Amount (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 font-sans">
                  {/* Division 1: Labor */}
                  <tr className="bg-neutral-50 font-bold font-mono text-[11px]">
                    <td colSpan={2} className="py-2 px-4 text-neutral-900">
                      1. Skilled Labor & Specialty Craftsmen
                    </td>
                    <td className="py-2 px-4 text-right text-neutral-900">
                      ${proposal.laborSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-4 text-neutral-600 pl-8">
                      • Master Carpenter & Structural Lead ($95/hr)
                    </td>
                    <td className="py-1.5 px-4 text-center text-neutral-600 font-mono">{proposal.carpenterHours} hrs</td>
                    <td className="py-1.5 px-4 text-right text-neutral-800 font-mono">
                      ${(proposal.carpenterHours * 95).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-4 text-neutral-600 pl-8">
                      • Demolition & General Laborers ($55/hr)
                    </td>
                    <td className="py-1.5 px-4 text-center text-neutral-600 font-mono">{proposal.laborHours} hrs</td>
                    <td className="py-1.5 px-4 text-right text-neutral-800 font-mono">
                      ${(proposal.laborHours * 55).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-4 text-neutral-600 pl-8">
                      • Certified Electrician & Master Plumber ($120/hr)
                    </td>
                    <td className="py-1.5 px-4 text-center text-neutral-600 font-mono">{proposal.techHours} hrs</td>
                    <td className="py-1.5 px-4 text-right text-neutral-800 font-mono">
                      ${(proposal.techHours * 120).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>

                  {/* Division 2: Hauling & Demo */}
                  <tr className="bg-neutral-50 font-bold font-mono text-[11px]">
                    <td colSpan={2} className="py-2 px-4 text-neutral-900">
                      2. Debris Containment, Fleet Hauling & Landfill Fees
                    </td>
                    <td className="py-2 px-4 text-right text-neutral-900">
                      ${proposal.haulingSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-4 text-neutral-600 pl-8">
                      • Ram HD Dumpster Trailer Runs ($450/run to landfill)
                    </td>
                    <td className="py-1.5 px-4 text-center text-neutral-600 font-mono">{proposal.dumpRuns} loads</td>
                    <td className="py-1.5 px-4 text-right text-neutral-800 font-mono">
                      ${(proposal.dumpRuns * 450).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-4 text-neutral-600 pl-8">
                      • Surface Protection (X-Board Floor Shield, ZipWall Dust Barrier)
                    </td>
                    <td className="py-1.5 px-4 text-center text-neutral-600 font-mono">Enclosure</td>
                    <td className="py-1.5 px-4 text-right text-neutral-800 font-mono">
                      ${(proposal.haulingSubtotal - (proposal.dumpRuns * 450) - proposal.dumpFees).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-4 text-neutral-600 pl-8">
                      • City of San Antonio Disposal & Waste Weigh Station Fees
                    </td>
                    <td className="py-1.5 px-4 text-center text-neutral-600 font-mono">Municipal</td>
                    <td className="py-1.5 px-4 text-right text-neutral-800 font-mono">
                      ${proposal.dumpFees.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>

                  {/* Division 3: Materials & Allowances */}
                  <tr className="bg-neutral-50 font-bold font-mono text-[11px]">
                    <td colSpan={2} className="py-2 px-4 text-neutral-900">
                      3. Specialty Construction Materials, Lumber & Fixtures Allowance
                    </td>
                    <td className="py-2 px-4 text-right text-neutral-900">
                      ${proposal.matSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-4 text-neutral-600 pl-8">
                      • Structural Lumber, Steel Studs & Drywall Supplies
                    </td>
                    <td className="py-1.5 px-4 text-center text-neutral-600 font-mono">Wholesale</td>
                    <td className="py-1.5 px-4 text-right text-neutral-800 font-mono">
                      ${proposal.matLumber.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-4 text-neutral-600 pl-8">
                      • Finish Tile, Stone Slab, Cabinetry & Luxury Fixtures Allowance
                    </td>
                    <td className="py-1.5 px-4 text-center text-neutral-600 font-mono">Client Choice</td>
                    <td className="py-1.5 px-4 text-right text-neutral-800 font-mono">
                      ${proposal.matFixtures.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-4 text-neutral-600 pl-8">
                      • Hardware, Commercial Fasteners, Adhesives & Sealants
                    </td>
                    <td className="py-1.5 px-4 text-center text-neutral-600 font-mono">Spec Grade</td>
                    <td className="py-1.5 px-4 text-right text-neutral-800 font-mono">
                      ${proposal.matHardware.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="flex justify-end mb-8">
            <div className="w-full sm:w-80 space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 text-neutral-600">
                <span>Direct Construction Costs:</span>
                <span className="font-bold text-neutral-900">
                  ${(proposal.laborSubtotal + proposal.haulingSubtotal + proposal.matSubtotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between py-1 text-neutral-600 border-b border-neutral-200 pb-2">
                <span>Contractor Overhead & Supervision (15%):</span>
                <span className="font-bold text-neutral-900">
                  ${proposal.overhead.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between py-2 text-sm bg-neutral-900 text-white px-3 rounded font-bold">
                <span className="uppercase">Grand Proposal Total:</span>
                <span className="text-[#ffb4a8]">
                  ${proposal.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                </span>
              </div>
            </div>
          </div>

          {/* Warranty & Signature */}
          <div className="pt-6 border-t border-neutral-300 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-neutral-600">
            <div>
              <p className="font-bold text-neutral-900 uppercase font-mono mb-1">Contractor Warranty & Guarantees</p>
              <ul className="space-y-1 list-disc list-inside text-[11px]">
                <li>1-Year Comprehensive Structural & Craftsmanship Warranty</li>
                <li>$5,000,000 Commercial Umbrella Liability Protection</li>
                <li>Zero change orders without prior signed client authorization</li>
              </ul>
            </div>

            <div className="flex flex-col justify-end">
              <div className="border-b border-neutral-400 pb-1 mb-1 font-['Space_Grotesk'] text-base italic font-bold text-neutral-900">
                Ricardo Menchaca
              </div>
              <p className="font-mono text-[10px] text-neutral-500 uppercase">
                Authorized Signatory: Ricardo Menchaca, General Contractor (Lic #TX-48912)
              </p>
              <p className="text-[10px] text-neutral-400">Scorpion Performance Contractors LLC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
