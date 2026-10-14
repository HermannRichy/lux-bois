import type { ReactNode } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const LEGAL_PAGES = [
  { href: "/cgv", label: "Conditions générales de vente" },
  { href: "/cgu", label: "Conditions générales d'utilisation" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/livraison-retours", label: "Livraison & retours" },
] as const;

export function LegalPage({
  title,
  intro,
  current,
  children,
}: {
  title: string;
  intro?: string;
  current: (typeof LEGAL_PAGES)[number]["href"];
  children: ReactNode;
}) {
  return (
    <div className="md:max-w-3xl md:mx-auto md:px-8 md:py-8">
      <header className="px-4 md:px-0 py-5 md:pt-0 border-b-2 border-divider flex flex-col gap-2">
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent-700">
          Informations légales
        </span>
        <h1 className="text-[28px] md:text-4xl">{title}</h1>
        {intro && <p className="text-sm md:text-base max-w-prose m-0">{intro}</p>}
        <p className="text-xs text-text/55 m-0">Dernière mise à jour : {SITE.lastUpdate}</p>
      </header>

      <div className="px-4 md:px-0 py-5 text-sm leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:mb-1 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-heading [&_strong]:font-extrabold">
        {children}
      </div>

      <nav
        aria-label="Autres documents"
        className="mx-4 md:mx-0 mb-8 p-4 bg-surface flex flex-col gap-1.5"
      >
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-neutral-700 mb-1">
          Autres documents
        </div>
        {LEGAL_PAGES.filter((l) => l.href !== current).map((l) => (
          <Link key={l.href} href={l.href} className="text-sm text-accent hover:underline w-fit">
            {l.label}
          </Link>
        ))}
        <Link href="/contact" className="text-sm text-accent hover:underline w-fit">
          Nous contacter
        </Link>
      </nav>
    </div>
  );
}

export function LegalSection({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-6">
      <h2 className="text-lg md:text-xl mb-2 flex items-baseline gap-2.5">
        <span className="font-mono text-[11px] text-accent">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}
