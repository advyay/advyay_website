/**
 * Single source of truth for everything that's *not* a route —
 * URL, legal name, social, navigation, products, copy primitives.
 * Domain constants are colocated (lib/domain/*) for type safety.
 */
export const SITE = {
  name: "Advyay Solutions",
  legal: "Advyay Solutions Private Limited",
  shortName: "Advyay",
  tagline: "Autonomous AI for the operating layer of business.",
  description:
    "Advyay builds production-grade Agentic AI — autonomous agents, multi-agent systems, and AI infrastructure for enterprise operations.",
  domain: "https://www.advyay.com",
  ogImage: "/og/advyay-default.png",
  email: "hello@advyay.com",
  salesEmail: "sales@advyay.com",
  pressEmail: "press@advyay.com",
  phone: "+91-000-000-0000",
  address: {
    line1: "Advyay Solutions Pvt. Ltd.",
    line2: "Bengaluru, Karnataka, India"
  },
  social: {
    linkedin: "https://www.linkedin.com/company/advyay",
    x: "https://x.com/advyay",
    github: "https://github.com/advyay",
    youtube: "https://www.youtube.com/@advyay"
  },
  founded: 2024,
  registry: {
    cin: "U62099KA2024PTC000000", // placeholder public-facing identifier
    gstin: "29XXXXX0000X0Z0"
  }
} as const;

export type SiteConfig = typeof SITE;
