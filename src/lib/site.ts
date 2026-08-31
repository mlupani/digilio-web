/** Single source of truth for contact data used across the site. */
export const site = {
  name: "Digilio e Hijo",
  legalName: "Digilio e Hijo — Productores Asesores de Seguros",
  tagline: "Productores Asesores de Seguros",
  phoneDisplay: "11 6050-7794",
  phoneHref: "tel:+541160507794",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491160507794",
  email: "contacto@digilioehijo.com.ar",
  area: "Gerli · Avellaneda · Buenos Aires",
  address: "Gerli, Avellaneda, Provincia de Buenos Aires",
  hours: "Lunes a viernes de 9 a 18 h",
  instagram: "https://instagram.com/",
  url: "https://digilioehijo.com.ar",
};

export function whatsappHref(text: string, number: string = site.whatsappNumber) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
