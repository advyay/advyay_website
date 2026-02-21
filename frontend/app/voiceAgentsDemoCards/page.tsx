import VoiceAgentsDemoCards from '../../components/voiceAgentsDemoCards'
import Link from 'next/link'

export default function VoiceAgentsDemoPage() {
  return (
    <main className="bg-[#070B14] min-h-screen">

      {/* HERO SECTION */}
      <section className="pt-40 pb-24 px-6 text-center border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">

          <p className="uppercase tracking-[0.3em] text-xs text-blue-400">
            ENTERPRISE VOICE AUTOMATION
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Production-Grade
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AI Voice Agents
            </span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            These are simulated enterprise deployments of AI voice agents
            operating inside real-world workflows — from revenue qualification
            to financial pre-approvals and appointment coordination.
          </p>

          <p className="text-gray-500 text-sm">
            Each demo reflects how agents integrate with CRM systems,
            call infrastructure, structured memory, and enterprise governance layers.
          </p>

        </div>
      </section>

      {/* VALUE BAR */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">

          <div>
            <h3 className="text-2xl font-bold text-white">2–4 Weeks</h3>
            <p className="text-gray-400 text-sm mt-2">
              Typical deployment timeline
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">24/7</h3>
            <p className="text-gray-400 text-sm mt-2">
              Autonomous call handling
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">CRM Integrated</h3>
            <p className="text-gray-400 text-sm mt-2">
              Salesforce, HubSpot, Custom
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">Auditable</h3>
            <p className="text-gray-400 text-sm mt-2">
              Logging & compliance ready
            </p>
          </div>

        </div>
      </section>

      {/* DEMO CARDS */}
      <VoiceAgentsDemoCards />

      {/* ENTERPRISE CTA */}
      <section className="py-32 border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-8">

          <h2 className="text-3xl md:text-4xl font-bold">
            Deploy Autonomous Voice Agents Inside Your Workflow
          </h2>

          <p className="text-gray-400">
            We design and implement AI voice agents tailored to your operational context —
            integrated into your CRM, telephony stack, and internal systems.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600
                       px-10 py-4 rounded-xl font-semibold text-lg
                       hover:opacity-90 transition"
          >
            Schedule Enterprise Consultation
          </Link>

        </div>
      </section>

    </main>
  )
}