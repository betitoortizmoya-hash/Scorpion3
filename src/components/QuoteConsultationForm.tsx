import React, { useState } from 'react';
import { QuoteRequest } from '../types';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../data/mockData';
import {
  UploadCloud,
  Send,
  Lock,
  CheckCircle2,
  MessageCircle,
  FileText,
  Building,
} from 'lucide-react';

interface QuoteConsultationFormProps {
  onNewQuoteSubmitted: (quote: QuoteRequest) => void;
  initialScope?: string;
  lang?: 'en' | 'es';
}

export const QuoteConsultationForm: React.FC<QuoteConsultationFormProps> = ({
  onNewQuoteSubmitted,
  initialScope,
  lang = 'es',
}) => {
  const [scope, setScope] = useState(initialScope || 'Kitchen & Bath Overhaul');
  const [zipcode, setZipcode] = useState('');
  const [budget, setBudget] = useState('35k-75k');
  const [timeline, setTimeline] = useState('immediate');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const scopes = [
    { id: 'Full Home / Estate Remodel', label: lang === 'es' ? 'Remodelación Total de Casa / Mansión' : 'Full Home / Estate Remodel' },
    { id: 'Kitchen & Bath Overhaul', label: lang === 'es' ? 'Remodelación de Cocina y Baños' : 'Kitchen & Bath Overhaul' },
    { id: 'Commercial Buildout', label: lang === 'es' ? 'Enmarcado Comercial / Tenant Build-Out' : 'Commercial Framing / Tenant Build-Out' },
    { id: 'Ceilings & Drywall', label: lang === 'es' ? 'Cielos Artesonados & Iluminación' : 'Custom Ceilings & Lighting Systems' },
    { id: 'Demolition & Hauling', label: lang === 'es' ? 'Demolición Pesada & Acarreo con Camión' : 'Heavy Demolition & Site Prep' },
    { id: 'Custom Addition', label: lang === 'es' ? 'Ampliaciones Estructurales Exteriores' : 'Exterior Framing & Structural Addition' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `SC-${Math.floor(1000 + Math.random() * 9000)}`;

    const newQuote: QuoteRequest = {
      id: newId,
      clientName: name || 'Nuevo Cliente',
      location: zipcode ? `ZIP ${zipcode}, San Antonio` : 'San Antonio Metro',
      title: `${scope} — ${name}`,
      scopeType: scope,
      stage: 'Pending Review',
      stageColor: '#ffb5a0',
      notes: details || 'Solicitud ingresada desde la web.',
      receivedTime: 'Justo ahora',
      attachments: fileName ? `Archivo: ${fileName}` : undefined,
      phone,
      email,
      estimatedBudget: budget,
      targetDate: timeline,
    };

    onNewQuoteSubmitted(newQuote);
    setSubmittedId(newId);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setDetails('');
    setName('');
    setPhone('');
    setEmail('');
    setFileName(null);
  };

  return (
    <section id="quote-consultation" className="w-full bg-[#16181D] py-16 lg:py-24 border-b border-[#2B2F38]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="font-mono text-xs uppercase text-[#cc0000] font-semibold tracking-wider inline-flex items-center gap-2">
            <span className="inline-block w-3 h-[2px] bg-[#cc0000]" />
            <span>{lang === 'es' ? 'Mesa Directa de Licitaciones y Presupuestos' : 'Direct Bidding Desk'}</span>
            <span className="inline-block w-3 h-[2px] bg-[#cc0000]" />
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#F5F4F0] uppercase tracking-tight">
            {lang === 'es'
              ? 'Solicita una Cotización Personalizada y Visita en Sitio'
              : 'Request a Custom Estimate & On-Site Consultation'}
          </h2>
          <p className="font-['Work_Sans'] text-sm sm:text-base text-[#9E9E98]">
            {lang === 'es'
              ? 'Proporciona los datos de tu proyecto. El estimador de campo de Scorpion revisará tus planos, levantamiento satelital o fotos y te contactará en 24-48 horas con una evaluación técnica detallada.'
              : 'Provide your project specs below. A Scorpion field estimator will review your blueprint, satellite survey, or photo uploads, and follow up within 24–48 business hours with an itemized scope evaluation.'}
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-[#1F2229] rounded-xl border border-[#2B2F38] p-6 sm:p-10 shadow-2xl relative">
          {submitted ? (
            <div className="p-8 text-center space-y-6 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E] flex items-center justify-center mx-auto text-[#22C55E]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs bg-[#16181D] text-[#D4AF37] px-3 py-1 rounded border border-[#2B2F38] font-bold">
                  {lang === 'es' ? 'FOLIO' : 'PROPOSAL'}: #{submittedId}
                </span>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold uppercase text-[#F5F4F0]">
                  {lang === 'es' ? '¡Solicitud Registrada con Éxito!' : 'Bid Request Received & Queued'}
                </h3>
                <p className="font-['Work_Sans'] text-sm text-[#9E9E98] max-w-lg mx-auto">
                  {lang === 'es'
                    ? `Gracias, ${name}. La oficina de operaciones de Scorpion ha recibido tu solicitud. El contratista general Ricardo Menchaca revisará tus especificaciones para coordinar la inspección en terreno.`
                    : `Thank you, ${name}. Our San Antonio operations desk has logged your criteria. Lead GC Ricardo Menchaca will review your specs to schedule the on-site walkthrough.`}
                </p>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="p-4 rounded-lg bg-[#16181D] border border-[#2B2F38] max-w-md mx-auto space-y-3">
                <p className="text-xs font-mono text-[#F5F4F0]">
                  {lang === 'es'
                    ? '¿Deseas una respuesta aún más rápida? Escríbenos directamente por WhatsApp con tu folio:'
                    : 'Want an even faster response? Message us directly on WhatsApp with your proposal ID:'}
                </p>
                <a
                  href={`https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(
                    `Hola Ricardo, acabo de enviar una cotización en la web con el Folio #${submittedId} para mi proyecto en San Antonio (${name}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-['Space_Grotesk'] font-bold text-xs uppercase py-3 rounded-lg shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>
                    {lang === 'es'
                      ? `Abrir WhatsApp Directo (${COMPANY_PHONE})`
                      : `Open WhatsApp Directly (${COMPANY_PHONE})`}
                  </span>
                </a>
              </div>

              <div className="pt-4">
                <button
                  onClick={resetForm}
                  className="text-xs font-mono text-[#9E9E98] hover:text-[#F5F4F0] underline"
                >
                  {lang === 'es' ? 'Enviar otra solicitud de cotización' : 'Submit another estimate request'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Scope of Work Selector */}
              <div className="space-y-3">
                <label className="font-mono text-xs text-[#9E9E98] uppercase block font-semibold">
                  {lang === 'es' ? '1. Clasificación del Proyecto / Alcance *' : '1. Project Classification / Scope Focus *'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {scopes.map((s) => (
                    <label
                      key={s.id}
                      className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                        scope === s.id
                          ? 'bg-[#16181D] border-[#cc0000] text-[#F5F4F0] ring-1 ring-[#cc0000]'
                          : 'bg-[#16181D] border-[#2B2F38] text-[#9E9E98] hover:border-[#cc0000]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="project_scope"
                        value={s.id}
                        checked={scope === s.id}
                        onChange={() => setScope(s.id)}
                        className="accent-[#cc0000] w-4 h-4"
                      />
                      <span className="font-['Work_Sans'] text-xs font-medium">{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 2: Location and Timing Brackets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#9E9E98] uppercase block">
                    {lang === 'es' ? 'Código Postal en San Antonio (ZIP) *' : 'San Antonio / Bexar ZIP Code *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    placeholder="e.g. 78258, 78209, 78006"
                    className="w-full bg-[#16181D] border border-[#2B2F38] rounded-lg px-4 py-2.5 text-[#F5F4F0] text-sm focus:outline-none focus:border-[#cc0000]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#9E9E98] uppercase block">
                    {lang === 'es' ? 'Rango de Presupuesto Estimado *' : 'Target Budget Range *'}
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#16181D] border border-[#2B2F38] rounded-lg px-4 py-2.5 text-[#F5F4F0] text-sm focus:outline-none focus:border-[#cc0000]"
                  >
                    <option value="15k-35k">$15,000 - $35,000 (Target Scope)</option>
                    <option value="35k-75k">$35,000 - $75,000 (Kitchen / Baths / Full Floor)</option>
                    <option value="75k-150k">$75,000 - $150,000 (Major Overhaul)</option>
                    <option value="150k+">$150,000+ (Full Estate / Commercial Build)</option>
                    <option value="commercial-bid">Institutional / Commercial RFP</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#9E9E98] uppercase block">
                    {lang === 'es' ? 'Fecha Estimada de Inicio *' : 'Target Start Date *'}
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-[#16181D] border border-[#2B2F38] rounded-lg px-4 py-2.5 text-[#F5F4F0] text-sm focus:outline-none focus:border-[#cc0000]"
                  >
                    <option value="immediate">
                      {lang === 'es' ? 'Despacho Inmediato (< 2 Semanas)' : 'Immediate Dispatch (< 2 Weeks)'}
                    </option>
                    <option value="30days">
                      {lang === 'es' ? 'Dentro de 30 Días' : 'Within 30 Days'}
                    </option>
                    <option value="60days">
                      {lang === 'es' ? '1 - 2 Meses (Etapa de Planificación)' : '1 - 2 Months (Planning Stage)'}
                    </option>
                    <option value="flexible">
                      {lang === 'es' ? 'Flexible / En planos' : 'Flexible / Blueprint Phase'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Step 3: Project Description */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#9E9E98] uppercase block">
                  {lang === 'es'
                    ? 'Descripción del Proyecto & Detalles Arquitectónicos *'
                    : 'Scope Description & Architectural Specifics *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={
                    lang === 'es'
                      ? 'Describe dimensiones, condiciones actuales, materiales deseados (granito, cielos artesonados, demolición de azulejos, muros de carga)...'
                      : 'Describe dimensions, current conditions, materials envisioned (granite, custom tray ceilings, tile tear-out, load-bearing questions)...'
                  }
                  className="w-full bg-[#16181D] border border-[#2B2F38] rounded-lg px-4 py-2.5 text-[#F5F4F0] text-sm focus:outline-none focus:border-[#cc0000] leading-relaxed"
                />
              </div>

              {/* Upload Plans Drop Area */}
              <div className="space-y-2">
                <label className="font-mono text-xs text-[#9E9E98] uppercase block">
                  {lang === 'es'
                    ? 'Adjuntar Planos Arquitectónicos / Fotos del Sitio (Opcional)'
                    : 'Attach Architectural Plans / Current Site Photos (Optional)'}
                </label>
                <div
                  onClick={() => document.getElementById('client-file-upload')?.click()}
                  className="border-2 border-dashed border-[#2B2F38] hover:border-[#cc0000]/80 rounded-lg p-6 text-center bg-[#16181D] cursor-pointer transition-colors"
                >
                  <input
                    id="client-file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf,.dwg"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  <UploadCloud className="w-8 h-8 text-[#9E9E98] mx-auto mb-2" />
                  <p className="font-['Work_Sans'] text-xs sm:text-sm text-[#F5F4F0]">
                    {fileName
                      ? `${lang === 'es' ? 'Archivo seleccionado:' : 'Selected file:'} ${fileName}`
                      : lang === 'es'
                      ? 'Haz clic para subir planos, bocetos o fotos del sitio'
                      : 'Click to upload blueprints, sketches, or job site photos'}
                  </p>
                  <p className="font-mono text-[11px] text-[#9E9E98] mt-1">
                    PDF, DWG, PNG, JPG (Hasta 50MB)
                  </p>
                </div>
              </div>

              {/* Step 4: Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#9E9E98] uppercase block">
                    {lang === 'es' ? 'Nombre Completo / Empresa *' : 'Full Name / Business Entity *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full bg-[#16181D] border border-[#2B2F38] rounded-lg px-4 py-2.5 text-[#F5F4F0] text-sm focus:outline-none focus:border-[#cc0000]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#9E9E98] uppercase block">
                    {lang === 'es' ? 'Teléfono Directo *' : 'Direct Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(210) 000-0000"
                    className="w-full bg-[#16181D] border border-[#2B2F38] rounded-lg px-4 py-2.5 text-[#F5F4F0] text-sm focus:outline-none focus:border-[#cc0000]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#9E9E98] uppercase block">
                    {lang === 'es' ? 'Correo Electrónico *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@example.com"
                    className="w-full bg-[#16181D] border border-[#2B2F38] rounded-lg px-4 py-2.5 text-[#F5F4F0] text-sm focus:outline-none focus:border-[#cc0000]"
                  />
                </div>
              </div>

              {/* Submission guarantee */}
              <div className="pt-4 border-t border-[#2B2F38] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 text-[#9E9E98] font-['Work_Sans'] text-xs">
                  <Lock className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>
                    {lang === 'es'
                      ? '100% Consulta Gratuita • Privacidad estricta • Entrega de propuesta en 24-48h'
                      : '100% Free Consultation • Strict privacy • Fast 24–48h itemized proposal delivery'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#cc0000] hover:bg-[#E60000] text-[#F5F4F0] font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg transition-all shadow-lg shadow-red-950/40 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'es' ? 'Enviar Proyecto para Presupuesto' : 'Submit Project for Custom Bid'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
