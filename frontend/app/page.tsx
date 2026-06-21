import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ProofBar } from "@/components/sections/ProofBar";
import { Capabilities } from "@/components/sections/Capabilities";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Trust } from "@/components/sections/Trust";
import { CTA } from "@/components/sections/CTA";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Autonomous AI for the operating layer of business",
  description:
    "Advyay designs and deploys production-grade Agentic AI — autonomous agents, multi-agent systems, and AI infrastructure for enterprise operations across revenue, support, finance, and IT.",
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBar />
      <Capabilities />
      <HowItWorks />
      <Trust />
      <CTA />
    </>
  );
}
