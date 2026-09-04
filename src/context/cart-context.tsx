"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

export interface CartLine {
  productId: string;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  bump: (productId: string, delta: number) => void;
  remove: (productId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "lbc-cart";

const DEFAULT_LINES: CartLine[] = [];

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(DEFAULT_LINES);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Deliberately reading localStorage post-mount: doing it during render
    // would desync the server-rendered HTML (no localStorage there) from
    // the client's first paint and trigger a hydration mismatch.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable — cart just won't persist
    }
  }, [lines, hydrated]);

  const add = useCallback((productId: string, qty = 1) => {
    setLines((prev) => {
      const hit = prev.find((l) => l.productId === productId);
      if (hit) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [...prev, { productId, qty }];
    });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) => (l.productId === productId ? { ...l, qty } : l))
    );
  }, []);

  const bump = useCallback((productId: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((l) =>
          l.productId === productId ? { ...l, qty: l.qty + delta } : l
        )
        .filter((l) => l.qty > 0)
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);

  const value = useMemo(
    () => ({ lines, count, add, setQty, bump, remove }),
    [lines, count, add, setQty, bump, remove]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
