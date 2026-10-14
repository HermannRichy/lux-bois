import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

const RED = "#ec3013";
const IVORY = "#f8f4f4";
const INK = "#201e1d";

const FLAME_PATH =
  "M10 2c0 -.88 1.056 -1.331 1.692 -.722c1.958 1.876 3.096 5.995 1.75 9.12l-.08 .174l.012 .003c.625 .133 1.203 -.43 2.303 -2.173l.14 -.224a1 1 0 0 1 1.582 -.153c1.334 1.435 2.601 4.377 2.601 6.27c0 4.265 -3.591 7.705 -8 7.705s-8 -3.44 -8 -7.706c0 -2.252 1.022 -4.716 2.632 -6.301l.605 -.589c.241 -.236 .434 -.43 .618 -.624c1.43 -1.512 2.145 -2.924 2.145 -4.78";

function Flame({ size, color = IVORY }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d={FLAME_PATH} />
    </svg>
  );
}

/** Carte de partage 1200×630 : titre + sous-titre + éventuel badge prix. */
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
  badge,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: IVORY,
          padding: 72,
          borderLeft: `24px solid ${RED}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: RED,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Flame size={48} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>LUX BOIS</div>
            <div style={{ fontSize: 16, letterSpacing: 6, color: "#ff9783", marginTop: 6 }}>
              CHAUFFAGE
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#ff9783", textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 40 ? 62 : 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 30, opacity: 0.75, maxWidth: 900, lineHeight: 1.3 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, opacity: 0.7 }}>
            {SITE.phone} · {SITE.url.replace(/^https?:\/\//, "")}
          </div>
          {badge && (
            <div
              style={{
                display: "flex",
                background: RED,
                color: IVORY,
                fontSize: 40,
                fontWeight: 800,
                padding: "14px 28px",
              }}
            >
              {badge}
            </div>
          )}
        </div>
      </div>
    ),
    OG_SIZE
  );
}

/** Icône carrée (apple-touch-icon). */
export function renderSquareIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: RED,
        }}
      >
        <Flame size={Math.round(size * 0.68)} />
      </div>
    ),
    { width: size, height: size }
  );
}
