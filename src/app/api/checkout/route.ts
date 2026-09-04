import { NextResponse } from "next/server";
import { getProducts } from "@/lib/catalog";
import { createShopifyCheckout, isShopifyConfigured } from "@/lib/shopify";

interface CheckoutBody {
  lines: { productId: string; qty: number }[];
  delivery: "vrac" | "range";
}

export async function POST(req: Request) {
  if (!isShopifyConfigured()) {
    return NextResponse.json({ checkoutUrl: null, reason: "not_configured" });
  }

  const body = (await req.json()) as CheckoutBody;
  const products = await getProducts();

  const cartLines = body.lines
    .map((l) => {
      const product = products.find((p) => p.id === l.productId);
      return product?.variantId
        ? { variantId: product.variantId, quantity: l.qty }
        : null;
    })
    .filter((l): l is { variantId: string; quantity: number } => l !== null);

  if (cartLines.length === 0) {
    // Catalog isn't sourced from Shopify yet (products have no variantId).
    return NextResponse.json({ checkoutUrl: null, reason: "not_configured" });
  }

  // Optional: a real Shopify product/variant for the "rangé sur palette"
  // (+29 €) delivery option, so it shows up as a real line item at checkout.
  const rangeVariantId = process.env.SHOPIFY_DELIVERY_RANGE_VARIANT_ID;
  if (body.delivery === "range" && rangeVariantId) {
    cartLines.push({ variantId: rangeVariantId, quantity: 1 });
  }

  try {
    const checkoutUrl = await createShopifyCheckout(
      cartLines,
      `Livraison: ${body.delivery === "range" ? "rangé sur palette" : "en vrac"}`
    );
    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error("Shopify checkout failed:", err);
    return NextResponse.json(
      { checkoutUrl: null, reason: "error" },
      { status: 502 }
    );
  }
}
