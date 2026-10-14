import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { SITE, FULL_ADDRESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Éditeur, hébergeur et informations légales du site ${SITE.name}.`,
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  const { legal, host } = SITE;
  return (
    <LegalPage title="Mentions légales" current="/mentions-legales">
      <LegalSection n={1} title="Éditeur du site">
        <p>
          Le site <a href={SITE.url}>{SITE.url.replace(/^https?:\/\//, "")}</a> est édité par{" "}
          <strong>{legal.companyName}</strong>.
        </p>
        <ul>
          <li>Forme juridique : {legal.legalForm}</li>
          <li>SIRET : {legal.siret}</li>
          <li>N° de TVA intracommunautaire : {legal.vatNumber}</li>
          <li>Siège et scierie : {FULL_ADDRESS}, {SITE.address.country}</li>
          <li>
            Téléphone : <a href={SITE.phoneHref}>{SITE.phone}</a> ({SITE.hours})
          </li>
          <li>
            E-mail : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection n={2} title="Directeur de la publication">
        <p>{legal.publicationDirector}</p>
      </LegalSection>

      <LegalSection n={3} title="Hébergement">
        <p>
          Le site est hébergé par {host.name}, {host.address}.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus du site (textes, logo, éléments graphiques, mise en
          page) est la propriété de {SITE.name}, sauf mention contraire. Toute reproduction,
          représentation ou adaptation, totale ou partielle, sans autorisation écrite
          préalable est interdite.
        </p>
        <p>
          Les photographies d&apos;illustration proviennent de la bibliothèque{" "}
          <a href="https://unsplash.com" rel="noopener noreferrer" target="_blank">
            Unsplash
          </a>{" "}
          et restent la propriété de leurs auteurs.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Paiement et boutique">
        <p>
          Le paiement des commandes est réalisé sur une page sécurisée hébergée par notre
          prestataire de e-commerce. Aucune donnée bancaire ne transite par ce site ni
          n&apos;est conservée par {SITE.name}.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Données personnelles">
        <p>
          Le traitement de vos données personnelles est détaillé dans notre{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>. Vous disposez d&apos;un
          droit d&apos;accès, de rectification et de suppression en nous écrivant à{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Responsabilité">
        <p>
          {SITE.name} s&apos;efforce de fournir des informations exactes et à jour, sans
          pouvoir garantir l&apos;absence d&apos;erreur ou d&apos;omission. Le site peut
          contenir des liens vers des sites tiers dont {SITE.name} ne maîtrise pas le
          contenu.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Droit applicable">
        <p>
          Le site et ses mentions sont soumis au droit français. Pour toute question, vous
          pouvez nous contacter par téléphone ou par e-mail aux coordonnées ci-dessus.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
