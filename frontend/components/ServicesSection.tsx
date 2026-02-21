export default function ServicesSection() {
  return (
    <section className="py-32 bg-[#070B14]">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            What We Implement
          </h2>
          <p className="text-gray-400 mt-6 text-lg">
            We don’t sell AI tools.  
            We architect autonomous systems inside enterprise workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-xl font-semibold mb-4">AI Sales Agents</h3>
            <p className="text-gray-400">
              Lead qualification, outbound calling, CRM updates,
              follow-ups, and opportunity management.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-xl font-semibold mb-4">Voice Infrastructure</h3>
            <p className="text-gray-400">
              Autonomous inbound/outbound voice agents
              with natural speech, memory, and escalation logic.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-xl font-semibold mb-4">Knowledge Agents</h3>
            <p className="text-gray-400">
              Internal AI systems powered by Graph-RAG
              for compliance, documentation, and enterprise reasoning.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}