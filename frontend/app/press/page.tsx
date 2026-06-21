import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ComingSoon } from "@/components/PageScaffold";

export const metadata: Metadata = buildMetadata({
  title: "Press",
  description: "Press kit, coverage archive, and Advyay press contacts.",
  path: "/press"
});

export default function PressPage() {
  return (
    <ComingSoon
      eyebrow="PRESS"
      title="For journalists, analysts, and conference programmers."
      body="A clean press kit (logos, fact sheet, founder bios, screenshots under embargo) plus a single point of contact for time-sensitive requests."
    />
  );
}
