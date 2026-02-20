'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const NeuralBackground = dynamic(
  () => import('./NeuralBackground'),
  { ssr: false }
)

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 overflow-hidden text-center">

      {/* Neural Background */}
      <div className="absolute inset-0 -z-20">
        <NeuralBackground />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#070B14]/40 via-[#070B14]/80 to-[#070B14]" />

      <div className="max-w-6xl space-y-12">

        {/* Company Identity */}
        <div className="space-y-4">
          <p className="uppercase tracking-[0.25em] text-xs text-blue-400">
            Advyay Solutions Pvt. Ltd.
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Agentic AI Systems
            <span className="block">
              For Autonomous Enterprises
            </span>
          </h1>
        </div>

        {/* Core Explanation */}
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            We design and deploy enterprise-grade agentic AI systems that autonomously
            operate sales workflows, voice communication pipelines, negotiation logic,
            and knowledge-driven decision processes.
          </p>

          <p className="text-lg text-gray-400 leading-relaxed">
            Our multi-agent architectures integrate with existing CRM, ERP,
            and internal enterprise systems — transforming manual operations
            into intelligent, self-operating digital workforces.
          </p>
        </div>

        {/* Capability Highlights */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 pt-4">
          <span className="px-4 py-2 border border-white/10 rounded-full">
            Autonomous Sales Agents
          </span>
          <span className="px-4 py-2 border border-white/10 rounded-full">
            AI Voice Infrastructure
          </span>
          <span className="px-4 py-2 border border-white/10 rounded-full">
            Negotiation & Pricing Systems
          </span>
          <span className="px-4 py-2 border border-white/10 rounded-full">
            Graph-RAG Knowledge Engines
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center pt-10">
          <Link
            href="/solutions"
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 rounded-xl font-semibold hover:opacity-90 transition shadow-[0_0_40px_rgba(88,101,242,0.4)]"
          >
            Deploy Agentic Systems
          </Link>

          <Link
            href="/platform"
            className="border border-white/20 px-10 py-4 rounded-xl hover:bg-white/10 transition"
          >
            Explore ANVAY Agentic CRM
          </Link>
        </div>

        {/* Strategic Statement */}
        <p className="text-gray-500 text-sm pt-8 max-w-3xl mx-auto">
          Enterprises will not scale by hiring indefinitely.
          They will scale by deploying autonomous intelligence.
        </p>

      </div>
    </section>
  )
}