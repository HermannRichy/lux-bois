"use client";

import Script from "next/script";
import { useConsent } from "@/lib/use-consent";

/**
 * Chat en direct Tidio. Ne se charge que si le visiteur a accepté le chat dans
 * le bandeau cookies : Tidio dépose des identifiants et reçoit l'adresse IP.
 */
export function TidioScript() {
  const consent = useConsent();
  if (consent?.chat !== true) return null;

  return (
    <Script
      id="tidio"
      src="https://code.tidio.co/2i797nf0drrhkcncuytfejdaw2l3cdz0.js"
      strategy="afterInteractive"
    />
  );
}
