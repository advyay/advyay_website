/**
 * Long-form content. Plain TS so we don't drag MDX into the build just yet.
 * These get imported directly into pages; tsc/lint still give us spell-it-right signals.
 */
export const HOME = {
  hero: {
    eyebrow: "ADVYAY · AUTONOMOUS AI",
    title: ["Autonomous AI", "for the operating layer", "of business."],
    sub: "We design Agentic AI systems that run mission-critical workflows — revenue, support, finance, IT — under your governance, inside your perimeter.",
    primaryCTA: { label: "See live agents", href: "/demo" },
    secondaryCTA: { label: "Talk to sales", href: "/contact" }
  },
  proofBar: {
    eyebrow: "TRUSTED BY OPS TEAMS AT",
    companies: [
      "Northwind Logistics",
      "Helix Healthcare",
      "Akshara Capital",
      "Vega Telecom",
      "Meridian Bank",
      "Nimbus Cloud"
    ]
  },
  capabilities: {
    eyebrow: "WHAT WE SHIP",
    title: "Capabilities engineered for production, not for demos.",
    items: [
      {
        id: "agents",
        title: "Autonomous AI Agents",
        body: "Voice and chat agents that complete tasks, not just answers. Evaluated against your real workflows before they ever touch production traffic.",
        href: "/products/agents"
      },
      {
        id: "automation",
        title: "Enterprise Process Automation",
        body: "Replicate judgment-heavy work across CRM, ERP, ticketing, and back-office systems without bolting a bot to every screen.",
        href: "/products/enterprise-automation"
      },
      {
        id: "multi-agent",
        title: "Multi-Agent Systems",
        body: "Specialized agent teams collaborate on a single outcome with shared memory, conflict resolution, and per-agent cost budgets.",
        href: "/products/multi-agent"
      },
      {
        id: "crm",
        title: "Anvay — AI-Powered CRM",
        body: "Pipeline, enrichment, outreach, and follow-up composed of agents acting on your team's behalf. Verified state, not guessed state.",
        href: "/products/anvay"
      },
      {
        id: "copilots",
        title: "AI Copilots Inside Your Stack",
        body: "Embed copilots into Salesforce, ServiceNow, Zendesk, or your internal apps. Read, summarize, and act — inside your data boundary.",
        href: "/products/copilots"
      },
      {
        id: "governance",
        title: "Governance as a First-Class Concern",
        body: "Identity-aware memos, explainable traces, policy enforcement, and replayable runs. Auditors and security teams are first-class users.",
        href: "/trust"
      }
    ]
  },
  howItWorks: {
    eyebrow: "OPERATING MODEL",
    title: "From pilot to production in three disciplined phases.",
    steps: [
      {
        step: "01",
        title: "Map",
        body: "We sit with your operators, find the highest-leverage workflow, and model the success criteria in business terms — not benchmark scores."
      },
      {
        step: "02",
        title: "Build",
        body: "A small agent team is built against the eval suite we co-author with you. Real data, real integrations, real SLOs from day one."
      },
      {
        step: "03",
        title: "Run",
        body: "We deploy into your perimeter, hand off the runbooks, and stay accountable to weekly eval and monthly ROI reviews."
      }
    ]
  },
  trust: {
    eyebrow: "WHY ADVYAY",
    title: "Boring infrastructure. Audacious outcomes.",
    pillars: [
      { title: "Built to be governed", body: "Region pinning, RBAC, full audit trails, and per-run policy enforcement out of the box." },
      { title: "Eval-grounded, not vibe-driven", body: "Every release is gated on a regression suite that mirrors your real workflow." },
      { title: "Production-first engineering", body: "Same posture as a fintech — versioned deploys, rollback, post-mortems, and on-call." },
      { title: "No vendor lock-in", body: "Agents are portable. Models are swappable. Your data stays in your perimeter." }
    ]
  },
  cta: {
    title: "Ready to put autonomous AI to work?",
    body: "Tell us the workflow. We'll come back with a pilot plan, an eval rubric, and a fixed-scope start.",
    primaryCTA: { label: "Start a pilot", href: "/contact" },
    secondaryCTA: { label: "Book a briefing", href: "/contact?topic=briefing" }
  }
} as const;

export const COMPANY = {
  title: "We build the operating layer of AI-native companies.",
  body: [
    "Advyay Solutions is a Bengaluru-based AI engineering company that designs and deploys Agentic AI systems for enterprises that run real businesses — not science experiments.",
    "Our team blends applied AI research, platform engineering, and domain operations. We bring the same posture to enterprise AI that fintech brings to money: deterministic, audited, observable.",
    "We were founded on a single thesis: Agentic AI will sit inside the operating layer of every serious business by 2030. We're building the company that lets that happen safely."
  ],
  values: [
    { title: "Build what you can run", body: "Every claim we ship, we run in production. No demo-only work leaves the building." },
    { title: "Eval is a deliverable",   body: "If we can't measure it, we don't release it. Eval suites ship with every agent." },
    { title: "Boring on purpose",       body: "Deterministic > magical. Auditable > impressive. We'll choose boring every time." },
    { title: "Customer engineering",    body: "We don't disappear after go-live. Our operators pair with yours for the lifetime of the system." }
  ],
  stats: [
    { value: "60+", label: "production agents shipped" },
    { value: "12",  label: "industries served" },
    { value: "98.4%", label: "eval pass rate across GA agents" },
    { value: "<120ms", label: "p95 agent decision latency" }
  ]
} as const;

export const CONTACT = {
  title: "Start a conversation.",
  body: "Tell us about your workflow. We'll respond within one business day with a pilot plan and an eval rubric.",
  channels: [
    { label: "Sales",    email: "sales@advyay.com",   desc: "Pilot scoping and pricing." },
    { label: "Support",  email: "support@advyay.com", desc: "Existing customer success." },
    { label: "Press",    email: "press@advyay.com",   desc: "Media and analyst relations." },
    { label: "Careers",  email: "careers@advyay.com", desc: "Engineering, design, research." }
  ]
} as const;
