export type ProductCategory = string;

export type ProductUnit = "stère" | "palette" | "sac";

export interface Product {
  id: string;
  slug: string;
  /** Première image (vignettes, listes). */
  img: string;
  /** Toutes les images du produit, dans l'ordre Shopify (img en est la première). */
  images: string[];
  name: string;
  category: ProductCategory;
  essence: string;
  length: string;
  spec: string;
  description: string;
  price: number;
  unit: ProductUnit;
  specs: { k: string; v: string }[];
  /** Shopify variant GID — present only when sourced from the Storefront API. */
  variantId?: string;
}
