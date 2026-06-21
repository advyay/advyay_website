import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = buildMetadata({
  title: "Solutions",
  description: "End-to-end Agentic AI solutions across revenue, support, finance and IT — built into your operating layer.",
  path: "/solutions"
});

const ITEMS = [
  { name: "Revenue Operations",   href: "/solutions/revenue-operations", body: "Lead capture, qualification, enrichment, and SDR handoff — autonomously." },
  { name: "Customer Support",     href: "/solutions/customer-support",   body: "Voice and chat agents resolving real tickets, with tight human handoff." },
  { name: "Financial Operations", href: "/solutions/finance-ops",         body: "Procure-to-pay, order-to-cash, reconciliation — agentic, controlled." },
  { name: "Internal IT Copilots", href: "/solutions/it-copilots",         body: "Service desk and knowledge ops, with strict data boundaries." }
];

export default function SolutionsIndex() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16">
        <Container>
          <p className="eyebrow">SOLUTIONS</p>
          <h1 className="display-heading mt-6 text-[2.5rem] sm:text-h1 md:text-display text-paper-50 max-w-4xl">
            Workflows, not widgets.
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-paper-200">
            Pick the workflow. We'll come back with a scoped pilot, an eval rubric, and a fixed start.
          </p>
        </Container>
      </section>
      <section className="section pt-0">
        <Container>
          <SectionHeader eyebrow="WHAT WE SHIP" title="Four production-ready starting points." />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {ITEMS.map((s) => (
              <li key={s.name} className="card p-6">
                <h2 className="text-h5 text-paper-50">
                  <a href={s.href} className="hover:text-accent transition-colors">{s.name}</a>
                </h2>
                <p className="mt-3 text-body-sm text-paper-200">{s.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CTA />
    </>
  );
}
