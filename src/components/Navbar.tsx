import React, { useState } from 'react';
import { ScorpionLogo } from './ScorpionLogo';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../data/mockData';
import {
  MapPin,
  ShieldCheck,
  Phone,
  Globe,
  User,
  Menu,
  X,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

interface NavbarProps {
  onOpenPortal: () => void;
  currentUser: string | null;
  currentView: 'public' | 'dashboard';
  onToggleView: (view: 'public' | 'dashboard') => void;
  lang: 'en' | 'es';
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPortal,
  currentUser,
  currentView,
  onToggleView,
  lang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: lang === 'es' ? 'Servicios' : 'Services', href: '#services' },
    { label: lang === 'es' ? 'Proyectos' : 'Our Work', href: '#job-portfolio' },
    { label: lang === 'es' ? 'Por Qué Nosotros' : 'Why Choose Us', href: '#why-choose-us' },
    { label: lang === 'es' ? 'Testimonios' : 'Client Reviews', href: '#reviews' },
    { label: lang === 'es' ? 'Cotizar Gratis' : 'Request Free Estimate', href: '#quote-consultation' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentView === 'dashboard') {
      onToggleView('public');
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#121316]/95 backdrop-blur-md border-b border-[#2B2F38]">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#16181D] border-b border-[#2B2F38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-[#9E9E98] font-mono text-[11px] sm:text-xs">
          {/* Location & License */}
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <span className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#cc0000] shrink-0" />
              <span className="truncate">
                {lang === 'es'
                  ? 'San Antonio & Texas Hill Country'
                  : 'Serving Greater San Antonio & Hill Country'}
              </span>
            </span>
            <span className="text-[#2B2F38] hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-[#22C55E]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Con Licencia & Seguro $5M' : 'Licensed & Insured'}</span>
            </span>
          </div>

          {/* Contact & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* WhatsApp Direct */}
            <a
              href={`https://wa.me/${COMPANY_PHONE_RAW}?text=Hola%20Scorpion%20Performance%2C%20quisiera%20solicitar%20un%20presupuesto`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F4F0] hover:text-[#25D366] transition-colors flex items-center gap-1 text-[11px]"
              title="WhatsApp: +1 (210) 209-2190"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="font-semibold hidden xs:inline">WhatsApp</span>
            </a>

            <span className="text-[#2B2F38] hidden sm:inline">|</span>

            {/* Direct Phone */}
            <a
              className="text-[#F5F4F0] hover:text-[#ffb4a8] transition-colors flex items-center gap-1 text-[11px] font-mono"
              href={`tel:${COMPANY_PHONE_RAW}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#cc0000]" />
              <span>{COMPANY_PHONE}</span>
            </a>

            <span className="text-[#2B2F38]">|</span>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-[#1F2229] hover:bg-[#292a2d] text-[#F5F4F0] font-mono border border-[#2B2F38] transition-colors"
              title="Cambiar idioma / Switch Language"
            >
              <Globe className="w-3 h-3 text-[#D4AF37]" />
              <span>{lang === 'es' ? 'ESPAÑOL' : 'ENGLISH'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Row */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          className="cursor-pointer"
          onClick={() => {
            if (currentView === 'dashboard') onToggleView('public');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <ScorpionLogo size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#9E9E98] hover:text-[#F5F4F0] transition-colors py-2 relative group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#cc0000] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Portal & Operator CTA */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleView(currentView === 'dashboard' ? 'public' : 'dashboard')}
                className="inline-flex items-center gap-2 bg-[#1F2229] hover:bg-[#292a2d] text-[#F5F4F0] font-['Space_Grotesk'] font-bold text-xs uppercase px-3.5 py-2 rounded border border-[#2B2F38] hover:border-[#cc0000] transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span>{currentView === 'dashboard' ? (lang === 'es' ? 'Ver Sitio Web' : 'Public Site') : (lang === 'es' ? 'Panel de Ricardo' : 'Ricardo Terminal')}</span>
              </button>
              <div
                className="w-9 h-9 rounded-full bg-[#cc0000] flex items-center justify-center text-[#F5F4F0] shadow-md border border-[#ffb4a8]/30 font-bold text-xs"
                title={`Administrador: ${currentUser}`}
              >
                RM
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenPortal}
                className="inline-flex items-center justify-center bg-[#cc0000] hover:bg-[#E60000] text-[#F5F4F0] font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-all shadow-md shadow-red-950/40 border border-[#cc0000]/40"
              >
                <span>{lang === 'es' ? 'Portal Admin' : 'Portal'}</span>
              </button>
              <button
                onClick={onOpenPortal}
                className="w-8 h-8 rounded-full bg-[#1F2229] hover:bg-[#292a2d] border border-[#2B2F38] flex items-center justify-center text-[#9E9E98] hover:text-[#F5F4F0] transition-colors"
                title="Acceso de Ricardo"
              >
                <User className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded bg-[#1F2229] text-[#F5F4F0] hover:bg-[#292a2d] transition-colors"
            title="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#16181D] border-b border-[#2B2F38] px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left py-2 px-3 rounded hover:bg-[#1F2229] font-['Space_Grotesk'] font-bold text-xs uppercase text-[#F5F4F0]"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#2B2F38] flex items-center justify-between">
            <a
              href={`https://wa.me/${COMPANY_PHONE_RAW}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-[#25D366]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Directo ({COMPANY_PHONE})</span>
            </a>
            <button
              onClick={onOpenPortal}
              className="text-xs font-mono text-[#cc0000] underline uppercase font-bold"
            >
              {currentUser ? 'Ir al Panel' : 'Login Admin'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
