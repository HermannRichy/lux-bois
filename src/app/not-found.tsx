import type { Metadata } from "next";
import { IconFlameOff } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="px-4 md:px-8 py-12 md:py-20 md:max-w-2xl md:mx-auto flex flex-col gap-4">
      <IconFlameOff size={44} className="text-accent" />
      <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent-700">
        Erreur 404
      </span>
      <h1 className="text-[34px] md:text-5xl leading-[1.05]">Ce feu s&apos;est éteint.</h1>
      <p className="text-sm md:text-base max-w-prose m-0">
        La page que vous cherchez n&apos;existe pas ou a été déplacée. Retrouvez notre bois
        dans la boutique, ou appelez-nous au{" "}
        <a href={SITE.phoneHref} className="text-accent underline underline-offset-2">
          {SITE.phone}
        </a>
        .
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:w-fit mt-2">
        <Button href="/boutique" className="px-4 py-3.5 text-[15px]">
          Voir la boutique
        </Button>
        <Button href="/" variant="secondary" className="px-4 py-3.5 text-[15px]">
          Retour à l&apos;accueil
        </Button>
      </div>
    </div>
  );
}
