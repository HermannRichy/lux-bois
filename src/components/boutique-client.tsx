"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconAdjustmentsHorizontal,
  IconTree,
  IconRuler2,
  IconArrowsSort,
  IconSquare,
  IconSquareCheckFilled,
  IconCircle,
  IconCircleCheckFilled,
  IconX,
  IconPlus,
} from "@tabler/icons-react";
import {
  CATEGORIES,
  ESSENCES,
  LENGTHS,
  SORTS,
  type SortId,
} from "@/lib/products";
import { EUR } from "@/lib/pricing";
import { Button, IconButton } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/types";

export function BoutiqueClient({ products }: { products: Product[] }) {
  const { add } = useCart();
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Tout");
  const [fEssences, setFEssences] = useState<string[]>([]);
  const [fLengths, setFLengths] = useState<string[]>([]);
  const [sort, setSort] = useState<SortId>("pop");
  const [filterOpen, setFilterOpen] = useState(false);

  const toggle = (list: string[], value: string, setList: (v: string[]) => void) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const visible = useMemo(() => {
    let list = products.filter((p) => cat === "Tout" || p.category === cat)
      .filter((p) => fEssences.length === 0 || fEssences.includes(p.essence))
      .filter((p) => fLengths.length === 0 || fLengths.includes(p.length));
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, cat, fEssences, fLengths, sort]);

  const filterCount = fEssences.length + fLengths.length + (sort === "pop" ? 0 : 1);
  const resultLabel = `${visible.length} ${visible.length === 1 ? "produit" : "produits"}`;

  const reset = () => {
    setFEssences([]);
    setFLengths([]);
    setSort("pop");
  };

  return (
    <div className="md:max-w-6xl md:mx-auto md:px-8 md:py-8">
      <div className="px-3.5 py-3 md:px-0 md:py-0 border-b-2 border-divider md:border-0 flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <h4 className="text-xl md:text-4xl mr-auto">Boutique</h4>
        </div>
        <div className="flex gap-2 items-center md:hidden">
          <Button
            variant="secondary"
            className="px-3 py-2.5"
            onClick={() => setFilterOpen(true)}
          >
            <IconAdjustmentsHorizontal size={18} />
            {filterCount > 0 ? `Filtres · ${filterCount}` : "Filtres"}
          </Button>
          <span className="text-xs text-text/55 ml-auto">{resultLabel}</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 text-xs px-2.5 py-1.5 font-body cursor-pointer ${
                c === cat
                  ? "bg-accent-100 text-accent-800"
                  : "border border-accent text-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="md:flex md:gap-8 md:mt-6">
        <aside className="hidden md:block w-64 shrink-0">
          <div className="flex items-center gap-2.5 mb-4">
            <IconAdjustmentsHorizontal size={20} className="text-accent" />
            <span className="font-heading font-extrabold text-base mr-auto">
              Filtrer &amp; trier
            </span>
            <button
              className="text-xs text-accent hover:underline cursor-pointer"
              onClick={reset}
            >
              Réinitialiser
            </button>
          </div>
          <FilterGroups
            products={products}
            fEssences={fEssences}
            fLengths={fLengths}
            sort={sort}
            toggleEssence={(v) => toggle(fEssences, v, setFEssences)}
            toggleLength={(v) => toggle(fLengths, v, setFLengths)}
            setSort={setSort}
          />
        </aside>

        <div className="flex-1">
          <span className="hidden md:block text-sm text-text/55 mb-4">{resultLabel}</span>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            {visible.map((p) => (
              <div
                key={p.id}
                className="flex gap-3 px-3.5 md:px-0 py-3.5 border-b md:border border-divider"
              >
                <Link
                  href={`/produit/${p.slug}`}
                  className="w-[92px] h-[92px] md:w-32 md:h-32 shrink-0 overflow-hidden bg-neutral-300 grayscale-photo relative"
                >
                  <Image src={p.img} alt="" fill sizes="130px" className="object-cover" />
                </Link>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <Link
                    href={`/produit/${p.slug}`}
                    className="font-heading font-extrabold text-sm leading-tight hover:text-accent"
                  >
                    {p.name}
                  </Link>
                  <div className="text-[11px] text-text/55">{p.spec}</div>
                  <div className="flex items-end gap-2 mt-auto">
                    <div className="font-heading font-extrabold text-base mr-auto">
                      {EUR.format(p.price)} / {p.unit}
                    </div>
                    <Button
                      className="px-3 py-2 gap-1.5"
                      onClick={() => add(p.id, 1)}
                    >
                      <IconPlus size={15} />
                      Ajouter
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {visible.length === 0 && (
              <p className="px-3.5 md:px-0 py-8 text-sm text-text/55">
                Aucun produit ne correspond à ces filtres.
              </p>
            )}
          </div>

          <div className="px-3.5 md:px-0 py-5 mt-4 flex flex-col gap-2 bg-surface">
            <div className="font-heading font-extrabold text-[15px]">
              Prix dégressif au volume
            </div>
            <p className="text-xs text-text/55 m-0">
              1 stère 89 € · 3 stères 84 €/st · 5 stères et + 79 €/st. Remise appliquée
              automatiquement au panier.
            </p>
          </div>
        </div>
      </div>

      {filterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-neutral-900/45 md:hidden">
          <button
            className="flex-1 border-0 bg-transparent cursor-pointer"
            onClick={() => setFilterOpen(false)}
            aria-label="Fermer les filtres"
          />
          <div className="bg-bg border-t-2 border-text flex flex-col max-h-[78%]">
            <div className="flex items-center gap-2.5 p-3.5 border-b-2 border-divider">
              <IconAdjustmentsHorizontal size={20} className="text-accent" />
              <span className="font-heading font-extrabold text-base mr-auto">
                Filtrer &amp; trier
              </span>
              <button
                className="text-xs text-accent hover:underline cursor-pointer"
                onClick={reset}
              >
                Réinitialiser
              </button>
              <IconButton onClick={() => setFilterOpen(false)} aria-label="Fermer">
                <IconX size={18} />
              </IconButton>
            </div>
            <div className="overflow-y-auto flex-1">
              <FilterGroups
                products={products}
                fEssences={fEssences}
                fLengths={fLengths}
                sort={sort}
                toggleEssence={(v) => toggle(fEssences, v, setFEssences)}
                toggleLength={(v) => toggle(fLengths, v, setFLengths)}
                setSort={setSort}
              />
            </div>
            <div className="p-3.5 border-t-2 border-divider">
              <Button block className="py-3.5 text-[15px]" onClick={() => setFilterOpen(false)}>
                Voir {resultLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroups({
  products,
  fEssences,
  fLengths,
  sort,
  toggleEssence,
  toggleLength,
  setSort,
}: {
  products: Product[];
  fEssences: string[];
  fLengths: string[];
  sort: SortId;
  toggleEssence: (v: string) => void;
  toggleLength: (v: string) => void;
  setSort: (s: SortId) => void;
}) {
  return (
    <>
      <div className="px-3.5 md:px-0 py-3.5 md:py-0 md:mb-6 border-b md:border-b-0 border-divider">
        <div className="flex items-center gap-2 mb-2.5">
          <IconTree size={16} className="text-neutral-600" />
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-neutral-700">
            Essence
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          {ESSENCES.map((e) => {
            const active = fEssences.includes(e);
            const Icon = active ? IconSquareCheckFilled : IconSquare;
            const count = products.filter((p) => p.essence === e).length;
            return (
              <button
                key={e}
                onClick={() => toggleEssence(e)}
                className="flex items-center gap-2.5 py-2 bg-transparent border-0 cursor-pointer text-left text-sm"
              >
                <Icon
                  size={20}
                  className={active ? "text-accent" : "text-neutral-600"}
                />
                <span className="flex-1">{e}</span>
                <span className="text-xs text-text/55">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-3.5 md:px-0 py-3.5 md:py-0 md:mb-6 border-b md:border-b-0 border-divider">
        <div className="flex items-center gap-2 mb-2.5">
          <IconRuler2 size={16} className="text-neutral-600" />
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-neutral-700">
            Longueur de bûche
          </span>
        </div>
        <div className="flex border border-divider w-fit">
          {LENGTHS.map((l) => {
            const active = fLengths.includes(l);
            return (
              <button
                key={l}
                onClick={() => toggleLength(l)}
                className={`cursor-pointer text-[13px] px-4 py-2 border-0 border-l first:border-l-0 border-divider ${
                  active ? "bg-accent text-bg" : "bg-transparent text-text"
                }`}
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-3.5 md:px-0 py-3.5 md:py-0">
        <div className="flex items-center gap-2 mb-2.5">
          <IconArrowsSort size={16} className="text-neutral-600" />
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-neutral-700">
            Trier par
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          {SORTS.map((s) => {
            const active = s.id === sort;
            const Icon = active ? IconCircleCheckFilled : IconCircle;
            return (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className="flex items-center gap-2.5 py-2 bg-transparent border-0 cursor-pointer text-left text-sm"
              >
                <Icon size={20} className={active ? "text-accent" : "text-neutral-600"} />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
