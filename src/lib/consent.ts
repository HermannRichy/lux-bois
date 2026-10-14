export interface Consent {
  /** Mesure d'audience. Aucun outil n'est actif aujourd'hui : ce choix le conditionnera. */
  analytics: boolean;
  /** Horodatage du choix (ms). */
  at: number;
}

export const CONSENT_KEY = "lbc-consent";
export const CONSENT_EVENT = "lbc-consent-change";
export const CONSENT_OPEN_EVENT = "lbc-consent-open";
// Le choix est redemandé au bout de 6 mois (recommandation CNIL : 6 à 13 mois).
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 180;

/** Lecture brute (chaîne) pour useSyncExternalStore : stable tant que rien ne change. */
export function readConsentRaw(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function parseConsent(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const c = JSON.parse(raw) as Consent;
    if (typeof c.analytics !== "boolean" || typeof c.at !== "number") return null;
    return Date.now() - c.at > MAX_AGE_MS ? null : c;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean) {
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics, at: Date.now() }));
  } catch {
    // stockage indisponible : le choix vaut pour la session seulement
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** À utiliser avant de charger tout traceur non essentiel. */
export function hasAnalyticsConsent(): boolean {
  return parseConsent(readConsentRaw())?.analytics === true;
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
