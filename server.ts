import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System Instruction for the US General Contracting Change Order Specialist
const CONTRACTOR_SYSTEM_INSTRUCTION = `
You are the senior estimating and construction management AI Agent for Ricardo Menchaca, Master General Contractor and founder of Scorpion Performance Contractors LLC in San Antonio, Texas (Bexar County).
Your job is to generate extremely smart, realistic, and commercially viable "Change Order" (Cotizaciones de Cosas Extra / Modificaciones de Obra) estimates for residential and commercial construction projects in the United States.

KEY CONTEXT OF US & TEXAS CONSTRUCTION ENVIRONMENT:
1. GEOGRAPHIC & LEGAL CONTEXT:
   - Location: San Antonio, TX, Bexar County & Texas Hill Country (Boerne, Alamo Heights, Stone Oak, The Dominion, Bulverde, Helotes).
   - Local Building Codes: International Residential Code (IRC 2021), International Building Code (IBC), National Electrical Code (NEC 2023), City of San Antonio Development Services Department (DSD) permitting requirements, OSHA 1926 Safety standards.
   - Ground Conditions: San Antonio limestone, expansive clay soil, pier and beam vs. slab-on-grade foundations.

2. US LABOR HOURLY RATES & TRADES (Bexar County standard market rates):
   - Master Carpenter / Lead Framer: $95 - $110/hr
   - General Demolition / Laborer: $50 - $60/hr
   - Licensed Master/Journeyman Electrician: $115 - $130/hr
   - Licensed Plumber: $120 - $135/hr
   - Drywall Specialist (Level 4/5 tape, float, texture): $65 - $75/hr
   - Tile Setter / Artisan Mason: $75 - $90/hr
   - HVAC Technician: $110 - $130/hr

3. US MATERIALS, STANDARDS & BRANDING:
   - Lumber: Dimensional lumber (2x4, 2x6, 2x8, 2x10, 2x12 #2 Southern Yellow Pine or Douglas Fir), LVL (Laminated Veneer Lumber) beams, Simpson Strong-Tie hardware (hangers, hurricane ties).
   - Drywall: USG Sheetrock 1/2-inch ultralight, 5/8-inch Type X fire-code drywall for garages/ceilings, moisture-resistant purple/green board for bathrooms.
   - Electrical: Romex 12/2 and 14/2 NM-B wire, 20A GFCI/AFCI dual-function breakers, tamper-resistant Decora outlets, Lutron Caseta smart dimmers, IC-rated LED ultra-thin wafer recessed lights.
   - Plumbing: PEX-A expansion piping (Uponor), PVC Schedule 40 drain/waste/vent, copper stub-outs, Schluter-KERDI waterproofing assemblies, Ditra uncoupling membrane, Oatey shower pans.
   - Heavy Hauling & Debris: 14-yard and 16-yard Ram heavy-duty dump trailers ($450/run disposal), municipal landfill tipping fees ($75-$150/ton), Ram-Board/X-Board floor protection, ZipWall dust barriers.

4. COMMERCIAL PRICING & PROFIT DISCIPLINE:
   - Direct Costs = Labor Subtotal + Materials Subtotal + Hauling & Dump Subtotal + Permits/Inspection Subtotal.
   - Contractor Overhead & Profit (O&P): 15% - 18% standard markup on direct costs.
   - Always bill in USD ($).

OUTPUT REQUIREMENT:
You must provide a structured JSON response matching the requested schema with detailed, itemized line items, technical code references (e.g., NEC or IRC clauses), timeline impact, and a clear, persuasive client-facing justification written in professional Spanish (or English if requested) that Ricardo can send directly to the homeowner or business owner.
`;

