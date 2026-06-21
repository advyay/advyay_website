import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { CTA } from "@/components/sections/CTA";
import { Button } from "@/components/primitives/Button";

export const metadata: Metadata = buildMetadata({
  title: "The Advyay Platform",
  description:
    "Runtime, memory, eval, observability, governance — the operating layer underneath every Advyay agent and your own.",
  path: "/platform"
});

const PILLARS = [
  { title: "Runtime",       body: "Deterministic agent loop, retry, state management, streaming, timeouts, idempotency." },
  { title: "Memory Plane",  body: "Per-tenant structured memory with retention policy, scrubbing, and region pinning." },
  { title: "Tool Plane",    body: "Versioned, audited, rate-limited tool calls over your internal APIs — never raw model output." },
  { title: "Eval",          body: "Production eval and regression suite with golden transcripts and policy checks." },
  { title: "Observability", body: "Trace every run. Replay every decision. Export to your SIEM and data lake." },
  { title: "Governance",    body: "SSO, RBAC, ABAC, region pinning, audit ledger, DPA, BAA, and policy-as-code." }
];

export default function PlatformPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16">
        <Container>
          <p className="eyebrow">THE ADVYAY PLATFORM</p>
          <h1 className="display-heading mt-6 text-[2.5rem] sm:text-h1 md:text-display text-paper-50 max-w-4xl">
            One operating layer for every agent you ship.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-paper-200">
            The same platform that powers Anvay and our customer-deployed agents is available to you — build, ship, and govern your own.
          </p>
          <div className="mt-8 flex gap-3">
            <Button href="/contact" variant="primary" size="lg">Get platform access</Button>
            <Button href="/docs" variant="secondary" size="lg" external>Read the docs</Button>
          </div>
        </Container>
      </section>

      <div className="section-divider" />

      <section className="section">
        <Container>
          <SectionHeader eyebrow="PLATFORM PILLARS" title="Built like infrastructure. Operated like a product." />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <li key={p.title} className="card p-6">
                <span className="font-mono text-micro text-paper-300">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-h5 text-paper-50">{p.title}</h3>
                <p className="mt-3 text-body-sm text-paper-200">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTA />
    </>
  );
}
