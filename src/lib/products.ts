import type { Product, ProductCategory } from "./types";

// Mock catalog mirroring the Claude Design export. Swapped for live Shopify
// data by lib/shopify.ts once Storefront API credentials are configured —
// see src/lib/shopify.ts and .env.local.example.
export const PRODUCTS: Product[] = [
  {
    id: "chene33",
    slug: "buches-de-chene-33-cm",
    img: "https://images.unsplash.com/photo-1422246719650-cb30d19825e3?auto=format&fit=crop&q=70&w=1200&h=1200",
    name: "Bûches de chêne 33 cm",
    category: "Bûches",
    essence: "Chêne",
    length: "33 cm",
    spec: "Sec < 20 % · 1 stère · densité forte",
    description:
      "Le bois de nos clients qui chauffent tout l'hiver : forte densité, longue combustion, peu de cendres. Séché 24 mois sous hangar ouvert.",
    price: 89,
    unit: "stère",
    specs: [
      { k: "Essence", v: "Chêne" },
      { k: "Humidité", v: "< 20 %" },
      { k: "Longueur", v: "33 cm" },
      { k: "Séchage", v: "24 mois sous hangar" },
      { k: "Volume", v: "1 stère = 1 m³ apparent" },
    ],
  },
  {
    id: "chene50",
    slug: "buches-de-chene-50-cm",
    img: "https://images.unsplash.com/photo-1633491774171-2bf91b7033b1?auto=format&fit=crop&q=70&w=1200&h=1200",
    name: "Bûches de chêne 50 cm",
    category: "Bûches",
    essence: "Chêne",
    length: "50 cm",
    spec: "Sec < 20 % · 1 stère · grands foyers",
    description:
      "Format long pour foyers et inserts profonds. Même chêne, même séchage 24 mois, moins de manutention pour vous.",
    price: 82,
    unit: "stère",
    specs: [
      { k: "Essence", v: "Chêne" },
      { k: "Humidité", v: "< 20 %" },
      { k: "Longueur", v: "50 cm" },
      { k: "Séchage", v: "24 mois sous hangar" },
      { k: "Volume", v: "1 stère = 1 m³ apparent" },
    ],
  },
  {
    id: "hetre33",
    slug: "buches-de-hetre-33-cm",
    img: "https://images.unsplash.com/photo-1759790475933-ec8f2d02fc65?auto=format&fit=crop&q=70&w=1200&h=1200",
    name: "Bûches de hêtre 33 cm",
    category: "Bûches",
    essence: "Hêtre",
    length: "33 cm",
    spec: "Sec < 20 % · flamme vive, peu de cendres",
    description:
      "Flamme vive et régulière, peu de cendres. Le favori des cheminées ouvertes et du bois de cuisson.",
    price: 95,
    unit: "stère",
    specs: [
      { k: "Essence", v: "Hêtre" },
      { k: "Humidité", v: "< 20 %" },
      { k: "Longueur", v: "33 cm" },
      { k: "Séchage", v: "24 mois sous hangar" },
      { k: "Volume", v: "1 stère = 1 m³ apparent" },
    ],
  },
  {
    id: "charme50",
    slug: "buches-de-charme-50-cm",
    img: "https://images.unsplash.com/photo-1672984581785-60e0ff402fd4?auto=format&fit=crop&q=70&w=1200&h=1200",
    name: "Bûches de charme 50 cm",
    category: "Bûches",
    essence: "Charme",
    length: "50 cm",
    spec: "Sec < 20 % · braises longues",
    description:
      "Braises longues, idéal pour tenir la chaleur toute la nuit dans les grands foyers.",
    price: 87,
    unit: "stère",
    specs: [
      { k: "Essence", v: "Charme" },
      { k: "Humidité", v: "< 20 %" },
      { k: "Longueur", v: "50 cm" },
      { k: "Séchage", v: "24 mois sous hangar" },
      { k: "Volume", v: "1 stère = 1 m³ apparent" },
    ],
  },
  {
    id: "compressees",
    slug: "buches-compressees",
    img: "https://images.unsplash.com/photo-1576791606138-89367074a68f?auto=format&fit=crop&q=70&w=1200&h=1200",
    name: "Bûches compressées",
    category: "Compressé",
    essence: "Mélange",
    length: "25 cm",
    spec: "Palette 96 bûches · nuit + jour",
    description:
      "Format compact, pouvoir calorifique élevé et faible taux de cendres. Pratique à stocker, prêt à brûler.",
    price: 349,
    unit: "palette",
    specs: [
      { k: "Essence", v: "Mélange feuillus" },
      { k: "Humidité", v: "< 10 %" },
      { k: "Format", v: "25 cm" },
      { k: "Conditionnement", v: "Palette de 96 bûches" },
      { k: "Volume", v: "≈ 1 palette" },
    ],
  },
  {
    id: "granules",
    slug: "granules-premium-din-plus",
    img: "https://images.unsplash.com/photo-1759790475933-ec8f2d02fc65?auto=format&fit=crop&q=70&w=1200&h=1200",
    name: "Granulés premium DIN+",
    category: "Granulés",
    essence: "Résineux",
    length: "—",
    spec: "Palette 65 sacs de 15 kg",
    description:
      "Granulés certifiés DIN+, faible taux de cendres et de fines. Compatibles tous poêles et chaudières à granulés.",
    price: 379,
    unit: "palette",
    specs: [
      { k: "Essence", v: "Résineux" },
      { k: "Certification", v: "DIN+" },
      { k: "Conditionnement", v: "65 sacs de 15 kg" },
      { k: "Volume", v: "≈ 1 palette" },
    ],
  },
  {
    id: "allumage",
    slug: "petit-bois-allumage",
    img: "https://images.unsplash.com/photo-1633491774171-2bf91b7033b1?auto=format&fit=crop&q=70&w=1200&h=1200",
    name: "Petit bois d'allumage",
    category: "Allumage",
    essence: "Résineux",
    length: "—",
    spec: "Sac 20 L · résineux sec",
    description:
      "Résineux calibré et bien sec pour un démarrage rapide, sans allume-feu chimique.",
    price: 9.5,
    unit: "sac",
    specs: [
      { k: "Essence", v: "Résineux" },
      { k: "Humidité", v: "< 15 %" },
      { k: "Conditionnement", v: "Sac de 20 L" },
    ],
  },
  {
    id: "charbon",
    slug: "charbon-de-bois-artisanal",
    img: "https://images.unsplash.com/photo-1422246719650-cb30d19825e3?auto=format&fit=crop&q=70&w=1200&h=1200",
    name: "Charbon de bois artisanal",
    category: "Allumage",
    essence: "Mélange",
    length: "—",
    spec: "Sac 10 kg · cuisson lente",
    description:
      "Charbon de bois produit en Alsace, combustion longue et régulière pour la cuisson au barbecue.",
    price: 24,
    unit: "sac",
    specs: [
      { k: "Essence", v: "Mélange feuillus" },
      { k: "Conditionnement", v: "Sac de 10 kg" },
      { k: "Usage", v: "Cuisson lente" },
    ],
  },
  {
    id: "pizzeria",
    slug: "bois-de-cuisson-pizzeria",
    img: "https://images.unsplash.com/photo-1672984581785-60e0ff402fd4?auto=format&fit=crop&q=70&w=1200&h=1200",
    name: "Bois de cuisson pizzeria",
    category: "Pro",
    essence: "Hêtre",
    length: "33 cm",
    spec: "Hêtre calibré · palette 1 m³",
    description:
      "Hêtre calibré pour four à bois professionnel : combustion homogène, montée en température rapide.",
    price: 189,
    unit: "palette",
    specs: [
      { k: "Essence", v: "Hêtre" },
      { k: "Humidité", v: "< 20 %" },
      { k: "Longueur", v: "33 cm" },
      { k: "Conditionnement", v: "Palette ≈ 1 m³" },
    ],
  },
];

