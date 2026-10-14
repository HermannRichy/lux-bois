import { NextResponse } from "next/server";
import { getProducts } from "@/lib/catalog";
import { createShopifyCheckout } from "@/lib/shopify";

interface CheckoutBody {
  lines: { productId: string; qty: number }[];
  delivery: "vrac" | "range";
}

export async function POST(req: Request) {
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
    return NextResponse.json({ checkoutUrl: null, reason: "empty_cart" }, { status: 400 });
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
