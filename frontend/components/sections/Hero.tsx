import Link from "next/link";
import { Button } from "./primitives/Button";
import { HOME } from "@/content/home";

export function Hero() {
  const { hero } = HOME;
  return (
    <section className="relative pt-36 md:pt-44 lg:pt-52 pb-20 md:pb-28">
      <div className="container-app">
        <div className="max-w-4xl">
          <p className="eyebrow animate-fade-up" style={{ animationDelay: "60ms" }}>
            {hero.eyebrow}
          </p>

          <h1 className="display-heading mt-6 text-[2.75rem] leading-[1.02] sm:text-h1 md:text-display text-paper-50 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <span className="block">{hero.title[0]}</span>
            <span className="block">{hero.title[1]}</span>
            <span className="block">
              <span className="relative inline-block">
                <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-accent via-signal to-transparent opacity-60" />
                <span className="bg-gradient-to-r from-paper-50 via-paper-50 to-paper-300 bg-clip-text text-transparent">
                  {hero.title[2]}
                </span>
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-body-lg text-paper-200 animate-fade-up" style={{ animationDelay: "200ms" }}>
            {hero.sub}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up" style={{ animationDelay: "260ms" }}>
            <Button href={hero.primaryCTA.href} variant="primary" size="lg">
              {hero.primaryCTA.label}
              <Arrow />
            </Button>
            <Button href={hero.secondaryCTA.href} variant="secondary" size="lg">
              {hero.secondaryCTA.label}
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-micro text-paper-300 animate-fade-up" style={{ animationDelay: "320ms" }}>
            <Badge>SOC 2 Type II — in observation</Badge>
            <Badge>Region pinning</Badge>
            <Badge>No GPU lock-in</Badge>
            <Badge>Per-tenant prompts</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 7h7M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-1 w-1 rounded-full bg-accent" />
      <span>{children}</span>
    </span>
  );
}

export default Hero;
