import { getProductBySlug } from "@/lib/catalog";
import { EUR } from "@/lib/pricing";
import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Produit Lux Bois Chauffage";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return renderOgImage({
      eyebrow: "Boutique",
      title: "Bois de chauffage",
      subtitle: "Livraison en Alsace et à Paris.",
    });
  }

  return renderOgImage({
    eyebrow: `${product.category} · ${product.essence}`,
    title: product.name,
    subtitle: product.spec,
    badge: `${EUR.format(product.price)} / ${product.unit}`,
  });
}
