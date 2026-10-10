import React, { useState, useEffect } from 'react';
import { QuoteRequest, Appointment, FleetUnit } from '../types';
import {
  COMPANY_PHONE,
  COMPANY_PHONE_RAW,
  INITIAL_QUOTES,
  INITIAL_APPOINTMENTS,
  INITIAL_FLEET,
} from '../data/mockData';
import { ProposalPdfModal } from './ProposalPdfModal';
import { AiChangeOrderAgent } from './AiChangeOrderAgent';
import {
  SpaceIcon,
  FileText,
  Truck,
  ClipboardCheck,
  Radio,
  Bell,
  PlusCircle,
  TrendingUp,
  Inbox,
  Gauge,
  Clock,
  ArrowRight,
  Calendar,
  MapPin,
  Phone,
  Calculator,
  FileCheck,
  Send,
  AlertTriangle,
  User,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  Volume2,
  Sparkles,
  Bot,
} from 'lucide-react';

interface ContractorDashboardProps {
  onBackToPublic: () => void;
  onLogout: () => void;
  quotes: QuoteRequest[];
  onUpdateQuotes: (quotes: QuoteRequest[]) => void;
  lang?: 'en' | 'es';
}

export const ContractorDashboard: React.FC<ContractorDashboardProps> = ({
  onBackToPublic,
  onLogout,
  quotes,
  onUpdateQuotes,
  lang = 'es',
}) => {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'radar' | 'ai-agent' | 'estimates' | 'fleet' | 'inspections'>('radar');

  // Notifications drawer state
  const [showNotifications, setShowNotifications] = useState(false);

  // Radio ping animation/notification
  const [radioPingSuccess, setRadioPingSuccess] = useState<string | null>(null);

  // Selected appointment detail popover
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(INITIAL_APPOINTMENTS[2]); // Default Vance Alamo Hts

  // Filter for quote requests
  const [quoteFilter, setQuoteFilter] = useState<'all' | 'pending' | 'evaluation'>('all');

  // Estimate Calculator State
  const [proposalId, setProposalId] = useState('SC-PROP-1082');
  const [clientName, setClientName] = useState('Michael & Sarah Vance');
  const [projectTitle, setProjectTitle] = useState('Alamo Heights Kitchen Vault & Island Demo');
  const [timeline, setTimeline] = useState('2 - 3 Weeks (Standard Rush)');

  // Dynamic hours & rates
  const [carpenterHours, setCarpenterHours] = useState(48);
  const [laborHours, setLaborHours] = useState(64);
  const [techHours, setTechHours] = useState(24);

  // Hauling
  const [dumpRuns, setDumpRuns] = useState(3);
  const [dustProtectionCost, setDustProtectionCost] = useState(600);
  const [dumpFees, setDumpFees] = useState(480);

  // Materials
  const [matLumber, setMatLumber] = useState(3850);
  const [matFixtures, setMatFixtures] = useState(6500);
  const [matHardware, setMatHardware] = useState(980);

  // Formal PDF proposal modal state
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Status message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculations
  const laborSubtotal = carpenterHours * 95 + laborHours * 55 + techHours * 120;
  const haulingSubtotal = dumpRuns * 450 + dustProtectionCost + dumpFees;
  const matSubtotal = matLumber + matFixtures + matHardware;
  const directCosts = laborSubtotal + haulingSubtotal + matSubtotal;
  const overhead = directCosts * 0.15;
  const grandTotal = directCosts + overhead;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handlePingRadio = () => {
    // Simulated radio beep
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // High chirp
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      // Audio fallback
    }

    setRadioPingSuccess('RADIO DISPATCH ENVIADO: Cuadrilla Ram Unit #01 confirmó recepción en Alamo Heights (Canal 04)');
    setTimeout(() => setRadioPingSuccess(null), 5000);
  };

  const handlePrefillEstimate = (quote: QuoteRequest) => {
    setProposalId(`PROP-${quote.id}`);
    setClientName(quote.clientName);
    setProjectTitle(quote.title);
    document.getElementById('estimate-builder-section')?.scrollIntoView({ behavior: 'smooth' });
    showToast(`Datos de ${quote.clientName} cargados en la calculadora.`);
  };

  const handleScheduleVisit = (client: string, location: string) => {
    const newAppt: Appointment = {
      id: `apt-${Date.now()}`,
      day: 'Jue 07',
      dateStr: 'Nov 07',
      time: '11:00 AM',
      title: `Inspección Técnica // ${client}`,
      clientName: client,
      address: `${location}, San Antonio`,
      notes: `Visita agendada por Ricardo Menchaca para medición de vigas y cotización en sitio.`,
      status: 'Scheduled',
      phone: COMPANY_PHONE,
    };
    setSelectedAppt(newAppt);
    showToast(`Visita con ${client} programada en la agenda de Ricardo.`);
  };

  const handleSendWhatsAppProposal = () => {
    const msg = `Hola ${clientName}, Ricardo Menchaca de Scorpion Performance Contractors. Te comparto el presupuesto estimado para "${projectTitle}": Total $${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD (${timeline}). Quedo atento a tus comentarios al ${COMPANY_PHONE}.`;
    window.open(`https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleApplyFromAi = (data: {
    clientName: string;
    projectTitle: string;
    carpenterHours: number;
    laborHours: number;
    techHours: number;
    dumpRuns: number;
    matLumber: number;
    matFixtures: number;
    matHardware: number;
  }) => {
    setClientName(data.clientName);
    setProjectTitle(data.projectTitle);
    setCarpenterHours(data.carpenterHours);
    setLaborHours(data.laborHours);
    setTechHours(data.techHours);
    setDumpRuns(data.dumpRuns);
    setMatLumber(data.matLumber);
    setMatFixtures(data.matFixtures);
    setMatHardware(data.matHardware);
    showToast('Valores de la Orden de Cambio aplicados al Cotizador Principal.');
  };

  const filteredQuotes = quotes.filter((q) => {
    if (quoteFilter === 'pending') return q.stage === 'Pending Review';
    if (quoteFilter === 'evaluation') return q.stage === 'In Evaluation';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#121316] text-[#e3e2e6] flex flex-col lg:flex-row antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-lg bg-[#1F2229] border border-[#22C55E] text-[#F5F4F0] text-xs font-mono shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LEFT SIDEBAR: Dispatch & Radar */}
      <aside className="w-full lg:w-72 bg-[#16181D] border-r border-[#2B2F38] z-30 flex flex-col justify-between p-4 lg:p-6 shrink-0">
        <div className="space-y-6">
          {/* Logo in Sidebar */}
          <div className="flex items-center gap-3 pb-5 border-b border-[#2B2F38]">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1U0m4cVxAOi1giqHqjzMKxGnzb5xzuDG8Jfg_3YDrhcrRHUPS1XYoroZAvc-IBBWuRlMget54NlqZarEpcspPSIxBDycEcD6lSkK2r8xLMzWpSMkEo2A4mjnlHxCNxljIizxZriHdG_eeFuBbDy39Z6EshaFRekEi6pvkgT09465OKOKdAhstgVGuLEm0jS7bDAb1MtmSkRC4uC8Js6nPgEXC-SzeHB_Rk8HIHSi_FR3U88tKPZDVyh"
              alt="Scorpion Logo"
              className="h-8 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-base font-bold text-[#F5F4F0] uppercase leading-none">
                Scorpion
              </span>
              <span className="font-mono text-[10px] text-[#9E9E98] tracking-widest uppercase">
                Portal & Dispatch
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 font-['Space_Grotesk'] text-xs uppercase font-bold tracking-wider">
            <button
              onClick={() => {
                setActiveTab('radar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded transition-colors text-left ${
                activeTab === 'radar'
                  ? 'bg-[#1F2229] text-[#F5F4F0] border-l-4 border-l-[#cc0000]'
                  : 'text-[#9E9E98] hover:text-[#F5F4F0] hover:bg-[#1F2229]'
              }`}
            >
              <Gauge className="w-4 h-4 text-[#cc0000]" />
              <span>Job-Site Radar</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('ai-agent');
                document.getElementById('ai-change-order-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded transition-colors text-left ${
                activeTab === 'ai-agent'
                  ? 'bg-[#1F2229] text-[#F5F4F0] border-l-4 border-l-[#cc0000]'
                  : 'text-[#9E9E98] hover:text-[#F5F4F0] hover:bg-[#1F2229]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bot className="w-4 h-4 text-[#cc0000]" />
                <span>{lang === 'es' ? 'Agente IA (Extras)' : 'AI Extra Agent'}</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#cc0000]/20 text-[#ffb4a8] text-[9px] font-mono font-bold border border-[#cc0000]/40">
                GEMINI
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('estimates');
                document.getElementById('estimate-builder-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded transition-colors text-left ${
                activeTab === 'estimates'
                  ? 'bg-[#1F2229] text-[#F5F4F0] border-l-4 border-l-[#cc0000]'
                  : 'text-[#9E9E98] hover:text-[#F5F4F0] hover:bg-[#1F2229]'
              }`}
            >
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'es' ? 'Cotizador Activo' : 'Active Estimates'}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('fleet');
                document.getElementById('fleet-status-card')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded transition-colors text-left ${
                activeTab === 'fleet'
                  ? 'bg-[#1F2229] text-[#F5F4F0] border-l-4 border-l-[#cc0000]'
                  : 'text-[#9E9E98] hover:text-[#F5F4F0] hover:bg-[#1F2229]'
              }`}
            >
              <Truck className="w-4 h-4 text-[#ffb5a0]" />
              <span>{lang === 'es' ? 'Cuadrillas & Camiones' : 'Crew & Fleets'}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('inspections');
                document.getElementById('field-schedule-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded transition-colors text-left ${
                activeTab === 'inspections'
                  ? 'bg-[#1F2229] text-[#F5F4F0] border-l-4 border-l-[#cc0000]'
                  : 'text-[#9E9E98] hover:text-[#F5F4F0] hover:bg-[#1F2229]'
              }`}
            >
              <ClipboardCheck className="w-4 h-4 text-[#22C55E]" />
              <span>{lang === 'es' ? 'Agenda de Visitas' : 'Field Inspections'}</span>
            </button>

            {/* Direct WhatsApp Channel */}
            <a
              href={`https://wa.me/${COMPANY_PHONE_RAW}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded transition-colors text-left text-[#25D366] hover:bg-[#1F2229]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Dispatch</span>
            </a>
          </nav>
        </div>

        {/* Sidebar Footer & Public Switcher */}
        <div className="space-y-4 pt-6 border-t border-[#2B2F38]">
          <div className="p-3 bg-[#0d0e11] border border-[#2B2F38] rounded-lg">
            <div className="flex items-center gap-1.5 text-[#22C55E] font-mono text-[11px] mb-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>SAN ANTONIO CONTROL</span>
            </div>
            <p className="font-mono text-[10px] text-[#9E9E98]">
              Radio Dispatch: Canal 04
              <br />
              Duty Lead: Ricardo Menchaca
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={onBackToPublic}
              className="w-full py-2 px-3 rounded bg-[#1F2229] hover:bg-[#292a2d] text-xs font-mono text-[#F5F4F0] border border-[#2B2F38] transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Ver Sitio Público' : 'View Public Site'}</span>
            </button>

            <button
              onClick={onLogout}
              className="w-full py-2 px-3 rounded bg-red-950/20 hover:bg-red-950/40 text-xs font-mono text-red-300 border border-red-900/40 transition-colors flex items-center justify-center gap-2"
            >
              <span>{lang === 'es' ? 'Cerrar Sesión' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN OPERATIONS CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#121316]/95 backdrop-blur border-b border-[#2B2F38] px-4 sm:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#9E9E98] uppercase">
              Scorpion Operations Terminal // San Antonio District
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onBackToPublic}
              className="font-['Space_Grotesk'] text-xs uppercase text-[#9E9E98] hover:text-[#F5F4F0] transition-colors hidden sm:inline"
            >
              {lang === 'es' ? 'Sitio Web' : 'Public Site'}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded bg-[#1F2229] text-[#F5F4F0] hover:bg-[#292a2d] transition-colors"
                title="Notificaciones de entrada"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#cc0000] text-[#F5F4F0] font-mono text-[9px] flex items-center justify-center font-bold">
                  {quotes.length}
                </span>
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#16181D] border border-[#2B2F38] rounded-xl shadow-2xl p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#2B2F38]">
                    <span className="font-['Space_Grotesk'] text-xs font-bold uppercase text-[#F5F4F0]">
                      Cola de Cotizaciones Recientes
                    </span>
                    <span className="font-mono text-[10px] text-[#D4AF37]">{quotes.length} activas</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {quotes.map((q) => (
                      <div
                        key={q.id}
                        onClick={() => {
                          handlePrefillEstimate(q);
                          setShowNotifications(false);
                        }}
                        className="p-2.5 rounded bg-[#1F2229] hover:bg-[#292a2d] cursor-pointer text-xs space-y-1 transition-colors"
                      >
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <span className="font-bold text-[#F5F4F0]">{q.clientName}</span>
                          <span className="text-[#D4AF37]">{q.id}</span>
                        </div>
                        <p className="text-[11px] text-[#9E9E98] truncate">{q.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Operator Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#cc0000] flex items-center justify-center text-[#F5F4F0] font-bold text-xs shadow">
              RM
            </div>
          </div>
        </header>

        {/* Dashboard Main Workspace */}
        <main className="p-4 sm:p-8 space-y-8 overflow-y-auto">
          {/* Top Operator Bar */}
          <div className="w-full bg-[#16181D] rounded-xl p-5 border border-[#2B2F38] shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded bg-[#1F2229] border border-[#2B2F38] flex items-center justify-center text-[#F5F4F0]">
                  <User className="w-6 h-6 text-[#cc0000]" />
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#22C55E] ring-2 ring-[#16181D]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-['Space_Grotesk'] text-xl font-bold text-[#F5F4F0] tracking-tight">
                    Ricardo Menchaca
                  </h2>
                  <span className="bg-[#1F2229] text-[#9E9E98] font-mono text-[11px] px-2 py-0.5 rounded border border-[#2B2F38]">
                    LEAD GC #TX-48912
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs text-[#9E9E98] mt-1">
                  <span className="flex items-center gap-1.5 text-[#22C55E]">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                    {lang === 'es' ? 'Disponible para Consultas' : 'Available for Consultations'}
                  </span>
                  <span>•</span>
                  <span>San Antonio Headquarters</span>
                  <span>•</span>
                  <a
                    href={`https://wa.me/${COMPANY_PHONE_RAW}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp: {COMPANY_PHONE}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('ai-agent');
                  document.getElementById('ai-change-order-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#1F2229] hover:bg-[#292a2d] text-[#F5F4F0] font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-lg border border-[#cc0000]/60 hover:border-[#cc0000] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Cotizar Extras con IA (EE.UU.)</span>
              </button>

              <button
                onClick={() => {
                  setProposalId(`PROP-${Math.floor(1000 + Math.random() * 9000)}`);
                  setClientName('Nuevo Cliente San Antonio');
                  setProjectTitle('Remodelación & Demolición Personalizada');
                  document.getElementById('estimate-builder-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#cc0000] hover:bg-[#E60000] text-[#F5F4F0] font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-md shadow-red-950/40 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Crear Nueva Propuesta</span>
              </button>
            </div>
          </div>

          {/* Radio notification alert banner */}
          {radioPingSuccess && (
            <div className="p-4 rounded-lg bg-[#22C55E]/10 border border-[#22C55E] text-[#F5F4F0] text-xs font-mono flex items-center gap-3 animate-in fade-in">
              <Volume2 className="w-5 h-5 text-[#22C55E] shrink-0 animate-bounce" />
              <span>{radioPingSuccess}</span>
            </div>
          )}

          {/* SECTION 1: Executive KPI Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* KPI 1 */}
            <div className="bg-[#16181D] rounded-xl p-5 border border-[#2B2F38] shadow-md flex flex-col justify-between hover:bg-[#1F2229] transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs text-[#9E9E98] uppercase tracking-wider block">
                    Cotizaciones Entrantes
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#F5F4F0]">
                      {quotes.length + 10}
                    </span>
                    <span className="font-mono text-xs text-[#ffb4a8]">3 visitas pendientes</span>
                  </div>
                </div>
                <div className="p-2.5 bg-[#1F2229] text-[#ffb5a0] rounded-lg border border-[#2B2F38]">
                  <Inbox className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#2B2F38] flex items-center justify-between text-[#9E9E98] font-mono text-[11px]">
                <span className="flex items-center gap-1 text-[#22C55E]">
                  <TrendingUp className="w-3.5 h-3.5" /> +28% vs semana pasada
                </span>
                <span>SLA: 100% cumplido</span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-[#16181D] rounded-xl p-5 border border-[#2B2F38] shadow-md flex flex-col justify-between hover:bg-[#1F2229] transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs text-[#9E9E98] uppercase tracking-wider block">
                    Presupuestos en Revisión
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#F5F4F0]">
                      $148,500
                    </span>
                  </div>
                </div>
                <div className="p-2.5 bg-[#1F2229] text-[#D4AF37] rounded-lg border border-[#2B2F38]">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#2B2F38] flex items-center justify-between text-[#9E9E98] font-mono text-[11px]">
                <span>5 propuestas entregadas</span>
                <span className="text-[#F5F4F0]">Prom: $29.7k</span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-[#16181D] rounded-xl p-5 border border-[#2B2F38] shadow-md flex flex-col justify-between hover:bg-[#1F2229] transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs text-[#9E9E98] uppercase tracking-wider block">
                    Obras Activas en Campo
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#F5F4F0]">
                      05
                    </span>
                    <span className="font-mono text-xs text-[#22C55E]">3 distritos activos</span>
                  </div>
                </div>
                <div className="p-2.5 bg-[#1F2229] text-[#22C55E] rounded-lg border border-[#2B2F38]">
                  <Truck className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#2B2F38] flex items-center justify-between text-[#9E9E98] font-mono text-[11px]">
                <span>Stone Oak • Alamo Hts • Boerne</span>
                <span className="text-[#22C55E]">100% Seguras</span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-[#16181D] rounded-xl p-5 border border-[#2B2F38] shadow-md flex flex-col justify-between hover:bg-[#1F2229] transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs text-[#9E9E98] uppercase tracking-wider block">
                    Tiempo de Respuesta
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#F5F4F0]">
                      28
                    </span>
                    <span className="font-['Space_Grotesk'] text-lg text-[#9E9E98]">hrs</span>
                  </div>
                </div>
                <div className="p-2.5 bg-[#1F2229] text-[#ffb4a8] rounded-lg border border-[#2B2F38]">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#2B2F38] flex items-center justify-between text-[#9E9E98] font-mono text-[11px]">
                <span className="text-[#22C55E]">-4.2 hrs vs meta</span>
                <span>Equipo Ricardo</span>
              </div>
            </div>
          </div>

          {/* SECTION IA: AGENTE INTELIGENTE PARA COTIZACIONES EXTRA & CHANGE ORDERS (USA) */}
          <div id="ai-change-order-section">
            <AiChangeOrderAgent
              quotes={quotes}
              onApplyToCalculator={handleApplyFromAi}
              lang={lang}
            />
          </div>

          {/* SECTION 2: Inbound Requests (8 cols) & Fleet Status (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Inbound Queue (8 cols) */}
            <div className="lg:col-span-8 bg-[#16181D] rounded-xl p-6 border border-[#2B2F38] shadow-md space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-[#1F2229] border border-[#2B2F38] flex items-center justify-center text-[#cc0000]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#F5F4F0] tracking-tight">
                      Cola de Solicitudes de Cotización
                    </h3>
                    <p className="font-mono text-xs text-[#9E9E98]">
                      Cálculos de metrado y visita en sitio obligatorios
                    </p>
                  </div>
                </div>

                {/* Filter buttons */}
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <button
                    onClick={() => setQuoteFilter('all')}
                    className={`px-3 py-1 rounded transition-colors ${
                      quoteFilter === 'all'
                        ? 'bg-[#1F2229] text-[#F5F4F0] font-bold border border-[#2B2F38]'
                        : 'text-[#9E9E98] hover:text-[#F5F4F0]'
                    }`}
                  >
                    TODAS ({quotes.length})
                  </button>
                  <button
                    onClick={() => setQuoteFilter('pending')}
                    className={`px-3 py-1 rounded transition-colors ${
                      quoteFilter === 'pending'
                        ? 'bg-[#1F2229] text-[#F5F4F0] font-bold border border-[#2B2F38]'
                        : 'text-[#9E9E98] hover:text-[#F5F4F0]'
                    }`}
                  >
                    PENDIENTES
                  </button>
                  <button
                    onClick={() => setQuoteFilter('evaluation')}
                    className={`px-3 py-1 rounded transition-colors ${
                      quoteFilter === 'evaluation'
                        ? 'bg-[#1F2229] text-[#F5F4F0] font-bold border border-[#2B2F38]'
                        : 'text-[#9E9E98] hover:text-[#F5F4F0]'
                    }`}
                  >
                    EN EVALUACIÓN
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {filteredQuotes.map((q) => (
                  <div
                    key={q.id}
                    className="bg-[#1F2229] rounded-lg p-5 border border-[#2B2F38] hover:border-[#cc0000]/60 transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs bg-[#cc0000] text-[#F5F4F0] px-2 py-0.5 rounded font-bold">
                            {q.id}
                          </span>
                          <span className="font-['Space_Grotesk'] text-base font-bold text-[#F5F4F0]">
                            {q.clientName}
                          </span>
                          <span className="font-mono text-xs text-[#9E9E98]">• {q.location}</span>
                        </div>
                        <h4 className="font-['Work_Sans'] text-sm text-[#ffb5a0] font-medium mt-1">
                          {q.title}
                        </h4>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-[10px] text-[#9E9E98] uppercase">Estado</span>
                        <p
                          className="font-mono text-xs font-bold"
                          style={{ color: q.stageColor || '#D4AF37' }}
                        >
                          {q.stage}
                        </p>
                      </div>
                    </div>

                    <p className="font-['Work_Sans'] text-xs text-[#9E9E98] leading-relaxed">
                      <strong className="text-[#F5F4F0]">Notas de Alcance:</strong> {q.notes}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#2B2F38]/50">
                      <div className="flex items-center gap-2 font-mono text-[11px] text-[#9E9E98]">
                        <Clock className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span>Recibido {q.receivedTime}</span>
                        {q.attachments && (
                          <>
                            <span>•</span>
                            <span className="text-[#F5F4F0]">{q.attachments}</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleScheduleVisit(q.clientName, q.location)}
                          className="bg-[#16181D] hover:bg-[#292a2d] text-[#F5F4F0] font-['Space_Grotesk'] text-[11px] uppercase font-bold px-3 py-1.5 rounded border border-[#2B2F38] transition-colors"
                        >
                          Agendar en Sitio
                        </button>

                        <button
                          onClick={() => handlePrefillEstimate(q)}
                          className="bg-[#cc0000] hover:bg-[#E60000] text-[#F5F4F0] font-['Space_Grotesk'] text-[11px] uppercase font-bold px-3 py-1.5 rounded transition-colors flex items-center gap-1 shadow"
                        >
                          <span>Calcular Propuesta</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>

                        <a
                          href={`https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(
                            `Hola ${q.clientName}, soy Ricardo de Scorpion Contractors respecto a su cotización (${q.id}).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] transition-colors"
                          title="Contactar vía WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Field Fleet Operations Live Status (4 cols) */}
            <div id="fleet-status-card" className="lg:col-span-4 space-y-6">
              {/* RAM 2500 HD Status Card */}
              <div className="bg-[#16181D] rounded-xl p-5 border border-[#2B2F38] shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#cc0000]" />
                    <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#F5F4F0]">
                      Estado de Flota & Despacho
                    </h3>
                  </div>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-[#22C55E] bg-[#1F2229] px-2 py-0.5 rounded border border-[#2B2F38]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" /> GPS VIVO
                  </span>
                </div>

                {/* Ram Heavy Duty Image */}
                <div className="relative w-full h-44 rounded-lg overflow-hidden bg-[#0d0e11] border border-[#2B2F38] group">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmWAgujLeXpwynR2ef2Njz7TcemFuZcZqwtExO9cXGlz8yCzm1S-t-90RN2sQ9bRbQETgwvYf6VqO6X5A8KtKW9qVjLU2eJBzgNLpKV9OqJHGrkjfLT5N1YZ4He1bz97-BPLQW98WWvmbbh4uqtWo-YZVPNOtpSMZfZYT8lO6JSOQWKhbkyC9ZB0GOVmXgVV5ezQX4vIYhoe3SfP4_txfa3tTP6BeKMQ5DL8WWSixhGZ6MacgnrfFB3L-c_TahIXSp"
                    alt="Scorpion Dodge Ram Truck with trailer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#121316] via-[#121316]/80 to-transparent p-3">
                    <span className="font-mono text-xs text-[#F5F4F0] font-bold block">
                      UNIT #01 — RED RAM 2500 HD
                    </span>
                    <span className="font-mono text-[10px] text-[#ffb4a8]">
                      SCORPION RIG & HAULING TRAILER
                    </span>
                  </div>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between py-1.5 px-2.5 bg-[#1F2229] rounded border border-[#2B2F38]">
                    <span className="text-[#9E9E98]">Asignación Actual:</span>
                    <span className="text-[#F5F4F0] font-medium">Alamo Heights Job Site</span>
                  </div>
                  <div className="flex justify-between py-1.5 px-2.5 bg-[#1F2229] rounded border border-[#2B2F38]">
                    <span className="text-[#9E9E98]">Estado en Campo:</span>
                    <span className="text-[#22C55E] font-medium">En Ruta // ETA 18 mins</span>
                  </div>
                  <div className="flex justify-between py-1.5 px-2.5 bg-[#1F2229] rounded border border-[#2B2F38]">
                    <span className="text-[#9E9E98]">Equipo a Bordo:</span>
                    <span className="text-[#F5F4F0] font-medium">Husky Demo, Láser, X-Board</span>
                  </div>
                  <div className="flex justify-between py-1.5 px-2.5 bg-[#1F2229] rounded border border-[#2B2F38]">
                    <span className="text-[#9E9E98]">Charla Seguridad:</span>
                    <span className="text-[#22C55E] font-medium">OSHA Cumplido 07:00 AM</span>
                  </div>
                </div>

                {/* Ping Radio Button */}
                <button
                  onClick={handlePingRadio}
                  className="w-full bg-[#1F2229] hover:bg-[#292a2d] text-[#F5F4F0] font-['Space_Grotesk'] text-xs uppercase font-bold py-2.5 rounded-lg border border-[#2B2F38] hover:border-[#cc0000] transition-colors flex items-center justify-center gap-2"
                >
                  <Radio className="w-4 h-4 text-[#cc0000]" />
                  <span>Llamar a Cuadrilla por Radio (Ch 04)</span>
                </button>
              </div>

              {/* Material & Permit Watch */}
              <div className="bg-[#16181D] rounded-xl p-5 border border-[#2B2F38] shadow-md space-y-3">
                <div className="flex items-center gap-2 text-[#F5F4F0] font-['Space_Grotesk'] text-sm font-bold">
                  <AlertTriangle className="w-4 h-4 text-[#D4AF37]" />
                  <span>Monitoreo de Materiales & Permisos</span>
                </div>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-lg bg-[#1F2229] border border-[#2B2F38]">
                    <span className="font-mono text-[10px] text-[#9E9E98] block uppercase">
                      PERMISOS CIUDAD DE SAN ANTONIO
                    </span>
                    <p className="font-['Work_Sans'] text-xs text-[#F5F4F0] mt-0.5">
                      Inspección eléctrica aprobada para Vance Residence #SC-1082.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1F2229] border border-[#2B2F38]">
                    <span className="font-mono text-[10px] text-[#9E9E98] block uppercase">
                      MADERA Y ESTRUCTURA (LUMBER YARD)
                    </span>
                    <p className="font-['Work_Sans'] text-xs text-[#F5F4F0] mt-0.5">
                      Entrega de vigas 2x6 confirmada para mañana 07:30 AM en Boerne.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Interactive Calendar & Field Inspections */}
          <div
            id="field-schedule-section"
            className="w-full bg-[#16181D] rounded-xl p-6 border border-[#2B2F38] shadow-md space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-[#1F2229] border border-[#2B2F38] flex items-center justify-center text-[#cc0000]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#F5F4F0] tracking-tight">
                    Inspecciones en Sitio y Agenda de Campo
                  </h3>
                  <p className="font-mono text-xs text-[#9E9E98]">
                    Recorridos y visitas técnicas en el Distrito Metro de San Antonio
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-[#9E9E98]">Semana Activa:</span>
                <span className="px-3 py-1 bg-[#cc0000] text-[#F5F4F0] rounded font-bold uppercase">
                  Noviembre 2024
                </span>
              </div>
            </div>

            {/* Calendar Week Grid */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {['Lun 04', 'Mar 05', 'Mié 06 (Hoy)', 'Jue 07', 'Vie 08', 'Sáb 09', 'Dom 10'].map(
                (dayName, idx) => (
                  <div
                    key={dayName}
                    className={`p-2.5 text-center font-mono text-[11px] uppercase rounded border ${
                      idx === 2
                        ? 'bg-[#1F2229] border-[#D4AF37] text-[#D4AF37] font-bold'
                        : 'bg-[#1F2229] border-[#2B2F38] text-[#9E9E98]'
                    }`}
                  >
                    {dayName}
                  </div>
                )
              )}

              {/* Day 1: Mon */}
              <div className="bg-[#121316] p-3 rounded-lg border border-[#2B2F38] min-h-[160px] flex flex-col justify-between">
                <div className="space-y-2">
                  <div
                    onClick={() => setSelectedAppt(INITIAL_APPOINTMENTS[0])}
                    className="p-2 rounded bg-[#1F2229] text-[11px] font-mono text-[#9E9E98] cursor-pointer hover:border-[#cc0000] border border-transparent"
                  >
                    <span className="text-[#F5F4F0] block font-bold">09:00 AM</span>
                    <span>Revisión Permisos Ciudad</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#9E9E98]">Completado</span>
              </div>

              {/* Day 2: Tue */}
              <div className="bg-[#121316] p-3 rounded-lg border border-[#2B2F38] min-h-[160px] flex flex-col justify-between">
                <div className="space-y-2">
                  <div
                    onClick={() => setSelectedAppt(INITIAL_APPOINTMENTS[1])}
                    className="p-2 rounded bg-[#1F2229] text-[11px] font-mono text-[#F5F4F0] cursor-pointer hover:border-[#cc0000] border border-transparent"
                  >
                    <span className="text-[#22C55E] block font-bold">01:30 PM</span>
                    <span>Muestras de Granito</span>
                    <span className="text-[#9E9E98] block">Garza Residence</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#9E9E98]">Completado</span>
              </div>

              {/* Day 3: Wed (TODAY ACTIVE) */}
              <div className="bg-[#1F2229] p-3 rounded-lg border border-[#cc0000] min-h-[160px] flex flex-col justify-between ring-1 ring-[#cc0000]">
                <div className="space-y-2">
                  <div
                    onClick={() => setSelectedAppt(INITIAL_APPOINTMENTS[2])}
                    className="p-2 rounded bg-[#cc0000] text-[#F5F4F0] text-[11px] font-mono cursor-pointer hover:bg-[#E60000] shadow-sm transition-colors"
                  >
                    <span className="block font-bold">10:00 AM — Visita Sitio</span>
                    <span className="truncate block">Vance (Alamo Heights)</span>
                  </div>
                  <div
                    onClick={() => setSelectedAppt(INITIAL_APPOINTMENTS[3])}
                    className="p-2 rounded bg-[#16181D] hover:bg-[#292a2d] text-[#F5F4F0] text-[11px] font-mono cursor-pointer transition-colors"
                  >
                    <span className="text-[#D4AF37] block font-bold">02:00 PM — Dumpster Drop</span>
                    <span className="text-[#9E9E98] truncate block">Remolque Volteo Ram #2</span>
                  </div>
                  <div
                    onClick={() => setSelectedAppt(INITIAL_APPOINTMENTS[4])}
                    className="p-2 rounded bg-[#16181D] hover:bg-[#292a2d] text-[#F5F4F0] text-[11px] font-mono cursor-pointer transition-colors"
                  >
                    <span className="text-[#22C55E] block font-bold">04:30 PM — Inspección</span>
                    <span className="text-[#9E9E98] truncate block">Plomería & Contrapiso</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#cc0000] font-bold">3 EVENTOS HOY</span>
              </div>

              {/* Day 4: Thu */}
              <div className="bg-[#121316] p-3 rounded-lg border border-[#2B2F38] min-h-[160px] flex flex-col justify-between">
                <div className="space-y-2">
                  <div
                    onClick={() => setSelectedAppt(INITIAL_APPOINTMENTS[5])}
                    className="p-2 rounded bg-[#1F2229] text-[11px] font-mono text-[#F5F4F0] cursor-pointer hover:border-[#cc0000] border border-transparent"
                  >
                    <span className="text-[#F5F4F0] block font-bold">11:00 AM</span>
                    <span>Visita Elena Rodriguez</span>
                    <span className="text-[#9E9E98] block">Boerne Estate</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#9E9E98]">Agendado</span>
              </div>

              {/* Day 5: Fri */}
              <div className="bg-[#121316] p-3 rounded-lg border border-[#2B2F38] min-h-[160px] flex flex-col justify-between">
                <div className="space-y-2">
                  <div
                    onClick={() => setSelectedAppt(INITIAL_APPOINTMENTS[6])}
                    className="p-2 rounded bg-[#1F2229] text-[11px] font-mono text-[#F5F4F0] cursor-pointer hover:border-[#cc0000] border border-transparent"
                  >
                    <span className="text-[#F5F4F0] block font-bold">08:00 AM</span>
                    <span>Inicio Framing Comercial</span>
                    <span className="text-[#9E9E98] block">Austin Ind. Corridor</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#9E9E98]">Confirmado</span>
              </div>

              {/* Day 6: Sat */}
              <div className="bg-[#121316] p-3 rounded-lg border border-[#2B2F38] min-h-[160px] flex flex-col justify-between opacity-80">
                <div className="p-2 rounded bg-[#1F2229] text-[11px] font-mono text-[#9E9E98]">
                  <span className="text-[#F5F4F0] block font-bold">Mantenimiento de Flota</span>
                  <span>Aceite & Frenos Ram HD</span>
                </div>
                <span className="text-[10px] font-mono text-[#9E9E98]">Taller Propio</span>
              </div>

              {/* Day 7: Sun */}
              <div className="bg-[#121316] p-3 rounded-lg border border-[#2B2F38] min-h-[160px] flex flex-col justify-end opacity-40">
                <span className="text-[11px] font-mono text-[#9E9E98] text-center pb-2">
                  Instalaciones Cerradas
                </span>
              </div>
            </div>

            {/* Selected Appointment Details Box */}
            {selectedAppt && (
              <div className="bg-[#1F2229] rounded-xl p-5 border border-[#2B2F38] flex flex-wrap items-start justify-between gap-4 animate-in fade-in">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#16181D] text-[#cc0000] rounded-lg border border-[#2B2F38]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-[#cc0000] uppercase font-bold tracking-wider">
                      DETALLES DE LA VISITA TÉCNICA
                    </span>
                    <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#F5F4F0] mt-0.5">
                      {selectedAppt.clientName} ({selectedAppt.time} • {selectedAppt.dateStr})
                    </h4>
                    <p className="font-mono text-xs text-[#9E9E98] mt-0.5">{selectedAppt.address}</p>
                    <p className="font-['Work_Sans'] text-xs text-[#F5F4F0] mt-2 max-w-2xl">
                      {selectedAppt.notes}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedAppt.phone && (
                    <a
                      href={`tel:${selectedAppt.phone}`}
                      className="bg-[#16181D] hover:bg-[#292a2d] text-[#F5F4F0] font-['Space_Grotesk'] text-xs uppercase font-bold px-3 py-2 rounded-lg border border-[#2B2F38] flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#cc0000]" />
                      <span>Llamar</span>
                    </a>
                  )}

                  <a
                    href={`https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(
                      `Hola ${selectedAppt.clientName}, soy Ricardo Menchaca confirmando la visita de hoy a las ${selectedAppt.time} en ${selectedAppt.address}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba59] text-white font-['Space_Grotesk'] text-xs uppercase font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSelectedAppt(null)}
                    className="p-2 text-[#9E9E98] hover:text-[#F5F4F0]"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 4: Custom Scope Estimate Builder & Dynamic Pricing Estimator */}
          <div
            id="estimate-builder-section"
            className="w-full bg-[#16181D] rounded-xl p-6 sm:p-8 border border-[#2B2F38] shadow-md space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2B2F38]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#1F2229] border border-[#2B2F38] flex items-center justify-center text-[#cc0000]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#F5F4F0] tracking-tight">
                    Generador de Presupuesto Técnico y Costos en Vivo
                  </h3>
                  <p className="font-mono text-xs text-[#9E9E98]">
                    Cálculo dinámico de horas de maestros carpinteros, acarreo en remolque y materiales
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#9E9E98] uppercase">FOLIO PROPUESTA:</span>
                <span className="font-mono text-xs bg-[#1F2229] text-[#D4AF37] px-3 py-1 rounded-lg border border-[#2B2F38] font-bold">
                  {proposalId}
                </span>
              </div>
            </div>

            {/* Context Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="font-mono text-xs text-[#9E9E98] block mb-1 uppercase font-bold">
                  NOMBRE DEL CLIENTE
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#1F2229] border border-[#2B2F38] text-[#F5F4F0] px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#cc0000]"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-[#9E9E98] block mb-1 uppercase font-bold">
                  TÍTULO DEL PROYECTO
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-[#1F2229] border border-[#2B2F38] text-[#F5F4F0] px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#cc0000]"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-[#9E9E98] block mb-1 uppercase font-bold">
                  TIEMPO ESTIMADO DE EJECUCIÓN
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-[#1F2229] border border-[#2B2F38] text-[#F5F4F0] px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#cc0000]"
                >
                  <option>2 - 3 Weeks (Standard Rush)</option>
                  <option>3 - 5 Weeks (Full Scope)</option>
                  <option>6 - 8 Weeks (Commercial / Heavy)</option>
                </select>
              </div>
            </div>

            {/* The 3 Calculator Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 1. Labor & Craftsmen */}
              <div className="bg-[#1F2229] p-5 rounded-xl border border-[#2B2F38] flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-['Space_Grotesk'] text-sm font-bold text-[#F5F4F0] flex items-center gap-1.5 uppercase">
                      <User className="w-4 h-4 text-[#cc0000]" />
                      1. Mano de Obra Calificada
                    </span>
                    <span className="font-mono text-[10px] text-[#9E9E98]">TX Crew Standard</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between font-mono text-xs text-[#9E9E98] mb-1">
                        <span>Maestro Carpintero Lead ($95/hr):</span>
                        <span className="text-[#F5F4F0] font-bold">{carpenterHours} hrs</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="160"
                        value={carpenterHours}
                        onChange={(e) => setCarpenterHours(parseInt(e.target.value) || 0)}
                        className="w-full accent-[#cc0000] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-xs text-[#9E9E98] mb-1">
                        <span>Demolición & Cuadrilla ($55/hr):</span>
                        <span className="text-[#F5F4F0] font-bold">{laborHours} hrs</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={laborHours}
                        onChange={(e) => setLaborHours(parseInt(e.target.value) || 0)}
                        className="w-full accent-[#cc0000] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-xs text-[#9E9E98] mb-1">
                        <span>Electricista / Plomero Cert ($120/hr):</span>
                        <span className="text-[#F5F4F0] font-bold">{techHours} hrs</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={techHours}
                        onChange={(e) => setTechHours(parseInt(e.target.value) || 0)}
                        className="w-full accent-[#cc0000] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#2B2F38] flex justify-between font-mono text-xs">
                  <span className="text-[#9E9E98]">Subtotal Mano de Obra:</span>
                  <span className="text-[#F5F4F0] font-bold">
                    ${laborSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* 2. Demolition, Disposal & Fleet Hauling */}
              <div className="bg-[#1F2229] p-5 rounded-xl border border-[#2B2F38] flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-['Space_Grotesk'] text-sm font-bold text-[#F5F4F0] flex items-center gap-1.5 uppercase">
                      <Truck className="w-4 h-4 text-[#ffb5a0]" />
                      2. Demolición & Acarreo en Flota
                    </span>
                    <span className="font-mono text-[10px] text-[#9E9E98]">Dump Trailer</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="font-mono text-[11px] text-[#9E9E98] block mb-1">
                        VIAJES DE VOLTEO RAM ($450/VIAJE)
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setDumpRuns(Math.max(1, dumpRuns - 1))}
                          className="w-8 h-8 rounded bg-[#16181D] hover:bg-[#292a2d] text-[#F5F4F0] font-bold font-mono border border-[#2B2F38]"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={dumpRuns}
                          onChange={(e) => setDumpRuns(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-16 text-center bg-[#16181D] border border-[#2B2F38] text-[#F5F4F0] py-1 rounded font-mono text-xs font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => setDumpRuns(dumpRuns + 1)}
                          className="w-8 h-8 rounded bg-[#16181D] hover:bg-[#292a2d] text-[#F5F4F0] font-bold font-mono border border-[#2B2F38]"
                        >
                          +
                        </button>
                        <span className="font-mono text-[11px] text-[#9E9E98] ml-2">
                          Cargas al vertedero
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[11px] text-[#9E9E98] block mb-1">
                        PROTECCIÓN DE PISOS & POLVO
                      </label>
                      <select
                        value={dustProtectionCost}
                        onChange={(e) => setDustProtectionCost(parseInt(e.target.value) || 350)}
                        className="w-full bg-[#16181D] border border-[#2B2F38] text-[#F5F4F0] p-2 rounded text-xs font-mono"
                      >
                        <option value={600}>Full Ram-Board & ZipWall Poly Enclosure ($600)</option>
                        <option value={350}>Standard Ram-Board Floor Protection ($350)</option>
                        <option value={950}>HEPA Air Scrubber + Clean Room Seal ($950)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-[11px] text-[#9E9E98] block mb-1">
                        TASA MUNICIPAL DE VERTEDERO (CITY FEES)
                      </label>
                      <input
                        type="number"
                        value={dumpFees}
                        onChange={(e) => setDumpFees(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#16181D] border border-[#2B2F38] text-[#F5F4F0] p-2 rounded text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#2B2F38] flex justify-between font-mono text-xs">
                  <span className="text-[#9E9E98]">Subtotal Acarreo & Aseo:</span>
                  <span className="text-[#F5F4F0] font-bold">
                    ${haulingSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* 3. Specialty Materials & Allowances */}
              <div className="bg-[#1F2229] p-5 rounded-xl border border-[#2B2F38] flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-['Space_Grotesk'] text-sm font-bold text-[#F5F4F0] flex items-center gap-1.5 uppercase">
                      <FileCheck className="w-4 h-4 text-[#D4AF37]" />
                      3. Materiales & Acabados ($)
                    </span>
                    <span className="font-mono text-[10px] text-[#9E9E98]">Wholesale Specs</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="font-mono text-[11px] text-[#9E9E98] block mb-1">
                        MADERA ESTRUCTURAL, YESO & TABLAROCA ($)
                      </label>
                      <input
                        type="number"
                        value={matLumber}
                        onChange={(e) => setMatLumber(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#16181D] border border-[#2B2F38] text-[#F5F4F0] p-2 rounded text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[11px] text-[#9E9E98] block mb-1">
                        ASIGNACIÓN PARA AZULEJOS / GRIFERÍA / PIEDRA ($)
                      </label>
                      <input
                        type="number"
                        value={matFixtures}
                        onChange={(e) => setMatFixtures(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#16181D] border border-[#2B2F38] text-[#F5F4F0] p-2 rounded text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[11px] text-[#9E9E98] block mb-1">
                        FERRETERÍA, TORNILLOS & SELLADORES ($)
                      </label>
                      <input
                        type="number"
                        value={matHardware}
                        onChange={(e) => setMatHardware(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#16181D] border border-[#2B2F38] text-[#F5F4F0] p-2 rounded text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#2B2F38] flex justify-between font-mono text-xs">
                  <span className="text-[#9E9E98]">Subtotal Materiales:</span>
                  <span className="text-[#F5F4F0] font-bold">
                    ${matSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Final Proposal Total Bar */}
            <div className="bg-[#121316] rounded-xl p-6 border border-[#2B2F38] flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                <div>
                  <span className="font-mono text-[11px] text-[#9E9E98] uppercase">
                    MARGEN DE GESTIÓN & SUPERVISIÓN (15%)
                  </span>
                  <p className="font-['Space_Grotesk'] text-xl font-bold text-[#9E9E98]">
                    ${overhead.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="sm:border-l sm:border-[#2B2F38] sm:pl-10">
                  <span className="font-mono text-xs text-[#cc0000] uppercase font-bold tracking-wide">
                    TOTAL ESTIMADO DE LA PROPUESTA
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-[#F5F4F0] tracking-tight">
                      ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="font-mono text-xs text-[#9E9E98]">USD (3 Pagos)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowPdfModal(true)}
                  className="bg-[#1F2229] hover:bg-[#292a2d] text-[#F5F4F0] font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-lg border border-[#2B2F38] hover:border-[#cc0000] transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  <span>Generar PDF Formal</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsAppProposal}
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-green-950/40"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Enviar Presupuesto por WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* PDF Modal */}
      <ProposalPdfModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        proposal={{
          proposalId,
          clientName,
          projectTitle,
          timeline,
          laborSubtotal,
          carpenterHours,
          laborHours,
          techHours,
          haulingSubtotal,
          dumpRuns,
          dustProtectionType: 'Ram-Board & ZipWall',
          dumpFees,
          matSubtotal,
          matLumber,
          matFixtures,
          matHardware,
          overhead,
          grandTotal,
        }}
        lang={lang}
      />
    </div>
  );
};
