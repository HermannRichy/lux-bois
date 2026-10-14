import type { Metadata } from "next";
import { getProducts } from "@/lib/catalog";
import { BoutiqueClient } from "@/components/boutique-client";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Bûches, compressés, granulés et bois de cuisson, livrés en 48/72 h.",
  alternates: { canonical: "/boutique" },
};

export default async function BoutiquePage() {
  const products = await getProducts();
  return <BoutiqueClient products={products} />;
}
