import React, { useState, useEffect } from 'react';
import { QuoteRequest } from './types';
import { INITIAL_QUOTES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ValuePillars } from './components/ValuePillars';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { PortfolioGrid } from './components/PortfolioGrid';
import { QuoteConsultationForm } from './components/QuoteConsultationForm';
import { ServiceAreasFooter } from './components/ServiceAreasFooter';
import { ContractorDashboard } from './components/ContractorDashboard';
import { LoginModal } from './components/LoginModal';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem('scorpion_user') || null;
  });

  const [currentView, setCurrentView] = useState<'public' | 'dashboard'>('public');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'es'>('es');
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('scorpion_quotes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_QUOTES;
      }
    }
    return INITIAL_QUOTES;
  });

  useEffect(() => {
    localStorage.setItem('scorpion_quotes', JSON.stringify(quotes));
  }, [quotes]);

  const handleLoginSuccess = (user: string) => {
    setCurrentUser(user);
    localStorage.setItem('scorpion_user', user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('scorpion_user');
    setCurrentView('public');
  };

  const handleOpenPortal = () => {
    if (currentUser) {
      setCurrentView('dashboard');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleNewQuoteSubmitted = (newQuote: QuoteRequest) => {
    setQuotes((prev) => [newQuote, ...prev]);
  };

  const scrollToQuote = () => {
    const el = document.getElementById('quote-consultation');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('job-portfolio');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForQuote(serviceName);
    scrollToQuote();
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#e3e2e6] selection:bg-[#cc0000] selection:text-[#F5F4F0] flex flex-col font-['Work_Sans',sans-serif]">
      {/* If Ricardo is viewing the Operations Terminal */}
      {currentView === 'dashboard' && currentUser ? (
        <ContractorDashboard
          onBackToPublic={() => setCurrentView('public')}
          onLogout={handleLogout}
          quotes={quotes}
          onUpdateQuotes={setQuotes}
          lang={lang}
        />
      ) : (
        /* Public Facing Contractor Website */
        <div className="flex flex-col min-h-screen">
          <Navbar
            onOpenPortal={handleOpenPortal}
            currentUser={currentUser}
            currentView={currentView}
            onToggleView={(view) => {
              if (view === 'dashboard' && !currentUser) {
                setIsLoginModalOpen(true);
              } else {
                setCurrentView(view);
              }
            }}
            lang={lang}
            onToggleLang={() => setLang(lang === 'es' ? 'en' : 'es')}
          />

          <main className="w-full pt-28 bg-[#121316] flex-1">
            <HeroSection
              onQuoteClick={scrollToQuote}
              onGalleryClick={scrollToPortfolio}
              lang={lang}
            />

            <ValuePillars lang={lang} />

            <CapabilitiesSection
              onSelectService={handleSelectService}
              lang={lang}
            />

            <PortfolioGrid lang={lang} />

            <QuoteConsultationForm
              onNewQuoteSubmitted={handleNewQuoteSubmitted}
              initialScope={selectedServiceForQuote}
              lang={lang}
            />

            <ServiceAreasFooter
              onOpenPortal={handleOpenPortal}
              lang={lang}
            />
          </main>

          <WhatsAppButton lang={lang} />
        </div>
      )}

      {/* Admin Login Modal for Ricardo */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        lang={lang}
      />
    </div>
  );
}
