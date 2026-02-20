'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'

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

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#070B14]/40 via-[#070B14]/85 to-[#070B14]" />

      <div className="max-w-6xl space-y-14">

        {/* Category Signal */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.35em] text-xs text-blue-400"
        >
          ADVYAY SOLUTIONS PVT. LTD.
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05]"
        >
          <span className="bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">
            The Autonomous
          </span>
          <span className="block text-white">
            Enterprise Layer
          </span>
        </motion.h1>

        {/* Power Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            We architect persistent multi-agent AI systems that replace
            human-dependent workflows with self-operating intelligence.
          </p>

          <p className="text-lg text-gray-400 leading-relaxed">
            Sales, voice communication, negotiation, knowledge reasoning —
            orchestrated through structured memory, Graph-RAG infrastructure,
            and enterprise governance layers.
          </p>
        </motion.div>

        {/* Authority Signals */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 pt-4">

          <span className="px-5 py-2 border border-white/10 rounded-full backdrop-blur">
            Multi-Agent Orchestration
          </span>

          <span className="px-5 py-2 border border-white/10 rounded-full backdrop-blur">
            Persistent Graph Memory
          </span>

          <span className="px-5 py-2 border border-white/10 rounded-full backdrop-blur">
            Autonomous Voice Infrastructure
          </span>

          <span className="px-5 py-2 border border-white/10 rounded-full backdrop-blur">
            Enterprise Governance & Audit
          </span>

        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row gap-6 justify-center pt-12">

          <Link
            href="/enterprise"
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-5 rounded-xl font-semibold text-lg hover:opacity-90 transition shadow-[0_0_50px_rgba(88,101,242,0.5)]"
          >
            Deploy Autonomous Infrastructure
          </Link>

          <Link
            href="/technology"
            className="border border-white/20 px-12 py-5 rounded-xl text-lg hover:bg-white/10 transition"
          >
            Explore Architecture
          </Link>

        </div>

        {/* Inevitable Statement */}
        <p className="text-gray-500 text-sm pt-10 max-w-3xl mx-auto">
          The next generation of enterprises will not scale by hiring.
          They will scale by deploying autonomous systems.
        </p>

      </div>
    </section>
  )
}