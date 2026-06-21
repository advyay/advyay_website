import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ComingSoon } from "@/components/PageScaffold";

export const metadata: Metadata = buildMetadata({
  title: "Status",
  description: "Real-time uptime, incident history, and planned maintenance for Advyay services.",
  path: "/status"
});

export default function StatusPage() {
  return (
    <ComingSoon
      eyebrow="STATUS"
      title="Live uptime and incident archive live on status.advyay.com."
      body="We'll update this page with an iframe once the public status page is wired up."
    />
  );
}
