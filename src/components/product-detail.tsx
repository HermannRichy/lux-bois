"use client";

import { useState } from "react";
import Image from "next/image";
import { IconArrowLeft, IconCheck, IconShoppingCart } from "@tabler/icons-react";
import type { Product } from "@/lib/types";
import { EUR } from "@/lib/pricing";
import { unitPrice, discountNote } from "@/lib/pricing";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

const LENGTH_OPTIONS = ["33 cm", "50 cm", "1 m"];

export function ProductDetail({ product }: { product: Product }) {
  const { add, count } = useCart();
  const [qty, setQty] = useState(1);
  const [length, setLength] = useState(product.length !== "—" ? product.length : "33 cm");
  const [added, setAdded] = useState(false);

  const isStere = product.unit === "stère";
  const unit = isStere ? unitPrice(product, qty) : product.price;
  const total = unit * qty;

  const specs = product.specs.map((s) =>
    s.k === "Longueur" ? { ...s, v: length } : s
  );

  const handleAdd = () => {
    add(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="md:max-w-6xl md:mx-auto md:px-8 md:py-8">
      <div className="flex items-center gap-2.5 px-3.5 py-3 border-b-2 border-divider md:hidden">
        <Button href="/boutique" variant="secondary" className="!px-0 w-11 h-11" aria-label="Retour">
          <IconArrowLeft size={20} />
        </Button>
        <span className="text-[13px] mr-auto">{product.category}</span>
        <Button href="/panier" variant="secondary" className="relative !px-0 w-11 h-11" aria-label="Panier">
          <IconShoppingCart size={20} />
          {count > 0 && (
            <span key={count} className="animate-pop absolute -top-px -right-px font-heading font-extrabold text-[11px] bg-accent text-bg px-[5px] leading-4">
              {count}
            </span>
          )}
        </Button>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-10">
        <div className="h-[260px] md:h-[480px] overflow-hidden grayscale-photo relative">
          <Image
            src={product.img}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <div className="px-4 md:px-0 py-4.5 md:py-0 md:mt-0 flex flex-col gap-3 border-b-2 border-divider md:border-0">
            <div className="flex gap-1.5">
              <Tag>Sec &lt; 20 %</Tag>
              <Tag variant="neutral">
                {product.essence} · Alsace
              </Tag>
            </div>
            <h2 className="text-[26px] md:text-4xl leading-[1.06]">{product.name}</h2>
            <p className="text-[13px] md:text-base">{product.description}</p>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-[30px] md:text-4xl">
                {EUR.format(unit)}
              </span>
              <span className="text-[13px] text-text/55">
                / {product.unit} · {EUR.format(total)} au total
              </span>
            </div>
          </div>

          <div className="px-4 md:px-0 py-4 md:py-6 flex flex-col gap-4 border-b-2 border-divider md:border-0">
            {product.length !== "—" && (
              <div>
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-neutral-700 mb-1.5">
                  Longueur
                </div>
                <div className="flex border border-divider w-fit">
                  {LENGTH_OPTIONS.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLength(l)}
                      className={`cursor-pointer text-[13px] px-3.5 py-2 border-0 border-l first:border-l-0 border-divider transition-colors ${
                        l === length ? "bg-accent text-bg" : "bg-transparent text-text"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-neutral-700 mb-1.5">
                Volume ({product.unit}s)
              </div>
              <div className="flex items-stretch border border-divider w-fit">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-[46px] h-[46px] border-0 bg-transparent cursor-pointer text-xl font-heading hover:bg-text/5 active:bg-text/10 active:scale-90 transition"
                  aria-label="Diminuer la quantité"
                >
                  –
                </button>
                <div className="w-14 grid place-items-center font-heading font-extrabold text-lg border-x border-divider">
                  <span key={qty} className="animate-pop inline-block">{qty}</span>
                </div>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-[46px] h-[46px] border-0 bg-transparent cursor-pointer text-xl font-heading hover:bg-text/5 active:bg-text/10 active:scale-90 transition"
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
              {isStere && (
                <div className="text-xs mt-1.5 text-accent-700">{discountNote(qty)}</div>
              )}
            </div>
          </div>

          <div className="px-4 md:px-0 py-4 md:py-6 border-b-2 border-divider md:border-0">
            <table className="w-full text-sm">
              <tbody>
                {specs.map((s) => (
                  <tr key={s.k}>
                    <td className="text-text/55 w-[46%] py-2 border-b border-divider">
                      {s.k}
                    </td>
                    <td className="font-heading font-extrabold py-2 border-b border-divider">
                      {s.v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 md:px-0 py-4 md:py-6 flex flex-col gap-2.5">
            <div className="font-heading font-extrabold text-[15px]">Livraison</div>
            <p className="text-xs text-text/55 m-0">
              Camion-benne ou remorque selon l&apos;accès. Déchargement en vrac devant le
              stockage, ou rangé sur palette (+29 €). Créneau de 2 h confirmé la veille.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4 mt-2">
            <Button className={`px-6 py-4 text-base ${added ? "!bg-neutral-900" : ""}`} onClick={handleAdd} aria-live="polite">
              {added ? (
                <>
                  <IconCheck size={18} className="animate-check-in" />
                  Ajouté
                </>
              ) : (
                "Ajouter au panier"
              )}
            </Button>
            <div>
              <div className="text-xs text-text/55">Total</div>
              <div key={total} className="animate-fade-in font-heading font-extrabold text-xl">{EUR.format(total)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed, not sticky: the bar's own container ends at its natural
          position, so a sticky bar here would never get room to float. */}
      <div className="h-[76px] md:hidden" aria-hidden />
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t-2 border-divider px-4 py-3 flex gap-2.5 items-center bg-bg">
        <div className="mr-auto">
          <div className="text-[11px] text-text/55">Total</div>
          <div key={total} className="animate-fade-in font-heading font-extrabold text-lg">{EUR.format(total)}</div>
        </div>
        <Button className={`px-4.5 py-3.5 text-[15px] ${added ? "!bg-neutral-900" : ""}`} onClick={handleAdd} aria-live="polite">
          {added ? (
                <>
                  <IconCheck size={18} className="animate-check-in" />
                  Ajouté
                </>
              ) : (
                "Ajouter au panier"
              )}
        </Button>
      </div>
    </div>
  );
}
