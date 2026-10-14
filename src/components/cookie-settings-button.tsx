"use client";

import { openConsentSettings } from "@/lib/consent";

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={`cursor-pointer ${className}`}>
      Gérer les cookies
    </button>
  );
}
