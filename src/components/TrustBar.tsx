const insurers = [
  "Sancor Seguros",
  "La Caja",
  "Federación Patronal",
  "San Cristóbal",
  "Rivadavia Seguros",
  "Mercantil Andina",
  "Zurich",
  "Provincia Seguros",
  "Allianz",
  "Río Uruguay",
];

export default function TrustBar() {
  const row = [...insurers, ...insurers];
  return (
    <section aria-label="Compañías con las que trabajamos" className="bg-white border-y border-slate-200">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-7">
        <p className="text-center text-xs font-semibold tracking-[0.16em] text-slate-400">
          TRABAJAMOS CON LAS PRINCIPALES ASEGURADORAS DEL PAÍS
        </p>
        <div className="marquee-mask mt-4 overflow-hidden">
          <div className="marquee-track gap-3">
            {row.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="shrink-0 inline-flex items-center h-9 px-4 rounded-full border border-slate-200 bg-[#F7F8FA] text-[13px] font-semibold text-slate-500"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-400">
          Logos y compañías a modo ilustrativo para esta demo.
        </p>
      </div>
    </section>
  );
}
