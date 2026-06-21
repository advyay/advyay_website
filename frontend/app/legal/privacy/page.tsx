import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/primitives/Container";

export const metadata: Metadata = buildMetadata({ title: "Privacy Policy", path: "/legal/privacy" });

export default function PrivacyPage() {
  return (
    <section className="pt-32 md:pt-40 pb-24">
      <Container>
        <p className="eyebrow">LEGAL · PRIVACY POLICY</p>
        <h1 className="display-heading mt-6 text-h1 text-paper-50 max-w-3xl">Privacy Policy</h1>
        <div className="mt-10 prose-invert max-w-3xl text-paper-200 space-y-5 text-body">
          <p><strong>Last updated.</strong> This is a placeholder. Final policy will be drafted by counsel and versioned here.</p>
          <p>Advyay Solutions Private Limited ("Advyay", "we") respects your privacy. This page will describe the categories of personal data we collect, the legal bases we rely on (including the Digital Personal Data Protection Act, 2023 for Indian data principals), retention periods, your rights, and the sub-processors we share data with.</p>
          <p>For data subject requests, contact <a href="mailto:privacy@advyay.com" className="underline">privacy@advyay.com</a>.</p>
        </div>
      </Container>
    </section>
  );
}
