"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { ChevronDownIcon } from "@/lib/icons";
import { site } from "@/lib/site";

const faqs = [
  {
    q: "¿Qué es un productor asesor de seguros?",
    a: "Es un profesional matriculado en la Superintendencia de Seguros de la Nación que te asesora de forma independiente, compara compañías y te acompaña en la contratación y en los siniestros. No trabajás con un call center: trabajás con nosotros.",
  },
  {
    q: "¿La cotización tiene costo?",
    a: "No. La consulta y el asesoramiento son sin cargo. Solo pagás la póliza si decidís contratar, al mismo precio que te daría la compañía.",
  },
  {
    q: "¿Con qué compañías trabajan?",
    a: "Operamos con las principales aseguradoras del país. Según tu caso, te mostramos las opciones que mejor combinan precio y cobertura.",
  },
  {
    q: "¿Me atiende una persona o un bot?",
    a: "El asistente de la web solo toma los primeros datos para agilizar. Después te contacta un asesor de Digilio e Hijo, con nombre y apellido, por WhatsApp o teléfono.",
  },
  {
    q: "¿Puedo consultar por más de un seguro?",
    a: "Sí. Podés iniciar una consulta por cada cobertura que te interese (auto, hogar, comercio, etc.) y las gestionamos todas juntas.",
  },
  {
    q: "¿Qué pasa si tengo un siniestro?",
    a: "Nos avisás y te guiamos con la denuncia y la documentación. Hacemos el seguimiento del reclamo con la compañía hasta que se resuelve.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-white border-t border-slate-200 py-12 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12">
        <Reveal>
          <div className="text-xs tracking-[0.18em] font-semibold text-[#C5962B]">PREGUNTAS FRECUENTES</div>
          <h2 className="font-display text-[28px] sm:text-[34px] font-bold text-[#0F2440] leading-tight mt-2">
            Dudas comunes
          </h2>
          <p className="text-sm text-slate-500 mt-3">
            Respuestas claras. Si te queda algo, escribinos directamente.
          </p>
          <a
            href={site.phoneHref}
            className="mt-6 hidden lg:inline-flex items-center gap-2 rounded-2xl bg-[#F7F8FA] border border-slate-200 px-4 py-3 text-sm text-slate-600"
          >
            ¿No encontrás tu respuesta?
            <span className="font-semibold text-[#0F2440] underline">Llamanos</span>
          </a>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 40}>
              <div
                className={`rounded-2xl border overflow-hidden transition ${
                  open === i ? "bg-white border-slate-300 shadow-sm" : "bg-[#F7F8FA] border-slate-200"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-[#0F2440] text-sm">{f.q}</span>
                  <span
                    className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition ${
                      open === i ? "bg-[#0F2440] text-white border-[#0F2440] rotate-180" : "bg-white border-slate-200 text-slate-500"
                    }`}
                  >
                    <ChevronDownIcon width={15} height={15} />
                  </span>
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600 animate-fadeIn">{f.a}</div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
