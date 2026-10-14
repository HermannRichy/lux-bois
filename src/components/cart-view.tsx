"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconTrash } from "@tabler/icons-react";
import { useCart } from "@/context/cart-context";
import { DELIVERY_OPTIONS } from "@/lib/products";
import { EUR, unitPrice } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import type { Product } from "@/lib/types";

export function CartView({ products }: { products: Product[] }) {
  const { lines, bump, remove, count } = useCart();
  const [delivery, setDelivery] = useState<(typeof DELIVERY_OPTIONS)[number]["id"]>("vrac");
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(false);
  const resolved = useMemo(
    () =>
      lines
        .map((l) => ({ line: l, product: products.find((p) => p.id === l.productId) }))
        .filter(
          (x): x is { line: (typeof lines)[number]; product: Product } => !!x.product
        ),
    [lines, products]
  );

  const subtotal = resolved.reduce(
    (sum, { line, product }) => sum + unitPrice(product, line.qty) * line.qty,
    0
  );
  const savings = resolved.reduce((sum, { line, product }) => {
    if (product.unit !== "stère") return sum;
    return sum + (product.price - unitPrice(product, line.qty)) * line.qty;
  }, 0);
  const delCost = DELIVERY_OPTIONS.find((d) => d.id === delivery)?.price ?? 0;
  const grandTotal = subtotal + delCost;

  async function handleCheckout() {
    setCheckingOut(true);
    setCheckoutError(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, delivery }),
      });
      if (res.ok) {
        const { checkoutUrl } = await res.json();
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
          return;
        }
      }
      setCheckoutError(true);
    } catch {
      setCheckoutError(true);
    } finally {
      setCheckingOut(false);
    }
  }

  return (
    <div className="md:max-w-4xl md:mx-auto md:px-8 md:py-8">
      <div className="flex items-center gap-3 px-4 md:px-0 py-3.5 md:py-0 md:mb-6 border-b-2 border-divider md:border-0">
        <h4 className="text-xl md:text-4xl mr-auto">Panier</h4>
        <span className="text-[13px] text-text/55">{count} article(s)</span>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-8">
        <div className="md:col-span-2">
          {resolved.map(({ line, product }) => (
            <div
              key={line.productId}
              className="flex gap-3 px-4 md:px-0 py-3.5 border-b border-divider"
            >
              <Link
                href={`/produit/${product.slug}`}
                className="w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden bg-neutral-300 grayscale-photo relative"
              >
                <Image src={product.img} alt="" fill sizes="80px" className="object-cover" />
              </Link>
              <div className="flex-1 min-w-0 flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Link
                      href={`/produit/${product.slug}`}
                      className="font-heading font-extrabold text-sm leading-tight hover:text-accent"
                    >
                      {product.name}
                    </Link>
                    <div className="text-[11px] text-text/55">
                      {EUR.format(unitPrice(product, line.qty))} / {product.unit}
                    </div>
                  </div>
                  <div className="font-heading font-extrabold text-sm">
                    {EUR.format(unitPrice(product, line.qty) * line.qty)}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex border border-divider">
                    <button
                      onClick={() => bump(line.productId, -1)}
                      className="w-8 h-8 border-0 bg-transparent cursor-pointer font-heading text-base"
                    >
                      –
                    </button>
                    <div className="w-9 grid place-items-center font-heading font-extrabold text-sm border-x border-divider">
                      {line.qty}
                    </div>
                    <button
                      onClick={() => bump(line.productId, 1)}
                      className="w-8 h-8 border-0 bg-transparent cursor-pointer font-heading text-base"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => remove(line.productId)}
                    className="text-xs text-accent flex items-center gap-1 cursor-pointer hover:underline"
                  >
                    <IconTrash size={15} />
                    Retirer
                  </button>
                </div>
              </div>
            </div>
          ))}

          {resolved.length === 0 && (
            <div className="px-4 md:px-0 py-10 text-left">
              <div className="font-heading font-extrabold text-lg mb-1.5">
                Votre panier est vide
              </div>
              <p className="text-[13px] text-text/55 m-0 mb-4">
                Ajoutez du bois depuis la boutique.
              </p>
              <Button href="/boutique">Voir la boutique</Button>
            </div>
          )}
        </div>

        {resolved.length > 0 && (
          <div className="md:col-span-1">
            {checkoutError && (
              <p
                role="alert"
                className="m-0 mx-4 md:mx-0 mt-3 md:mt-0 mb-3 p-3 text-xs bg-accent-100 border border-accent text-accent-800"
              >
                Le paiement n&apos;a pas pu démarrer. Réessayez dans un instant ou appelez-nous
                au {SITE.phone}.
              </p>
            )}
            <div className="px-4 md:px-4 py-4 border-b-2 md:border border-divider bg-surface flex flex-col gap-2.5">
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-neutral-700">
                Livraison
              </div>
              <div className="text-[13px]">
                Steinbourg + 100 km · créneau 48/72 h
              </div>
              <div className="flex flex-col gap-2">
                {DELIVERY_OPTIONS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDelivery(d.id)}
                    className={`flex gap-2.5 items-baseline text-left cursor-pointer px-3 py-2.5 border border-divider ${
                      d.id === delivery ? "bg-accent-100" : "bg-transparent"
                    }`}
                  >
                    <span className="font-heading font-extrabold text-[13px] flex-1">
                      {d.label}
                    </span>
                    <span className="text-[13px]">
                      {d.price === 0 ? "Inclus" : `+ ${EUR.format(d.price)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 md:px-4 py-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="text-text/55 py-1.5">Sous-total</td>
                    <td className="text-right py-1.5">{EUR.format(subtotal)}</td>
                  </tr>
                  <tr>
                    <td className="text-text/55 py-1.5">Remise volume</td>
                    <td className="text-right py-1.5">
                      {savings > 0 ? `− ${EUR.format(savings)}` : "—"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-text/55 py-1.5">Livraison</td>
                    <td className="text-right py-1.5">
                      {delCost === 0 ? "Incluse" : EUR.format(delCost)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="hidden md:flex flex-col gap-3 px-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-text/55">Total TTC</span>
                <span className="font-heading font-extrabold text-xl">
                  {EUR.format(grandTotal)}
                </span>
              </div>
              <Button className="py-3.5 text-[15px]" onClick={handleCheckout} disabled={checkingOut}>
                {checkingOut ? "..." : "Commander"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {resolved.length > 0 && (
        <>
          <div className="h-[76px] md:hidden" aria-hidden />
          <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t-2 border-divider px-4 py-3 flex gap-3 items-center bg-bg">
            <div className="mr-auto">
              <div className="text-[11px] text-text/55">Total TTC</div>
              <div className="font-heading font-extrabold text-xl">
                {EUR.format(grandTotal)}
              </div>
            </div>
            <Button className="px-4.5 py-3.5 text-[15px]" onClick={handleCheckout} disabled={checkingOut}>
              {checkingOut ? "..." : "Commander"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
