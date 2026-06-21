"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./primitives/Logo";
import { Button } from "./primitives/Button";
import { PRIMARY_NAV, SECONDARY_NAV } from "@/lib/navigation";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-enterprise ${
        scrolled
          ? "bg-ink-900/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <a href="#main" className="skip-link">Skip to content</a>

      <div className="container-app">
        <nav className="flex items-center justify-between h-16 md:h-20" aria-label="Primary">
          <Logo size="md" />

          <ul className="hidden lg:flex items-center gap-1">
            {PRIMARY_NAV.map((item) => {
              if ("children" in item && item.children) {
                const groupActive = isActive(pathname, item.href);
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      aria-haspopup="true"
                      aria-expanded={openMenu === item.label}
                      className={`group flex items-center gap-1 px-3 py-2 text-body-sm rounded-md transition-colors ${
                        groupActive ? "text-paper-50" : "text-paper-200 hover:text-paper-50"
                      }`}
                    >
                      {item.label}
                      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                        <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                      </svg>
                    </button>
                    {openMenu === item.label && (
                      <div
                        role="menu"
                        className="absolute left-0 top-full pt-2 w-[28rem] animate-fade-up"
                      >
                        <div className="card p-2 backdrop-blur-xl bg-ink-800/95">
                          <ul className="grid grid-cols-2 gap-1">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block rounded-md px-3 py-2.5 hover:bg-white/[0.04] focus:bg-white/[0.06]"
                                >
                                  <div className="text-body-sm text-paper-50">{child.label}</div>
                                  {child.description && (
                                    <div className="text-micro text-paper-300 mt-0.5 line-clamp-1">
                                      {child.description}
                                    </div>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }
              const item2 = item;
              const active = isActive(pathname, item2.href);
              return (
                <li key={item2.href}>
                  <Link
                    href={item2.href}
                    className={`px-3 py-2 text-body-sm rounded-md transition-colors ${
                      active ? "text-paper-50" : "text-paper-200 hover:text-paper-50"
                    }`}
                  >
                    {item2.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            {SECONDARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-body-sm text-paper-300 hover:text-paper-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" variant="primary" size="md">
              Talk to sales
            </Button>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            className="lg:hidden p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            <div className="flex flex-col gap-1.5">
              <span className={`block h-px w-6 bg-paper-50 transition-transform ${open ? "translate-y-2.5 rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-paper-50 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-6 bg-paper-50 transition-transform ${open ? "-translate-y-2.5 -rotate-45" : ""}`} />
            </div>
          </button>
        </nav>
      </div>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-ink-900 border-t border-white/5"
        >
          <div className="container-app py-8">
            <ul className="space-y-1">
              {PRIMARY_NAV.map((item) => {
                if ("children" in item && item.children) {
                  return (
                    <li key={item.label}>
                      <details className="group">
                        <summary className="flex items-center justify-between py-3 text-body-lg text-paper-50 list-none cursor-pointer">
                          {item.label}
                          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="group-open:rotate-180 transition-transform">
                            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                          </svg>
                        </summary>
                        <ul className="pl-2 mt-1 space-y-1 border-l border-white/5">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link href={c.href} className="block py-2 pl-3 text-body-sm text-paper-300 hover:text-paper-50">
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link href={item.href} className="block py-3 text-body-lg text-paper-50">
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-4 mt-4 border-t border-white/5">
                <ul className="grid grid-cols-2 gap-2">
                  {SECONDARY_NAV.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="block py-2 text-body-sm text-paper-300">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="pt-6">
                <Button href="/contact" variant="primary" size="lg" className="w-full">
                  Talk to sales
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
