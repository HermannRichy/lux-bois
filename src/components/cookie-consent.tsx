"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { IconCookie } from "@tabler/icons-react";
import {
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  parseConsent,
  readConsentRaw,
  saveConsent,
} from "@/lib/consent";
import { Button } from "@/components/ui/button";

function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function CookieConsent() {
  // Côté serveur on suppose un choix déjà fait : pas de bandeau dans le HTML
  // initial, il apparaît après hydratation si aucun choix valide n'existe.
  const raw = useSyncExternalStore(subscribe, readConsentRaw, () => "server");
  const consent = raw === "server" ? { analytics: false, chat: false, at: 0 } : parseConsent(raw);

  const [reopened, setReopened] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [chat, setChat] = useState(false);

  useEffect(() => {
    const open = () => {
      const current = parseConsent(readConsentRaw());
      setAnalytics(current?.analytics ?? false);
      setChat(current?.chat ?? false);
      setCustom(true);
      setReopened(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  if (consent && !reopened) return null;

  const choose = (choice: { analytics: boolean; chat: boolean }) => {
    saveConsent(choice);
    setReopened(false);
    setCustom(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      aria-describedby="cookie-desc"
      className="animate-sheet-in fixed inset-x-0 bottom-0 z-[60] md:inset-x-auto md:left-6 md:bottom-6 md:max-w-md bg-bg border-t-2 md:border-2 border-text md:shadow-[6px_6px_0_0_var(--color-text)] p-4 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2.5">
        <IconCookie size={22} className="text-accent shrink-0" />
        <h2 className="text-base">Cookies &amp; confidentialité</h2>
      </div>
      <p id="cookie-desc" className="text-xs text-text/70 m-0">
        Nous utilisons le stockage nécessaire au site (votre panier). Avec votre accord,
        nous activons aussi la mesure d&apos;audience et le suivi de nos campagnes
        publicitaires (SiteWit), ainsi que le chat en direct (Tidio).{" "}
        <Link href="/confidentialite" className="text-accent underline underline-offset-2">
          En savoir plus
        </Link>
      </p>

      {custom && (
        <div className="flex flex-col border border-divider animate-fade-in">
          <label className="flex items-start gap-3 p-3 border-b border-divider opacity-70">
            <input type="checkbox" checked disabled className="mt-0.5 accent-[var(--color-accent)]" />
            <span className="text-xs">
              <strong className="font-heading font-extrabold block text-sm">Essentiels</strong>
              Panier et fonctionnement du site. Toujours actifs.
            </span>
          </label>
          <label className="flex items-start gap-3 p-3 cursor-pointer hover:bg-text/[0.03]">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-0.5 accent-[var(--color-accent)]"
            />
            <span className="text-xs">
              <strong className="font-heading font-extrabold block text-sm">
                Audience &amp; campagnes
              </strong>
              Statistiques de fréquentation et suivi de nos campagnes publicitaires (SiteWit).
            </span>
          </label>
          <label className="flex items-start gap-3 p-3 border-t border-divider cursor-pointer hover:bg-text/[0.03]">
            <input
              type="checkbox"
              checked={chat}
              onChange={(e) => setChat(e.target.checked)}
              className="mt-0.5 accent-[var(--color-accent)]"
            />
            <span className="text-xs">
              <strong className="font-heading font-extrabold block text-sm">Chat en direct</strong>
              Messagerie instantanée avec notre équipe (Tidio).
            </span>
          </label>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        {custom ? (
          <Button className="flex-1 py-2.5" onClick={() => choose({ analytics, chat })}>
            Enregistrer mes choix
          </Button>
        ) : (
          <>
            <Button variant="secondary" className="flex-1 py-2.5" onClick={() => choose({ analytics: false, chat: false })}>
              Tout refuser
            </Button>
            <Button variant="secondary" className="flex-1 py-2.5" onClick={() => setCustom(true)}>
              Personnaliser
            </Button>
            <Button className="flex-1 py-2.5" onClick={() => choose({ analytics: true, chat: true })}>
              Tout accepter
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
