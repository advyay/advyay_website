export default function Platform() {
  return (
    <section className="py-32 bg-[#070B14]">
      <div className="max-w-6xl mx-auto px-6 space-y-16 text-center">

        <h1 className="text-6xl font-bold">
          ANVAY Agentic CRM
        </h1>

        <p className="text-xl text-gray-400 max-w-4xl mx-auto">
          A self-operating sales intelligence platform built for
          high-velocity real estate markets.
        </p>

        <div className="grid md:grid-cols-3 gap-12 pt-10">
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-blue-400 font-semibold text-lg">
              Autonomous Voice Agents
            </h3>
            <p className="text-gray-400 mt-3 text-sm">
              Qualify, book viewings, update CRM — automatically.
            </p>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-blue-400 font-semibold text-lg">
              Negotiation Workflows
            </h3>
            <p className="text-gray-400 mt-3 text-sm">
              Counteroffers, pricing strategy, and escalation logic.
            </p>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-blue-400 font-semibold text-lg">
              ROI Dashboard
            </h3>
            <p className="text-gray-400 mt-3 text-sm">
              Track response time, conversion rate, cost per lead.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}