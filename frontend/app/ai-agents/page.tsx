export default function AIAgents() {
  return (
    <section className="py-32 bg-[#070B14]">
      <div className="max-w-6xl mx-auto px-6 space-y-24">

        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold">
            Enterprise AI Agents
          </h1>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            AI agents are autonomous, goal-driven systems that sense, plan,
            decide, and execute actions across enterprise workflows.
            Unlike chatbots, agents do not merely respond — they operate.
          </p>
        </div>

        {/* Core Explanation */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          <div>
            <h2 className="text-3xl font-semibold text-blue-400">
              What Makes an Agent?
            </h2>

            <ul className="mt-6 space-y-4 text-gray-400 text-lg">
              <li>• Persistent memory & contextual reasoning</li>
              <li>• Multi-step planning and decision execution</li>
              <li>• Tool and API integration capability</li>
              <li>• Self-evaluation and optimization loops</li>
              <li>• Enterprise governance and auditability</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-blue-400">
              Why Enterprises Deploy Agents
            </h2>

            <ul className="mt-6 space-y-4 text-gray-400 text-lg">
              <li>• Reduce operational headcount expansion</li>
              <li>• Shorten sales and negotiation cycles</li>
              <li>• Ensure consistent 24/7 communication</li>
              <li>• Scale without proportional human overhead</li>
              <li>• Generate measurable ROI improvements</li>
            </ul>
          </div>

        </div>

        {/* Agent Categories */}
        <div className="space-y-16">

          <h2 className="text-4xl font-semibold text-center">
            Agent Categories
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">

            {[
              {
                title: "Sales Autonomy Agents",
                desc: "Autonomous lead qualification, follow-ups, pipeline progression, and CRM updates."
              },
              {
                title: "Voice Communication Agents",
                desc: "Human-like voice agents handling inbound and outbound calls with CRM synchronization."
              },
              {
                title: "Negotiation & Pricing Agents",
                desc: "Dynamic counteroffers, deal optimization, escalation logic, and pricing intelligence."
              },
              {
                title: "Knowledge Agents",
                desc: "Graph-RAG powered reasoning systems that retrieve and apply enterprise knowledge."
              },
              {
                title: "Operational Workflow Agents",
                desc: "Automated document processing, task routing, and multi-step enterprise workflows."
              },
              {
                title: "Monitoring & Optimization Agents",
                desc: "Continuous performance tracking, KPI evaluation, and autonomous improvement loops."
              }
            ].map((agent, i) => (
              <div
                key={i}
                className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500 transition"
              >
                <h3 className="text-xl font-semibold text-blue-400">
                  {agent.title}
                </h3>
                <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                  {agent.desc}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* Orchestration Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold">
            Multi-Agent Orchestration
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Enterprise systems rarely rely on a single agent.
            Our architecture enables multiple specialized agents
            to coordinate through structured task planning and
            agent-to-agent communication pipelines —
            creating a unified autonomous digital workforce.
          </p>
        </div>

        {/* Closing Statement */}
        <div className="text-center pt-16">
          <p className="text-gray-500 text-sm max-w-3xl mx-auto">
            The future of enterprise operations is not human scaling —
            it is coordinated autonomous intelligence.
          </p>
        </div>

      </div>
    </section>
  )
}