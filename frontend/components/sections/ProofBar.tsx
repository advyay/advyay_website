import { HOME } from "@/content/home";

export function ProofBar() {
  const { companies, eyebrow } = HOME.proofBar;
  return (
    <section className="border-y border-white/[0.06] bg-ink-800/40">
      <div className="container-app py-10">
        <p className="eyebrow text-center">{eyebrow}</p>
        <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-5 items-center">
          {companies.map((c) => (
            <li
              key={c}
              className="flex items-center justify-center text-center text-paper-300 text-body-sm font-display tracking-tighter opacity-80 hover:opacity-100 hover:scale-105 transition-transform duration-200 hover:bg-ink-700/20 hover:rounded-lg"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ProofBar;
