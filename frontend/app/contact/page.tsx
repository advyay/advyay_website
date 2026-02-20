'use client'

import { useRef } from 'react'

export default function Contact() {
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative py-32 bg-[#070B14] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="text-center max-w-4xl mx-auto space-y-8 mb-20">

          <p className="uppercase tracking-[0.3em] text-xs text-blue-400">
            Enterprise Engagement
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Start an Autonomous
            <span className="block">
              Transformation Initiative
            </span>
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed">
            We collaborate with enterprise leaders deploying
            multi-agent AI systems across sales, negotiation,
            and knowledge workflows.
          </p>

          <button
            onClick={scrollToForm}
            className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 rounded-xl font-semibold shadow-[0_0_40px_rgba(88,101,242,0.4)] hover:opacity-90 transition"
          >
            Initiate Strategic Discussion
          </button>
        </div>

        {/* Two Column Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* LEFT SIDE – Authority Messaging */}
          <div className="space-y-8">

            <h2 className="text-3xl font-semibold text-white">
              What Happens Next
            </h2>

            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                • Executive discovery session (30–45 mins)
              </p>
              <p>
                • Enterprise systems assessment
              </p>
              <p>
                • Agentic architecture blueprint
              </p>
              <p>
                • Deployment roadmap & ROI modeling
              </p>
            </div>

            <div className="mt-10 p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur">
              <p className="text-sm text-gray-300">
                All engagements are governed under enterprise
                compliance frameworks and strict confidentiality.
              </p>
            </div>

          </div>

          {/* RIGHT SIDE – Executive Form */}
          <div
            ref={formRef}
            className="p-10 rounded-3xl border border-white/10 bg-gradient-to-b from-[#0F172A]/80 to-[#0B1220]/80 backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.15)]"
          >

            <form className="space-y-6">

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Corporate Email
                </label>
                <input
                  type="email"
                  className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Primary Objective
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-xl font-semibold shadow-[0_0_40px_rgba(88,101,242,0.4)] hover:opacity-90 transition"
              >
                Submit Executive Request
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  )
}