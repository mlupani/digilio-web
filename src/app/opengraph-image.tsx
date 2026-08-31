import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Digilio e Hijo — Productores Asesores de Seguros";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0F2440 0%, #17335c 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#C5962B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0F2440",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            DH
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 3 }}>DIGILIO &amp; HIJO</div>
            <div style={{ fontSize: 15, letterSpacing: 4, color: "rgba(255,255,255,0.6)" }}>
              PRODUCTORES ASESORES DE SEGUROS
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            Protegé lo que más te importa
          </div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.75)", maxWidth: 820 }}>
            Comparamos coberturas de las principales aseguradoras. Asesoramiento cercano en Gerli, Avellaneda.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              background: "#C5962B",
              color: "#fff",
              fontSize: 22,
              fontWeight: 700,
              padding: "12px 28px",
              borderRadius: 999,
            }}
          >
            Cotizá con el asistente
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)" }}>digilioehijo.com.ar</div>
        </div>
      </div>
    ),
    size
  );
}