export const CATEGORIES: (ProductCategory | "Tout")[] = [
  "Tout",
  "Bûches",
  "Compressé",
  "Granulés",
  "Allumage",
  "Pro",
];

export const ESSENCES = ["Chêne", "Hêtre", "Charme", "Résineux", "Mélange"];
export const LENGTHS = ["33 cm", "50 cm", "25 cm"];

export const SORTS = [
  { id: "pop", label: "Les plus commandés" },
  { id: "asc", label: "Prix croissant" },
  { id: "desc", label: "Prix décroissant" },
] as const;

export type SortId = (typeof SORTS)[number]["id"];

export const MENU_ITEMS = [
  { icon: "flame", label: "Boutique", note: "9 références", href: "/boutique" },
  { icon: "trees", label: "Notre bois", note: "Origine & séchage", href: "/notre-bois" },
  { icon: "truckDelivery", label: "Livraison & zones", note: "Steinbourg · Paris", href: "/#livraison" },
  { icon: "calculator", label: "Calculer mon volume", note: "Combien de stères ?", href: "/#livraison" },
  { icon: "fileInvoice", label: "Devis pro & pizzeria", note: "Réponse sous 24 h", href: "/contact" },
] as const;

export const DELIVERY_OPTIONS = [
  { id: "vrac", label: "Déchargement en vrac", price: 0 },
  { id: "range", label: "Livré rangé sur palette", price: 29 },
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
