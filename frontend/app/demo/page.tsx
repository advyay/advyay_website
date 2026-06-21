import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ComingSoon } from "@/components/PageScaffold";

export const metadata: Metadata = buildMetadata({ title: "Demo", path: "/demo" });

export default function DemoPage() {
  return (
    <ComingSoon
      eyebrow="LIVE DEMOS"
      title="Watch an agent do real work — no Loom, no screenshots."
      body="We're recording the actual live workflow: a CRM-qualifying voice agent taking a real call, a multi-agent research team producing a brief, a back-office agent reconciling transactions."
    />
  );
}
