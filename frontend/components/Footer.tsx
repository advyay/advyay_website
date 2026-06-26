import Link from "next/link";
import { Logo } from "./primitives/Logo";
import { SITE } from "@/lib/site";
import { FOOTER_NAV } from "@/lib/navigation";

const HREFS: Record<string, string> = {
  "Platform": "/platform",
  "AI Agents": "/products/agents",
  "Anvay CRM": "/products/anvay",
  "Copilots": "/products/copilots",
  "Multi-Agent": "/products/multi-agent",
  "Pricing": "/pricing",
  "Revenue Operations": "/solutions/revenue-operations",
  "Customer Support": "/solutions/customer-support",
  "Finance Ops": "/solutions/finance-ops",
  "IT Copilots": "/solutions/it-copilots",
  "About": "/company",
  "Customers": "/customers",
  "Careers": "/careers",
  "Press": "/press",
  "Contact": "/contact",
  "Docs": "/docs",
  "Blog": "/blog",
  "Changelog": "/changelog",
  "Status": "/status",
  "Security": "/trust/security",
  "Privacy": "/legal/privacy",
  "Terms": "/legal/terms",
  "Trust": "/trust",
  "DPA": "/legal/dpa"
};

function NavColumn({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="text-eyebrow text-paper-300 mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((label) => (
          <li key={label}>
            <Link
              href={HREFS[label] ?? "/"}
              className="relative after-[content:''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-width after:hover:w-full after:duration-300 text-body-sm text-paper-200 hover:text-paper-50 transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-900 relative grain">
      <div className="container-app py-16 lg:py-20 relative z-[1]">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_3fr]">
          <div className="max-w-sm">
            <Logo size="lg" />
            <p className="mt-5 text-body-sm text-paper-200">{SITE.description}</p>
            <div className="mt-6 flex gap-4">
              {Object.entries(SITE.social).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Advyay on ${key}`}
                  className="text-paper-300 hover:text-paper-50 transition-colors text-body-sm capitalize"
                >
                  {key}
                </a>
              ))}
            </div>
            <address className="mt-8 not-italic text-micro text-paper-300">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
              <br />
              <a href={`mailto:${SITE.email}`} className="hover:text-paper-50">{SITE.email}</a>
            </address>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 md:grid-cols-5 gap-10">
            <NavColumn title="Product"     items={FOOTER_NAV.Product} />
            <NavColumn title="Solutions"   items={FOOTER_NAV.Solutions} />
            <NavColumn title="Company"     items={FOOTER_NAV.Company} />
            <NavColumn title="Resources"   items={FOOTER_NAV.Resources} />
            <NavColumn title="Legal"       items={FOOTER_NAV.Legal} />
          </nav>
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between gap-4 text-micro text-paper-300">
          <p>© {new Date().getFullYear()} {SITE.legal}. CIN {SITE.registry.cin}. All rights reserved.</p>
          <p>Built with intent — not with vibe.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
