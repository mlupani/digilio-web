export type InsuranceType =
  | "auto"
  | "moto"
  | "hogar"
  | "comercio"
  | "personas"
  | "empresas"
  | "otro";

export type FlowStep = {
  id: string;
  question: string;
  field: string;
  type: "choice" | "text" | "tel" | "name";
  options?: string[];
  placeholder?: string;
  validation?: "whatsapp" | "name";
};

export const insuranceLabels: Record<InsuranceType, string> = {
  auto: "Seguro Automotor",
  moto: "Seguro de Moto",
  hogar: "Seguro de Hogar",
  comercio: "Seguro de Comercio",
  personas: "Seguro de Personas",
  empresas: "Seguro para Empresas",
  otro: "Otra consulta",
};

/** Icon key (resolved in components via lib/icons) + copy for the coverage grid. */
export const insuranceMeta: Record<
  InsuranceType,
  { icon: "car" | "motorcycle" | "home" | "store" | "family" | "building" | "chat"; title: string; desc: string }
> = {
  auto: { icon: "car", title: "Auto", desc: "Responsabilidad civil, terceros completo o todo riesgo." },
  moto: { icon: "motorcycle", title: "Moto", desc: "Coberturas para tu moto, con o sin franquicia." },
  hogar: { icon: "home", title: "Hogar", desc: "Incendio, robo, daños y responsabilidad civil." },
  comercio: { icon: "store", title: "Comercio", desc: "Protegé tu local, mercadería y empleados." },
  personas: { icon: "family", title: "Personas", desc: "Vida, accidentes personales y sepelio." },
  empresas: { icon: "building", title: "Empresas", desc: "ART, flota, caución y riesgos del trabajo." },
  otro: { icon: "chat", title: "Otra consulta", desc: "Contanos qué necesitás y te asesoramos." },
};

/** Human labels for lead fields — used in the lead card and the WhatsApp handoff. */
export const fieldLabels: Record<string, string> = {
  tipo: "Seguro",
  uso: "Uso",
  vehiculo: "Vehículo",
  anio: "Año",
  vivienda: "Tipo de vivienda",
  rubro: "Rubro",
  actividad: "Actividad",
  dotacion: "Empleados",
  cobertura: "Cobertura",
  localidad: "Localidad",
  consulta: "Consulta",
  nombre: "Nombre",
  whatsapp: "WhatsApp",
};

