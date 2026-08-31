import Image from "next/image";
import Reveal from "./Reveal";
import { ChatIcon, ScaleIcon, PhoneIcon, ArrowRightIcon } from "@/lib/icons";

const steps = [
  { n: "01", title: "Contanos qué necesitás", desc: "Elegí el tipo de seguro y respondé 3 o 4 preguntas en el asistente.", Icon: ChatIcon },
  { n: "02", title: "Comparamos coberturas", desc: "Revisamos opciones de varias aseguradoras según tu perfil y tu presupuesto.", Icon: ScaleIcon },
  { n: "03", title: "Te contactamos", desc: "Un asesor te escribe por WhatsApp con la propuesta y cierra la contratación.", Icon: PhoneIcon },
];

export default function HowItWorks({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <section className="bg-[#F7F8FA] py-12 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal className="text-center max-w-[640px] mx-auto">
          <div className="text-xs tracking-[0.18em] font-semibold text-[#C5962B]">CÓMO FUNCIONA</div>
          <h2 className="font-display text-[28px] sm:text-[34px] font-bold text-[#0F2440] mt-2">
            Tres pasos, sin formularios eternos
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Del primer mensaje a la póliza, siempre con una persona del otro lado.
          </p>
        </Reveal>

        <div className="mt-9 grid md:grid-cols-3 gap-4 relative">
          <div className="hidden md:block absolute top-[34px] left-[16%] right-[16%] h-px bg-gradient-to-r from-slate-200 via-[#C5962B]/40 to-slate-200" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="relative h-full rounded-[20px] bg-white border border-slate-200 p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#0F2440] text-white flex items-center justify-center shadow-sm relative z-10">
                  <s.Icon width={20} height={20} />
                </div>
                <div className="mt-3 text-xs font-bold tracking-widest text-[#C5962B]">{s.n}</div>
                <div className="mt-1 font-semibold text-[#0F2440]">{s.title}</div>
                <div className="mt-1.5 text-sm text-slate-500 leading-relaxed">{s.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 rounded-[22px] overflow-hidden bg-[#0F2440] text-white grid sm:grid-cols-[1.4fr_1fr]">
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <div className="font-display text-xl sm:text-2xl font-bold leading-snug">
              El asistente convierte cada consulta en un lead ordenado para el equipo.
            </div>
            <p className="mt-2 text-sm text-white/70">
              Nombre, contacto y detalle de la cobertura, listos para dar seguimiento.
            </p>
            <button
              onClick={onOpenChat}
              className="mt-4 self-start h-11 px-6 rounded-full bg-[#C5962B] hover:bg-[#A98124] text-white text-sm font-semibold inline-flex items-center gap-2 transition"
            >
              Probar el asistente
              <ArrowRightIcon width={15} height={15} />
            </button>
          </div>
          <div className="relative min-h-[160px] hidden sm:block">
            <Image
              src="/img/handshake.jpg"
              alt="Cliente firmando la documentación de su seguro"
              fill
              sizes="360px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F2440] to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
