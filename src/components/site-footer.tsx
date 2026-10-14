import Link from "next/link";
import { SITE, FULL_ADDRESS } from "@/lib/site";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import {
  IconMapPin,
  IconPhone,
  IconTruckDelivery,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMail,
} from "@tabler/icons-react";

const SHOP_LINKS = [
  { label: "Bûches de bois dur", href: "/boutique" },
  { label: "Bûches compressées", href: "/boutique" },
  { label: "Granulés DIN+", href: "/boutique" },
  { label: "Allumage & charbon", href: "/boutique" },
  { label: "Bois de cuisson pro", href: "/boutique" },
];

const HOUSE_LINKS = [
  { label: "Notre bois", href: "/notre-bois" },
  { label: "Livraison & retours", href: "/livraison-retours" },
  { label: "Calculer mon volume", href: "/#livraison" },
  { label: "Devis professionnel", href: "/contact" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "CGV", href: "/cgv" },
  { label: "CGU", href: "/cgu" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "Livraison & retours", href: "/livraison-retours" },
];

export function SiteFooter() {
  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="py-6 md:py-9 border-b border-neutral-100/22">
          <div className="font-heading font-extrabold text-lg leading-none">LUX BOIS</div>
          <div className="font-mono text-[9px] tracking-[0.22em] text-accent-400 mt-0.5">
            CHAUFFAGE
          </div>
          <p className="mt-3 text-sm opacity-75 max-w-[30ch]">
            Scierie familiale à Steinbourg. Bois sec, coupé et séché sur place depuis 1974.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="p-4 md:py-6 md:px-0 md:pr-6 border-r border-b md:border-b-0 border-neutral-100/22">
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase opacity-60 mb-2">
              Boutique
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              {SHOP_LINKS.map((l) => (
                <Link key={l.label} href={l.href} className="hover:text-accent-400">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="p-4 md:py-6 md:px-0 md:pl-6 border-b md:border-b-0 border-neutral-100/22">
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase opacity-60 mb-2">
              Maison
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              {HOUSE_LINKS.map((l) => (
                <Link key={l.label} href={l.href} className="hover:text-accent-400">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-2 md:col-span-2 p-4 md:py-6 md:px-0 md:pl-10 flex flex-col gap-2.5 border-t md:border-t-0 md:border-l border-neutral-100/22">
            <div className="flex items-center gap-2.5 text-sm">
              <IconMapPin size={18} className="text-accent-400" />
              {FULL_ADDRESS}
            </div>
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2.5 text-sm hover:text-accent-400 transition-colors w-fit"
            >
              <IconPhone size={18} className="text-accent-400" />
              {SITE.phone} · {SITE.hours.replace("lun–sam · ", "lun–sam ")}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2.5 text-sm hover:text-accent-400 transition-colors w-fit"
            >
              <IconMail size={18} className="text-accent-400" />
              {SITE.email}
            </a>
            <div className="flex items-center gap-2.5 text-sm">
              <IconTruckDelivery size={18} className="text-accent-400" />
              Alsace 100 km · dépôt Paris
            </div>
            <div className="flex gap-2 mt-1">
              <span className="w-[38px] h-[38px] grid place-items-center border border-neutral-100/30">
                <IconBrandFacebook size={18} />
              </span>
              <span className="w-[38px] h-[38px] grid place-items-center border border-neutral-100/30">
                <IconBrandInstagram size={18} />
              </span>
              <a
                href={`mailto:${SITE.email}`}
                aria-label="Nous écrire par e-mail"
                className="w-[38px] h-[38px] grid place-items-center border border-neutral-100/30 hover:bg-neutral-100/10 hover:text-accent-400 transition-colors"
              >
                <IconMail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="py-3.5 flex flex-wrap gap-x-3.5 gap-y-1 text-[11px] opacity-60">
          <span>© 2026 {SITE.name}</span>
          {LEGAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-accent-400 hover:opacity-100">
              {l.label}
            </Link>
          ))}
          <CookieSettingsButton className="hover:text-accent-400 hover:opacity-100" />
          <span>Paiement sécurisé</span>
        </div>
      </div>
    </footer>
  );
}
