import { HOME } from "@/content/home";
import { Button } from "../primitives/Button";

export function CTA() {
  const { cta } = HOME;
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container-app">
        <div className="card relative overflow-hidden p-10 md:p-16 lg:p-20 hover:-translate-y-2 transition-transform duration-300">
          <div className="absolute inset-0 glow-accent opacity-50 hover:opacity-70 transition-opacity duration-300" aria-hidden="true" />
          <div className="relative z-[1] max-w-3xl">
            <h2 id="cta-title" className="display-heading text-h1 md:text-display text-paper-50">
              {cta.title}
            </h2>
            <p className="mt-5 text-body-lg text-paper-200">{cta.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={cta.primaryCTA.href} variant="primary" size="lg">
                {cta.primaryCTA.label}
              </Button>
              <Button href={cta.secondaryCTA.href} variant="secondary" size="lg">
                {cta.secondaryCTA.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
