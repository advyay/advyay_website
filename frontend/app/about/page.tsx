export default function About() {
  return (
    <section className="relative bg-[#070B14] text-white overflow-hidden">

      {/* Top Section */}
      <div className="py-32 text-center px-6">
        <div className="max-w-6xl mx-auto space-y-12">

          <div className="space-y-6">
            <p className="uppercase tracking-[0.3em] text-xs text-blue-400">
              Advyay Solutions Pvt. Ltd.
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Architecting Autonomous Enterprises
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Advyay is an AI-first enterprise infrastructure company building
            multi-agent systems that autonomously operate critical enterprise workflows.
            We are defining the operational architecture of the autonomous organization.
          </p>

        </div>
      </div>

      {/* Vision Section */}
      <div className="py-24 border-t border-white/5 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div className="space-y-6">
            <h2 className="text-4xl font-semibold">
              The Future of Work Is Agentic
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Enterprises do not scale because they hire more people.
              They scale because they build leverage.
            </p>

            <p className="text-gray-400 leading-relaxed">
              The next evolution of leverage is not SaaS dashboards.
              It is autonomous intelligence.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Advyay designs distributed AI agents capable of decision-making,
              negotiation, voice communication, knowledge retrieval,
              and strategic execution — operating continuously across systems.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 
                          border border-white/10 
                          p-10 rounded-2xl backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Core Thesis
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              Every enterprise process that involves structured reasoning,
              memory, negotiation, coordination, or repetitive cognitive decision-making
              will be automated by intelligent multi-agent systems within the next decade.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              Advyay is building the orchestration, governance, and memory infrastructure
              required to make that transition reliable, secure, and scalable.
            </p>
          </div>

        </div>
      </div>

      {/* What We Build */}
      <div className="py-24 border-t border-white/5 px-6">
        <div className="max-w-6xl mx-auto space-y-16">

          <div className="text-center space-y-4">
            <h2 className="text-4xl font-semibold">
              What We Build
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Not chatbots. Not automation scripts.
              Autonomous digital workforces.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Multi-Agent Orchestration
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Distributed task planning, agent coordination, escalation logic,
                and system-level decision routing across enterprise pipelines.
              </p>
            </div>

            <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Persistent Memory + Graph-RAG
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Knowledge graphs and retrieval systems that allow agents to
                reason over enterprise context with explainability and traceability.
              </p>
            </div>

            <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Voice & Negotiation Engines
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Autonomous voice agents capable of conducting structured conversations,
                handling objections, and executing transactional logic.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Enterprise Section */}
      <div className="py-24 border-t border-white/5 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">

          <h2 className="text-4xl font-semibold">
            Built for Enterprise Reality
          </h2>

          <p className="text-gray-400 leading-relaxed text-lg">
            We integrate with CRM systems, ERP platforms, internal knowledge bases,
            and operational databases — without requiring enterprises
            to replace existing infrastructure.
          </p>

          <p className="text-gray-500 text-sm">
            Governance. Role-based access control. Action logs.
            Escalation frameworks. Compliance alignment.
          </p>

        </div>
      </div>

      {/* Strategic Close */}
      <div className="py-24 border-t border-white/5 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">

          <h2 className="text-4xl font-semibold">
            The Autonomous Organization Is Inevitable.
          </h2>

          <p className="text-gray-400 leading-relaxed text-lg">
            The only question is who builds the infrastructure.
          </p>

          <p className="text-gray-500 text-sm">
            Advyay Solutions Private Limited is a trading name of
            Advaitron Solutions Private Limited.
          </p>

        </div>
      </div>

    </section>
  )
}