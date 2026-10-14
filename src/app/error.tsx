"use client";

import { useEffect } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="px-4 md:px-8 py-12 md:py-20 md:max-w-2xl md:mx-auto flex flex-col gap-4">
      <IconAlertTriangle size={44} className="text-accent" />
      <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent-700">
        Erreur
      </span>
      <h1 className="text-[34px] md:text-5xl leading-[1.05]">Un problème est survenu.</h1>
      <p className="text-sm md:text-base max-w-prose m-0">
        Le chargement de cette page a échoué. Réessayez dans un instant ; si le problème
        persiste, appelez-nous au{" "}
        <a href={SITE.phoneHref} className="text-accent underline underline-offset-2">
          {SITE.phone}
        </a>
        .
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:w-fit mt-2">
        <Button className="px-4 py-3.5 text-[15px]" onClick={() => retry()}>
          Réessayer
        </Button>
        <Button href="/" variant="secondary" className="px-4 py-3.5 text-[15px]">
          Retour à l&apos;accueil
        </Button>
      </div>
    </div>
  );
}
