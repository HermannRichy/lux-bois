import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { SITE, FULL_ADDRESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Quelles données ${SITE.name} collecte, pourquoi, combien de temps, et comment exercer vos droits.`,
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Nous collectons le strict nécessaire pour répondre à vos demandes et livrer vos commandes. Voici le détail."
      current="/confidentialite"
    >
      <LegalSection n={1} title="Responsable du traitement">
        <p>
          {SITE.legal.companyName}, {FULL_ADDRESS}. Contact :{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> ou{" "}
          <a href={SITE.phoneHref}>{SITE.phone}</a>.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Données collectées et finalités">
        <ul>
          <li>
            <strong>Formulaire de contact / devis</strong> : nom, code postal de livraison,
            téléphone, description de votre besoin et profil (particulier, résidence
            secondaire, restaurant). Finalité : vous répondre et établir un devis. Base
            légale : mesures précontractuelles prises à votre demande.
          </li>
          <li>
            <strong>Commande</strong> : identité, adresse de livraison, e-mail, téléphone
            et informations de paiement, saisis sur la page de paiement sécurisée de notre
            prestataire de e-commerce. Finalité : traiter, livrer et facturer la commande.
            Base légale : exécution du contrat ; obligations légales (comptabilité).
          </li>
          <li>
            <strong>Échanges par e-mail ou téléphone</strong> : coordonnées et contenu de
            votre message. Finalité : suivi de votre demande ou de votre commande.
          </li>
        </ul>
        <p>
          Les coordonnées bancaires ne sont jamais collectées ni stockées par {SITE.name}.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Stockage local et cookies">
        <p>
          Le site enregistre le contenu de votre panier dans le stockage local de votre
          navigateur (clé « lbc-cart »). Il reste sur votre appareil, ne sert qu&apos;à
          conserver votre panier et n&apos;est pas utilisé à des fins de suivi ou de
          publicité. Ce stockage strictement nécessaire ne requiert pas de consentement ;
          vous pouvez l&apos;effacer à tout moment depuis les réglages de votre navigateur.
        </p>
        <p>
          Votre choix concernant la mesure d&apos;audience, le suivi de campagne et le chat
          (clé « lbc-consent ») est enregistré dans votre navigateur et redemandé tous les 6
          mois. Si vous l&apos;acceptez, nous chargeons l&apos;outil de suivi de campagne
          SiteWit, qui peut déposer des cookies ou identifiants et mesurer vos visites afin
          d&apos;évaluer l&apos;efficacité de nos annonces. Sans votre accord, cet outil
          n&apos;est pas chargé. Vous pouvez modifier votre choix à tout moment via « Gérer
          les cookies » en bas de page ; un retrait prend pleinement effet au prochain
          chargement de page.
        </p>
        <p>
          De même, le chat en direct Tidio n&apos;est chargé qu&apos;avec votre accord. Une
          fois chargé, Tidio peut déposer des cookies ou identifiants, recevoir votre
          adresse IP et conserver le contenu de vos échanges avec nous afin de permettre la
          conversation. Sans votre accord, vous pouvez toujours nous joindre par téléphone
          ou par e-mail.
        </p>
        <p>
          Hors suivi de campagne consenti, le site n&apos;utilise pas de cookie publicitaire.
          La page de paiement, hébergée
          chez notre prestataire de e-commerce, peut déposer les cookies techniques
          nécessaires à son fonctionnement et à la sécurité du paiement.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Destinataires">
        <p>
          Vos données sont destinées à {SITE.name} et à ses prestataires techniques,
          uniquement pour les besoins décrits ci-dessus : plateforme de e-commerce et de
          paiement, hébergeur du site, transporteur ou livreur le cas échéant et, avec votre
          accord, SiteWit (suivi de campagne publicitaire) et Tidio (chat en direct). Elles ne
          sont ni vendues ni cédées à des tiers à des fins commerciales.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Durées de conservation">
        <ul>
          <li>Demandes de contact et devis sans suite : 3 ans maximum après le dernier échange.</li>
          <li>Données de commande et de facturation : 10 ans (obligations comptables).</li>
        </ul>
      </LegalSection>

      <LegalSection n={6} title="Vos droits">
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
          de limitation, d&apos;opposition et de portabilité de vos données. Pour les
          exercer, écrivez à <a href={`mailto:${SITE.email}`}>{SITE.email}</a> en précisant
          votre demande ; nous répondons dans un délai d&apos;un mois. Si vous estimez que
          vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès
          de la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection n={7} title="Sécurité">
        <p>
          Le site est servi en HTTPS et les paiements sont traités par un prestataire
          sécurisé. Nous limitons l&apos;accès à vos données aux personnes qui en ont
          besoin.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Mises à jour">
        <p>
          Cette politique peut évoluer ; la date de dernière mise à jour figure en haut de
          page. Voir aussi les <Link href="/mentions-legales">mentions légales</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
