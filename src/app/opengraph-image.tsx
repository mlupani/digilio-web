import { ImageResponse } from "next/og";

export const alt = "Digilio e Hijo — Productores Asesores de Seguros";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Link-preview image (WhatsApp, etc.). WhatsApp often center-crops the preview to a
 * square, so the logo + name are kept in the middle and nothing important goes near
 * the edges.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0F2440 0%, #17335c 55%, #0F2440 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: 80,
        }}
      >
        {/* logo mark */}
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 30,
            background: "#F7F5EF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          <svg width="82" height="82" viewBox="0 0 48 48">
            <path
              d="M24 4l16 6v12.5C40 33 32.6 41 24 44 15.4 41 8 33 8 22.5V10l16-6z"
              fill="#0F2440"
            />
            <path
              d="M16.5 24l5 5 10-11.5"
              fill="none"
              stroke="#C5962B"
              strokeWidth={3.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          style={{
            marginTop: 34,
            fontSize: 58,
            fontWeight: 800,
            letterSpacing: 2,
            lineHeight: 1,
          }}
        >
          DIGILIO &amp; HIJO
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 16,
            letterSpacing: 3.5,
            color: "#C5962B",
            fontWeight: 600,
          }}
        >
          PRODUCTORES ASESORES DE SEGUROS
        </div>

        <div style={{ marginTop: 30, width: 120, height: 3, background: "rgba(255,255,255,0.25)" }} />

        <div style={{ marginTop: 26, fontSize: 30, color: "rgba(255,255,255,0.82)" }}>
          Protegé lo que más te importa
        </div>
        <div style={{ marginTop: 10, fontSize: 19, color: "rgba(255,255,255,0.55)" }}>
          Gerli · Avellaneda · Buenos Aires
        </div>
      </div>
    ),
    size
  );
}
