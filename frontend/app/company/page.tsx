import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { COMPANY } from "@/content/home";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = buildMetadata({
  title: "Company",
  description: "Advyay Solutions is a Bengaluru-based AI engineering company designing and deploying Agentic AI for the operating layer of business.",
  path: "/company"
});

export default function CompanyPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16">
        <Container>
          <p className="eyebrow">COMPANY</p>
          <h1 className="display-heading mt-6 text-[2.5rem] sm:text-h1 md:text-display text-paper-50 max-w-4xl">
            {COMPANY.title}
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-body-lg text-paper-200">
            {COMPANY.body.map((p) => (
              <p key={p.substring(0, 30)}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <div className="section-divider" />

      <section className="section">
        <Container>
          <SectionHeader eyebrow="BY THE NUMBERS" title="Compiled from active production." />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY.stats.map((s) => (
              <li key={s.label} className="card p-6">
                <span className="display-heading block text-h1 text-paper-50">{s.value}</span>
                <span className="mt-2 block text-body-sm text-paper-300">{s.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section bg-ink-800/40 border-y border-white/[0.06]">
        <Container>
          <SectionHeader eyebrow="OPERATING PRINCIPLES" title="What we do — and what we refuse to do." />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {COMPANY.values.map((v) => (
              <li key={v.title} className="border-l border-white/[0.08] pl-6">
                <h3 className="text-h5 text-paper-50">{v.title}</h3>
                <p className="mt-3 text-body text-paper-200">{v.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTA />
    </>
  );
}
