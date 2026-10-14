"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IconArrowRight,
  IconFlame,
  IconLoader2,
  IconMail,
  IconSearch,
  IconTrees,
  IconTruckDelivery,
  IconX,
} from "@tabler/icons-react";
import { PRODUCTS } from "@/lib/products";
import { EUR } from "@/lib/pricing";
import type { Product } from "@/lib/types";

const SHORTCUTS = [
  { label: "Toute la boutique", href: "/boutique", icon: IconFlame },
  { label: "Notre bois & séchage", href: "/notre-bois", icon: IconTrees },
  { label: "Livraison & retours", href: "/livraison-retours", icon: IconTruckDelivery },
  { label: "Devis professionnel", href: "/contact", icon: IconMail },
];

const SUGGESTIONS = ["Chêne", "Hêtre", "Granulés", "Allume-feu", "50 cm"];

function normalize(s: string) {
  return s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

function searchProducts(products: Product[], query: string): Product[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return products
    .map((p) => {
      const name = normalize(p.name);
      const rest = normalize(
        [p.category, p.essence, p.length, p.spec, p.description].join(" ")
      );
      let score = 0;
      for (const t of terms) {
        if (name.includes(t)) score += 3;
        else if (rest.includes(t)) score += 1;
        else return { p, score: 0 };
      }
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  // Catalogue réel (Shopify si configuré) ; le catalogue local sert d'amorce.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: { products: Product[] }) => {
        if (!cancelled) setProducts(data.products);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const results = useMemo(() => searchProducts(products, query), [products, query]);
  const hasQuery = query.trim().length > 0;
  const items = hasQuery
    ? results.map((p) => ({ key: p.id, href: `/produit/${p.slug}` }))
    : SHORTCUTS.map((s) => ({ key: s.href, href: s.href }));

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (items[active]) go(items[active].href);
      else if (hasQuery) go("/boutique");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-neutral-900/45 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Rechercher"
      onKeyDown={onKeyDown}
    >
      <div className="bg-bg border-b-2 border-text animate-slide-in-left md:max-w-2xl md:w-full md:mx-auto md:mt-16 md:border-2 md:shadow-[6px_6px_0_0_var(--color-text)] flex flex-col max-h-[85dvh]">
        <div className="flex items-center gap-2.5 px-3.5 py-3 border-b-2 border-divider">
          {loading ? (
            <IconLoader2 size={20} className="text-accent animate-spin shrink-0" />
          ) : (
            <IconSearch size={20} className="text-accent shrink-0" />
          )}
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            placeholder="Chêne, granulés, 50 cm…"
            aria-label="Rechercher un produit"
            className="flex-1 min-w-0 bg-transparent text-base py-2 focus-visible:!outline-0 [&::-webkit-search-cancel-button]:hidden"
          />
          {hasQuery && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="text-xs text-accent hover:underline cursor-pointer shrink-0"
            >
              Effacer
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la recherche"
            className="w-10 h-10 shrink-0 grid place-items-center border border-divider cursor-pointer hover:bg-text/5 active:scale-95 transition"
          >
            <IconX size={20} />
          </button>
        </div>

        <div className="overflow-y-auto">
          {!hasQuery && (
            <>
              <div className="px-3.5 pt-3 pb-1 font-mono text-[10px] tracking-[0.14em] uppercase text-neutral-700">
                Suggestions
              </div>
              <div className="px-3.5 pb-3 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setQuery(s);
                      setActive(0);
                      inputRef.current?.focus();
                    }}
                    className="text-xs px-2.5 py-1.5 border border-accent text-accent cursor-pointer hover:bg-accent-100 active:scale-95 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="px-3.5 pt-2 pb-1 font-mono text-[10px] tracking-[0.14em] uppercase text-neutral-700 border-t border-divider">
                Accès rapide
              </div>
              {SHORTCUTS.map(({ label, href, icon: Icon }, i) => (
                <button
                  key={href}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(href)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 border-b border-divider text-left cursor-pointer transition-colors ${
                    i === active ? "bg-accent-100" : ""
                  }`}
                >
                  <Icon size={20} className="text-accent" />
                  <span className="flex-1 text-sm font-heading font-extrabold">{label}</span>
                  <IconArrowRight size={16} className="text-neutral-500" />
                </button>
              ))}
            </>
          )}

          {hasQuery && results.length > 0 && (
            <>
              <div
                className="px-3.5 pt-3 pb-1 text-xs text-text/55"
                role="status"
                aria-live="polite"
              >
                {results.length} {results.length === 1 ? "résultat" : "résultats"}
              </div>
              {results.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(`/produit/${p.slug}`)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 border-b border-divider text-left cursor-pointer transition-colors ${
                    i === active ? "bg-accent-100" : ""
                  }`}
                >
                  <span className="relative w-14 h-14 shrink-0 overflow-hidden bg-neutral-300 grayscale-photo">
                    <Image src={p.img} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-heading font-extrabold text-sm leading-tight">
                      {p.name}
                    </span>
                    <span className="block text-[11px] text-text/55 truncate">{p.spec}</span>
                  </span>
                  <span className="font-heading font-extrabold text-sm shrink-0">
                    {EUR.format(p.price)}
                    <span className="font-normal text-[11px] text-text/55"> / {p.unit}</span>
                  </span>
                </button>
              ))}
            </>
          )}

          {hasQuery && results.length === 0 && (
            <div className="px-3.5 py-8 flex flex-col gap-2 items-start">
              <div className="font-heading font-extrabold text-base">
                Aucun produit pour « {query.trim()} »
              </div>
              <p className="text-sm text-text/55 m-0">
                Essayez « chêne », « hêtre » ou « granulés », ou parcourez toute la boutique.
              </p>
              <button
                type="button"
                onClick={() => go("/boutique")}
                className="text-sm text-accent hover:underline cursor-pointer"
              >
                Voir toute la boutique →
              </button>
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4 px-3.5 py-2 border-t border-divider text-[11px] text-text/55">
          <span>↑ ↓ pour naviguer</span>
          <span>↵ pour ouvrir</span>
          <span className="ml-auto">Échap pour fermer</span>
        </div>
      </div>
      <button
        type="button"
        className="flex-1 border-0 bg-transparent cursor-default"
        onClick={onClose}
        aria-label="Fermer la recherche"
        tabIndex={-1}
      />
    </div>
  );
}
