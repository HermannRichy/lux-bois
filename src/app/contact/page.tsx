"use client";

import { useState } from "react";
import { Field, Input, Textarea, Radio } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
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
          <div className="font-heading font-extrabold text-xl">03 88 00 00 00</div>
          <div className="text-xs text-text/55">
            lun–sam · 8h–18h · Steinbourg &amp; dépôt Paris
          </div>
        </div>
      </div>

      {sent ? (
        <div className="px-4 md:px-0 py-6 flex flex-col gap-2">
          <div className="font-heading font-extrabold text-lg">Demande envoyée</div>
          <p className="text-sm text-text/55 m-0">
            Merci, nous revenons vers vous sous 24 h ouvrées.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="px-4 md:px-0 py-4.5 flex flex-col gap-3.5">
          <Field label="Nom">
            <Input type="text" placeholder="Marie Schmitt" required />
          </Field>
          <Field label="Code postal de livraison">
            <Input type="text" placeholder="67700" required />
          </Field>
          <Field label="Téléphone">
            <Input type="tel" placeholder="06 00 00 00 00" required />
          </Field>
          <Field label="Ce dont vous avez besoin">
            <Textarea placeholder="6 stères de chêne 50 cm, accès par chemin étroit…" required />
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
          <Button type="submit" block className="py-3.5 text-[15px]">
            Envoyer ma demande
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
