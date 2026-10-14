import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";
import { SITE } from "@/lib/site";

const STATIC_PAGES = [
  { path: "", priority: 1 },
  { path: "/boutique", priority: 0.9 },
  { path: "/notre-bois", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/livraison-retours", priority: 0.5 },
  { path: "/cgv", priority: 0.3 },
  { path: "/cgu", priority: 0.3 },
  { path: "/mentions-legales", priority: 0.3 },
  { path: "/confidentialite", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [
    ...STATIC_PAGES.map((p) => ({
      url: `${SITE.url}${p.path}`,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...products.map((p) => ({
      url: `${SITE.url}/produit/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
