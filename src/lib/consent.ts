export interface Consent {
  /** Mesure d'audience et suivi de campagne (SiteWit) : ne se charge qu'avec ce choix. */
  analytics: boolean;
  /** Chat en direct (Tidio) : ne se charge qu'avec ce choix. */
  chat: boolean;
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
    const c = JSON.parse(raw) as Partial<Consent>;
    if (typeof c.analytics !== "boolean" || typeof c.at !== "number") return null;
    if (Date.now() - c.at > MAX_AGE_MS) return null;
    // Un choix enregistré avant l'ajout du chat vaut refus du chat.
    return { analytics: c.analytics, chat: c.chat === true, at: c.at };
  } catch {
    return null;
  }
}

export function saveConsent(choice: { analytics: boolean; chat: boolean }) {
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...choice, at: Date.now() }));
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