export const flows: Record<InsuranceType, FlowStep[]> = {
  auto: [
    { id: "uso", question: "¿El vehículo es de uso particular o comercial?", field: "uso", type: "choice", options: ["Particular", "Comercial"] },
    { id: "vehiculo", question: "¿Marca y modelo del vehículo?", field: "vehiculo", type: "text", placeholder: "Ej: Toyota Corolla XEI" },
    { id: "anio", question: "¿De qué año es?", field: "anio", type: "text", placeholder: "Ej: 2022" },
    { id: "localidad", question: "¿En qué localidad circulás habitualmente?", field: "localidad", type: "text", placeholder: "Ej: Gerli" },
    { id: "nombre", question: "Perfecto. ¿A nombre de quién derivo la consulta?", field: "nombre", type: "name", placeholder: "Tu nombre y apellido" },
    { id: "whatsapp", question: "¿A qué WhatsApp te contactamos?", field: "whatsapp", type: "tel", placeholder: "11 1234-5678", validation: "whatsapp" },
  ],
  moto: [
    { id: "vehiculo", question: "¿Marca y modelo de la moto?", field: "vehiculo", type: "text", placeholder: "Ej: Honda Wave 110" },
    { id: "anio", question: "¿De qué año es?", field: "anio", type: "text", placeholder: "Ej: 2023" },
    { id: "localidad", question: "¿En qué localidad circulás habitualmente?", field: "localidad", type: "text", placeholder: "Ej: Avellaneda" },
    { id: "nombre", question: "¿A nombre de quién derivo la consulta?", field: "nombre", type: "name", placeholder: "Tu nombre y apellido" },
    { id: "whatsapp", question: "¿A qué WhatsApp te contactamos?", field: "whatsapp", type: "tel", placeholder: "11 1234-5678", validation: "whatsapp" },
  ],
  hogar: [
    { id: "vivienda", question: "¿Qué tipo de vivienda querés asegurar?", field: "vivienda", type: "choice", options: ["Casa", "Departamento", "PH", "Otro"] },
    { id: "localidad", question: "¿En qué localidad está?", field: "localidad", type: "text", placeholder: "Ej: Gerli" },
    { id: "nombre", question: "¿A nombre de quién derivo la consulta?", field: "nombre", type: "name", placeholder: "Tu nombre y apellido" },
    { id: "whatsapp", question: "¿A qué WhatsApp te contactamos?", field: "whatsapp", type: "tel", placeholder: "11 1234-5678", validation: "whatsapp" },
  ],
  comercio: [
    { id: "rubro", question: "¿Qué rubro o actividad tiene el comercio?", field: "rubro", type: "text", placeholder: "Ej: Kiosco, indumentaria, taller..." },
    { id: "localidad", question: "¿En qué localidad está ubicado?", field: "localidad", type: "text", placeholder: "Ej: Gerli" },
    { id: "nombre", question: "¿A nombre de quién derivo la consulta?", field: "nombre", type: "name", placeholder: "Tu nombre y apellido" },
    { id: "whatsapp", question: "¿A qué WhatsApp te contactamos?", field: "whatsapp", type: "tel", placeholder: "11 1234-5678", validation: "whatsapp" },
  ],
  personas: [
    { id: "cobertura", question: "¿Qué cobertura estás buscando?", field: "cobertura", type: "choice", options: ["Vida", "Accidentes personales", "Sepelio", "Otro"] },
    { id: "nombre", question: "¿A nombre de quién derivo la consulta?", field: "nombre", type: "name", placeholder: "Tu nombre y apellido" },
    { id: "whatsapp", question: "¿A qué WhatsApp te contactamos?", field: "whatsapp", type: "tel", placeholder: "11 1234-5678", validation: "whatsapp" },
  ],
  empresas: [
    { id: "actividad", question: "¿Qué actividad realiza la empresa?", field: "actividad", type: "text", placeholder: "Ej: Logística, oficina, industria..." },
    { id: "dotacion", question: "¿Cantidad aproximada de empleados?", field: "dotacion", type: "choice", options: ["1 a 10", "11 a 50", "Más de 50"] },
    { id: "localidad", question: "¿En qué localidad está ubicada?", field: "localidad", type: "text", placeholder: "Ej: Avellaneda" },
    { id: "nombre", question: "¿A nombre de quién derivo la consulta?", field: "nombre", type: "name", placeholder: "Tu nombre y apellido" },
    { id: "whatsapp", question: "¿A qué WhatsApp te contactamos?", field: "whatsapp", type: "tel", placeholder: "11 1234-5678", validation: "whatsapp" },
  ],
  otro: [
    { id: "consulta", question: "Contanos brevemente qué necesitás asegurar.", field: "consulta", type: "text", placeholder: "Ej: Quiero asesoramiento sobre..." },
    { id: "nombre", question: "¿A nombre de quién derivo la consulta?", field: "nombre", type: "name", placeholder: "Tu nombre y apellido" },
    { id: "whatsapp", question: "¿A qué WhatsApp te contactamos?", field: "whatsapp", type: "tel", placeholder: "11 1234-5678", validation: "whatsapp" },
  ],
};

/** Order used to render a lead summary consistently. */
export const summaryOrder = [
  "uso",
  "vehiculo",
  "anio",
  "vivienda",
  "rubro",
  "actividad",
  "dotacion",
  "cobertura",
  "localidad",
  "consulta",
];

export function buildWhatsappMessage(lead: Record<string, string> & { tipo: InsuranceType }): string {
  const lines = [
    `Hola Digilio e Hijo 👋 Quiero avanzar con una consulta:`,
    ``,
    `• ${fieldLabels.tipo}: ${insuranceLabels[lead.tipo]}`,
  ];
  for (const key of summaryOrder) {
    if (lead[key]) lines.push(`• ${fieldLabels[key] ?? key}: ${lead[key]}`);
  }
  if (lead.nombre) lines.push(`• ${fieldLabels.nombre}: ${lead.nombre}`);
  lines.push(``, `(Consulta iniciada desde el asistente de la web)`);
  return lines.join("\n");
}
