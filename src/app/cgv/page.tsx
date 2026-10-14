import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { SITE, FULL_ADDRESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: `Prix, commande, paiement, livraison, rétractation et garanties : les conditions de vente de ${SITE.name}.`,
  alternates: { canonical: "/cgv" },
};

export default function CgvPage() {
  const { legal } = SITE;
  return (
    <LegalPage
      title="Conditions générales de vente"
      intro="Ces conditions s'appliquent à toute commande passée sur le site. Elles sont communiquées avant la commande et acceptées lors de son paiement."
      current="/cgv"
    >
      <LegalSection n={1} title="Vendeur">
        <p>
          <strong>{legal.companyName}</strong>, {legal.legalForm.toLowerCase()} de{" "}
          {legal.publicationDirector}. Scierie et siège : {FULL_ADDRESS}. Téléphone :{" "}
          <a href={SITE.phoneHref}>{SITE.phone}</a>. E-mail :{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Produits">
        <p>
          {SITE.name} vend du bois de chauffage et produits associés : bûches de bois dur
          (chêne, hêtre, charme), bûches compressées, granulés, produits d&apos;allumage et
          bois de cuisson professionnel. Chaque fiche produit précise l&apos;essence, la
          longueur et l&apos;unité de vente.
        </p>
        <ul>
          <li>
            <strong>Le stère</strong> correspond à 1 m³ apparent de bûches empilées.
          </li>
          <li>
            Le bois est séché 24 mois sous hangar et vendu avec un taux d&apos;humidité
            inférieur à 20 %, relevé à l&apos;hygromètre avant chargement.
          </li>
          <li>
            Le bois est un produit naturel : l&apos;aspect, le calibre et la proportion
            d&apos;écorce peuvent légèrement varier d&apos;un lot à l&apos;autre.
          </li>
        </ul>
      </LegalSection>

      <LegalSection n={3} title="Prix">
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises (TTC), hors frais de
          livraison éventuels précisés avant le paiement. Pour les bûches vendues au stère,
          un tarif dégressif s&apos;applique automatiquement au panier : −5 € par stère à
          partir de 3 stères, −10 € par stère à partir de 5 stères.
        </p>
        <p>
          Le prix applicable est celui affiché au moment de la validation de la commande.
          {" "}{SITE.name} peut modifier ses prix à tout moment, sans effet sur les commandes
          déjà payées.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Commande">
        <p>
          La commande est conclue lorsque le paiement est confirmé. Vous recevez alors une
          confirmation par e-mail. {SITE.name} peut refuser ou annuler une commande en cas
          de litige existant, d&apos;adresse située hors zone de livraison, d&apos;accès
          impraticable pour le camion ou d&apos;erreur manifeste de prix ; le client est
          alors intégralement remboursé.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Paiement">
        <p>
          Le paiement s&apos;effectue en ligne, sur la page de paiement sécurisée de notre
          prestataire de e-commerce, vers laquelle vous êtes redirigé en cliquant sur
          « Commander ». Aucune donnée bancaire n&apos;est collectée ni conservée par{" "}
          {SITE.name}. Le paiement est exigible en totalité à la commande.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Livraison">
        <p>
          La livraison est assurée dans un rayon d&apos;environ 100 km autour de Steinbourg
          et à Paris (dépôt). Le délai indicatif est de 48 à 72 h après la commande ; un
          créneau de 2 h est confirmé la veille par SMS. Deux modes sont proposés :
          déchargement en vrac (gratuit) ou livraison rangée sur palette (+ 29 €).
        </p>
        <p>
          Le détail des zones, de l&apos;accès et des vérifications à la réception figure
          sur la page <Link href="/livraison-retours">Livraison &amp; retours</Link>.
        </p>
        <p>
          Les délais sont donnés à titre indicatif. En cas de retard de plus de 30 jours
          après la date prévue, le consommateur peut résilier la vente dans les conditions
          des articles L216-2 et L216-3 du Code de la consommation.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Réception et réclamations">
        <p>
          À la livraison, vérifiez la quantité et l&apos;état du bois en présence du
          livreur et signalez toute anomalie sur le bon de livraison. Pour toute
          réclamation, contactez-nous sous 48 h par téléphone ou par e-mail, avec des
          photos si possible, afin que nous puissions intervenir rapidement.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Droit de rétractation">
        <p>
          Conformément à l&apos;article L221-18 du Code de la consommation, le consommateur
          dispose de <strong>14 jours</strong> à compter de la réception des biens pour
          exercer son droit de rétractation, sans avoir à motiver sa décision. Pour
          l&apos;exercer, adressez-nous une demande claire par e-mail à{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> ou par téléphone.
        </p>
        <p>
          Les biens doivent être restitués dans les 14 jours suivant la communication de la
          décision de rétractation, dans leur état d&apos;origine. En raison du volume et du
          poids des produits, les modalités de reprise (enlèvement ou retour) sont
          convenues avec vous ; les frais directs de renvoi sont à la charge du
          consommateur. Le remboursement intervient au plus tard 14 jours après la
          récupération des biens, par le même moyen de paiement que celui utilisé pour la
          commande.
        </p>
        <p>
          Le droit de rétractation ne s&apos;applique pas aux commandes passées par un
          professionnel.
        </p>
      </LegalSection>

      <LegalSection n={9} title="Garanties légales">
        <p>
          Le vendeur répond de la garantie légale de conformité (articles L217-3 et
          suivants du Code de la consommation) et de la garantie des vices cachés (articles
          1641 et suivants du Code civil). Si un lot ne correspond pas à la description
          (notamment un taux d&apos;humidité supérieur à celui annoncé), le consommateur
          peut obtenir sa réparation, son remplacement ou, à défaut, une réduction du prix
          ou la résolution de la vente.
        </p>
      </LegalSection>

      <LegalSection n={10} title="Responsabilité">
        <p>
          Le bois de chauffage doit être utilisé dans un appareil adapté, correctement
          installé et entretenu, conformément aux préconisations du fabricant et à la
          réglementation locale. {SITE.name} ne saurait être tenue responsable des
          dommages liés à un usage inadapté des produits ou à une installation défectueuse.
        </p>
      </LegalSection>

      <LegalSection n={11} title="Données personnelles">
        <p>
          Vos données sont traitées conformément à notre{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </LegalSection>

      <LegalSection n={12} title="Médiation et litiges">
        <p>
          En cas de litige, contactez d&apos;abord notre service client pour rechercher une
          solution amiable. Conformément aux articles L611-1 et suivants du Code de la
          consommation, le consommateur peut ensuite recourir gratuitement à un médiateur
          de la consommation. Les présentes conditions sont soumises au droit français.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
