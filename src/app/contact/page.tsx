"use client";

import { useState } from "react";
import { IconCircleCheck, IconLoader2 } from "@tabler/icons-react";
import { Field, Input, Textarea, Radio } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  // Pas de serveur de formulaire : la demande est préparée dans la messagerie
  // du visiteur, adressée à l'e-mail pro.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Nom : ${data.get("nom")}`,
      `Code postal de livraison : ${data.get("cp")}`,
      `Téléphone : ${data.get("tel")}`,
      `Profil : ${data.get("profil")}`,
      "",
      String(data.get("besoin")),
    ].join("\n");
    setSending(true);
    window.setTimeout(() => {
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        "Demande de devis"
      )}&body=${encodeURIComponent(body)}`;
      setSending(false);
      setSent(true);
    }, 500);
  }

  return (
    <div className="md:max-w-2xl md:mx-auto md:px-8 md:py-8">
      <div className="flex items-center px-4 py-3.5 md:px-0 md:py-0 md:mb-6 border-b-2 border-divider md:border-0">
        <h4 className="text-xl md:text-4xl">Nous écrire</h4>
      </div>

      <div className="px-4 md:px-0 py-4.5 md:pb-8 flex flex-col gap-2.5 border-b-2 border-divider md:border-0">
        <p className="text-sm md:text-base">
          Un gros volume, une pizzeria à approvisionner, un accès compliqué ?
          Écrivez-nous, nous répondons sous 24 h ouvrées.
        </p>
        <div className="flex flex-col gap-0.5">
          <a
            href={SITE.phoneHref}
            className="font-heading font-extrabold text-xl hover:text-accent transition-colors w-fit"
          >
            {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm hover:text-accent transition-colors w-fit"
          >
            {SITE.email}
          </a>
          <div className="text-xs text-text/55">
            {SITE.hours} · Steinbourg &amp; dépôt Paris
          </div>
        </div>
      </div>

      {sent ? (
        <div className="px-4 md:px-0 py-6 flex flex-col gap-2 animate-panel-in" role="status">
          <IconCircleCheck size={36} className="text-accent animate-check-in" />
          <div className="font-heading font-extrabold text-lg">Votre message est prêt</div>
          <p className="text-sm text-text/55 m-0">
            Votre messagerie s&apos;est ouverte avec votre demande : il ne reste qu&apos;à
            l&apos;envoyer. Rien reçu ? Écrivez-nous à{" "}
            <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
              {SITE.email}
            </a>{" "}
            ou appelez le{" "}
            <a href={SITE.phoneHref} className="text-accent hover:underline">
              {SITE.phone}
            </a>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="px-4 md:px-0 py-4.5 flex flex-col gap-3.5">
          <Field label="Nom">
            <Input type="text" name="nom" autoComplete="name" placeholder="Marie Schmitt" required />
          </Field>
          <Field label="Code postal de livraison">
            <Input type="text" name="cp" inputMode="numeric" autoComplete="postal-code" placeholder="67700" required />
          </Field>
          <Field label="Téléphone">
            <Input type="tel" name="tel" autoComplete="tel" placeholder="06 00 00 00 00" required />
          </Field>
          <Field label="Ce dont vous avez besoin">
            <Textarea name="besoin" placeholder="6 stères de chêne 50 cm, accès par chemin étroit…" required />
          </Field>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-neutral-700">
              Je suis
            </span>
            <div className="flex flex-col gap-2">
              <Radio name="profil" label="Particulier" defaultChecked />
              <Radio name="profil" label="Résidence secondaire" />
              <Radio name="profil" label="Restaurant / pizzeria" />
            </div>
          </div>
          <Button type="submit" block className="py-3.5 text-[15px]" disabled={sending}>
            {sending ? (
              <>
                <IconLoader2 size={18} className="animate-spin" />
                Préparation…
              </>
            ) : (
              "Envoyer ma demande"
            )}
          </Button>
          <p className="text-[11px] text-text/55 m-0">
            Devis gratuit, sans engagement. Vos coordonnées ne servent qu&apos;à vous
            répondre.
          </p>
        </form>
      )}
    </div>
  );
}
