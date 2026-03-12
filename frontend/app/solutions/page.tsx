'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/dist/client/link'

type Module = {
  title: string
  description: string
  details: string[]
}

const modules: Module[] = [
  {
    title: 'Enterprise Voice Agent Infrastructure',
    description:
      'AI-powered voice agents integrated into your call systems for sales, support, and qualification.',
    details: [
      'Inbound & outbound call automation',
      'Real-time contextual conversation (CRM + knowledge base)',
      'Call recording & structured memory storage',
      'Lead qualification & routing logic',
      'Deployment over SIP / cloud telephony'
    ]
  },
  {
    title: 'Custom Agentic AI Systems',
    description:
      'Tailored AI agents integrated directly into your enterprise infrastructure.',
    details: [
      'Custom AI bots trained on internal data',
      'Graph-RAG knowledge systems',
      'Autonomous workflow orchestration',
      'ERP / CRM / internal tool integration',
      'On-premise or cloud deployment'
    ]
  }
]

export default function SolutionsArchitectureSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative py-32 bg-[#070B14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
          <p className="uppercase tracking-[0.3em] text-xs text-blue-400">
            HOW WE IMPLEMENT
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Clear Enterprise Architecture
          </h2>

          <p className="text-gray-400 text-lg">
            We combine proprietary platforms and custom AI engineering to
            deploy production-grade agentic systems inside enterprise workflows.
          </p>
        </div>

        {/* Expandable Modules */}
        <div className="space-y-6">

          {modules.map((module, index) => {
            const isOpen = openIndex === index

            return (
              <>
                <div
                  key={index}
                  className="border border-white/10 rounded-2xl bg-[#0B1220]/80 backdrop-blur-xl overflow-hidden"
                >
                  {/* Header */}
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="w-full text-left px-8 py-6 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {module.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {module.description}
                      </p>
                    </div>

                    <span className="text-blue-400 text-xl">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-8 pb-8"
                      >
                        <div className="grid md:grid-cols-2 gap-6 pt-4">
                          {module.details.map((detail, i) => (
                            <div
                              key={i}
                              className="p-4 rounded-xl bg-[#111827] border border-white/5 text-gray-300 text-sm"
                            >
                              {detail}
                            </div>
                          ))}
                           {index === 0 && (
                              <div className="mt-10 text-center">
                                <Link
                                  href="/voiceAgentsDemoCards"
                                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition"
                                >
                                  View Live Voice Agent Demos →
                                </Link>
                              </div>
                            )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
               
              </>
            )
          })}
        </div>

      </div>
    </section>
  )
}