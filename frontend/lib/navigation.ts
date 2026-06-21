import type { Route } from "next";
import { PRODUCTS } from "./domain/products";

export interface NavGroup {
  label: string;
  href: Route;
  description?: string;
  children?: NavItem[];
}

export interface NavItem {
  label: string;
  href: Route;
  description?: string;
  external?: boolean;
}

export type NavEntry = NavItem | NavGroup;

export const PRIMARY_NAV: readonly NavEntry[] = [
  { label: "Platform", href: "/platform" as Route, description: "The runtime underneath every Advyay agent." },
  {
    label: "Products",
    href: "/products/anvay" as Route,
    children: PRODUCTS.map((p) => ({
      label: p.name,
      href: p.href as Route,
      description: p.oneLiner
    }))
  },
  {
    label: "Solutions",
    href: "/solutions" as Route,
    children: [
      { label: "Revenue Operations",   href: "/solutions/revenue-operations" as Route, description: "Pipeline, enrichment, outbound." },
      { label: "Customer Support",     href: "/solutions/customer-support" as Route,   description: "Always-on voice and chat." },
      { label: "Financial Operations", href: "/solutions/finance-ops" as Route,          description: "Agentic back-office." },
      { label: "Internal IT Copilots", href: "/solutions/it-copilots" as Route,          description: "Helpdesk and knowledge ops." }
    ]
  },
  { label: "AI Agents", href: "/products/agents" as Route },
  { label: "Company", href: "/company" as Route }
] as const;

export const SECONDARY_NAV: readonly NavItem[] = [
  { label: "Customers", href: "/customers" as Route },
  { label: "Pricing",   href: "/pricing" as Route },
  { label: "Docs",      href: "/docs" as Route, external: true },
  { label: "Blog",      href: "/blog" as Route }
] as const;

export const FOOTER_NAV = {
  Product: ["Platform", "AI Agents", "Anvay CRM", "Copilots", "Multi-Agent", "Pricing"],
  Solutions: ["Revenue Operations", "Customer Support", "Finance Ops", "IT Copilots"],
  Company: ["About", "Customers", "Careers", "Press", "Contact"],
  Resources: ["Docs", "Blog", "Changelog", "Status", "Security"],
  Legal: ["Privacy", "Terms", "Trust", "DPA"]
} as const;
