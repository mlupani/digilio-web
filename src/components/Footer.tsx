import { site, whatsappHref } from "@/lib/site";
import {
  ShieldIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  MailIcon,
  WhatsAppIcon,
  InstagramIcon,
  ArrowRightIcon,
} from "@/lib/icons";

const nav = [
  { href: "#seguros", label: "Seguros" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#faq", label: "Preguntas frecuentes" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer({ onCotizar }: { onCotizar?: () => void }) {
  return (
    <footer id="contacto" className="bg-[#0B1A33] text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-[22px] sm:text-[28px] font-bold leading-tight">
              ¿Buscás la cobertura que se adapta a vos?
            </h3>
            <p className="text-sm opacity-70 mt-2">Iniciá tu consulta en menos de un minuto.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onCotizar}
              className="h-12 px-7 rounded-full bg-[#C5962B] hover:bg-[#A98124] text-white font-semibold shadow-lg inline-flex items-center justify-center gap-2 transition"
            >
              Cotizar con el asistente
              <ArrowRightIcon width={16} height={16} />
            </button>
            <a
              href={whatsappHref("Hola Digilio e Hijo, quiero hacer una consulta.")}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-7 rounded-full border border-white/20 hover:bg-white/10 font-semibold inline-flex items-center justify-center gap-2 transition"
            >
              <WhatsAppIcon width={18} height={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1.1fr] gap-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-[#C5962B] flex items-center justify-center">
              <ShieldIcon width={20} height={20} />
            </div>
            <div>
              <div className="font-display font-bold tracking-[0.1em] text-sm">DIGILIO &amp; HIJO</div>
              <div className="text-[10.5px] tracking-[0.16em] opacity-60">PRODUCTORES ASESORES DE SEGUROS</div>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-70 leading-relaxed max-w-[320px]">
            Firma familiar de productores asesores matriculados. Asesoramiento cercano para
            familias y comercios de la zona sur del Gran Buenos Aires.
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <InstagramIcon width={17} height={17} />
            </a>
            <a
              href={whatsappHref("Hola Digilio e Hijo!")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <WhatsAppIcon width={16} height={16} />
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs tracking-widest font-semibold opacity-60">NAVEGACIÓN</div>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:opacity-100 hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs tracking-widest font-semibold opacity-60">CONTACTO</div>
          <ul className="mt-3 space-y-3 text-sm opacity-85">
            <li className="flex items-center gap-2.5">
              <PhoneIcon width={16} height={16} className="text-[#C5962B] shrink-0" />
              <a href={site.phoneHref} className="font-semibold hover:underline">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MailIcon width={16} height={16} className="text-[#C5962B] shrink-0" />
              <a href={`mailto:${site.email}`} className="hover:underline break-all">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPinIcon width={16} height={16} className="text-[#C5962B] shrink-0 mt-0.5" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ClockIcon width={16} height={16} className="text-[#C5962B] shrink-0 mt-0.5" />
              <span>{site.hours}</span>
            </li>
          </ul>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Demo — no se realizan cobranzas online
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mx-auto max-w-[1200px] px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-60">
        <span>© {new Date().getFullYear()} {site.legalName}.</span>
        <span>Matrícula SSN ·  Demo comercial · Gerli, Buenos Aires</span>
      </div>
    </footer>
  );
}
