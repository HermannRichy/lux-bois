import { cache } from "react";
import { PRODUCTS } from "./products";
import { fetchShopifyProducts, isShopifyConfigured } from "./shopify";
import type { Product } from "./types";

/**
 * Product catalog: reads live from Shopify once SHOPIFY_STORE_DOMAIN and
 * SHOPIFY_STOREFRONT_API_TOKEN are set (see .env.local.example), otherwise
 * falls back to the mock catalog from the Claude Design export.
 */
export const getProducts = cache(async (): Promise<Product[]> => {
  if (!isShopifyConfigured()) return PRODUCTS;
  try {
    const products = await fetchShopifyProducts();
    return products.length > 0 ? products : PRODUCTS;
  } catch (err) {
    console.error("Shopify fetch failed, falling back to mock catalog:", err);
    return PRODUCTS;
  }
});

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}
