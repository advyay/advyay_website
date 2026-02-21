'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Section = 'product' | 'services' | null

export default function SolutionsOverview() {
  const [active, setActive] = useState<Section>(null)

  const toggle = (section: Section) => {
    setActive(prev => (prev === section ? null : section))
  }

  return (
    <section className="relative py-28 bg-[#0B1220] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Our Offerings
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We operate both as a product company and as an enterprise AI implementation partner.
            Clear structure. Clear outcomes.
          </p>
        </div>

        {/* ================= PRODUCT ================= */}

        <div className="mb-6">
          <button
            onClick={() => toggle('product')}
            className="w-full text-left bg-[#111827] border border-white/10 
                       rounded-xl p-6 flex justify-between items-center
                       hover:border-blue-500/40 transition"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">
                ANVAY – Agentic AI CRM Platform
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                AI-powered CRM built for autonomous sales & lead workflows
              </p>
            </div>

            <span className="text-blue-400 text-sm">
              {active === 'product' ? '−' : '+'}
            </span>
          </button>

          <AnimatePresence>
            {active === 'product' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-[#0F172A] border border-white/5 
                                rounded-b-xl p-8 space-y-6">

                  <ul className="space-y-4 text-gray-300 text-sm leading-relaxed">
                    <li>• AI-powered lead qualification & auto follow-up</li>
                    <li>• Voice agents integrated into CRM workflows</li>
                    <li>• Sales automation with memory & contextual reasoning</li>
                    <li>• Integrated analytics & behavioral lead scoring</li>
                    <li>• Designed for agencies, real estate, and high-ticket sales teams</li>
                  </ul>

                  <p className="text-gray-400 text-sm">
                    ANVAY is our proprietary product built to convert inbound demand
                    into structured, autonomous revenue workflows.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= SERVICES ================= */}

        <div>
          <button
            onClick={() => toggle('services')}
            className="w-full text-left bg-[#111827] border border-white/10 
                       rounded-xl p-6 flex justify-between items-center
                       hover:border-purple-500/40 transition"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">
                Enterprise Agentic AI Solutions
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Custom AI agent implementation for enterprise systems
              </p>
            </div>

            <span className="text-purple-400 text-sm">
              {active === 'services' ? '−' : '+'}
            </span>
          </button>

          <AnimatePresence>
            {active === 'services' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-[#0F172A] border border-white/5 
                                rounded-b-xl p-8 space-y-6">

                  <ul className="space-y-4 text-gray-300 text-sm leading-relaxed">
                    <li>• Custom voice agents with contextual memory</li>
                    <li>• Agentic bots for customer support & sales</li>
                    <li>• AI-driven custom CRM builds</li>
                    <li>• Integration with Salesforce, HubSpot, ERP systems</li>
                    <li>• Autonomous workflow automation across departments</li>
                  </ul>

                  <p className="text-gray-400 text-sm">
                    We design and deploy AI agents tailored to your enterprise
                    workflows — secure, governed, and production-ready.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}