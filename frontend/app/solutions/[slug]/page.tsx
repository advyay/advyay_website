import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { CTA } from "@/components/sections/CTA";

type Params = { slug: string[] };

const SOLUTIONS: Record<string, { name: string; description: string }> = {
  "revenue-operations": {
    name: "Revenue Operations",
    description:
      "Inbound lead qualification, CRM enrichment, and SDR handoff composed of agents acting on your team's behalf. Pipeline state is verified, not assumed."
  },
  "customer-support": {
    name: "Customer Support",
    description:
      "Voice and chat agents that resolve real tickets without putting your brand at risk. Tight handoffs to humans. Full audit trails."
  },
  "finance-ops": {
    name: "Financial Operations",
    description:
      "Agentic back-office across procure-to-pay, order-to-cash, and reconciliation. Strict controls, region pinning, deterministic escalation paths."
  },
  "it-copilots": {
    name: "Internal IT Copilots",
    description:
      "Copilots inside ServiceNow, Jira, and your internal apps. Read, summarize, and act — with strict data boundaries."
  }
};

export function generateStaticParams() {
  return Object.keys(SOLUTIONS).map((slug) => ({ slug: [slug] }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const s = SOLUTIONS[params.slug[0] ?? ""];
  if (!s) return {};
  return buildMetadata({
    title: s.name,
    description: s.description,
    path: `/solutions/${params.slug[0]}`
  });
}

export default function SolutionPage({ params }: { params: Params }) {
  const s = SOLUTIONS[params.slug[0] ?? ""];
  if (!s) return notFound();

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16">
        <Container>
          <p className="eyebrow">SOLUTIONS · {s.name.toUpperCase()}</p>
          <h1 className="display-heading mt-6 text-[2.5rem] sm:text-h1 md:text-display text-paper-50 max-w-4xl">
            Agents that run day one of {s.name.toLowerCase()}.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-paper-200">{s.description}</p>
        </Container>
      </section>
      <div className="section-divider" />
      <section className="section">
        <Container>
          <SectionHeader eyebrow="WHAT WE SHIP" title="A scoped pilot you can measure." 
            description="We pair with your operators for a 6-week pilot scoped to one workflow, with a fixed eval rubric and weekly ROI reviews."
          />
        </Container>
      </div>
      <CTA />
    </>
  );
}
