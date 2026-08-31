"use client";
import { useEffect, useState } from "react";
import ChatWidget from "./ChatWidget";
import type { InsuranceType } from "@/lib/flows";
import { whatsappHref } from "@/lib/site";
import { ChatIcon, CloseIcon, WhatsAppIcon } from "@/lib/icons";

export default function FloatingAssistant({
  open,
  initialType,
  onOpen,
  onClose,
  onLead,
}: {
  open: boolean;
  initialType: InsuranceType | null;
  onOpen: (t?: InsuranceType) => void;
  onClose: () => void;
  onLead: (lead: Record<string, string>) => void;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  // gentle tooltip nudge once, after the user has had a moment on the page
  useEffect(() => {
    const t = window.setTimeout(() => setShowTooltip(true), 3500);
    const h = window.setTimeout(() => setShowTooltip(false), 11000);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(h);
    };
  }, []);

  const waHref = whatsappHref("Hola Digilio e Hijo, quiero hacer una consulta sobre un seguro.");

  return (
    <>
      {/* Backdrop (mobile full-screen + desktop dim) */}
      {open && (
        <button
          aria-label="Cerrar asistente"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#0F2440]/40 backdrop-blur-[2px] sm:bg-[#0F2440]/20"
        />
      )}

      {/* Popup */}
      <div
        className={`fixed z-50 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          inset-0 sm:inset-auto sm:bottom-[92px] sm:right-6 sm:w-[400px] sm:h-[min(660px,calc(100dvh-120px))]
          ${open ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-3 opacity-0 pointer-events-none"}
        `}
      >
        <div className="flex flex-col h-full w-full bg-white sm:rounded-[22px] shadow-[0_24px_64px_rgba(15,36,64,0.30)] sm:border border-slate-200 overflow-hidden">
          {open && (
            <ChatWidget
              key={initialType ?? "start"}
              initialType={initialType}
              onLead={onLead}
              onClose={onClose}
              variant="popup"
            />
          )}
        </div>
      </div>

      {/* Floating bubbles — hidden on mobile while the full-screen popup is open */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 ${
          open ? "hidden sm:flex" : "flex"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {!open && showTooltip && (
          <div className="hidden sm:flex items-center gap-2 bg-[#0F2440] text-white text-xs font-medium px-3.5 py-2 rounded-full shadow-lg whitespace-nowrap animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: "pulseDot 2s infinite" }} />
            ¿Querés cotizar? Escribinos
          </div>
        )}

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hablar por WhatsApp"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5A] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition"
        >
          <WhatsAppIcon width={26} height={26} />
        </a>

        <button
          onClick={() => (open ? onClose() : onOpen())}
          aria-label={open ? "Cerrar asistente" : "Abrir asistente Digilio"}
          aria-expanded={open}
          className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-[0_10px_28px_rgba(15,36,64,0.28)] transition-all
            ${open ? "bg-white border border-slate-200 text-[#0F2440]" : "bg-[#0F2440] hover:bg-[#162E52] text-white"}`}
        >
          {open ? <CloseIcon width={22} height={22} /> : <ChatIcon width={26} height={26} />}
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          )}
        </button>
      </div>
    </>
  );
}
