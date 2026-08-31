import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Digilio e Hijo | Productores Asesores de Seguros en Gerli",
  description:
    "Productores asesores de seguros matriculados en Gerli, Avellaneda. Comparamos coberturas de auto, moto, hogar, comercio, personas y empresas. Asesoramiento sin cargo y respuesta en el día.",
  keywords: [
    "seguros Gerli",
    "productor de seguros Avellaneda",
    "seguro de auto",
    "seguro de moto",
    "seguro de hogar",
    "seguro de comercio",
    "Digilio e Hijo",
    "cotizar seguro",
  ],
  authors: [{ name: "Digilio e Hijo" }],
  openGraph: {
    title: "Digilio e Hijo | Productores Asesores de Seguros",
    description:
      "Comparamos coberturas de las principales aseguradoras. Asesoramiento cercano en Gerli, Avellaneda.",
    type: "website",
    locale: "es_AR",
    siteName: "Digilio e Hijo",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Digilio e Hijo | Productores Asesores de Seguros",
    description: "Comparamos coberturas de las principales aseguradoras. Asesoramiento cercano en Gerli, Avellaneda.",
  },
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  // Icons are picked up automatically from app/favicon.ico and app/icon.svg
};

export const viewport: Viewport = {
  themeColor: "#0F2440",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: site.legalName,
  description:
    "Productores asesores de seguros matriculados. Auto, moto, hogar, comercio, personas y empresas.",
  url: site.url,
  telephone: "+541160507794",
  email: site.email,
  areaServed: ["Gerli", "Avellaneda", "Lanús", "Buenos Aires"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gerli",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  openingHours: "Mo-Fr 09:00-18:00",
  priceRange: "$$",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${instrument.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F8FA]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
