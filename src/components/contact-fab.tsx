"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { IconChevronRight, IconMail, IconMessageCircle2, IconPhone, IconX } from "@tabler/icons-react";
import { SITE } from "@/lib/site";
import { useConsent } from "@/lib/use-consent";

const ACTIONS = [
  {
    href: SITE.phoneHref,
    icon: IconPhone,
    label: "Appeler",
    note: `${SITE.phone} · ${SITE.hours}`,
  },
  {
    href: `mailto:${SITE.email}?subject=${encodeURIComponent("Demande de renseignements")}`,
    icon: IconMail,
    label: "Écrire un e-mail",
    note: SITE.email,
  },
] as const;

export function ContactFab() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Le lanceur du chat Tidio occupe le coin bas droit : le bouton passe au-dessus.
  const chatActive = useConsent()?.chat === true;

  // Sur le panier et les fiches produit, une barre d'achat fixe occupe le bas
  // de l'écran mobile : le bouton se place au-dessus d'elle.
  const hasBottomBar = pathname === "/panier" || pathname.startsWith("/produit/");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`fixed right-4 md:right-6 z-40 flex flex-col items-end gap-3 transition-[bottom] duration-300 ${
        chatActive
          ? hasBottomBar
            ? "bottom-44 md:bottom-28"
            : "bottom-28"
          : hasBottomBar
            ? "bottom-24 md:bottom-6"
            : "bottom-5 md:bottom-6"
      }`}
    >
      {open && (
        <div
          id="contact-panel"
          role="dialog"
          aria-label="Nous contacter"
          className="animate-panel-in origin-bottom-right w-[min(20rem,calc(100vw-2rem))] bg-bg border-2 border-text shadow-[6px_6px_0_0_var(--color-text)]"
        >
          <div className="px-4 py-3 border-b-2 border-divider">
            <div className="font-heading font-extrabold text-base">Une question ?</div>
            <div className="text-xs text-text/55">Réponse rapide, devis gratuit.</div>
          </div>
          {ACTIONS.map(({ href, icon: Icon, label, note }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 px-4 py-3.5 border-b border-divider last:border-b-0 hover:bg-accent-100 transition-colors"
            >
              <Icon
                size={22}
                className="text-accent transition-transform group-hover:scale-110 group-hover:-rotate-6"
              />
              <span className="flex-1 min-w-0">
                <span className="block font-heading font-extrabold text-sm">{label}</span>
                <span className="block text-[11px] text-text/55 truncate">{note}</span>
              </span>
              <IconChevronRight
                size={18}
                className="text-neutral-500 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="contact-panel"
        aria-label={open ? "Fermer le menu de contact" : "Nous contacter"}
        className={`relative w-14 h-14 grid place-items-center bg-accent text-bg cursor-pointer shadow-[3px_3px_0_0_var(--color-text)] transition-all duration-200 hover:bg-accent-600 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
          open ? "" : "animate-ring"
        }`}
      >
        <IconMessageCircle2
          size={26}
          className={`absolute transition-all duration-200 ${
            open ? "opacity-0 rotate-90 scale-50" : "opacity-100"
          }`}
        />
        <IconX
          size={26}
          className={`absolute transition-all duration-200 ${
            open ? "opacity-100" : "opacity-0 -rotate-90 scale-50"
          }`}
        />
      </button>
    </div>
  );
}
