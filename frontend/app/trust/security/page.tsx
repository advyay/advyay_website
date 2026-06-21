import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ComingSoon } from "@/components/PageScaffold";

export const metadata: Metadata = buildMetadata({ title: "Security", path: "/trust/security" });

export default function SecurityPage() {
  return (
    <ComingSoon
      eyebrow="TRUST · SECURITY"
      title="The detailed security packet."
      body="Architecture diagram, data flow, encryption posture, sub-processor list, incident history, and our responsible-AI policy — all in one PDF too."
    />
  );
}