// API endpoint for AI extra quote / change order generator
app.post('/api/ai/estimate-extra', async (req, res) => {
  try {
    const {
      projectContext, // e.g. "Michael & Sarah Vance - Alamo Heights Kitchen Vault"
      clientName,
      extraDescription, // user requested extra work description
      currentScope,
      budgetRange,
      language = 'es',
    } = req.body;

    if (!extraDescription) {
      return res.status(400).json({ error: 'Falta la descripción del trabajo extra.' });
    }

    const promptText = `
Genera una cotización completa, inteligente y detallada de ORDEN DE CAMBIO (CHANGE ORDER / TRABAJO EXTRA) para el siguiente trabajo solicitado:

DATOS DEL PROYECTO ACTUAL:
- Contratista Principal: Ricardo Menchaca (Scorpion Performance Contractors LLC, San Antonio, TX, Licencia #TX-48912)
- Cliente: ${clientName || 'Cliente Residencial'}
- Proyecto / Obra: ${projectContext || 'Remodelación en San Antonio, TX'}
- Alcance Base Original: ${currentScope || 'Remodelación integral'}
- Rango de Inversión Inicial: ${budgetRange || '$35,000 - $75,000'}

DESCRIPCIÓN DEL TRABAJO EXTRA SOLICITADO POR EL CLIENTE O DETECTADO EN SITIO:
"${extraDescription}"

Calcula con precisión de mercado estadounidense en San Antonio:
1. Título conciso del Change Order y Folio de Referencia (ej. CO-XXXX).
2. Justificación técnica y normativa de EE.UU. (menciona códigos aplicables como IRC, NEC, OSHA o permisos de la ciudad de San Antonio según aplique).
3. Mano de obra desglosada por especialidad (horas, tarifa $/hr estándar de EE.UU., subtotal).
4. Materiales comerciales especificados con nombres reales de EE.UU. (ej. 2x6 framing lumber, USG Sheetrock 1/2", Romex 12/2, cajas GFCI, membrana Schluter, etc.).
5. Retiro de escombros, acarreo en remolque o protección de sitio si aplica.
6. Cálculo de Subtotal Directo, Margen de Contratista (Overhead & Profit 15%), y Precio Total Recomendado al Cliente en USD.
7. Días adicionales estimados al cronograma de obra.
8. Explicación formal y persuasiva redactada para el cliente que Ricardo pueda copiar o enviar directamente por WhatsApp.
`;

    // If Gemini client is initialized, call it with timeout protection
    if (aiClient) {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API call timed out')), 7500)
      );

      const geminiPromise = aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction: CONTRACTOR_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              changeOrderCode: { type: Type.STRING, description: 'Código único ej: CO-1082-01' },
              title: { type: Type.STRING, description: 'Título claro y profesional del trabajo extra' },
              summary: { type: Type.STRING, description: 'Resumen ejecutivo del alcance adicional' },
              codeComplianceNote: {
                type: Type.STRING,
                description: 'Referencias técnicas a códigos de construcción de EE.UU. (IRC, NEC, IBC, permisos San Antonio)',
              },
              scheduleImpactDays: {
                type: Type.INTEGER,
                description: 'Días hábiles que este extra suma al cronograma',
              },
              laborItems: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    trade: { type: Type.STRING, description: 'Especialidad ej. Master Carpenter, Electrician, Demo Labor' },
                    hours: { type: Type.NUMBER, description: 'Horas calculadas' },
                    hourlyRate: { type: Type.NUMBER, description: 'Tarifa por hora en USD' },
                    subtotal: { type: Type.NUMBER, description: 'Subtotal en USD' },
                  },
                  required: ['trade', 'hours', 'hourlyRate', 'subtotal'],
                },
              },
              materialItems: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: 'Nombre específico de material de EE.UU.' },
                    quantity: { type: Type.STRING, description: 'Cantidad y unidad ej. 12 pcs, 250 sq ft' },
                    unitCost: { type: Type.NUMBER, description: 'Costo unitario aproximado' },
                    subtotal: { type: Type.NUMBER, description: 'Subtotal en USD' },
                  },
                  required: ['name', 'quantity', 'subtotal'],
                },
              },
              haulingAndDisposalCost: {
                type: Type.NUMBER,
                description: 'Costo de acarreo, remolque dump trailer o tasas de vertedero (0 si no aplica)',
              },
              permitsOrInspectionCost: {
                type: Type.NUMBER,
                description: 'Costo de permiso adicional o inspección si aplica (0 si no aplica)',
              },
              directCostsTotal: { type: Type.NUMBER, description: 'Suma de costos directos' },
              overheadAndProfitAmount: { type: Type.NUMBER, description: 'Margen de 15% O&P' },
              grandTotalCost: { type: Type.NUMBER, description: 'Precio total final para el cliente en USD' },
              clientExplanationText: {
                type: Type.STRING,
                description: 'Mensaje redactado listo para enviar al cliente por WhatsApp o correo',
              },
              expertAdviceForRicardo: {
                type: Type.STRING,
                description: 'Consejo estratégico interno para Ricardo (riesgos ocultos, contingencias, compras)',
              },
            },
            required: [
              'changeOrderCode',
              'title',
              'summary',
              'codeComplianceNote',
              'scheduleImpactDays',
              'laborItems',
              'materialItems',
              'directCostsTotal',
              'overheadAndProfitAmount',
              'grandTotalCost',
              'clientExplanationText',
            ],
          },
        },
      });

      const response: any = await Promise.race([geminiPromise, timeoutPromise]);
      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, data: parsed, source: 'gemini-3.8-flash' });
    } else {
      // Fallback deterministic estimator with realistic US construction metrics
      const fallbackResult = generateFallbackEstimate(extraDescription, clientName, projectContext);
      return res.json({ success: true, data: fallbackResult, source: 'local-us-estimator' });
    }
  } catch (error: any) {
    console.error('Error generating extra quote with Gemini:', error);
    // Return fallback with error message so user is never blocked
    const fallbackResult = generateFallbackEstimate(
      req.body.extraDescription || 'Trabajo adicional general',
      req.body.clientName || 'Cliente',
      req.body.projectContext || 'Obra en San Antonio'
    );
    return res.json({
      success: true,
      data: fallbackResult,
      source: 'fallback-offline',
      note: 'Generado con motor heurístico de costos de EE.UU. (San Antonio Market Rates).',
    });
  }
});

