import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Lux Bois Chauffage — Bois de chauffage livré en Alsace";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Bois sec garanti < 20 % d'humidité",
    title: "Du bois coupé en Alsace, livré sec chez vous.",
    subtitle: "Chêne, hêtre, charme et granulés. Séchage 24 mois, livraison en 48/72 h.",
  });
}
