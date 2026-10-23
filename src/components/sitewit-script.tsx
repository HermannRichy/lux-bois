"use client";

import Script from "next/script";
import { useConsent } from "@/lib/use-consent";

// Script de suivi de campagne SiteWit (compte 395612314).
const SITEWIT_SNIPPET = `var _swaMa =["395612314"];"undefined"==typeof sw&&!function(e, s, a){function t(){for(;o[0]&&"loaded"==o[0][d];)i=o.shift(),i[w]=!c.parentNode.insertBefore(i,c)}for(var r,n,i,o=[],c=e.scripts[0],w="onreadystatechange",d="readyState";r=a.shift();)n=e.createElement(s),"async"in c?(n.async=!1,e.head.appendChild(n)):c[d]?(o.push(n), n[w]=t): e.write("<" + s +' src="'+r+'" defer></'+s+">"),n.src=r}(document,"script",["//analytics.sitewit.com/v3/"+_swaMa[0]+"/sw.js"]);`;

/**
 * Charge le suivi de campagne SiteWit uniquement si le visiteur a accepté la
 * mesure d'audience dans le bandeau cookies. Sans accord, rien n'est chargé.
 */
export function SitewitScript() {
  const consent = useConsent();
  if (consent?.analytics !== true) return null;

  return (
    <Script id="sitewit" strategy="afterInteractive">
      {SITEWIT_SNIPPET}
    </Script>
  );
}
