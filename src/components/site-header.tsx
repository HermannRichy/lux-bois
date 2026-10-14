"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconMenu2, IconSearch, IconShoppingCart } from "@tabler/icons-react";
import { useCart } from "@/context/cart-context";
import { MobileMenu } from "@/components/mobile-menu";
import { SearchDialog } from "@/components/search-dialog";

const NAV_LINKS = [
  { label: "Boutique", href: "/boutique" },
  { label: "Notre bois", href: "/notre-bois" },
  { label: "Livraison", href: "/#livraison" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();

  // Raccourci clavier : Ctrl/Cmd + K ouvre la recherche.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="flex items-center gap-2.5 px-3.5 md:px-8 py-3 border-b-2 border-divider">
        <button
          className="w-11 h-11 shrink-0 grid place-items-center border border-divider bg-transparent cursor-pointer hover:bg-text/5 active:scale-95 transition md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Menu"
        >
          <IconMenu2 size={22} />
        </button>

        <Link href="/" className="mr-auto leading-none">
          <div className="font-heading font-extrabold text-base md:text-xl tracking-tight">
            LUX BOIS
          </div>
          <div className="font-mono text-[9px] md:text-[10px] tracking-[0.22em] text-accent">
            CHAUFFAGE
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 mr-6">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative text-sm hover:text-accent transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="w-11 h-11 shrink-0 grid place-items-center border border-divider bg-transparent cursor-pointer hover:bg-text/5 active:scale-95 transition"
          onClick={() => setSearchOpen(true)}
          aria-label="Rechercher"
          aria-haspopup="dialog"
        >
          <IconSearch size={20} />
        </button>
        <Link
          href="/panier"
          className="relative w-11 h-11 shrink-0 grid place-items-center border border-divider bg-transparent cursor-pointer hover:bg-text/5"
          aria-label="Panier"
        >
          <IconShoppingCart size={20} />
          {count > 0 && (
            <span key={count} className="animate-pop absolute -top-px -right-px font-heading font-extrabold text-[11px] bg-accent text-bg px-[5px] leading-4">
              {count}
            </span>
          )}
        </Link>
      </header>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </>
  );
}
