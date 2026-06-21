import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { PRODUCTS } from "@/lib/domain/products";

const PATHS = [
  "/",
  "/platform",
  "/products/anvay",
  "/products/agents",
  "/products/enterprise-automation",
  "/products/multi-agent",
  "/products/copilots",
  "/solutions",
  "/solutions/revenue-operations",
  "/solutions/customer-support",
  "/solutions/finance-ops",
  "/solutions/it-copilots",
  "/customers",
  "/pricing",
  "/company",
  "/careers",
  "/contact",
  "/trust",
  "/trust/security",
  "/blog",
  "/changelog",
  "/docs",
  "/legal/privacy",
  "/legal/terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticEntries: MetadataRoute.Sitemap = PATHS.map((path) => ({
    url: `${SITE.domain}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : path.startsWith("/platform") || path.startsWith("/products/") ? 0.9 : 0.7
  }));
  const productEntries: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE.domain}${p.href}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8
  }));
  return [...staticEntries, ...productEntries];
}
