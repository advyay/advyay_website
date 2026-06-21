import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ComingSoon } from "@/components/PageScaffold";

export const metadata: Metadata = buildMetadata({ title: "Docs", path: "/docs", noIndex: false });

export default function DocsIndex() {
  return (
    <ComingSoon
      eyebrow="DOCS"
      title="The documentation portal is on a separate domain."
      body="Visit docs.advyay.com for the runnable quickstart, API reference, evaluated recipes, and changelogs."
    />
  );
}
