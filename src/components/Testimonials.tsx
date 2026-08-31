import Image from "next/image";
import Reveal from "./Reveal";
import { StarIcon } from "@/lib/icons";

const testimonials = [
  {
    name: "Carla Giménez",
    place: "Gerli",
    img: "/img/t1.jpg",
    quote:
      "Renové el seguro del auto en 10 minutos por WhatsApp. Me explicaron todo y quedé pagando menos que antes.",
  },
  {
    name: "Diego Ferreyra",
    place: "Lanús",
    img: "/img/t2.jpg",
    quote:
      "Aseguré el local con ellos. Cuando tuve un problema con una vidriera, se encargaron del reclamo de punta a punta.",
  },
  {
    name: "Rocío Martínez",
    place: "Avellaneda",
    img: "/img/t3.jpg",
    quote:
      "Atención de barrio, cercana. Te responden en el momento y no te marean con letra chica.",
  },
];

export default function Testimonials() {
  return (
    <section id="opiniones" className="bg-white border-y border-slate-200 py-12 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal className="text-center max-w-[600px] mx-auto">
          <div className="text-xs tracking-[0.18em] font-semibold text-[#C5962B]">OPINIONES</div>
          <h2 className="font-display text-[28px] sm:text-[34px] font-bold text-[#0F2440] mt-2">
            Lo que dicen los clientes
          </h2>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500">
            <span className="flex text-[#C5962B]">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} width={16} height={16} />
              ))}
            </span>
            Basado en la experiencia de familias y comercios de la zona
          </div>
        </Reveal>

        <div className="mt-9 grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="h-full rounded-[20px] border border-slate-200 bg-[#F7F8FA] p-6 flex flex-col">
                <span className="flex text-[#C5962B]">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} width={15} height={15} />
                  ))}
                </span>
                <blockquote className="mt-3 text-[14.5px] leading-relaxed text-slate-700 flex-1">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 relative shrink-0">
                    <Image src={t.img} alt={t.name} fill sizes="40px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#0F2440]">{t.name}</span>
                    <span className="block text-xs text-slate-500">{t.place}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-center text-[11px] text-slate-400">
          Testimonios ilustrativos para esta demo.
        </p>
      </div>
    </section>
  );
}
