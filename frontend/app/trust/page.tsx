import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageScaffold } from "@/components/PageScaffold";

export const metadata: Metadata = buildMetadata({
  title: "Trust",
  description: "How Advyay approaches security, privacy, and reliability for enterprise Agentic AI.",
  path: "/trust"
});

export default function TrustPage() {
  return <PageScaffold
    eyebrow="TRUST"
    title="Security posture, in plain English."
    body="We treat every security review with the seriousness of a fintech. Documents, sub-processors, and architecture are public by default."
    bullets={[
      "SOC 2 Type II — currently in observation; report available under NDA",
      "Region pinning — your tenants run in the region you choose",
      "Encryption — TLS 1.3 in transit, customer-managed keys in enterprise tier",
      "Audit — every agent run produces a signed audit log; you can replay any session",
      "Sub-processors — public list at /trust/security/subprocessors",
      "Responsible AI — usage policy, refusal taxonomy, jailbreak test suite"
    ]}
    primaryCta={{ label: "Read security details", href: "/trust/security" }}
    secondaryCta={{ label: "Request our questionnaire", href: "/contact?topic=security" }}
  />;
}
