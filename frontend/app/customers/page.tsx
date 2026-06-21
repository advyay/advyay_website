import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageScaffold } from "@/components/PageScaffold";

export const metadata: Metadata = buildMetadata({
  title: "Customers",
  description: "Selected Advyay customers, the workflows we built together, and the outcomes.",
  path: "/customers"
});

export default function CustomersPage() {
  return (
    <PageScaffold
      eyebrow="CUSTOMERS"
      title="Selection of teams shipping production agents with Advyay."
      body="Names below are pre-publication. Full case studies go live once customer-side approvals clear."
      bullets={[
        "Northwind Logistics — agentic inbound qualification over email + voice",
        "Helix Healthcare — appointment orchestration across Epic + WhatsApp",
        "Akshara Capital — automated reconciliation across custody + ledger systems",
        "Vega Telecom — Tier-1 support deflection copilot for ~4M subscribers"
      ]}
      primaryCta={{ label: "Become a customer", href: "/contact" }}
      secondaryCta={{ label: "Request a reference call", href: "/contact?topic=reference" }}
    />
  );
}
