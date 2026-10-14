"use client";

import { useEffect } from "react";

// Dernier filet de sécurité : remplace tout le layout, donc styles en ligne.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f3f2f2",
          color: "#201e1d",
          fontFamily: "system-ui, sans-serif",
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 440 }}>
          <h1 style={{ fontSize: 32, margin: "0 0 12px" }}>Un problème est survenu.</h1>
          <p style={{ margin: "0 0 20px" }}>
            Le site est momentanément indisponible. Réessayez, ou appelez-nous au 06 38 88 40 61.
          </p>
          <button
            onClick={() => retry()}
            style={{
              background: "#ec3013",
              color: "#f8f4f4",
              border: 0,
              padding: "14px 20px",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
