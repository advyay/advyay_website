export default function Footer() {
  return (
    <footer className="w-full bg-black/60 backdrop-blur border-t border-white/5">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12 text-sm">

        {/* Company */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-base">
            ADVYAY
          </h3>

          <p className="text-gray-400 leading-relaxed text-sm">
            Advyay Solutions Private Limited is a trading name of
            Advaitron Solutions Private Limited.
          </p>

          <p className="text-gray-500 text-xs leading-relaxed">
            We design and deploy enterprise-grade agentic AI systems,
            enabling organizations to operate autonomous digital workforces
            across sales, voice, negotiation, and knowledge workflows.
          </p>
        </div>

        {/* Products */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">
            Products
          </h4>

          <ul className="space-y-2 text-gray-400">
            <li>ANVAY Agentic CRM</li>
            <li>Autonomous Sales Agents</li>
            <li>Voice Infrastructure</li>
            <li>Negotiation Engines</li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">
            Company
          </h4>

          <ul className="space-y-2 text-gray-400">
            <li>About</li>
            <li>Technology</li>
            <li>Solutions</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Enterprise */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">
            Enterprise
          </h4>

          <ul className="space-y-2 text-gray-400">
            <li>Security & Governance</li>
            <li>Data Privacy</li>
            <li>Deployment Models</li>
            <li>Strategic Pilot Program</li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/5 py-6 px-6 text-center text-xs text-gray-500">
        © 2026 Advaitron Solutions Private Limited. All rights reserved. <br />
        ADVYAY is an enterprise AI initiative focused on agentic systems and autonomous intelligence.
      </div>

    </footer>
  )
}