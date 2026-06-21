import Link from "next/link";
import { Container } from "./primitives/Container";
import { SectionHeader } from "./primitives/SectionHeader";
import { CTA } from "./sections/CTA";
import { Button } from "./primitives/Button";

interface PageScaffoldProps {
  eyebrow: string;
  title: string;
  body?: string;
  bullets?: readonly string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function PageScaffold({
  eyebrow, title, body, bullets, primaryCta, secondaryCta
}: PageScaffoldProps) {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16">
        <Container>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-heading mt-6 text-[2.5rem] sm:text-h1 md:text-display text-paper-50 max-w-4xl">
            {title}
          </h1>
          {body ? (
            <p className="mt-8 max-w-2xl text-body-lg text-paper-200">{body}</p>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && (
                <Button href={primaryCta.href} variant="primary" size="lg">{primaryCta.label}</Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary" size="lg">{secondaryCta.label}</Button>
              )}
            </div>
          )}
        </Container>
      </section>
      {bullets && bullets.length > 0 && (
        <section className="section pt-0">
          <Container>
            <SectionHeader eyebrow="WHAT'S IN HERE" title="Highlights at a glance." />
            <ul className="mt-10 grid gap-3 md:grid-cols-2">
              {bullets.map((b) => (
                <li key={b} className="card p-5 text-body-sm text-paper-100">— {b}</li>
              ))}
            </ul>
          </Container>
        </section>
      )}
      <CTA />
    </>
  );
}

export function ComingSoon({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16">
        <Container>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-heading mt-6 text-[2.5rem] sm:text-h1 md:text-display text-paper-50 max-w-4xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-paper-200">{body}</p>
          <p className="mt-8 text-body-sm text-paper-300">
            We're polishing this page. While it's being built, the fastest path to the same answer is{" "}
            <Link className="underline hover:text-paper-50" href="/contact">saying hello</Link>.
          </p>
        </Container>
      </section>
    </>
  );
}
