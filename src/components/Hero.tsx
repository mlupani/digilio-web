"use client";
import Image from "next/image";
import { site } from "@/lib/site";
import {
  ArrowRightIcon,
  PhoneIcon,
  ShieldIcon,
  StarIcon,
  BoltIcon,
  CheckIcon,
} from "@/lib/icons";

export default function Hero({ onPrimary }: { onPrimary: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#F7F8FA]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-[#0F2440]/[0.04] blur-2xl" />
        <div className="absolute top-40 -left-32 w-[400px] h-[400px] rounded-full bg-[#C5962B]/[0.07] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 py-10 sm:py-14 lg:py-[68px] grid lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-10 items-center">
        {/* Copy */}
        <div className="animate-fadeInUp">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500" style={{ animation: "pulseDot 2s infinite" }} />
            Atención personalizada en Gerli · Respuesta en el día
          </div>

          <h1 className="mt-6 font-display text-[33px] sm:text-[46px] lg:text-[54px] font-bold leading-[1.05] tracking-tight text-[#0F2440]">
            Protegé{" "}
            <span className="relative inline-block">
              <span className="relative z-10">lo que más</span>
              <span className="absolute left-0 right-0 bottom-[3px] h-[7px] bg-[#C5962B]/30 rounded-sm" />
            </span>
            <br />
            te importa
          </h1>

          <p className="mt-4 text-[16px] sm:text-[17px] leading-relaxed text-slate-600 max-w-[520px]">
            Somos productores asesores matriculados. Comparamos coberturas de las
            principales aseguradoras del país y te acompañamos antes, durante y
            después de contratar. Sin vueltas.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onPrimary}
              className="h-[52px] px-7 rounded-full bg-[#0F2440] hover:bg-[#162E52] text-white font-semibold text-[15px] inline-flex items-center justify-center gap-2.5 shadow-[0_10px_28px_rgba(15,36,64,0.28)] transition"
            >
              Cotizar con el asistente
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowRightIcon width={15} height={15} />
              </span>
            </button>
            <a
              href={site.phoneHref}
              className="h-[52px] px-7 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-[#0F2440] font-semibold text-[15px] inline-flex items-center justify-center gap-2 transition"
            >
              <PhoneIcon width={17} height={17} className="text-[#C5962B]" />
              Hablar con un asesor
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px] font-medium text-slate-500">
            {["Asesoría sin cargo", "Coberturas comparadas", "Gestión de siniestros"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span className="w-[18px] h-[18px] rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckIcon width={11} height={11} />
                </span>
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-3 text-xs text-slate-500 border-t border-slate-200 pt-5 max-w-[520px]">
            <div className="flex -space-x-2">
              {["/img/t1.jpg", "/img/t2.jpg", "/img/t3.jpg"].map((src) => (
                <span key={src} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative">
                  <Image src={src} alt="" fill sizes="28px" className="object-cover" />
                </span>
              ))}
            </div>
            <span className="flex flex-col gap-0.5">
              <span className="flex text-[#C5962B]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} width={13} height={13} />
                ))}
              </span>
              <span>
                <b className="text-[#0F2440]">Familias y comercios</b> de la zona confían en nosotros
              </span>
            </span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative lg:pl-4 animate-fadeInUp" style={{ animationDelay: "80ms" }}>
          <div className="relative rounded-[26px] overflow-hidden border border-slate-200 shadow-[0_28px_70px_rgba(15,36,64,0.18)] aspect-[4/5] sm:aspect-[5/5] lg:aspect-[4/4.2] bg-[#0F2440]">
            <Image
              src="/img/hero-family.jpg"
              alt="Una familia mirando el atardecer, tomada de la mano"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2440]/75 via-[#0F2440]/10 to-transparent" />

            {/* top-left badge */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[11px] font-semibold text-[#0F2440] shadow-lg">
              <ShieldIcon width={14} height={14} className="text-[#C5962B]" />
              Productores matriculados · SSN
            </div>

            {/* bottom caption */}
            <div className="hidden sm:block absolute bottom-4 left-4 max-w-[55%] text-white text-[13px] font-medium leading-snug drop-shadow">
              Dos generaciones asesorando en Gerli y Avellaneda.
            </div>
          </div>

          {/* floating quote card */}
          <div className="absolute -bottom-6 right-2 sm:-right-5 w-[224px] rounded-2xl bg-white border border-slate-200 shadow-[0_18px_44px_rgba(15,36,64,0.20)] p-4 animate-float">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-slate-400">
              <BoltIcon width={13} height={13} className="text-[#C5962B]" />
              COTIZÁS EN 1 MINUTO
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#0F2440] text-white flex items-center justify-center text-[11px] font-bold">D</span>
              <div className="text-[12.5px] leading-tight text-slate-600">
                El asistente toma tus datos y te contacta un asesor real.
              </div>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-2/3 bg-[#C5962B] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
