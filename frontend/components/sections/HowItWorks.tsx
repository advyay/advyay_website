import { HOME } from "@/content/home";
import { SectionHeader } from "../primitives/SectionHeader";

export function HowItWorks() {
  const { howItWorks } = HOME;
  return (
    <section className="section bg-ink-800/40 border-y border-white/[0.06]" aria-labelledby="how-title">
      <div className="container-app">
        <SectionHeader
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
          align="center"
          description="No vendor fog. The same operators that interviewed you are still answering your email a year later."
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {howItWorks.steps.map((step) => (
            <li key={step.step} className="card p-8 relative">
              <span aria-hidden="true" className="absolute top-4 right-5 font-mono text-micro text-paper-300">
                {step.step}
              </span>
              <h3 className="text-h5 text-paper-50">{step.title}</h3>
              <p className="mt-4 text-body-sm text-paper-200 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
