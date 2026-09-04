export type ProductCategory = "Bûches" | "Compressé" | "Granulés" | "Allumage" | "Pro";

export type ProductUnit = "stère" | "palette" | "sac";

export interface Product {
  id: string;
  slug: string;
  img: string;
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
