import Hero from '../components/Hero'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Hero />

      {/* Agentic Advantage */}
      <section className="py-32 bg-[#0B1220]">
        <div className="max-w-6xl mx-auto px-6 space-y-16 text-center">
          <h2 className="text-5xl font-semibold">
            The Agentic Advantage
          </h2>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Agents are not chatbots. They are persistent, goal-oriented digital workers
            that sense, plan and act across enterprise systems — qualifying leads,
            negotiating pricing, progressing deals and updating CRMs autonomously.
          </p>

          <div className="grid md:grid-cols-3 gap-10 pt-10">
            {[
              {
                title: "24/7 Autonomous Qualification",
                desc: "Voice & AI agents reduce response time to under 5 minutes."
              },
              {
                title: "Negotiation Automation",
                desc: "Dynamic counteroffers and pricing optimization."
              },
              {
                title: "Knowledge-Driven Decisions",
                desc: "Graph-RAG memory ensures contextual reasoning."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-xl font-semibold text-blue-400">
                  {item.title}
                </h3>
                <p className="text-gray-400 mt-4 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Focus */}
      <section className="py-32 bg-[#070B14] text-center">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <h2 className="text-4xl font-semibold">
            Enterprise-Grade Deployment
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Built with governance, auditability, and structured orchestration.
            Our systems integrate with CRM, ERP, and internal enterprise tools —
            producing measurable ROI and full decision traceability.
          </p>

          <Link
            href="/technology"
            className="inline-block mt-6 border border-white/20 px-8 py-4 rounded-xl hover:bg-white/10 transition"
          >
            Explore Architecture
          </Link>
        </div>
      </section>
    </>
  )
}