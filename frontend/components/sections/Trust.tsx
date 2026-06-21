import { HOME } from "@/content/home";
import { SectionHeader } from "../primitives/SectionHeader";

export function Trust() {
  const { trust } = HOME;
  return (
    <section className="section" aria-labelledby="trust-title">
      <div className="container-app">
        <SectionHeader
          eyebrow={trust.eyebrow}
          title={trust.title}
          align="center"
        />

        <ul className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {trust.pillars.map((p) => (
            <li key={p.title} className="border-l border-white/[0.08] pl-6">
              <h3 className="text-h5 text-paper-50">{p.title}</h3>
              <p className="mt-3 text-body text-paper-200">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Trust;
