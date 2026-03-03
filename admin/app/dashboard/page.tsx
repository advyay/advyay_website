"use client"

import { useEffect, useState } from "react"
import ContextUpload from "./components/ContextUpload"
import ContextList from "./components/ContextList"
import LeadsList from "./components/LeadsList"

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetch("http://localhost:8000/admin/stats", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setStats(data))
  }, [])

  console.log("Admin stats:", stats)

  return (
    <div className="min-h-screen bg-[#070B14] text-white px-10 py-12 space-y-12">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Admin Control Panel
        </h1>
        <span className="text-sm text-gray-400">
          Advyay Enterprise Console
        </span>
      </div>

      {/* KPI CARDS */}
      {stats && (
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard title="Total Visitors" value={stats.total_visitors} />
          <StatCard title="Total Leads" value={stats.total_leads} />
          <StatCard title="High Intent Leads" value={stats.high_intent} />
          <StatCard title="Conversions" value={stats.converted} />
        </div>
      )}

      {/* KNOWLEDGE SECTION */}
      <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-8 space-y-6">
        <h2 className="text-xl font-semibold">Knowledge Base</h2>
        <ContextUpload onUploadSuccess={() => setRefreshKey(prev => prev + 1)} />
        <ContextList refreshKey={refreshKey} />
      </div>

      {/* LEADS SECTION */}
      <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-6">Incoming Leads</h2>
        <LeadsList />
      </div>

    </div>
  )
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl p-6">
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  )
}