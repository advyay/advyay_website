'use client'

import { motion } from 'framer-motion'

export default function EnterpriseCredibilitySection() {
  return (
    <section className="relative py-32 px-6 bg-[#070B14] border-t border-white/5 overflow-hidden">

      <div className="max-w-7xl mx-auto space-y-20">

        {/* Section Header */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-xs text-blue-400">
            Enterprise Readiness
          </p>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Built for Regulated, <br />
            <span className="bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">
              High-Scale Environments
            </span>
          </h2>

          <p className="text-lg text-gray-400 leading-relaxed">
            We architect agentic AI systems that operate inside enterprise guardrails —
            with full governance, audit trails, memory persistence,
            and production-grade security.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card 1 */}
          <CredibilityCard
            title="Enterprise Security"
            description="Role-based access control, encrypted memory layers, API gateway protection, and production deployment hardening."
          />

          {/* Card 2 */}
          <CredibilityCard
            title="Governance & Auditability"
            description="Full action logging, conversation traceability, decision explainability, and enterprise-grade monitoring."
          />

          {/* Card 3 */}
          <CredibilityCard
            title="Scalable Architecture"
            description="Multi-agent orchestration pipelines built for concurrent workloads and real-time execution at scale."
          />

          {/* Card 4 */}
          <CredibilityCard
            title="Production Deployment"
            description="From pilot to live deployment — integrated directly into CRM, ERP, telephony systems, and enterprise data infrastructure."
          />

        </div>

        {/* Metrics Section */}
        <div className="grid md:grid-cols-3 gap-10 pt-16 border-t border-white/5">

          <Metric value="70%" label="Reduction in Manual Workflows" />
          <Metric value="3x" label="Lead Response Acceleration" />
          <Metric value="24/7" label="Autonomous Execution Layer" />

        </div>

      </div>
    </section>
  )
}

function CredibilityCard({ title, description }: { title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-xl hover:border-blue-500/40 transition"
    >
      <h3 className="text-xl font-semibold mb-4">
        {title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

function Metric({ value, label }: { value: string, label: string }) {
  return (
    <div className="text-center space-y-3">
      <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        {value}
      </h3>
      <p className="text-gray-400 text-sm">
        {label}
      </p>
    </div>
  )
}