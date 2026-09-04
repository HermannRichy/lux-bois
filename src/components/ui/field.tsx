import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

const INPUT_CLS =
  "w-full min-h-9 px-2.5 py-1.5 text-sm text-text bg-surface border border-divider hover:border-text/45 focus-visible:border-accent focus-visible:outline-0";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-text/70">{label}</label>
      {children}
    </div>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${INPUT_CLS} ${props.className ?? ""}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${INPUT_CLS} min-h-24 resize-y ${props.className ?? ""}`}
    />
  );
}

export function Radio({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer text-sm group">
      <input
        type="radio"
        name={name}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="w-4 h-4 shrink-0 rounded-full border-[1.5px] border-divider peer-checked:border-accent peer-checked:bg-accent peer-checked:shadow-[inset_0_0_0_4px_var(--color-bg)] peer-focus-visible:outline-2 peer-focus-visible:outline-accent peer-focus-visible:outline-offset-2 group-hover:border-accent transition-colors" />
      {label}
    </label>
  );
}
