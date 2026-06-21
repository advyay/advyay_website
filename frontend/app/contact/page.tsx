import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Button } from "@/components/primitives/Button";
import { CONTACT } from "@/content/home";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Tell us about your workflow. We'll respond within one business day with a pilot plan and an eval rubric.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16">
        <Container>
          <p className="eyebrow">CONTACT</p>
          <h1 className="display-heading mt-6 text-[2.5rem] sm:text-h1 md:text-display text-paper-50 max-w-3xl">
            {CONTACT.title}
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-paper-200">{CONTACT.body}</p>
        </Container>
      </section>

      <section className="section pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <form
              action="/api/contact"
              method="post"
              className="card p-8 grid gap-5"
              aria-describedby="contact-help"
            >
              <p id="contact-help" className="sr-only">
                All fields marked required must be filled.
              </p>

              <Field label="Work email" name="email" type="email" required />
              <Field label="Full name"  name="name"  required />
              <Field label="Company"    name="company" required />

              <label className="grid gap-1.5">
                <span className="text-body-sm text-paper-200">Workflow you'd like to automate <span aria-hidden="true">*</span></span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="field font-sans"
                  placeholder="e.g. Inbound lead qualification → CRM enrichment → SDR handoff."
                />
              </label>

              <fieldset className="grid gap-2 mt-2">
                <legend className="text-body-sm text-paper-200 mb-1">Annual revenue</legend>
                <div className="flex flex-wrap gap-2">
                  {["< $10M", "$10M–$100M", "$100M–$1B", "> $1B"].map((opt) => (
                    <label key={opt} className="cursor-pointer">
                      <input type="radio" name="revenue" value={opt} className="peer sr-only" />
                      <span className="inline-block px-3 py-2 rounded-md border border-white/10 text-body-sm text-paper-200 peer-checked:border-accent peer-checked:text-paper-50 peer-checked:bg-accent/5 transition">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="flex items-start gap-3 mt-2">
                <input type="checkbox" name="consent" required className="mt-1 accent-accent" />
                <span className="text-body-sm text-paper-300">
                  I agree to Advyay processing this message per the
                  <a href="/legal/privacy" className="underline hover:text-paper-50"> Privacy Policy</a>.
                </span>
              </label>

              <Button type="submit" variant="primary" size="lg" className="mt-2 w-full sm:w-auto">
                Send message
              </Button>

              <p className="text-micro text-paper-300">
                We typically respond within one business day. By submitting you consent to a private, non-promotional reply.
              </p>
            </form>

            <aside className="grid gap-4 content-start">
              <SectionHeader eyebrow="DIRECT CHANNELS" title="Pick your route." />
              <ul className="grid gap-3">
                {CONTACT.channels.map((c) => (
                  <li key={c.label} className="card p-5">
                    <div className="text-eyebrow text-paper-300">{c.label}</div>
                    <a className="mt-1.5 block text-body text-paper-50 underline-offset-4 hover:underline" href={`mailto:${c.email}`}>
                      {c.email}
                    </a>
                    <p className="mt-2 text-micro text-paper-300">{c.desc}</p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({
  label, name, type = "text", required
}: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-body-sm text-paper-200">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </span>
      <input
        required={required}
        type={type}
        name={name}
        autoComplete={
          name === "email" ? "email" :
          name === "name"   ? "name"    :
          name === "company" ? "organization" : undefined
        }
        className="field"
      />
    </label>
  );
}
