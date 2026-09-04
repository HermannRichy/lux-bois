import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/catalog";
import { EUR } from "@/lib/pricing";
import { Button } from "@/components/ui/button";

const PROMISES = [
  {
    num: "01",
    title: "Bois sec garanti < 20 %",
    body: "Hygromètre sur chaque lot, relevé joint à la livraison.",
  },
  {
    num: "02",
    title: "Livré en 48/72 h",
    body: "Créneau de 2 h confirmé la veille par SMS.",
  },
  {
    num: "03",
    title: "Origine locale, forêt gérée",
    body: "Coupé à moins de 100 km, certifié PEFC.",
  },
  {
    num: "04",
    title: "Prix dégressif au volume",
    body: "Jusqu'à 10 € de moins par stère dès 5 stères.",
  },
  {
    num: "05",
    title: "Certifié NF Bois de chauffage",
    body: "Volumes réels contrôlés, pas de stère approximatif.",
  },
];

const REVIEWS = [
  {
    quote:
      "« Bois vraiment sec, il prend du premier coup. Livraison pile dans le créneau annoncé. »",
    author: "Céline B. — Saverne",
  },
  {
    quote:
      "« On tourne au hêtre de Lux Bois pour le four à pizza depuis deux ans. Régulier, calibré. »",
    author: "Trattoria Da Marco — Strasbourg",
  },
];

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="relative h-[280px] md:h-[420px] overflow-hidden grayscale-photo">
        <Image
          src="https://images.unsplash.com/photo-1576791606138-89367074a68f?auto=format&fit=crop&q=70&w=1600&h=900"
          alt="Pile de bois de chauffage fendu"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </section>

      <section className="px-4 md:px-8 py-5 md:py-10 flex flex-col gap-3.5 border-b-2 border-divider md:max-w-6xl md:mx-auto">
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent-700">
          Bois sec garanti &lt; 20 % d&apos;humidité
        </span>
        <h1 className="text-[34px] md:text-6xl leading-[1.04] max-w-2xl">
          Du bois coupé en Alsace, livré sec chez vous.
        </h1>
        <p className="max-w-[32ch] md:max-w-md text-sm md:text-base">
          Chêne, hêtre et charme issus de forêts gérées à moins de 100 km de notre
          scierie. Séchage 24 mois, livraison en 48/72 h.
        </p>
        <div className="flex flex-col md:flex-row gap-2 md:w-fit">
          <Button href="/boutique" className="px-4 py-3.5 text-[15px]">
            Commander mon bois →
          </Button>
          <Button href="/#livraison" variant="secondary" className="px-4 py-3.5 text-[15px]">
            Calculer mon volume
          </Button>
        </div>
      </section>

      <section className="border-b-2 border-divider md:max-w-6xl md:mx-auto">
        <div className="md:grid md:grid-cols-5">
          {PROMISES.map((p) => (
            <div
              key={p.num}
              className="flex gap-3 items-baseline px-4 md:px-4 py-3.5 border-b md:border-b-0 md:border-r last:border-r-0 border-divider"
            >
              <span className="font-mono text-[10px] text-accent shrink-0 w-5">
                {p.num}
              </span>
              <div>
                <div className="font-heading font-extrabold text-sm">{p.title}</div>
                <div className="text-xs text-text/55">{p.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-8 py-5 md:py-10 border-b-2 border-divider md:max-w-6xl md:mx-auto">
        <div className="flex items-baseline justify-between mb-3.5">
          <h3 className="text-[22px] md:text-3xl">Nos bois</h3>
          <Link href="/boutique" className="text-[13px] text-accent hover:underline">
            Tout voir
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {featured.map((p) => (
            <Link
              key={p.id}
              href={`/produit/${p.slug}`}
              className="flex flex-col bg-surface hover:opacity-90"
            >
              <div className="h-[104px] md:h-40 overflow-hidden bg-neutral-300 grayscale-photo relative">
                <Image src={p.img} alt="" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="p-2.5 flex flex-col gap-1.5 flex-1">
                <div className="font-heading font-extrabold text-[13px] leading-tight">
                  {p.name}
                </div>
                <div className="text-[11px] text-text/55 mt-auto">{p.spec}</div>
                <div className="font-heading font-extrabold text-[15px]">
                  {EUR.format(p.price)} / {p.unit}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="livraison" className="bg-accent text-bg px-4 md:px-8 py-6 md:py-12 flex flex-col gap-2.5">
        <div className="md:max-w-6xl md:mx-auto md:w-full flex flex-col gap-2.5">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-85">
            Zone de livraison
          </span>
          <div className="font-heading font-extrabold text-[28px] md:text-4xl leading-[1.05] max-w-xl">
            100 km autour de Steinbourg. Et un dépôt à Paris.
          </div>
          <p className="text-[13px] md:text-base opacity-90 max-w-md">
            Déchargement au plus près du stockage. Créneau confirmé la veille par SMS.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-8 py-5 md:py-10 border-b-2 border-divider md:max-w-6xl md:mx-auto">
        <h3 className="text-[22px] md:text-3xl mb-3">Ils se chauffent chez nous</h3>
        <div className="flex flex-col md:flex-row gap-3 md:gap-6">
          {REVIEWS.map((r) => (
            <div key={r.author} className="border-l-2 border-accent pl-3 py-0.5 md:flex-1">
              <p className="text-[13px] md:text-sm mb-1">{r.quote}</p>
              <div className="text-[11px] text-text/55">{r.author}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