function generateFallbackEstimate(description: string, client: string, project: string) {
  const descLower = description.toLowerCase();
  const isElectrical = descLower.includes('luz') || descLower.includes('enchufe') || descLower.includes('electr') || descLower.includes('led') || descLower.includes('outlet');
  const isPlumbing = descLower.includes('plomer') || descLower.includes('fuga') || descLower.includes('tubo') || descLower.includes('tina') || descLower.includes('regadera') || descLower.includes('shower');
  const isDrywall = descLower.includes('tablaroca') || descLower.includes('drywall') || descLower.includes('pared') || descLower.includes('muro') || descLower.includes('yeso');
  const isFraming = descLower.includes('viga') || descLower.includes('carga') || descLower.includes('madera') || descLower.includes('lvl') || descLower.includes('framing');

  let laborHoursLead = 12;
  let laborHoursTech = isElectrical || isPlumbing ? 14 : 6;
  let laborHoursDemo = 10;
  let scheduleDays = 3;

  if (isFraming) {
    laborHoursLead += 16;
    laborHoursDemo += 12;
    scheduleDays += 3;
  }

  const laborItems = [
    { trade: 'Master Carpenter / Lead Framer', hours: laborHoursLead, hourlyRate: 95, subtotal: laborHoursLead * 95 },
    { trade: isElectrical ? 'Certified Electrician (NEC Code)' : isPlumbing ? 'Licensed Plumber (TX Code)' : 'Specialty Finisher', hours: laborHoursTech, hourlyRate: 120, subtotal: laborHoursTech * 120 },
    { trade: 'Demolition & Site Containment Crew', hours: laborHoursDemo, hourlyRate: 55, subtotal: laborHoursDemo * 55 },
  ];

  const materialItems = [
    { name: isFraming ? 'Structural Lumber (2x6 SYP / LVL Header) & Simpson Ties' : 'USG Sheetrock 1/2" Ultralight Panels & Joint Compound', quantity: '1 lot', unitCost: 480, subtotal: 480 },
    { name: isElectrical ? 'Romex 12/2 NM-B Wire, 6x Recessed LED Wafers, Lutron Dimmer & GFCI' : isPlumbing ? 'PEX-A 3/4" & 1/2" Tubing, SharkBite / Uponor Pro Fittings & Valves' : 'Premium Fasteners, Primer & Sherwin-Williams ProMar Paint', quantity: '1 set', unitCost: 650, subtotal: 650 },
    { name: 'Surface Protection (X-Board & ZipWall Poly Enclosure)', quantity: '1 kit', unitCost: 220, subtotal: 220 },
  ];

  const laborSub = laborItems.reduce((acc, cur) => acc + cur.subtotal, 0);
  const matSub = materialItems.reduce((acc, cur) => acc + cur.subtotal, 0);
  const haulingCost = 450;
  const directCosts = laborSub + matSub + haulingCost;
  const overhead = directCosts * 0.15;
  const grandTotal = directCosts + overhead;

  const coNum = `CO-${Math.floor(1000 + Math.random() * 9000)}-01`;

  return {
    changeOrderCode: coNum,
    title: `Orden de Cambio: ${description.slice(0, 45)}...`,
    summary: `Modificación de alcance de obra en ${project || 'San Antonio'} para incorporar: ${description}. Incluye cuadrilla certificada de Texas, protección de áreas habitadas y materiales estándar IRC/NEC.`,
    codeComplianceNote: isElectrical
      ? 'Cumplimiento con NEC 2023 Artículo 210 (circuitos ramales GFCI/AFCI en áreas habitadas) y normativa de la Ciudad de San Antonio.'
      : isPlumbing
      ? 'Cumplimiento con Código Uniforme de Plomería de Texas (UPC) y pruebas de presión con aire/agua antes de sellado de muros.'
      : 'Cumplimiento con IRC 2021 Sección R502/R602 para estabilidad de entramados de madera y tablaroca con clasificación contra incendios.',
    scheduleImpactDays: scheduleDays,
    laborItems,
    materialItems,
    haulingAndDisposalCost: haulingCost,
    permitsOrInspectionCost: 0,
    directCostsTotal: directCosts,
    overheadAndProfitAmount: overhead,
    grandTotalCost: grandTotal,
    clientExplanationText: `Estimado/a ${client || 'cliente'}, le adjunto la estimación formal para la orden de cambio adicional solicitada en su proyecto ("${description.slice(0, 60)}..."). El costo directo asciende a $${directCosts.toLocaleString('en-US', { minimumFractionDigits: 2 })} y con el margen de supervisión y garantía de 15% queda en un total de $${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD, sumando aprox. ${scheduleDays} días hábiles al cronograma de entrega. Quedo atento a su confirmación para proceder con la orden de compra y el despacho de materiales. — Ricardo Menchaca, Scorpion Performance Contractors.`,
    expertAdviceForRicardo: 'Revisa si los circuitos existentes tienen capacidad en el panel principal (breaker box de 200A) antes de agregar cargas. Asegura que el cliente firme esta Orden de Cambio antes de iniciar cualquier demolición para evitar disputas de cobro.',
  };
}

// In development, mount Vite dev server as middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist folder
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Scorpion Contractors server running on http://0.0.0.0:${port}`);
  });
}

startServer();
