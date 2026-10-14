export const SORTS = [
  { id: "pop", label: "Les plus commandés" },
  { id: "asc", label: "Prix croissant" },
  { id: "desc", label: "Prix décroissant" },
] as const;

export type SortId = (typeof SORTS)[number]["id"];

export const MENU_ITEMS = [
  { icon: "flame", label: "Boutique", note: "Bûches, granulés, cuisson", href: "/boutique" },
  { icon: "trees", label: "Notre bois", note: "Origine & séchage", href: "/notre-bois" },
  { icon: "truckDelivery", label: "Livraison & zones", note: "Steinbourg · Paris", href: "/#livraison" },
  { icon: "calculator", label: "Calculer mon volume", note: "Combien de stères ?", href: "/#livraison" },
  { icon: "fileInvoice", label: "Devis pro & pizzeria", note: "Réponse sous 24 h", href: "/contact" },
] as const;

export const DELIVERY_OPTIONS = [
  { id: "vrac", label: "Déchargement en vrac", price: 0 },
  { id: "range", label: "Livré rangé sur palette", price: 29 },
] as const;
