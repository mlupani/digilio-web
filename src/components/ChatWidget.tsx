"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  flows,
  insuranceLabels,
  insuranceMeta,
  fieldLabels,
  summaryOrder,
  buildWhatsappMessage,
  type InsuranceType,
  type FlowStep,
} from "@/lib/flows";
import { site, whatsappHref } from "@/lib/site";
import {
  ShieldIcon,
  CloseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  WhatsAppIcon,
  PhoneIcon,
  SparklesIcon,
} from "@/lib/icons";

type Msg = { id: string; from: "bot" | "user"; text: string };
type Lead = Record<string, string> & { tipo: InsuranceType };

const typeOptions: { id: InsuranceType; label: string }[] = [
  { id: "auto", label: "Auto" },
  { id: "moto", label: "Moto" },
  { id: "hogar", label: "Hogar" },
  { id: "comercio", label: "Comercio" },
  { id: "personas", label: "Personas" },
  { id: "empresas", label: "Empresas" },
  { id: "otro", label: "Otra consulta" },
];

const uid = () => Math.random().toString(36).slice(2);

export default function ChatWidget({
  initialType,
  onLead,
  onClose,
  variant = "inline",
}: {
  initialType?: InsuranceType | null;
  onLead: (lead: Lead) => void;
  onClose?: () => void;
  variant?: "inline" | "popup";
}) {
  const [type, setType] = useState<InsuranceType | null>(initialType ?? null);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const runId = useRef(0); // bumped on every reset/restart to invalidate in-flight bot lines
  const timers = useRef<Set<number>>(new Set());

  const steps: FlowStep[] | null = type && type in flows ? flows[type] : null;
  const step: FlowStep | null = steps ? steps[stepIndex] ?? null : null;
  const showTypePicker = !type && !completed && !typing;
  const showChoices = !!step && step.type === "choice" && !completed && !typing;
  const showTextInput = !!step && step.type !== "choice" && !completed && !typing;

  const push = useCallback((from: Msg["from"], text: string) => {
    setMsgs((m) => [...m, { id: uid(), from, text }]);
  }, []);

  /** Bot line with a realistic typing pause. No-ops if the run was reset meanwhile. */
  const botSay = useCallback(
    (text: string, pause = 650) =>
      new Promise<void>((resolve) => {
        const my = runId.current;
        setTyping(true);
        const t = window.setTimeout(() => {
          timers.current.delete(t);
          if (my !== runId.current) return resolve();
          setTyping(false);
          setMsgs((m) => {
            const last = m[m.length - 1];
            if (last && last.from === "bot" && last.text === text) return m; // guard double-invoke
            return [...m, { id: uid(), from: "bot", text }];
          });
          resolve();
        }, pause);
        timers.current.add(t);
      }),
    []
  );

  const resetRun = useCallback(() => {
    runId.current += 1;
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current.clear();
    setTyping(false);
  }, []);

  const greet = useCallback(async () => {
    await botSay("¡Hola! 👋 Soy el asistente de Digilio e Hijo.", 400);
    await botSay("Te ayudo a iniciar tu consulta en un minuto. ¿Qué querés asegurar?", 700);
  }, [botSay]);

  const startType = useCallback(
    async (t: InsuranceType) => {
      resetRun();
      setType(t);
      setStepIndex(0);
      setAnswers({});
      setCompleted(false);
      setError(null);
      setInput("");
      setMsgs([{ id: uid(), from: "user", text: insuranceMeta[t].title }]);
      await botSay(`Buenísimo. Vamos con ${insuranceLabels[t].toLowerCase()}.`, 500);
      await botSay(flows[t][0].question, 650);
    },
    [botSay, resetRun]
  );

  // Initial greeting — StrictMode-safe: each effect run starts a fresh, isolated sequence.
  useEffect(() => {
    resetRun();
    setMsgs([]);
    if (initialType && initialType in flows) {
      startType(initialType);
    } else {
      greet();
    }
    return () => {
      resetRun();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // autoscroll
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, completed]);

  const validate = (s: FlowStep, value: string): string | null => {
    if (!value.trim()) return "Necesito este dato para continuar.";
    if (s.validation === "whatsapp") {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 8) return "Ingresá un WhatsApp válido (ej: 11 1234-5678).";
    }
    if (s.field === "anio") {
      const n = parseInt(value, 10);
      const year = new Date().getFullYear();
      if (isNaN(n) || n < 1980 || n > year + 1) return `Ingresá un año entre 1980 y ${year + 1}.`;
    }
    if (s.type === "name" && value.trim().length < 2) return "Ingresá tu nombre.";
    return null;
  };

  const submitAnswer = async (value: string) => {
    if (!type || !steps || !step) return;
    const err = validate(step, value);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    push("user", value);
    const nextAnswers = { ...answers, [step.field]: value };
    setAnswers(nextAnswers);
    setInput("");

    const isLast = stepIndex === steps.length - 1;
    if (isLast) {
      const lead = { ...nextAnswers, tipo: type } as Lead;
      const firstName = (nextAnswers.nombre || "").split(" ")[0] || "";
      await botSay(`¡Listo${firstName ? `, ${firstName}` : ""}! Ya tengo todo lo que necesito. 🙌`, 550);
      await botSay("Un asesor de Digilio e Hijo revisa tu consulta y te contacta hoy mismo.", 700);
      resetRun(); // freeze further bot lines
      setCompleted(true);
      onLead(lead);
    } else {
      setStepIndex((i) => i + 1);
      await botSay(steps[stepIndex + 1].question, 650);
    }
  };

  const goBack = async () => {
    if (typing || completed) return;
    if (stepIndex === 0) {
      // back to type selection
      resetRun();
      setType(null);
      setStepIndex(0);
      setAnswers({});
      setMsgs([]);
      setError(null);
      await greet();
      return;
    }
    const prev = steps![stepIndex - 1];
    setStepIndex((i) => i - 1);
    setAnswers((a) => {
      const c = { ...a };
      delete c[prev.field];
      return c;
    });
    setError(null);
    setMsgs((m) => {
      // drop last user answer + last bot question
      const copy = [...m];
      if (copy.length && copy[copy.length - 1].from === "bot") copy.pop();
      if (copy.length && copy[copy.length - 1].from === "user") copy.pop();
      return copy;
    });
  };

  const restart = async () => {
    resetRun();
    setType(null);
    setStepIndex(0);
    setAnswers({});
    setMsgs([]);
    setCompleted(false);
    setInput("");
    setError(null);
    await greet();
  };

  const totalSteps = steps?.length ?? 0;
  const progress = completed ? 100 : totalSteps ? (stepIndex / totalSteps) * 100 : 0;
  const isPopup = variant === "popup";

  const lead = completed ? ({ ...answers, tipo: type } as Lead) : null;

  return (
    <div
      className={`bg-white flex flex-col min-h-0 ${
        isPopup ? "flex-1 h-full" : "rounded-[24px] border border-slate-200 shadow-[0_20px_60px_rgba(15,36,64,0.10)] h-[600px] overflow-hidden"
      }`}
    >
      {/* header */}
      <div className="px-4 sm:px-5 py-3 flex items-center justify-between bg-[#0F2440] text-white shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-white/10 text-[#C5962B] flex items-center justify-center shrink-0">
            <ShieldIcon width={18} height={18} />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold leading-none truncate">Asistente Digilio</div>
            <div className="text-[11px] text-white/70 flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "pulseDot 2s infinite" }} />
              En línea · demo
            </div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Cerrar asistente"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition shrink-0"
          >
            <CloseIcon width={15} height={15} />
          </button>
        )}
      </div>

      {/* progress */}
      {type && !completed && (
        <div className="shrink-0 bg-white border-b border-slate-100 px-4 sm:px-5 py-2 flex items-center gap-3">
          <button
            onClick={goBack}
            disabled={typing}
            className="inline-flex items-center gap-1 text-[12px] font-medium text-slate-500 hover:text-[#0F2440] disabled:opacity-40 transition"
          >
            <ArrowLeftIcon width={13} height={13} />
            Atrás
          </button>
          <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-[#C5962B] rounded-full transition-all duration-500"
              style={{ width: `${Math.max(progress, 6)}%` }}
            />
          </div>
          <span className="text-[11px] font-medium text-slate-400 tabular-nums">
            {Math.min(stepIndex + 1, totalSteps)}/{totalSteps}
          </span>
        </div>
      )}

      {/* messages */}
      <div
        ref={listRef}
        className="flex-1 min-h-0 overflow-y-auto bg-[#F7F8FA] px-3 sm:px-4 py-4 space-y-2.5"
      >
        {msgs.map((m) => (
          <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed shadow-sm ${
                m.from === "user"
                  ? "bg-[#0F2440] text-white rounded-br-sm"
                  : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1">
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-400" />
            </div>
          </div>
        )}

        {showTypePicker && msgs.length >= 1 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {typeOptions.map((o) => (
              <button
                key={o.id}
                onClick={() => startType(o.id)}
                className="px-3.5 py-2 rounded-full bg-white border border-slate-200 hover:border-[#0F2440] hover:bg-[#0F2440] hover:text-white text-[13px] font-medium text-slate-700 transition shadow-sm"
              >
                {o.label}
              </button>
            ))}
          </div>
        )}

        {showChoices && (
          <div className="flex flex-wrap gap-2 pt-1">
            {step!.options?.map((o) => (
              <button
                key={o}
                onClick={() => submitAnswer(o)}
                className="px-3.5 py-2 rounded-full bg-white border border-slate-200 hover:border-[#0F2440] hover:bg-[#0F2440] hover:text-white text-[13px] font-medium text-slate-700 transition"
              >
                {o}
              </button>
            ))}
          </div>
        )}

        {completed && lead && (
          <div className="pt-2 space-y-3">
            <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2.5 flex items-center gap-2 text-emerald-800">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <CheckIcon width={13} height={13} />
                </span>
                <span className="text-[13px] font-semibold">Consulta lista para enviar</span>
              </div>
              <dl className="px-4 py-3 space-y-1.5 text-[13px]">
                <SummaryRow k={fieldLabels.tipo} v={insuranceLabels[lead.tipo]} />
                {summaryOrder.map((key) =>
                  lead[key] ? <SummaryRow key={key} k={fieldLabels[key] ?? key} v={lead[key]} /> : null
                )}
                {lead.nombre && <SummaryRow k={fieldLabels.nombre} v={lead.nombre} />}
                {lead.whatsapp && <SummaryRow k={fieldLabels.whatsapp} v={lead.whatsapp} mono />}
              </dl>
            </div>

            <a
              href={whatsappHref(buildWhatsappMessage(lead))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-full bg-[#25D366] hover:bg-[#1EBE5A] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition shadow-[0_8px_20px_rgba(37,211,102,0.35)]"
            >
              <WhatsAppIcon width={18} height={18} />
              Enviar mi consulta por WhatsApp
            </a>
            <div className="flex gap-2">
              <a
                href={site.phoneHref}
                className="flex-1 h-10 rounded-full border border-slate-200 bg-white text-[13px] font-semibold text-[#0F2440] inline-flex items-center justify-center gap-1.5"
              >
                <PhoneIcon width={14} height={14} className="text-[#C5962B]" />
                Llamar
              </a>
              <button
                onClick={restart}
                className="flex-1 h-10 rounded-full border border-slate-200 bg-white text-[13px] font-semibold text-slate-600"
              >
                Otra consulta
              </button>
            </div>
          </div>
        )}
      </div>

      {/* input area */}
      <div className="border-t border-slate-200 bg-white p-3 shrink-0" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        {showTextInput ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitAnswer(input);
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={step?.placeholder || "Escribí tu respuesta…"}
              type={step?.type === "tel" ? "tel" : "text"}
              inputMode={step?.type === "tel" ? "tel" : "text"}
              className="flex-1 h-11 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0F2440] px-4 text-sm outline-none transition placeholder:text-slate-400"
              autoFocus={isPopup}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-11 h-11 rounded-full bg-[#C5962B] hover:bg-[#A98124] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shrink-0 transition shadow"
              aria-label="Enviar"
            >
              <ArrowRightIcon width={17} height={17} />
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-1.5 text-[12px] text-slate-400 py-1.5">
            {completed ? (
              <>
                <SparklesIcon width={13} height={13} className="text-[#C5962B]" />
                Gracias por tu consulta
              </>
            ) : typing ? (
              "El asistente está escribiendo…"
            ) : !type ? (
              "Elegí una opción para comenzar"
            ) : (
              "Tocá una opción de arriba"
            )}
          </div>
        )}
        {error && (
          <div className="mt-2 text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
            {error}
          </div>
        )}
        <div className="mt-2 text-[10.5px] text-center text-slate-400">
          Demo · los datos no se envían a ningún servidor
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-400 shrink-0">{k}</dt>
      <dd className={`text-slate-800 font-medium text-right ${mono ? "font-mono text-[12px]" : ""}`}>{v}</dd>
    </div>
  );
}
