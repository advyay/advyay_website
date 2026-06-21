import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/primitives/Container";

export const metadata: Metadata = buildMetadata({ title: "Terms of Service", path: "/legal/terms" });

export default function TermsPage() {
  return (
    <section className="pt-32 md:pt-40 pb-24">
      <Container>
        <p className="eyebrow">LEGAL · TERMS OF SERVICE</p>
        <h1 className="display-heading mt-6 text-h1 text-paper-50 max-w-3xl">Terms of Service</h1>
        <div className="mt-10 max-w-3xl text-paper-200 space-y-5 text-body">
          <p><strong>Last updated.</strong> Placeholder. Final terms will be drafted by counsel and versioned here.</p>
          <p>These Terms govern access to and use of the marketing site, documentation portal, and platform APIs operated by Advyay Solutions Private Limited.</p>
        </div>
      </Container>
    </section>
  );
}
