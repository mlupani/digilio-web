import Image from "next/image";
import Reveal from "./Reveal";
import { site } from "@/lib/site";
import { ScaleIcon, HeartIcon, BoltIcon, AwardIcon, MapPinIcon } from "@/lib/icons";

const benefits = [
  { title: "Comparamos por vos", desc: "Analizamos varias aseguradoras y te mostramos la relación precio-cobertura que más te conviene.", Icon: ScaleIcon },
  { title: "Atención de verdad", desc: "Un asesor con nombre y apellido, que te atiende por WhatsApp o en persona en Gerli.", Icon: HeartIcon },
  { title: "Respuesta en el día", desc: "Dejás tus datos y te contactamos el mismo día hábil para avanzar.", Icon: BoltIcon },
  { title: "Te acompañamos en el siniestro", desc: "Si pasa algo, gestionamos el reclamo con la compañía para que no estés solo.", Icon: AwardIcon },
];

export default function ValueProp() {
  return (
    <section id="nosotros" className="bg-white border-y border-slate-200 py-12 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-12 items-center">
        <Reveal className="relative">
          <div className="relative rounded-[24px] overflow-hidden border border-slate-200 shadow-[0_24px_60px_rgba(15,36,64,0.14)] aspect-[4/5] max-w-[420px] mx-auto lg:mx-0">
            <Image
              src="/img/advisor.jpg"
              alt="Asesora de Digilio e Hijo en la oficina"
              fill
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 right-2 sm:right-6 lg:-right-4 rounded-2xl bg-[#0F2440] text-white px-5 py-4 shadow-xl">
            <div className="font-display text-2xl font-bold">+20 años</div>
            <div className="text-xs opacity-75">asesorando en la zona sur</div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <div className="text-xs tracking-[0.18em] font-semibold text-[#C5962B]">NOSOTROS</div>
            <h2 className="font-display text-[28px] sm:text-[36px] font-bold leading-[1.05] text-[#0F2440] mt-2">
              Un seguro no debería <br className="hidden sm:block" /> ser complicado
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600 max-w-[540px]">
              <b className="text-[#0F2440]">Digilio e Hijo</b> es una firma familiar de productores
              asesores de seguros. Dos generaciones trabajando cara a cara con las familias,
              los autos y los comercios de Gerli, Avellaneda y alrededores. Te explicamos las
              coberturas en criollo y elegimos juntos.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-[#F7F8FA] border border-slate-200 rounded-full px-3 py-1.5">
              <MapPinIcon width={15} height={15} className="text-[#C5962B]" />
              {site.address}
            </div>
          </Reveal>

          <div className="mt-7 grid sm:grid-cols-2 gap-3.5">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 60}>
                <div className="h-full rounded-2xl bg-[#F7F8FA] border border-slate-200 p-4 hover:border-slate-300 transition">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0F2440]">
                    <b.Icon width={18} height={18} />
                  </div>
                  <div className="mt-3 font-semibold text-[#0F2440] text-sm leading-tight">{b.title}</div>
                  <div className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{b.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
