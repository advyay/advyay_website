'use client'

const agents = [
  { title: "Hiring Agent", desc: "Autonomous screening & voice interviews" },
  { title: "Negotiation Agent", desc: "Dynamic pricing & deal optimization" },
  { title: "Voice Agent", desc: "Natural enterprise voice automation" },
  { title: "Knowledge Agent", desc: "Graph-RAG powered reasoning engine" }
]

export default function AgentCards() {
  return (
    <section className="py-32 bg-gradient-to-b from-[#070B14] to-[#0D1324]">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-20">
          AI Agent Ecosystem
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {agents.map((agent, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                {agent.title}
              </h3>
              <p className="text-gray-400">
                {agent.desc}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  )
}
