import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

const BASE =
  "inline-flex items-center justify-center gap-1.5 font-heading font-extrabold text-sm leading-tight cursor-pointer transition-[color,background-color,transform] duration-150 active:scale-[0.97] disabled:opacity-45 disabled:cursor-not-allowed";

const VARIANTS = {
  primary: "bg-accent text-bg px-4 py-3 hover:bg-accent-600 active:bg-accent-700",
  secondary:
    "border border-divider text-text px-4 py-3 hover:bg-text/7 active:bg-text/14",
  ghost: "text-accent px-1 hover:bg-accent/10 active:bg-accent/18",
} as const;

type Variant = keyof typeof VARIANTS;

interface CommonProps {
  variant?: Variant;
  block?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", block, className = "", children, ...rest } = props;
  const cls = `${BASE} ${VARIANTS[variant]} ${block ? "w-full" : ""} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href!} className={cls} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

export function IconButton({
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; className?: string }) {
  return (
    <button
      className={`w-11 h-11 shrink-0 grid place-items-center border border-divider bg-transparent cursor-pointer hover:bg-text/5 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
