import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageScaffold } from "@/components/PageScaffold";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description: "Advyay pricing — outcomes-aligned pilots, platform subscriptions, and custom enterprise contracts.",
  path: "/pricing"
});

export default function PricingPage() {
  return <PageScaffold
    eyebrow="PRICING"
    title="Engagement models for every stage of maturity."
    body="We contract against outcomes in pilots, against seats and consumption on platform, against scope on enterprise. All pricing assumes a co-authored eval rubric."
    bullets={[
      "Pilot — fixed-fee 6-week engagement against a single workflow",
      "Platform — per-seat + per-execution metering, with predictable floors",
      "Enterprise — contracted infrastructure, region pinning, dedicated SRE",
      "Custom — BAA, DPA, and on-prem connector packages available"
    ]}
    primaryCta={{ label: "Ask for our pricing sheet", href: "/contact" }}
    secondaryCta={{ label: "See platform capabilities", href: "/platform" }}
  />;
}
