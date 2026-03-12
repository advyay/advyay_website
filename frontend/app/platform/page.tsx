'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Platform() {
  return (
    <section className="py-32 bg-[#070B14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 space-y-28">

        {/* ================= HERO ================= */}
        <div className="max-w-4xl">
          <p className="uppercase tracking-[0.3em] text-xs text-blue-400 mb-6">
            PRODUCT PLATFORM
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            ANVAY — Agentic AI CRM
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed">
            ANVAY is a production-grade agentic CRM designed to automate
            inbound lead qualification, outbound follow-ups, voice communication,
            negotiation workflows, and revenue intelligence — all within a
            governed enterprise framework.
          </p>

          <div className="flex gap-6 mt-10">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl font-semibold"
            >
              Request Platform Demo
            </Link>

            {/* <Link
              href="/solutions"
              className="border border-white/20 px-8 py-4 rounded-xl hover:bg-white/10 transition"
            >
              See Use Cases
            </Link> */}
          </div>
        </div>

        {/* ================= WHO IT IS FOR ================= */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Built for Revenue-Driven Teams
            </h2>

            <p className="text-gray-400 leading-relaxed mb-6">
              ANVAY is purpose-built for organizations where speed,
              responsiveness, and structured follow-up directly impact revenue.
            </p>

            <ul className="space-y-4 text-gray-400">
              <li>• Real estate brokerages</li>
              <li>• High-ticket sales organizations</li>
              <li>• Financial services & lending teams</li>
              <li>• Enterprise B2B sales teams</li>
            </ul>
          </div>

          <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4 text-white">
              What It Replaces
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Manual lead qualification calls</li>
              <li>Delayed CRM updates</li>
              <li>Unstructured negotiation tracking</li>
              <li>Missed follow-ups</li>
              <li>Disconnected sales analytics</li>
            </ul>
          </div>
        </div>

        {/* ================= CORE CAPABILITIES ================= */}
        <div>
          <h2 className="text-3xl font-semibold mb-14">
            Core Capabilities
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-[#0B1220] border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                AI Voice Agents
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Context-aware voice agents that qualify leads,
                book meetings, reschedule appointments, and update CRM
                automatically in real-time.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-[#0B1220] border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Structured Negotiation Workflows
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Track offers, counteroffers, pricing adjustments,
                and escalation rules inside a governed agentic workflow engine.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-[#0B1220] border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Revenue Intelligence Dashboard
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Monitor conversion rates, response latency,
                call outcomes, and operational efficiency — in one unified layer.
              </p>
            </motion.div>

          </div>
        </div>

        {/* ================= ARCHITECTURE ================= */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Enterprise Architecture
            </h2>

            <p className="text-gray-400 leading-relaxed mb-6">
              ANVAY integrates directly into your operational stack —
              without replacing existing systems.
            </p>

            <ul className="space-y-4 text-gray-400">
              <li>• CRM integrations (Salesforce, HubSpot, Custom)</li>
              <li>• Telephony & call APIs</li>
              <li>• ERP systems</li>
              <li>• Internal databases</li>
              <li>• Structured audit & logging layer</li>
            </ul>
          </div>

          <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Governance & Control
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              Every agent action is logged.  
              Human override mechanisms are built-in.  
              Compliance monitoring is continuous.  
              No black-box automation.
            </p>
          </div>
        </div>

        {/* ================= METRICS ================= */}
        <div className="grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-[#0B1220] border border-white/10 rounded-xl p-8">
            <h4 className="text-4xl font-bold text-white mb-2">
              2–4 Weeks
            </h4>
            <p className="text-gray-400">
              Typical implementation timeline
            </p>
          </div>

          <div className="bg-[#0B1220] border border-white/10 rounded-xl p-8">
            <h4 className="text-4xl font-bold text-white mb-2">
              30–50%
            </h4>
            <p className="text-gray-400">
              Reduction in manual call workload
            </p>
          </div>

          <div className="bg-[#0B1220] border border-white/10 rounded-xl p-8">
            <h4 className="text-4xl font-bold text-white mb-2">
              24/7
            </h4>
            <p className="text-gray-400">
              Continuous lead engagement
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}