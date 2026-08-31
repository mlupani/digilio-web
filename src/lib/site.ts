/**
 * Absolute base URL of the deployed site. Used for `metadataBase`, canonical,
 * `og:image` / `og:url` and JSON-LD — so it MUST match where the site actually lives
 * or link previews (WhatsApp, etc.) break.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL         — set this in Vercel once a custom domain is live
 *  2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's stable production domain, auto-injected
 *  3. hardcoded Vercel URL          — current deployment
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://digilio-web.vercel.app")
).replace(/\/$/, "");

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
  url: siteUrl,
};

export function whatsappHref(text: string, number: string = site.whatsappNumber) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
