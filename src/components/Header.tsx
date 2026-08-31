"use client";
import { useState, useEffect } from "react";
import { site } from "@/lib/site";
import { ShieldIcon, PhoneIcon, MenuIcon, CloseIcon, ArrowRightIcon } from "@/lib/icons";

const links = [
  { href: "#seguros", label: "Seguros" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#faq", label: "Preguntas frecuentes" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header({ onCotizar }: { onCotizar: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-shadow ${
        scrolled ? "shadow-[0_2px_20px_rgba(15,36,64,0.08)] border-slate-200" : "border-slate-100 shadow-none"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 flex h-[64px] sm:h-[72px] items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2.5 min-w-0" aria-label={`${site.name} — inicio`}>
          <div className="w-9 h-9 rounded-[10px] bg-[#0F2440] flex items-center justify-center text-[#C5962B] shrink-0">
            <ShieldIcon width={20} height={20} />
          </div>
          <div className="leading-none min-w-0">
            <div className="font-display font-bold text-[14px] sm:text-[15px] tracking-[0.08em] text-[#0F2440] truncate">
              DIGILIO&nbsp;&amp;&nbsp;HIJO
            </div>
            <div className="hidden sm:block text-[10.5px] tracking-[0.14em] text-slate-500 font-medium mt-0.5">
              PRODUCTORES ASESORES DE SEGUROS
            </div>
            <div className="sm:hidden text-[9.5px] tracking-[0.12em] text-slate-500 font-medium mt-0.5">
              PRODUCTORES DE SEGUROS
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-slate-600">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[#0F2440] transition">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={site.phoneHref}
            className="hidden md:inline-flex items-center gap-2 h-10 px-4 rounded-full border border-slate-200 text-[#0F2440] text-[13px] font-semibold hover:border-slate-300 transition"
          >
            <PhoneIcon width={15} height={15} className="text-[#C5962B]" />
            {site.phoneDisplay}
          </a>
          <button
            onClick={onCotizar}
            className="hidden sm:inline-flex h-10 px-5 rounded-full bg-[#C5962B] hover:bg-[#A98124] text-white text-[13.5px] font-semibold transition items-center gap-1.5 shadow-[0_2px_10px_rgba(197,150,43,0.35)]"
          >
            Cotizar ahora
            <ArrowRightIcon width={15} height={15} />
          </button>
          <button
            onClick={onCotizar}
            className="sm:hidden h-9 px-4 rounded-full bg-[#C5962B] text-white text-[13px] font-semibold"
          >
            Cotizar
          </button>
          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-white ml-1 text-[#0F2440]"
          >
            {open ? <CloseIcon width={18} height={18} /> : <MenuIcon width={18} height={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[15px] font-medium text-slate-700 border-b border-slate-100 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.phoneHref}
            className="mt-3 flex items-center justify-center gap-2 h-11 rounded-full bg-[#0F2440] text-white text-sm font-semibold"
          >
            <PhoneIcon width={16} height={16} className="text-[#C5962B]" />
            Llamar al {site.phoneDisplay}
          </a>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> {site.area}
          </div>
        </div>
      )}
    </header>
  );
}
