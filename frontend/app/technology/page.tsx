export default function Technology() {
  return (
    <section className="py-32 bg-[#070B14]">
      <div className="max-w-6xl mx-auto px-6 space-y-16">

        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold">
            Agentic Architecture
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Autonomous systems require structured memory, orchestration layers,
            governance, and reliable integrations — not just LLM APIs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-blue-400">
              Multi-Agent Orchestration
            </h3>
            <p className="text-gray-400 mt-4">
              Coordinated task planning, agent-to-agent messaging,
              and distributed execution pipelines.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-blue-400">
              Graph-RAG + Persistent Memory
            </h3>
            <p className="text-gray-400 mt-4">
              Knowledge graphs + retrieval pipelines ensure explainability,
              contextual accuracy, and enterprise decision traceability.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-blue-400">
              Voice Infrastructure
            </h3>
            <p className="text-gray-400 mt-4">
              Low-latency voice connectors with natural prosody and CRM sync.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-blue-400">
              Governance & Auditability
            </h3>
            <p className="text-gray-400 mt-4">
              Action logs, escalation flows, role-based controls,
              and enterprise compliance readiness.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}