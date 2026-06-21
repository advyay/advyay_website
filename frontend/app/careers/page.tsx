import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ComingSoon } from "@/components/PageScaffold";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description: "Build the operating layer of AI-native business with Advyay.",
  path: "/careers"
});

export default function CareersPage() {
  return (
    <ComingSoon
      eyebrow="CAREERS"
      title="We hire engineers, designers, and researchers who ship."
      body="Open roles, comp bands, and a one-page engineering philosophy will live here. We're remote-first across IST ± 4h, with a Bengaluru hub."
    />
  );
}
