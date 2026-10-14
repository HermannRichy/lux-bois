import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactFab } from "@/components/contact-fab";
import { SITE } from "@/lib/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const DEFAULT_TITLE = `${SITE.name} — ${SITE.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: DEFAULT_TITLE, template: `%s — ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "bois de chauffage",
    "bûches",
    "granulés",
    "bois de cuisson",
    "livraison bois Alsace",
    "bois sec",
    "stère",
    "Steinbourg",
    "Bas-Rhin",
    "Paris",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE.name,
    url: "/",
    title: DEFAULT_TITLE,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ec3013",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  telephone: SITE.phoneIntl,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    postalCode: SITE.address.postalCode,
    addressLocality: SITE.address.city,
    addressCountry: "FR",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
  areaServed: ["Alsace", "Paris"],
  foundingDate: "1974",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <ContactFab />
        </CartProvider>
      </body>
    </html>
  );
}
