import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProducts, getProductBySlug } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { ProductDetail } from "@/components/product-detail";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/produit/${product.slug}` },
    openGraph: {
      type: "website",
      url: `/produit/${product.slug}`,
      title: `${product.name} — ${SITE.name}`,
      description: product.description,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.length > 0 ? product.images : product.img,
    sku: product.id,
    category: product.category,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/produit/${product.slug}`,
      priceCurrency: "EUR",
      price: product.price.toFixed(2),
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE.name },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ProductDetail product={product} />
    </>
  );
}
