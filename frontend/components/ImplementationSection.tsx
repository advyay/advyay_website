'use client'

import { motion } from 'framer-motion'

export default function ImplementationSection() {
  return (
    <section className="py-32 bg-[#0F172A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
          <p className="uppercase tracking-[0.3em] text-xs text-blue-400">
            How We Work
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            From Strategy to Production Deployment
          </h2>

          <p className="text-gray-400">
            We do not experiment inside your enterprise.
            We follow structured implementation cycles
            designed for measurable ROI and operational stability.
          </p>
        </div>

        {/* 4 Phase Grid */}
        <div className="grid md:grid-cols-4 gap-8">

          {[
            {
              title: "01 — Strategic Audit",
              desc: "We analyze workflows, call flows, CRM data, response cycles, and identify automation leverage points."
            },
            {
              title: "02 — Agent Architecture Design",
              desc: "We design custom agent roles, memory layers, escalation logic, compliance boundaries, and integration maps."
            },
            {
              title: "03 — Controlled Pilot",
              desc: "We deploy inside a defined business unit with measurable KPIs and human oversight."
            },
            {
              title: "04 — Enterprise Rollout",
              desc: "We scale the system across departments with monitoring, reporting, and governance layers."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>

        {/* Governance Block */}
        <div className="mt-24 p-10 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Enterprise Governance & Security
          </h3>

          <p className="text-gray-400 max-w-3xl mx-auto">
            Every deployment includes audit logs, role-based controls,
            escalation triggers, human override pathways, and structured memory
            boundaries. Your AI agents operate within defined enterprise constraints —
            not as uncontrolled automation.
          </p>
        </div>

        {/* Conversion CTA */}
        <div className="text-center mt-20">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-5 rounded-xl font-semibold text-lg shadow-[0_0_40px_rgba(88,101,242,0.4)] hover:opacity-90 transition">
            Start Enterprise Discovery
          </button>
        </div>

      </div>
    </section>
  )
}