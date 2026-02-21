'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[#050A12] border-t border-white/5">

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12 text-sm">

        {/* Company */}
        <div className="space-y-5">
          <h3 className="text-white font-semibold text-base tracking-wide">
            ADVYAY
          </h3>

          <p className="text-gray-400 leading-relaxed text-sm">
            Advyay Solutions Private Limited is a trading name of
            Advaitron Solutions Private Limited.
          </p>

          <p className="text-gray-500 text-sm leading-relaxed">
            We design and deploy enterprise-grade agentic AI systems —
            including ANVAY Agentic CRM, autonomous voice agents,
            and custom AI-powered workflow automation.
          </p>

          <div className="pt-3">
            <a
              href="mailto:business@advyay.com"
              className="text-blue-400 hover:text-white transition"
            >
              business@advyay.com
            </a>
          </div>
        </div>

        {/* Products */}
        <div className="space-y-5">
          <h4 className="text-white font-medium tracking-wide">
            Products
          </h4>

          <ul className="space-y-3 text-gray-400">
            <li>
              <Link href="/platform" className="hover:text-white transition">
                ANVAY Agentic CRM
              </Link>
            </li>
            <li>
              <Link href="/ai-agents" className="hover:text-white transition">
                Autonomous Sales Agents
              </Link>
            </li>
            <li>
              <Link href="/solutions" className="hover:text-white transition">
                Voice Infrastructure
              </Link>
            </li>
            <li>
              <Link href="/solutions" className="hover:text-white transition">
                Negotiation Engines
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-5">
          <h4 className="text-white font-medium tracking-wide">
            Company
          </h4>

          <ul className="space-y-3 text-gray-400">
            <li>
              <Link href="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/technology" className="hover:text-white transition">
                Technology
              </Link>
            </li>
            <li>
              <Link href="/solutions" className="hover:text-white transition">
                Solutions
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Enterprise */}
        <div className="space-y-5">
          <h4 className="text-white font-medium tracking-wide">
            Enterprise
          </h4>

          <ul className="space-y-3 text-gray-400">
            <li>
              <Link href="/security" className="hover:text-white transition">
                Security & Governance
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition">
                Data Privacy
              </Link>
            </li>
            <li>
              <Link href="/deployment" className="hover:text-white transition">
                Deployment Models
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Strategic Pilot Program
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 px-6 text-center text-xs text-gray-500">
        © 2026 Advaitron Solutions Private Limited. All rights reserved.
        <br />
        ADVYAY is an enterprise AI initiative focused on agentic systems and autonomous intelligence.
      </div>

    </footer>
  )
}