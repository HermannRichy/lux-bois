import { getProducts } from "@/lib/catalog";
import { BoutiqueClient } from "@/components/boutique-client";

export const metadata = {
  title: "Boutique — Lux Bois Chauffage",
  description: "Bûches, compressés, granulés et bois de cuisson, livrés en 48/72 h.",
};

export default async function BoutiquePage() {
  const products = await getProducts();
  return <BoutiqueClient products={products} />;
}
