import Link from "next/link";
import { HOME } from "@/content/home";
import { SectionHeader } from "../primitives/SectionHeader";

export function Capabilities() {
  const { capabilities } = HOME;
  return (
    <section className="section" id="capabilities" aria-labelledby="capabilities-title">
      <div className="container-app">
        <SectionHeader
          eyebrow={capabilities.eyebrow}
          title={capabilities.title}
          description="Each capability ships as a deployed, observable, eval-graded system — never as a slide."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.items.map((item, idx) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="card group block h-full p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute -top-12 -right-12 h-32 w-32 glow-accent blur-2xl rounded-full" />
                </div>

                <div className="relative z-[1]">
                  <span className="font-mono text-micro text-paper-300">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-h5 text-paper-50">{item.title}</h3>
                  <p className="mt-3 text-body-sm text-paper-200">{item.body}</p>

                  <div className="mt-6 inline-flex items-center gap-1.5 text-body-sm text-accent">
                    Learn more
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2 6h7M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Capabilities;
