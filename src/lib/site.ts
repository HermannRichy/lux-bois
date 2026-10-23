/**
 * Source unique des informations de l'entreprise : contact, adresse, URL.
 * Utilisée par le footer, la page contact, les métadonnées SEO et les pages légales.
 */
export const SITE = {
  name: "Lux Bois Chauffage",
  shortName: "Lux Bois",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://luxboischauffage.com",
  tagline: "Bois de chauffage livré partout en France",
  description:
    "Bûches, granulés et bois de cuisson séchés 24 mois, livrés en 48/72 h partout en France.",
  phone: "06 38 88 40 61",
  phoneHref: "tel:+33638884061",
  phoneIntl: "+33638884061",
  email: "contact@luxboischauffage.com",
  hours: "lun–sam · 8h–18h",
  address: {
    street: "12 route de la Forêt",
    postalCode: "67790",
    city: "Steinbourg",
    country: "France",
  },
  legal: {
    companyName: "Lux Bois Chauffage",
    legalForm: "Entreprise individuelle",
    publicationDirector: "KALLEL Younes",
  },
  host: {
    name: "Hostinger International Ltd.",
    address: "61 Lordou Vironos Street, 6023 Larnaca, Chypre",
  },
  lastUpdate: "14 octobre 2026",
} as const;

export const FULL_ADDRESS = `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`;
