"use client";

import Link from "next/link";
import {
  IconX,
  IconChevronRight,
  IconPhone,
  IconFlame,
  IconTrees,
  IconTruckDelivery,
  IconCalculator,
  IconFileInvoice,
  IconUserCircle,
} from "@tabler/icons-react";
import { MENU_ITEMS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const ICONS = {
  flame: IconFlame,
  trees: IconTrees,
  truckDelivery: IconTruckDelivery,
  calculator: IconCalculator,
  fileInvoice: IconFileInvoice,
  userCircle: IconUserCircle,
} as const;

export function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/45 flex flex-col animate-fade-in">
      <div className="bg-bg border-b-2 border-divider animate-slide-in-left">
        <div className="flex items-center gap-2.5 px-3.5 py-3 border-b-2 border-divider">
          <span className="font-heading font-extrabold text-sm mr-auto">MENU</span>
          <button
            className="w-10 h-10 grid place-items-center border border-divider bg-transparent cursor-pointer hover:bg-text/5"
            onClick={onClose}
            aria-label="Fermer"
          >
            <IconX size={20} />
          </button>
        </div>
        {MENU_ITEMS.map((m) => {
          const Icon = ICONS[m.icon];
          return (
            <Link
              key={m.label}
              href={m.href}
              onClick={onClose}
              className="w-full flex items-center gap-3 px-3.5 py-3.5 border-b border-divider text-left hover:bg-accent-100 active:bg-accent-200 transition-colors group"
            >
              <Icon size={22} className="text-accent transition-transform group-hover:scale-110" />
              <span className="flex-1">
                <span className="block font-heading font-extrabold text-sm">
                  {m.label}
                </span>
                <span className="block text-[11px] text-text/55">{m.note}</span>
              </span>
              <IconChevronRight size={18} className="text-neutral-500 transition-transform group-hover:translate-x-0.5" />
            </Link>
          );
        })}
        <div className="flex gap-2.5 p-3.5">
          <Button href={SITE.phoneHref} className="flex-1">
            <IconPhone size={16} />
            {SITE.phone}
          </Button>
        </div>
      </div>
      <button
        className="flex-1 border-0 bg-transparent cursor-pointer"
        onClick={onClose}
        aria-label="Fermer le menu"
      />
    </div>
  );
}
