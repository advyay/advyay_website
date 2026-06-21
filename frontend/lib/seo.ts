import type { Metadata } from "next";
import { SITE } from "./site";

interface PageMeta {
  title?: string;
  description?: string;
  path?: string;       // pathname, leading slash, no domain
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}

const TITLE_SUFFIX = `· ${SITE.shortName}`;

export function buildMetadata(meta: PageMeta = {}): Metadata {
  const path = meta.path ?? "/";
  const url = `${SITE.domain}${path}`;
  const title = meta.title
    ? `${meta.title} ${TITLE_SUFFIX}`
    : `${SITE.name} — ${SITE.tagline}`;
  const description = meta.description ?? SITE.description;
  const image = `${SITE.domain}${meta.image ?? SITE.ogImage}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE.domain),
    alternates: { canonical: url },
    robots: meta.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
    openGraph: {
      type: meta.type ?? "website",
      url,
      title,
      description,
      siteName: SITE.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(meta.publishedTime ? { publishedTime: meta.publishedTime } : {})
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@advyay"
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/apple-touch-icon.png"
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legal,
    alternateName: SITE.name,
    url: SITE.domain,
    logo: `${SITE.domain}/og/logo.png`,
    sameAs: Object.values(SITE.social),
    foundingDate: String(SITE.founded),
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line1,
      addressLocality: "Bengaluru",
      addressRegion: "KA",
      addressCountry: "IN"
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.salesEmail,
        areaServed: "Worldwide"
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.email
      }
    ]
  };
}

export function productJsonLd(args: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: args.name,
    description: args.description,
    url: args.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/PreOrder" },
    publisher: { "@type": "Organization", name: SITE.legal, url: SITE.domain }
  };
}
