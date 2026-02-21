'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

function VoiceWave() {
  return (
    <div className="flex items-end gap-[3px] h-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          animate={{ height: [8, 20, 8] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className="w-[3px] bg-gradient-to-t from-blue-500 to-purple-500 rounded"
        />
      ))}
    </div>
  )
}

export default function AgentShowcase() {
  const [active, setActive] = useState<number | null>(null)

  const agents = [
    {
      title: 'Autonomous Sales Agent',
      description:
        'Qualifies inbound leads, schedules meetings, updates CRM, and follows up — without human intervention.',
      badge: 'Live Lead Calling',
    },
    {
      title: 'AI Voice Infrastructure',
      description:
        'Handles concurrent voice conversations with natural prosody and enterprise memory context.',
      badge: 'Concurrent Calls',
    },
    {
      title: 'Negotiation & Pricing Engine',
      description:
        'Analyzes deal context, pricing constraints, and approval policies to negotiate within guardrails.',
      badge: 'Dynamic Pricing Logic',
    },
  ]

  return (
    <section className="py-32 bg-[#070B14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold">
            Live Agent Systems
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Not chatbots. Not automation scripts.
            Fully orchestrated, memory-backed AI agents operating in real time.
          </p>
        </div>

        {/* Agent Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {agents.map((agent, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              whileHover={{ scale: 1.03 }}
              className="relative p-8 rounded-2xl 
                         bg-gradient-to-b from-[#0B1220] to-[#070B14]
                         border border-white/10
                         shadow-[0_0_40px_rgba(59,130,246,0.1)]
                         backdrop-blur-xl"
            >
              {/* Animated glow when active */}
              {active === index && (
                <motion.div
                  layoutId="glow"
                  className="absolute inset-0 rounded-2xl 
                             bg-gradient-to-r from-blue-600/20 to-purple-600/20
                             blur-2xl -z-10"
                />
              )}

              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-blue-400 uppercase tracking-wider">
                  {agent.badge}
                </span>

                <VoiceWave />
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {agent.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {agent.description}
              </p>

              {/* Simulated Call Activity */}
              <div className="mt-8 text-sm text-gray-500 border-t border-white/10 pt-4">
                <p>Active Sessions: 12</p>
                <p>Avg Response Time: 1.2s</p>
                <p>Conversion Lift: +34%</p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}