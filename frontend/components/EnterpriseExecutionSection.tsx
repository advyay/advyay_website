'use client'

import { motion } from 'framer-motion'

export default function EnterpriseExecutionSection() {
  return (

     <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 bg-[#070B14] text-center">

      <div className="max-w-5xl mx-auto space-y-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <p className="uppercase tracking-[0.3em] text-xs text-blue-400 mb-4">
            HOW WE DELIVER
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Enterprise-Grade AI Implementation.
            <span className="block text-gray-400 text-2xl md:text-3xl font-normal mt-4">
              Structured. Secure. Measurable.
            </span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            We implement production-ready agentic systems inside real enterprise
            workflows — with governance, monitoring, and measurable business impact.
          </p>
        </div>

        {/* Framework Grid */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* Phase 1 */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-[#0B1220] border border-white/10 rounded-2xl p-8 transition-all"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">
              01 — Discovery & Workflow Mapping
            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">
              We analyze your revenue operations, CRM structure,
              customer communication flows, and internal knowledge systems.
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Automation feasibility map</li>
              <li>Data architecture plan</li>
              <li>ROI projection model</li>
            </ul>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-[#0B1220] border border-white/10 rounded-2xl p-8 transition-all"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">
              02 — Agent Architecture & Integration
            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">
              We design multi-agent systems tailored to your operational
              context and integrate them with your infrastructure.
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>CRM (Salesforce, HubSpot, Custom)</li>
              <li>ERP systems</li>
              <li>Call infrastructure</li>
              <li>Internal databases</li>
            </ul>
          </motion.div>

          {/* Phase 3 */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-[#0B1220] border border-white/10 rounded-2xl p-8 transition-all"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">
              03 — Controlled Pilot Deployment
            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">
              We deploy within a controlled environment before scaling.
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Performance monitoring</li>
              <li>Human override mechanisms</li>
              <li>Conversation audits</li>
              <li>Compliance logging</li>
            </ul>
          </motion.div>

          {/* Phase 4 */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-[#0B1220] border border-white/10 rounded-2xl p-8 transition-all"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">
              04 — Production Rollout & Optimization
            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">
              Once validated, agents are scaled across workflows with
              continuous optimization.
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Conversion analytics</li>
              <li>Customer interaction intelligence</li>
              <li>Operational efficiency metrics</li>
            </ul>
          </motion.div>

        </div>

        {/* Bottom Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 text-center">

          <div className="bg-[#0B1220] border border-white/10 rounded-xl p-8">
            <h4 className="text-4xl font-bold text-white mb-2">
              2–4 Weeks
            </h4>
            <p className="text-gray-400">
              Typical pilot deployment timeline
            </p>
          </div>

          <div className="bg-[#0B1220] border border-white/10 rounded-xl p-8">
            <h4 className="text-4xl font-bold text-white mb-2">
              30–60%
            </h4>
            <p className="text-gray-400">
              Reduction in manual workflow load
            </p>
          </div>

          <div className="bg-[#0B1220] border border-white/10 rounded-xl p-8">
            <h4 className="text-4xl font-bold text-white mb-2">
              24/7
            </h4>
            <p className="text-gray-400">
              Autonomous agent availability
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}