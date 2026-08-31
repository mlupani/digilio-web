"use client";
import type { InsuranceType } from "@/lib/flows";
import { insuranceMeta } from "@/lib/flows";
import Reveal from "./Reveal";
import {
  CarIcon,
  MotorcycleIcon,
  HomeIcon,
  StoreIcon,
  FamilyIcon,
  BuildingIcon,
  ChatIcon,
  ArrowRightIcon,
} from "@/lib/icons";

const iconMap = {
  car: CarIcon,
  motorcycle: MotorcycleIcon,
  home: HomeIcon,
  store: StoreIcon,
  family: FamilyIcon,
  building: BuildingIcon,
  chat: ChatIcon,
};

const order: InsuranceType[] = ["auto", "moto", "hogar", "comercio", "personas", "empresas"];

export default function InsuranceSelector({ onSelect }: { onSelect: (t: InsuranceType) => void }) {
  return (
    <section id="seguros" className="bg-[#F7F8FA]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 sm:py-16">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs tracking-[0.18em] font-semibold text-[#C5962B]">COBERTURAS</div>
            <h2 className="font-display text-[28px] sm:text-[34px] font-bold text-[#0F2440] leading-tight mt-2">
              ¿Qué querés asegurar?
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Elegí una cobertura y el asistente arma tu consulta en menos de un minuto.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {order.map((id, i) => {
            const meta = insuranceMeta[id];
            const Icon = iconMap[meta.icon];
            return (
              <Reveal key={id} delay={i * 60}>
                <button
                  onClick={() => onSelect(id)}
                  className="group relative w-full text-left rounded-[20px] border border-slate-200 bg-white p-4 sm:p-5 hover:border-[#0F2440]/25 hover:shadow-[0_14px_32px_rgba(15,36,64,0.09)] hover:-translate-y-0.5 transition flex flex-col h-full"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F1F5F9] text-[#0F2440] group-hover:bg-[#0F2440] group-hover:text-white flex items-center justify-center transition">
                    <Icon width={22} height={22} />
                  </div>
                  <div className="mt-3 font-semibold text-[#0F2440] text-[15px]">{meta.title}</div>
                  <div className="text-[13px] text-slate-500 leading-snug mt-1 flex-1">{meta.desc}</div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0F2440] group-hover:text-[#C5962B] transition">
                    Cotizar
                    <ArrowRightIcon width={14} height={14} />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-4 rounded-2xl bg-white border border-slate-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="w-9 h-9 rounded-full bg-[#F1F5F9] text-[#0F2440] flex items-center justify-center shrink-0">
              <ChatIcon width={18} height={18} />
            </span>
            ¿No sabés qué cobertura necesitás? Contanos tu caso y te orientamos.
          </div>
          <button
            onClick={() => onSelect("otro")}
            className="h-10 px-5 rounded-full bg-[#0F2440] text-white text-sm font-semibold hover:bg-[#162E52] transition shrink-0"
          >
            Consultar
          </button>
        </Reveal>
      </div>
    </section>
  );
}
