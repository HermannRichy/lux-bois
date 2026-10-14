import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: `Règles d'accès et d'utilisation du site ${SITE.name}.`,
  alternates: { canonical: "/cgu" },
};

export default function CguPage() {
  return (
    <LegalPage
      title="Conditions générales d'utilisation"
      intro={`Ces conditions encadrent l'accès et l'utilisation du site ${SITE.url.replace(/^https?:\/\//, "")}. En naviguant sur le site, vous les acceptez.`}
      current="/cgu"
    >
      <LegalSection n={1} title="Objet">
        <p>
          Le site présente l&apos;activité de {SITE.name} (bois de chauffage, granulés,
          allumage et bois de cuisson) et permet de consulter la boutique, de composer un
          panier et de demander un devis. Les achats sont soumis aux{" "}
          <Link href="/cgv">conditions générales de vente</Link>.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Accès au site">
        <p>
          Le site est accessible gratuitement à tout internaute disposant d&apos;un accès à
          internet. Les frais de connexion et de matériel restent à votre charge.
          {" "}{SITE.name} peut interrompre ou limiter l&apos;accès pour maintenance ou pour
          toute raison technique, sans préavis ni indemnité.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Utilisation du site">
        <p>Vous vous engagez à utiliser le site de manière loyale et, notamment, à ne pas :</p>
        <ul>
          <li>perturber son fonctionnement ou tenter d&apos;accéder à des zones non publiques ;</li>
          <li>collecter des données de manière automatisée sans autorisation ;</li>
          <li>fournir de fausses informations dans le formulaire de contact ou lors d&apos;une commande ;</li>
          <li>reproduire ou exploiter les contenus à des fins commerciales sans accord écrit.</li>
        </ul>
      </LegalSection>

      <LegalSection n={4} title="Panier">
        <p>
          Le contenu de votre panier est conservé dans le stockage local de votre navigateur,
          sur votre appareil uniquement. Il disparaît si vous videz ces données ou changez
          d&apos;appareil. Le placer dans le panier ne constitue pas une commande : celle-ci
          n&apos;est conclue qu&apos;au terme du paiement.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Informations produits et prix">
        <p>
          Les descriptions, caractéristiques (essence, longueur, taux d&apos;humidité) et
          photographies sont présentées de bonne foi. Le bois est un produit naturel :
          l&apos;aspect peut légèrement varier d&apos;un lot à l&apos;autre. Les prix sont
          indiqués en euros, toutes taxes comprises, et peuvent évoluer ; le prix applicable
          est celui affiché au moment de la commande.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Propriété intellectuelle">
        <p>
          Les contenus du site sont protégés par le droit de la propriété intellectuelle.
          Voir les <Link href="/mentions-legales">mentions légales</Link>.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Responsabilité">
        <p>
          {SITE.name} met en œuvre les moyens raisonnables pour assurer la disponibilité et
          la fiabilité du site, sans garantie d&apos;un accès ininterrompu ni d&apos;une
          absence totale d&apos;erreur. {SITE.name} ne peut être tenue responsable des
          dommages résultant d&apos;une utilisation inappropriée du site ou de
          l&apos;indisponibilité de services tiers (paiement, hébergement).
        </p>
      </LegalSection>

      <LegalSection n={8} title="Données personnelles">
        <p>
          Les données collectées via le site sont traitées conformément à notre{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </LegalSection>

      <LegalSection n={9} title="Modification des conditions">
        <p>
          {SITE.name} peut modifier ces conditions à tout moment ; la version en ligne
          s&apos;applique à compter de sa publication.
        </p>
      </LegalSection>

      <LegalSection n={10} title="Droit applicable">
        <p>
          Les présentes conditions sont soumises au droit français. En cas de litige, et à
          défaut de solution amiable, les tribunaux français sont compétents, sous réserve
          des règles protectrices applicables aux consommateurs.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
