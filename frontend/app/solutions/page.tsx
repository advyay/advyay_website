export default function Solutions() {
  return (
    <section className="py-32 bg-[#0B1220] text-center">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        <h1 className="text-6xl font-bold">
          Enterprise Agentic Solutions
        </h1>

        <p className="text-xl text-gray-400 max-w-4xl mx-auto">
          Custom-designed multi-agent systems tailored to
          enterprise sales, negotiation, and operational workflows.
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            "Sales Autonomy Systems",
            "Voice Communication Agents",
            "Negotiation & Pricing Engines"
          ].map((item, i) => (
            <div key={i} className="p-10 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-xl font-semibold text-blue-400">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}