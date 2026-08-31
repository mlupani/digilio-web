"use client";
import type { InsuranceType } from "@/lib/flows";
import { insuranceLabels, fieldLabels, summaryOrder } from "@/lib/flows";
import Reveal from "./Reveal";
import {
  ShieldIcon,
  ArrowRightIcon,
  SparklesIcon,
  CheckIcon,
  CarIcon,
  HomeIcon,
  StoreIcon,
  FamilyIcon,
} from "@/lib/icons";

const quick: { id: InsuranceType; label: string; Icon: typeof CarIcon }[] = [
  { id: "auto", label: "Auto", Icon: CarIcon },
  { id: "hogar", label: "Hogar", Icon: HomeIcon },
  { id: "comercio", label: "Comercio", Icon: StoreIcon },
  { id: "personas", label: "Personas", Icon: FamilyIcon },
];

export default function AssistantSection({
  lead,
  onOpenChat,
}: {
  lead: Record<string, string> | null;
  onOpenChat: (t?: InsuranceType) => void;
}) {
  return (
    <section id="asistente" className="py-12 sm:py-16 bg-[#F7F8FA]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal className="text-center max-w-[680px] mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
            <SparklesIcon width={14} height={14} className="text-[#C5962B]" />
            Asistente de consultas · demo interactiva
          </div>
          <h2 className="font-display text-[28px] sm:text-[38px] font-bold text-[#0F2440] leading-tight mt-4">
            Cada consulta, ordenada y lista para responder
          </h2>
          <p className="text-sm sm:text-[15px] text-slate-500 mt-3">
            Así se vería el asistente en la web de Digilio e Hijo: el cliente elige una cobertura,
            responde unas preguntas y el equipo recibe el lead armado.
          </p>
        </Reveal>

        <div className="mt-9 grid lg:grid-cols-[1fr_0.85fr] gap-5 items-start">
          {/* Launcher */}
          <Reveal className="rounded-[24px] bg-white border border-slate-200 shadow-[0_20px_60px_rgba(15,36,64,0.08)] p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#0F2440] text-[#C5962B] flex items-center justify-center">
                <ShieldIcon width={20} height={20} />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0F2440]">Asistente Digilio</div>
                <div className="text-xs text-emerald-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" style={{ animation: "pulseDot 2s infinite" }} />
                  En línea · responde al instante
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-[#F7F8FA] border border-slate-200 p-4">
              <div className="flex gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0F2440] text-[#C5962B] flex items-center justify-center shrink-0">
                  <ShieldIcon width={15} height={15} />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-[13.5px] text-slate-700 leading-relaxed shadow-sm">
                  ¡Hola! 👋 Te ayudo a iniciar tu consulta en un minuto. ¿Qué querés asegurar?
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {quick.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => onOpenChat(q.id)}
                    className="h-10 rounded-full bg-white border border-slate-200 hover:border-[#0F2440] hover:bg-[#0F2440] hover:text-white text-[12.5px] font-semibold text-slate-700 transition inline-flex items-center justify-center gap-1.5"
                  >
                    <q.Icon width={15} height={15} />
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenChat()}
              className="mt-4 w-full h-[52px] rounded-full bg-[#C5962B] hover:bg-[#A98124] text-white font-semibold inline-flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(197,150,43,0.35)] transition"
            >
              Abrir el asistente
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRightIcon width={15} height={15} />
              </span>
            </button>
            <div className="mt-2.5 text-center text-xs text-slate-400">
              Se abre como ventana · también en la burbuja de abajo a la derecha
            </div>
          </Reveal>

          {/* Lead preview */}
          <Reveal delay={80} className="rounded-[24px] bg-white border border-slate-200 shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="text-[11px] tracking-widest font-bold text-slate-400">LEAD GENERADO — DEMO</div>
              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                  lead ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"
                }`}
              >
                {lead ? "Nueva consulta" : "Esperando"}
              </span>
            </div>

            {!lead ? (
              <div className="mt-4 rounded-2xl bg-[#F7F8FA] border border-dashed border-slate-300 p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-300">
                  <SparklesIcon width={18} height={18} />
                </div>
                <div className="mt-3 text-sm font-medium text-slate-600">Todavía no hay lead</div>
                <div className="text-xs text-slate-400 mt-1">
                  Completá el asistente y mirá cómo se arma la consulta acá.
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-[#0F2440] text-white px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white text-[#0F2440] flex items-center justify-center font-bold text-sm">
                    {(lead.nombre || "?").slice(0, 1).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold leading-none truncate">{lead.nombre || "—"}</div>
                    <div className="text-xs opacity-80">
                      {lead.tipo ? insuranceLabels[lead.tipo as InsuranceType] : ""}
                    </div>
                  </div>
                  <span className="ml-auto text-[11px] bg-emerald-500 text-white px-2 py-1 rounded-full font-semibold">
                    Nuevo
                  </span>
                </div>
                <dl className="p-4 space-y-2 text-[13px]">
                  {summaryOrder.map((key) =>
                    lead[key] ? (
                      <div key={key} className="flex justify-between gap-4">
                        <dt className="text-slate-400 shrink-0">{fieldLabels[key] ?? key}</dt>
                        <dd className="text-slate-800 font-medium text-right">{lead[key]}</dd>
                      </div>
                    ) : null
                  )}
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400 shrink-0">{fieldLabels.whatsapp}</dt>
                    <dd className="text-slate-800 font-medium text-right font-mono text-[12px]">{lead.whatsapp || "—"}</dd>
                  </div>
                </dl>
                <div className="px-4 pb-4 flex gap-2">
                  <button className="flex-1 h-9 rounded-full bg-[#0F2440] text-white text-xs font-semibold">Ver en CRM</button>
                  <button className="flex-1 h-9 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700">
                    Contactar
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 space-y-2">
              {["Nombre y WhatsApp del interesado", "Detalle de la cobertura pedida", "Listo para responder por WhatsApp"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-[12.5px] text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckIcon width={10} height={10} />
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
