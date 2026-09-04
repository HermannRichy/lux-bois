import type { Product } from "./types";

export const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

/** Volume discount applies only to bûches sold "au stère". */
export function unitPrice(product: Product, qty: number): number {
  if (product.unit !== "stère") return product.price;
  if (qty >= 5) return product.price - 10;
  if (qty >= 3) return product.price - 5;
  return product.price;
}

export function discountNote(qty: number): string {
  if (qty >= 5) return "Remise volume appliquée : −10 €/stère.";
  if (qty >= 3)
    return "Remise volume appliquée : −5 €/stère. À partir de 5 stères : −10 €/stère.";
  return "À partir de 3 stères : −5 €/stère.";
}
