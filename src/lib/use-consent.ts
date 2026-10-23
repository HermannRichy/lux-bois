"use client";

import { useSyncExternalStore } from "react";
import { CONSENT_EVENT, parseConsent, readConsentRaw, type Consent } from "@/lib/consent";

function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Choix de consentement courant (null tant qu'aucun choix valide n'existe, et côté serveur). */
export function useConsent(): Consent | null {
  const raw = useSyncExternalStore(subscribe, readConsentRaw, () => null);
  return parseConsent(raw);
}
