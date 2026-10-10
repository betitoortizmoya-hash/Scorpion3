import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../data/mockData';

interface WhatsAppButtonProps {
  lang?: 'en' | 'es';
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ lang = 'es' }) => {
  const defaultMessage =
    lang === 'es'
      ? 'Hola Ricardo, me comunico desde la página web de Scorpion Performance Contractors para cotizar un proyecto.'
      : 'Hello Ricardo, I am contacting you from the Scorpion Performance Contractors website for a project quote.';

  const waUrl = `https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Tooltip / Badge */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16181D] border border-[#2B2F38] shadow-xl text-xs font-mono text-[#F5F4F0] opacity-90 group-hover:opacity-100 transition-opacity">
        <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
        <span>WhatsApp: {COMPANY_PHONE}</span>
      </div>

      {/* Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl shadow-green-950/50 hover:scale-105 active:scale-95 transition-all"
        title="Chat on WhatsApp +1 (210) 209-2190"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wide">
          {lang === 'es' ? 'WhatsApp Directo' : 'WhatsApp Us'}
        </span>
      </a>
    </div>
  );
};
