"use client"

import { useEffect, useState } from "react"
import ContextUpload from "./components/ContextUpload"
import ContextList from "./components/ContextList"
import LeadsList from "./components/LeadsList"
import VisitorsList from "./components/VisitorsList"

export default function Dashboard() {

  const [refreshKey, setRefreshKey] = useState(0)
  const [stats, setStats] = useState<any>(null)
  const [visitors, setVisitors] = useState<any[]>([])
  const [active, setActive] = useState("dashboard")
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  // ================================
  // AUTH CHECK
  // ================================
  useEffect(() => {

    fetch(`${API}/admin/me`, {
      credentials: "include"
    })
      .then(res => {

        if (!res.ok) {
          window.location.href = "/admin/login"
          return
        }

        setAuthenticated(true)
        setLoading(false)

      })
      .catch(() => {
        window.location.href = "/admin/login"
      })

  }, [])

  // ================================
  // FETCH STATS
  // ================================
  useEffect(() => {

    if (!authenticated) return

    fetch(`${API}/admin/stats`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setStats(data))

  }, [authenticated])

  // ================================
  // FETCH VISITORS
  // ================================
  useEffect(() => {

    if (!authenticated) return

    fetch(`${API}/admin/visitors`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) {
          setVisitors(data)
        } else if (data.visitors) {
          setVisitors(data.visitors)
        } else {
          setVisitors([])
        }

      })

  }, [authenticated])

  // ================================
  // LOADING SCREEN
  // ================================
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#070B14] text-white">
        Loading admin console...
      </div>
    )
  }

  return (

    <div className="flex h-screen bg-[#070B14] text-white">

      {/* ================================
          SIDEBAR
      ================================= */}

      <aside className="w-64 bg-[#0B1220] border-r border-white/10 flex flex-col">

        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-lg font-semibold">
            Advyay Console
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">

          <SidebarItem
            label="Dashboard"
            active={active === "dashboard"}
            onClick={() => setActive("dashboard")}
          />

          <SidebarItem
            label="Visitors"
            active={active === "visitors"}
            onClick={() => setActive("visitors")}
          />

          <SidebarItem
            label="Leads"
            active={active === "leads"}
            onClick={() => setActive("leads")}
          />

          <SidebarItem
            label="Knowledge Base"
            active={active === "knowledge"}
            onClick={() => setActive("knowledge")}
          />

        </nav>

      </aside>


      {/* ================================
          MAIN CONTENT
      ================================= */}

      <main className="flex-1 overflow-y-auto px-10 py-12 space-y-12">

        {/* HEADER */}

        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-semibold tracking-tight">
            Admin Control Panel
          </h1>

          <span className="text-sm text-gray-400">
            Advyay Enterprise Console
          </span>

        </div>


        {/* DASHBOARD */}

        {active === "dashboard" && stats && (

          <div className="grid md:grid-cols-4 gap-6">

            <StatCard
              title="Total Visitors"
              value={stats.total_visitors}
            />

            <StatCard
              title="Total Leads"
              value={stats.total_leads}
            />

            <StatCard
              title="High Intent Leads"
              value={stats.high_intent}
            />

            <StatCard
              title="Conversions"
              value={stats.converted}
            />

          </div>

        )}


        {/* KNOWLEDGE BASE */}

        {active === "knowledge" && (

          <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-8 space-y-6">

            <h2 className="text-xl font-semibold">
              Knowledge Base
            </h2>

            <ContextUpload
              onUploadSuccess={() =>
                setRefreshKey(prev => prev + 1)
              }
            />

            <ContextList refreshKey={refreshKey} />

          </div>

        )}


        {/* LEADS */}

        {active === "leads" && (

          <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-8">

            <h2 className="text-xl font-semibold mb-6">
              Incoming Leads
            </h2>

            <LeadsList />

          </div>

        )}


        {/* VISITORS */}

        {active === "visitors" && (
          <VisitorsList visitors={visitors} />
        )}

      </main>

    </div>
  )
}


function SidebarItem({ label, active, onClick }: any) {

  return (

    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg transition
        ${
          active
            ? "bg-blue-600 text-white"
            : "text-gray-400 hover:bg-[#111827] hover:text-white"
        }`}
    >
      {label}
    </button>

  )

}


function StatCard({ title, value }: any) {

  return (

    <div className="bg-[#111827] border border-white/10 rounded-xl p-6">

      <p className="text-sm text-gray-400 mb-2">
        {title}
      </p>

      <h3 className="text-3xl font-bold">
        {value}
      </h3>

    </div>

  )

}