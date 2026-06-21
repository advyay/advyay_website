import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ComingSoon } from "@/components/PageScaffold";

export const metadata: Metadata = buildMetadata({
  title: "Changelog",
  description: "Public release notes for the Advyay platform and products.",
  path: "/changelog"
});

export default function Changelog() {
  return (
    <ComingSoon
      eyebrow="CHANGELOG"
      title="Every release, dated and explained."
      body="Weekly release notes for the platform and products. We write them like engineers, not marketers — diffs first, prose second."
    />
  );
}
