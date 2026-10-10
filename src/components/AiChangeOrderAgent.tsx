import React, { useState } from 'react';
import { QuoteRequest } from '../types';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../data/mockData';
import {
  Sparkles,
  Bot,
  Send,
  Loader2,
  FileText,
  Clock,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Copy,
  MessageCircle,
  Wrench,
  DollarSign,
  TrendingUp,
  Sliders,
  Printer,
  ChevronDown,
} from 'lucide-react';

interface ChangeOrderResult {
  changeOrderCode: string;
  title: string;
  summary: string;
  codeComplianceNote: string;
  scheduleImpactDays: number;
  laborItems: Array<{
    trade: string;
    hours: number;
    hourlyRate: number;
    subtotal: number;
  }>;
  materialItems: Array<{
    name: string;
    quantity: string;
    unitCost?: number;
    subtotal: number;
  }>;
  haulingAndDisposalCost?: number;
  permitsOrInspectionCost?: number;
  directCostsTotal: number;
  overheadAndProfitAmount: number;
  grandTotalCost: number;
  clientExplanationText: string;
  expertAdviceForRicardo?: string;
}

interface AiChangeOrderAgentProps {
  quotes: QuoteRequest[];
  onApplyToCalculator?: (data: {
    clientName: string;
    projectTitle: string;
    carpenterHours: number;
    laborHours: number;
    techHours: number;
    dumpRuns: number;
    matLumber: number;
    matFixtures: number;
    matHardware: number;
  }) => void;
  lang?: 'en' | 'es';
}

