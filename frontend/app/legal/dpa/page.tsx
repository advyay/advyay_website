import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/primitives/Container";

export const metadata: Metadata = buildMetadata({ title: "Data Processing Addendum", path: "/legal/dpa" });

export default function DPAPage() {
  return (
    <section className="pt-32 md:pt-40 pb-24">
      <Container>
        <p className="eyebrow">LEGAL · DPA</p>
        <h1 className="display-heading mt-6 text-h1 text-paper-50 max-w-3xl">Data Processing Addendum</h1>
        <div className="mt-10 max-w-3xl text-paper-200 space-y-5 text-body">
          <p><strong>Last updated.</strong> Placeholder. The executed DPA is available under NDA on request.</p>
          <p>Our DPA addresses: subject matter and duration of processing, data categories, sub-processors, security measures, audit rights, breach notification, return/deletion at termination, and Standard Contractual Clauses for cross-border transfers.</p>
        </div>
      </Container>
    </section>
  );
}
