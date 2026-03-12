'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 bg-transparent text-center">

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">

        {/* Identity */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="uppercase tracking-[0.35em] text-xs text-blue-400"
        >
          ADVYAY SOLUTIONS PVT. LTD.
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]"
        >
          AI Systems That Operate
          <br />
          <span className="bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Inside Enterprise Workflows
          </span>
        </motion.h1>

        <div className="max-w-4xl mx-auto space-y-6">

          <p className="text-xl text-gray-300 leading-relaxed">
            We build and deploy production-grade Agentic AI systems that
            automate sales conversations, lead qualification, CRM workflows,
            and internal knowledge operations.
          </p>

          <div className="text-lg text-gray-300 space-y-2">
            <p>
              <span className="text-white font-semibold">Enterprise AI Implementation</span> —
              custom voice agents, workflow automation, and AI integration
              into existing CRM / ERP systems
            </p>
          </div>

        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-gray-400">

          <span className="px-5 py-2 border border-white/10 rounded-full">
            24/7 AI Voice Agents
          </span>

          <span className="px-5 py-2 border border-white/10 rounded-full">
            CRM-Integrated Automation
          </span>

          <span className="px-5 py-2 border border-white/10 rounded-full">
            Structured Memory & Audit Trails
          </span>

          <span className="px-5 py-2 border border-white/10 rounded-full">
            Measurable ROI from Pilot to Scale
          </span>

        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row gap-6 justify-center pt-10">

          <Link
            href="/voiceAgentsDemoCards"
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-5 rounded-xl font-semibold text-lg hover:opacity-90 transition"
          >
            View Live Voice Agent Demos →
          </Link>

          <Link
            href="/contact"
            className="border border-white/20 px-12 py-5 rounded-xl text-lg hover:bg-white/10 transition"
          >
            Discuss Enterprise Deployment
          </Link>

        </div>

        <p className="text-gray-500 text-sm pt-10 max-w-3xl mx-auto">
          We don’t build demo AI. We deploy governed, production-ready systems
          inside real enterprise operations.
        </p>

      </div>
    </section>
  )
}