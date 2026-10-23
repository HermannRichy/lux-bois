import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Livraison & retours",
  description:
    "Livraison partout en France, délais de 48/72 h, créneau de 2 h, déchargement, réclamations et rétractation.",
  alternates: { canonical: "/livraison-retours" },
};

export default function LivraisonRetoursPage() {
  return (
    <LegalPage
      title="Livraison & retours"
      intro="Comment et quand votre bois arrive, ce qu'il faut vérifier à la réception, et que faire en cas de souci."
      current="/livraison-retours"
    >
      <LegalSection n={1} title="Zone de livraison">
        <p>
          Nous livrons <strong>partout en France</strong>. Une question sur votre adresse ou
          votre accès ? Appelez-nous au <a href={SITE.phoneHref}>{SITE.phone}</a> ou écrivez
          à <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Délais et créneau">
        <p>
          Livraison en <strong>48 à 72 h</strong> après la commande. Le créneau de 2 h est
          confirmé la veille par SMS ; merci de rester joignable et de prévoir une personne
          sur place pour guider le livreur.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Modes de livraison">
        <ul>
          <li>
            <strong>Déchargement en vrac</strong> devant le lieu de stockage : gratuit.
          </li>
          <li>
            <strong>Livré rangé sur palette</strong> : + 29 €.
          </li>
        </ul>
        <p>
          Nous livrons en camion-benne ou en remorque selon l&apos;accès, au plus près de
          votre stockage.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Accès et déchargement">
        <ul>
          <li>Signalez-nous tout accès difficile (chemin étroit, pente, portail, hauteur limitée) lors de la commande ou par téléphone.</li>
          <li>Le déchargement se fait à l&apos;endroit accessible par le véhicule le plus proche du stockage ; le rangement n&apos;est pas inclus, sauf option palette.</li>
          <li>Si le livreur ne peut pas accéder au lieu convenu, une nouvelle livraison pourra être programmée et des frais supplémentaires pourront s&apos;appliquer.</li>
        </ul>
      </LegalSection>

      <LegalSection n={5} title="À la réception">
        <p>
          Contrôlez la quantité et l&apos;état du bois avec le livreur. Le relevé
          d&apos;humidité est joint au bon de livraison. Toute anomalie doit être notée sur
          le bon de livraison puis confirmée sous 48 h par téléphone ou par e-mail, avec des
          photos si possible.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Retours et rétractation">
        <p>
          Les consommateurs disposent de 14 jours après réception pour se rétracter. Vu le
          volume des produits, la reprise est organisée avec vous au cas par cas : contactez-nous
          d&apos;abord. Les conditions complètes figurent à l&apos;article 8 des{" "}
          <Link href="/cgv">conditions générales de vente</Link>.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Un lot non conforme ?">
        <p>
          Si le bois ne correspond pas à votre commande (essence, longueur, quantité) ou
          dépasse le taux d&apos;humidité annoncé, nous remplaçons le lot, le complétons ou
          vous remboursons, selon la situation, au titre des garanties légales.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
