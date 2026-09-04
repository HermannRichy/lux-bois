import type { ReactNode } from "react";

const VARIANTS = {
  accent: "bg-accent-100 text-accent-800",
  neutral: "bg-neutral-100 text-neutral-800",
  outline: "border border-accent text-accent",
} as const;

export function Tag({
  variant = "accent",
  children,
  className = "",
}: {
  variant?: keyof typeof VARIANTS;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center text-[11px] tracking-wide px-2.5 py-1 ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
