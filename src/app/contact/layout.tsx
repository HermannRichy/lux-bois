import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & devis",
  description: `Devis gratuit, réponse sous 24 h ouvrées. Appelez le ${SITE.phone} ou écrivez à ${SITE.email}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
