import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Lux Bois Chauffage — Bois de chauffage livré partout en France";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Bois sec garanti < 20 % d'humidité",
    title: "Du bois sec, livré chez vous partout en France.",
    subtitle: "Chêne, hêtre, charme et granulés. Séchage 24 mois, livraison en 48/72 h.",
  });
}