export const AiChangeOrderAgent: React.FC<AiChangeOrderAgentProps> = ({
  quotes,
  onApplyToCalculator,
  lang = 'es',
}) => {
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>(quotes[0]?.id || '');
  const [extraInput, setExtraInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ChangeOrderResult | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [activeStepText, setActiveStepText] = useState('');

  const currentQuote = quotes.find((q) => q.id === selectedQuoteId) || quotes[0];

  const quickPrompts = [
    {
      title: '6 Luces LED Wafer + Dimmer Caseta',
      text: 'El cliente quiere agregar 6 luces LED ultra-delgadas wafer empotradas en la sala, un dimmer inteligente Lutron Caseta y cableado nuevo Romex 14/2 desde el panel.',
    },
    {
      title: 'Demoler Muro 12ft & Parcheo Level 4',
      text: 'Demoler muro divisorio interior no estructural de 12 pies lineales, retirar escombros en remolque de volteo y parchar tablaroca con acabado texturizado Nivel 4.',
    },
    {
      title: 'Viga LVL 16ft por Muro de Carga',
      text: 'Al retirar el muro entre cocina y comedor detectamos que es de carga; se requiere apuntalamiento temporal, suministro e instalación de viga LVL de 16 pies y soportes Simpson Strong-Tie.',
    },
    {
      title: 'Reemplazo de Subfloor con Daño de Agua',
      text: 'Encontramos daño por agua en el contrapiso del baño bajo la tina. Reemplazar 3 viguetas 2x8 tratadas, 2 hojas de subfloor de 3/4" Tongue & Groove y colocar membrana Schluter-DITRA.',
    },
    {
      title: 'Circuito 20A Dedicado en Isla con GFCI',
      text: 'Agregar un circuito eléctrico dedicado de 20A con cable Romex 12/2 y tomacorriente GFCI para la nueva isla de cocina según código NEC 2023.',
    },
  ];

  const handleGenerate = async (descriptionToUse?: string) => {
    const textToSend = descriptionToUse || extraInput;
    if (!textToSend.trim()) {
      setError(
        lang === 'es'
          ? 'Por favor escribe qué trabajo extra o cambio solicitó el cliente.'
          : 'Please enter what extra work or change order is requested.'
      );
      return;
    }

    setError(null);
    setIsLoading(true);

    const steps = [
      'Analizando contexto de construcción en EE.UU. & Códigos de San Antonio (IRC / NEC)...',
      'Calculando horas de mano de obra según tarifas estándar de Texas...',
      'Cotizando materiales comerciales (Lumber, Sheetrock, Romex, PEX)...',
      'Aplicando margen comercial del 15% (Overhead & Profit)...',
    ];

    let stepIdx = 0;
    setActiveStepText(steps[0]);
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setActiveStepText(steps[stepIdx]);
      }
    }, 1200);

    try {
      const response = await fetch('/api/ai/estimate-extra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectContext: `${currentQuote?.clientName || 'Cliente'} - ${currentQuote?.title || 'Obra San Antonio'} (${currentQuote?.location || 'San Antonio, TX'})`,
          clientName: currentQuote?.clientName || 'Cliente',
          extraDescription: textToSend,
          currentScope: currentQuote?.scopeType || 'Remodelación General',
          budgetRange: currentQuote?.estimatedBudget || '$35,000 - $75,000',
          language: lang,
        }),
      });

      clearInterval(interval);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resData = await response.json();
      if (resData.success && resData.data) {
        setResult(resData.data);
      } else {
        throw new Error(resData.error || 'No se pudo generar la orden de cambio.');
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error('Error fetching AI change order:', err);
      setError(
        lang === 'es'
          ? 'Hubo un inconveniente al conectar con el motor de IA. Verifique que el servidor esté activo.'
          : 'Could not connect to the AI engine. Please ensure the server is active.'
      );
    } finally {
      setIsLoading(false);
      setActiveStepText('');
    }
  };

  const handleCopyClientText = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.clientExplanationText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  const handleSendWhatsApp = () => {
    if (!result) return;
    const phone = currentQuote?.phone || COMPANY_PHONE;
    const cleanPhone = phone.replace(/\D/g, '') || COMPANY_PHONE_RAW;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(result.clientExplanationText)}`;
    window.open(url, '_blank');
  };

  const handleApplyToCalculator = () => {
    if (!result || !onApplyToCalculator) return;

    // Distribute hours into standard slots
    let carpenter = 0;
    let labor = 0;
    let tech = 0;

    result.laborItems.forEach((item) => {
      const tradeLower = item.trade.toLowerCase();
      if (tradeLower.includes('carpenter') || tradeLower.includes('framer') || tradeLower.includes('lead')) {
        carpenter += item.hours;
      } else if (tradeLower.includes('electric') || tradeLower.includes('plumb')) {
        tech += item.hours;
      } else {
        labor += item.hours;
      }
    });

    const matTotal = result.materialItems.reduce((acc, cur) => acc + cur.subtotal, 0);

    onApplyToCalculator({
      clientName: currentQuote?.clientName || 'Cliente',
      projectTitle: `${currentQuote?.title || 'Obra'} + ${result.title}`,
      carpenterHours: Math.max(8, carpenter),
      laborHours: Math.max(8, labor),
      techHours: Math.max(4, tech),
      dumpRuns: result.haulingAndDisposalCost ? Math.max(1, Math.round(result.haulingAndDisposalCost / 450)) : 1,
      matLumber: Math.round(matTotal * 0.4),
      matFixtures: Math.round(matTotal * 0.4),
      matHardware: Math.round(matTotal * 0.2),
    });

    // Scroll to the main calculator
    document.getElementById('estimate-builder-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#16181D] rounded-xl p-6 sm:p-8 border border-[#2B2F38] shadow-2xl space-y-6">
      {/* Agent Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#2B2F38]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#cc0000] to-[#601400] flex items-center justify-center text-white shadow-lg shadow-red-950/50">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Space_Grotesk'] text-xl font-bold uppercase text-[#F5F4F0] tracking-tight">
                Scorpion AI Field Estimator
              </h3>
              <span className="px-2 py-0.5 rounded bg-[#1F2229] border border-[#2B2F38] text-[10px] font-mono text-[#D4AF37] font-bold">
                PRO US CONTRACTOR
              </span>
            </div>
            <p className="font-mono text-xs text-[#9E9E98] mt-0.5">
              Agente IA de Cotizaciones Extra y Change Orders basado en Códigos y Costos de Texas / EE.UU.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[#22C55E] font-bold">Modelo Gemini 3.8 Activo</span>
        </div>
      </div>

      {/* Step 1: Project Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 rounded-xl bg-[#1F2229] border border-[#2B2F38]">
        <div className="space-y-1.5 md:col-span-2">
          <label className="font-mono text-xs uppercase text-[#9E9E98] block font-bold">
            1. Seleccionar Proyecto Activo para Contexto de Obra:
          </label>
          <div className="relative">
            <select
              value={selectedQuoteId}
              onChange={(e) => setSelectedQuoteId(e.target.value)}
              className="w-full bg-[#16181D] border border-[#2B2F38] text-[#F5F4F0] px-4 py-2.5 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#cc0000] font-sans"
            >
              {quotes.map((q) => (
                <option key={q.id} value={q.id}>
                  [{q.id}] {q.clientName} — {q.title} ({q.location})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#9E9E98] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-mono text-xs uppercase text-[#9E9E98] block font-bold">
            Ubicación & Presupuesto Base:
          </label>
          <div className="p-2.5 rounded bg-[#16181D] border border-[#2B2F38] text-xs font-mono text-[#D4AF37]">
            <div>{currentQuote?.location || 'San Antonio, TX'}</div>
            <div className="text-[#9E9E98] text-[11px] mt-0.5">
              Base: {currentQuote?.estimatedBudget || '$35,000 - $75,000'}
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Extra Work Input & Quick Suggestions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs uppercase text-[#9E9E98] font-bold">
            2. Describe el Trabajo Extra o Imprevisto Detectado en la Obra:
          </label>
          <span className="font-mono text-[11px] text-[#9E9E98]">
            Escribe en lenguaje natural
          </span>
        </div>

        <div className="relative">
          <textarea
            rows={3}
            value={extraInput}
            onChange={(e) => setExtraInput(e.target.value)}
            placeholder="Ejemplo: El cliente quiere agregar 6 luces empotradas LED wafer en la sala con dimmer Lutron Caseta, y además demoler un muro de 10 pies para abrir la cocina, con parcheo de tablaroca nivel 4 y retiro de escombros..."
            className="w-full bg-[#1F2229] border border-[#2B2F38] rounded-xl p-4 text-[#F5F4F0] text-sm leading-relaxed focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000]"
          />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] text-[#9E9E98] uppercase">
            Sugerencias Rápidas de extras frecuentes en San Antonio:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setExtraInput(qp.text);
                  handleGenerate(qp.text);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-[#1F2229] hover:bg-[#292a2d] text-[#F5F4F0] border border-[#2B2F38] hover:border-[#cc0000] text-xs font-['Work_Sans'] transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>{qp.title}</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Generate Button */}
        <div className="pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleGenerate()}
            className="w-full bg-[#cc0000] hover:bg-[#E60000] disabled:bg-[#410000] text-[#F5F4F0] font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-xl shadow-red-950/40 flex items-center justify-center gap-2.5 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{activeStepText || 'Calculando con IA...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <span>Cotizar Orden de Cambio con IA (Estándar USA & Texas)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Step 3: Result Card */}
      {result && (
        <div className="mt-8 pt-6 border-t border-[#2B2F38] space-y-6 animate-in fade-in duration-300">
          <div className="p-6 rounded-xl bg-[#1F2229] border border-[#cc0000]/60 shadow-xl space-y-6">
            {/* Header of Change Order */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#2B2F38]">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="bg-[#cc0000] text-white px-2 py-0.5 rounded font-bold">
                    {result.changeOrderCode}
                  </span>
                  <span className="text-[#D4AF37] font-bold">CHANGE ORDER OFICIAL</span>
                  <span className="text-[#9E9E98]">• {currentQuote?.clientName}</span>
                </div>
                <h4 className="font-['Space_Grotesk'] text-xl font-bold text-[#F5F4F0] mt-1">
                  {result.title}
                </h4>
                <p className="font-['Work_Sans'] text-xs text-[#9E9E98] mt-1 leading-relaxed max-w-3xl">
                  {result.summary}
                </p>
              </div>

              <div className="text-right font-mono">
                <span className="text-[10px] text-[#9E9E98] uppercase block">Impacto en Cronograma</span>
                <span className="text-sm font-bold text-[#22C55E] flex items-center gap-1 justify-end">
                  <Clock className="w-3.5 h-3.5" /> +{result.scheduleImpactDays} Días Hábiles
                </span>
              </div>
            </div>

            {/* US Building Code Notice */}
            <div className="p-3.5 rounded-lg bg-[#16181D] border border-[#2B2F38] flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-mono text-[11px] text-[#D4AF37] font-bold block uppercase">
                  Normativa & Códigos de Construcción de EE.UU. Aplicables:
                </span>
                <p className="font-['Work_Sans'] text-xs text-[#e3e2e6] mt-0.5 leading-relaxed">
                  {result.codeComplianceNote}
                </p>
              </div>
            </div>

            {/* Labor & Materials Itemized Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Labor breakdown */}
              <div className="space-y-3 bg-[#16181D] p-4 rounded-lg border border-[#2B2F38]">
                <div className="flex items-center justify-between font-mono text-xs text-[#F5F4F0] font-bold pb-2 border-b border-[#2B2F38]">
                  <span>Mano de Obra & Cuadrillas</span>
                  <span className="text-[#9E9E98]">Tarifas TX ($/hr)</span>
                </div>
                <div className="space-y-2 text-xs">
                  {result.laborItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1">
                      <div>
                        <span className="text-[#F5F4F0] block font-medium">{item.trade}</span>
                        <span className="text-[11px] font-mono text-[#9E9E98]">
                          {item.hours} hrs @ ${item.hourlyRate}/hr
                        </span>
                      </div>
                      <span className="font-mono font-bold text-[#F5F4F0]">
                        ${item.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material breakdown */}
              <div className="space-y-3 bg-[#16181D] p-4 rounded-lg border border-[#2B2F38]">
                <div className="flex items-center justify-between font-mono text-xs text-[#F5F4F0] font-bold pb-2 border-b border-[#2B2F38]">
                  <span>Materiales Especificados (USA)</span>
                  <span className="text-[#9E9E98]">Cantidad</span>
                </div>
                <div className="space-y-2 text-xs">
                  {result.materialItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1">
                      <div>
                        <span className="text-[#F5F4F0] block font-medium">{item.name}</span>
                        <span className="text-[11px] font-mono text-[#9E9E98]">{item.quantity}</span>
                      </div>
                      <span className="font-mono font-bold text-[#F5F4F0]">
                        ${item.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                  {result.haulingAndDisposalCost ? (
                    <div className="flex justify-between items-center py-1 pt-2 border-t border-[#2B2F38]/50">
                      <div>
                        <span className="text-[#F5F4F0] block font-medium">
                          Acarreo Remolque Ram & Vertedero
                        </span>
                        <span className="text-[11px] font-mono text-[#9E9E98]">1 Viaje Debris</span>
                      </div>
                      <span className="font-mono font-bold text-[#F5F4F0]">
                        ${result.haulingAndDisposalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-lg bg-[#16181D] border border-[#2B2F38] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
                <div>
                  <span className="text-[#9E9E98] block">Costo Directo Obra:</span>
                  <span className="text-[#F5F4F0] font-bold text-sm">
                    ${result.directCostsTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="border-l border-[#2B2F38] pl-6">
                  <span className="text-[#9E9E98] block">Supervisión & Margen (15%):</span>
                  <span className="text-[#D4AF37] font-bold text-sm">
                    +${result.overheadAndProfitAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="bg-[#1F2229] px-4 py-2 rounded-lg border border-[#cc0000]">
                <span className="font-mono text-[10px] text-[#ffb4a8] block uppercase font-bold">
                  TOTAL APROBADO A FACTURAR AL CLIENTE
                </span>
                <span className="font-['Space_Grotesk'] text-2xl font-extrabold text-[#F5F4F0]">
                  ${result.grandTotalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                </span>
              </div>
            </div>

            {/* Strategic Advice for Ricardo */}
            {result.expertAdviceForRicardo && (
              <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs">
                <span className="font-mono text-[11px] text-[#D4AF37] font-bold block uppercase mb-1">
                  💡 Consejo Estratégico Exclusivo para Ricardo (Contratista):
                </span>
                <p className="font-['Work_Sans'] text-amber-200/90 leading-relaxed">
                  {result.expertAdviceForRicardo}
                </p>
              </div>
            )}

            {/* Ready-to-Send Client Message (WhatsApp / Email) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-[#9E9E98] font-bold">
                  Mensaje Redactado Listo para Enviar al Cliente:
                </span>
                <button
                  type="button"
                  onClick={handleCopyClientText}
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-[#D4AF37] hover:underline cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedText ? '¡Copiado!' : 'Copiar Texto'}</span>
                </button>
              </div>
              <div className="p-4 rounded-lg bg-[#16181D] border border-[#2B2F38] text-xs font-mono text-[#F5F4F0] leading-relaxed whitespace-pre-wrap">
                {result.clientExplanationText}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#2B2F38]">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-['Space_Grotesk'] text-xs font-bold uppercase px-4 py-2.5 rounded-lg shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Enviar por WhatsApp al Cliente</span>
                </button>

                <button
                  type="button"
                  onClick={handleApplyToCalculator}
                  className="inline-flex items-center gap-2 bg-[#16181D] hover:bg-[#292a2d] text-[#F5F4F0] font-['Space_Grotesk'] text-xs font-bold uppercase px-4 py-2.5 rounded-lg border border-[#2B2F38] hover:border-[#cc0000] transition-colors"
                >
                  <Sliders className="w-4 h-4 text-[#D4AF37]" />
                  <span>Transferir al Cotizador Principal</span>
                </button>
              </div>

              <div className="font-mono text-[11px] text-[#9E9E98]">
                Generado con contexto de San Antonio, TX
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
