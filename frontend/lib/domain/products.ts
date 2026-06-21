export type ProductSlug =
  | "anvay"
  | "agents"
  | "automation"
  | "multi-agent"
  | "copilots"
  | "platform";

export interface Product {
  slug: ProductSlug;
  name: string;
  category: "Product" | "Platform" | "Capability";
  oneLiner: string;
  description: string;
  capabilities: string[];
  href: string;
  status: "GA" | "Pilot" | "Roadmap";
}

export const PRODUCTS: readonly Product[] = [
  {
    slug: "anvay",
    name: "Anvay",
    category: "Product",
    oneLiner: "AI-native CRM built around the way revenue teams actually work.",
    description:
      "Anvay is a CRM where every workflow — pipeline, enrichment, outreach, follow-up — is composed of agents that act on your behalf. Pipeline state is verified, not assumed.",
    capabilities: [
      "Agentic pipeline orchestration",
      "Verified lead enrichment",
      "Conversational deal rooms",
      "Autonomous follow-ups across email, voice, and chat",
      "Audit-grade activity ledger"
    ],
    href: "/products/anvay",
    status: "GA"
  },
  {
    slug: "agents",
    name: "AI Agents",
    category: "Capability",
    oneLiner: "Production-grade voice, chat, and workflow agents, deployed in days.",
    description:
      "Pre-built and custom agents that integrate with CRM, ERP, helpdesk and telephony. Governed, observable, and tuned to your operating model — not a chat box with your logo on it.",
    capabilities: [
      "Voice agents across PSTN, SIP, WhatsApp",
      "Tool-using chat agents with structured memory",
      "Role-based guardrails and policy enforcement",
      "Eval harness baked into deployment"
    ],
    href: "/products/agents",
    status: "GA"
  },
  {
    slug: "automation",
    name: "Enterprise Automation",
    category: "Platform",
    oneLiner: "End-to-end process automation supervised by AI, governed by you.",
    description:
      "Replace rigid RPA bots with agentic workflows that read, reason, and act across legacy systems — while keeping every action inside your audit boundary.",
    capabilities: [
      "Agentic RPA over legacy APIs and UIs",
      "Human-in-the-loop checkpoints",
      "Deterministic escalation paths",
      "End-to-end observability and replay"
    ],
    href: "/products/enterprise-automation",
    status: "GA"
  },
  {
    slug: "multi-agent",
    name: "Multi-Agent Systems",
    category: "Platform",
    oneLiner: "Coordinated agent teams that run a business process from end to end.",
    description:
      "Specialized agents collaborate under a supervisor — research, qualify, draft, negotiate, document — sharing state through a governed plane, not ad-hoc prompts.",
    capabilities: [
      "Role-based agent graph",
      "Shared structured memory",
      "Conflict resolution protocols",
      "Per-agent cost and latency budgeting"
    ],
    href: "/products/multi-agent",
    status: "Pilot"
  },
  {
    slug: "copilots",
    name: "AI Copilots",
    category: "Capability",
    oneLiner: "In-product copilots that turn your internal knowledge into action.",
    description:
      "Embed copilots inside your existing tools — Salesforce, ServiceNow, Zendesk, internal apps. They read, summarize, and act, with strict data boundaries.",
    capabilities: [
      "Embeddable SDK and web component",
      "RAG over your private knowledge",
      "Action allow-lists per identity",
      "Per-tenant prompt and policy isolation"
    ],
    href: "/products/copilots",
    status: "GA"
  },
  {
    slug: "platform",
    name: "Advyay Platform",
    category: "Platform",
    oneLiner: "One operating layer for every agent you ship.",
    description:
      "Identity, memory, eval, observability, deployment, governance — the platform underneath every Advyay product and your own custom agents.",
    capabilities: [
      "Agent runtime and orchestrator",
      "Memory plane with retention policy",
      "Production eval and regression suite",
      "SSO, RBAC, audit, region pinning"
    ],
    href: "/platform",
    status: "GA"
  }
] as const;

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
