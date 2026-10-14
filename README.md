# Lux Bois Chauffage

Site e-commerce pour la vente de bois de chauffage — Next.js 16 (App Router),
Tailwind CSS v4, Tabler Icons. Design "Modernist" (rouge/ivoire, Archivo,
angles droits) issu de l'export Claude Design dans `design/`.

## Démarrer

```bash
npm install
npm run dev
```

Le site tourne sur [http://localhost:3000](http://localhost:3000). Le catalogue
est lu depuis Shopify : `.env.local` doit contenir les variables ci-dessous,
sinon les pages boutique échouent (il n'y a plus de catalogue de démonstration).

## Connecter Shopify

Le catalogue et le paiement passent par Shopify. Ces deux variables sont
obligatoires dans `.env.local` (copier `.env.local.example`) :

```
SHOPIFY_STORE_DOMAIN=ton-nom-de-boutique.myshopify.com
SHOPIFY_STOREFRONT_API_TOKEN=...
```

Pour générer le token :

1. Admin Shopify → **Réglages → Apps et canaux de vente → Développer des apps**
2. **Créer une app**
3. Onglet **Configuration** → **Storefront API** → cocher `unauthenticated_read_product_listings`,
   `unauthenticated_read_product_inventory`, `unauthenticated_read_checkouts`,
   `unauthenticated_write_checkouts` (ou `..._carts` selon la version)
4. Onglet **Identifiants API** → **Installer l'app**
5. Copier le **Storefront API access token** dans `.env.local`

### Convention de tags produit

Une fois Shopify branché, la fiche produit (essence, longueur, unité de
vente) est lue depuis les tags Shopify du produit :

| Tag                | Effet                                      |
| ------------------ | ------------------------------------------ |
| `essence:chene`     | Essence affichée : "chene"                 |
| `longueur:33 cm`    | Longueur affichée                          |
| `unite:palette`     | Unité de vente (`stère` par défaut, ou `palette` / `sac`) |

Sans ces tags, le produit reste affiché mais sans ces informations.

### Paiement

Le bouton **Commander** du panier crée un panier Shopify réel (Storefront
API `cartCreate`) et redirige vers le checkout hébergé Shopify — aucune
donnée de paiement ne transite par ce site. En cas d'échec, un message
d'erreur s'affiche dans le panier.

L'option de livraison "rangé sur palette" (+29 €) peut être ajoutée comme
vraie ligne de commande en créant ce produit dans Shopify et en renseignant
son ID de variante dans `SHOPIFY_DELIVERY_RANGE_VARIANT_ID`.

## Structure

```
src/app/            pages (accueil, boutique, produit/[slug], panier, notre-bois, contact)
src/components/      header, menu, footer, fiche produit, UI (bouton, tag, champ)
src/context/         panier (localStorage, côté client)
src/lib/             types, calcul des prix dégressifs, client Shopify et catalogue
design/              export Claude Design d'origine (référence, non utilisé par l'app)
```
