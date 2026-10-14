import { cache } from "react";
import { fetchShopifyProducts } from "./shopify";
import type { Product } from "./types";

/**
 * Catalogue : lu en direct depuis Shopify (Storefront API). En cas d'erreur la
 * requête échoue au lieu d'afficher un catalogue vide : au build, le déploiement
 * s'arrête ; en production, la dernière page valide reste servie jusqu'à la
 * prochaine revalidation réussie.
 */
export const getProducts = cache(async (): Promise<Product[]> => fetchShopifyProducts());

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}
