import Image from "next/image";
import { Tag } from "@/components/ui/tag";

const STATS = [
  { n: "1974", l: "Année de création" },
  { n: "3", l: "Générations à la scierie" },
  { n: "< 20 %", l: "Humidité garantie" },
  { n: "24 mois", l: "Séchage sous hangar" },
];

const STEPS = [
  { n: "01", t: "Coupe raisonnée", b: "Sélection en forêt gérée durablement, à moins de 100 km." },
  { n: "02", t: "Fendage & calibrage", b: "Bûches fendues et triées par essence et longueur." },
  { n: "03", t: "Séchage 24 mois", b: "Sous hangar ouvert, ventilé, à l'abri de la pluie." },
  { n: "04", t: "Contrôle & livraison", b: "Taux d'humidité relevé à l'hygromètre avant chargement." },
];

export default function NotreBoisPage() {
  return (
    <div className="md:max-w-6xl md:mx-auto md:px-8 md:py-8">
      <div className="flex items-center px-4 py-3.5 md:px-0 md:py-0 md:mb-6 border-b-2 border-divider md:border-0">
        <h4 className="text-xl md:text-4xl">Notre bois</h4>
      </div>

      <div className="h-[230px] md:h-[380px] overflow-hidden grayscale-photo relative">
        <Image
          src="https://images.unsplash.com/photo-1672984581785-60e0ff402fd4?auto=format&fit=crop&q=70&w=1600&h=900"
          alt="Hangar de séchage du bois"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="px-4 md:px-0 py-4.5 md:py-8 flex flex-col gap-3 border-b-2 border-divider md:border-0 md:max-w-2xl">
        <h2 className="text-[26px] md:text-4xl leading-[1.06]">
          Trois générations, une seule forêt.
        </h2>
        <p className="text-sm md:text-base">
          Nous coupons, fendons et séchons nous-mêmes. Pas d&apos;intermédiaire, pas de
          bois d&apos;importation : le chêne que vous brûlez ce soir a poussé à vingt
          minutes de notre hangar.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-divider md:border-0">
        {STATS.map((s) => (
          <div
            key={s.l}
            className="p-4 border-r border-b md:border-b-0 last:border-r-0 border-divider"
          >
            <div className="font-heading font-extrabold text-[28px] md:text-4xl leading-none">
              {s.n}
            </div>
            <div className="text-[11px] text-text/55 mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="px-4 md:px-0 py-4.5 md:py-8 border-b-2 border-divider md:border-0 md:max-w-2xl">
        <h3 className="text-xl md:text-2xl mb-3.5">De la coupe à votre bûcher</h3>
        <div className="flex flex-col">
          {STEPS.map((s) => (
            <div key={s.n} className="flex gap-3 py-3 border-t border-divider">
              <span className="font-heading font-extrabold text-xs text-accent shrink-0 w-5.5">
                {s.n}
              </span>
              <div>
                <div className="font-heading font-extrabold text-sm">{s.t}</div>
                <div className="text-xs text-text/55">{s.b}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-0 py-4.5 md:py-8 flex flex-col gap-2.5">
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-neutral-700">
          Certifications
        </div>
        <div className="flex gap-2 flex-wrap">
          <Tag variant="outline">NF Bois de chauffage</Tag>
          <Tag variant="outline">PEFC</Tag>
          <Tag variant="outline">DIN+ granulés</Tag>
        </div>
        <p className="text-xs text-text/55 mt-2">
          Taux d&apos;humidité contrôlé à l&apos;hygromètre sur chaque lot avant
          chargement. Le relevé est joint au bon de livraison.
        </p>
      </div>
    </div>
  );
}
