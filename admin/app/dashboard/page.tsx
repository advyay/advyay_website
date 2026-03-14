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
  const [menuOpen, setMenuOpen] = useState(false)

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  // ==============================
  // API HELPER
  // ==============================
  const apiFetch = async (url: string) => {

    const res = await fetch(`${API}${url}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!res.ok) throw new Error("API error")

    return res.json()
  }

  // ==============================
  // AUTH CHECK
  // ==============================
  useEffect(() => {

    const checkAuth = async () => {

      try {

        const res = await fetch(`${API}/admin/me`, {
          credentials: "include"
        })

        if (!res.ok) throw new Error()

        setAuthenticated(true)

      } catch {

        window.location.href = "/login"

      } finally {

        setLoading(false)

      }

    }

    checkAuth()

  }, [])


  // ==============================
  // FETCH STATS
  // ==============================
  useEffect(() => {

    if (!authenticated) return

    apiFetch("/admin/stats")
      .then(setStats)
      .catch(() => console.error("Stats fetch failed"))

  }, [authenticated])


  // ==============================
  // FETCH VISITORS
  // ==============================
  useEffect(() => {

    if (!authenticated) return

    apiFetch("/admin/visitors")
      .then(data => {

        if (Array.isArray(data)) setVisitors(data)
        else if (data.visitors) setVisitors(data.visitors)
        else setVisitors([])

      })
      .catch(() => console.error("Visitors fetch failed"))

  }, [authenticated])


  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#070B14] text-white">
        Loading admin console...
      </div>
    )
  }


  return (

    <div className="flex h-screen bg-[#070B14] text-white overflow-hidden">


      {/* =========================
         MOBILE OVERLAY
      ========================= */}

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}


      {/* =========================
         SIDEBAR
      ========================= */}

      <aside className={`
        fixed md:relative z-50
        w-64 h-full
        bg-[#0B1220] border-r border-white/10
        transform transition-transform duration-200
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>

        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-lg font-semibold">
            Advyay Console
          </h1>
        </div>

        <nav className="p-4 space-y-2">

          <SidebarItem label="Dashboard" active={active==="dashboard"} onClick={()=>setActive("dashboard")} />
          <SidebarItem label="Visitors" active={active==="visitors"} onClick={()=>setActive("visitors")} />
          <SidebarItem label="Leads" active={active==="leads"} onClick={()=>setActive("leads")} />
          <SidebarItem label="Knowledge Base" active={active==="knowledge"} onClick={()=>setActive("knowledge")} />

        </nav>

      </aside>


      {/* =========================
         MAIN CONTENT
      ========================= */}

      <main className="flex-1 overflow-y-auto">


        {/* HEADER */}

        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">

          {/* MOBILE MENU BUTTON */}

          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          <h1 className="text-lg md:text-3xl font-semibold">
            Admin Control Panel
          </h1>

          <span className="hidden md:block text-sm text-gray-400">
            Advyay Enterprise Console
          </span>

        </div>


        {/* CONTENT */}

        <div className="p-6 md:p-10 space-y-10">


          {/* DASHBOARD */}

          {active === "dashboard" && stats && (

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

              <StatCard title="Total Visitors" value={stats.total_visitors} />
              <StatCard title="Total Leads" value={stats.total_leads} />
              <StatCard title="High Intent Leads" value={stats.high_intent} />
              <StatCard title="Conversions" value={stats.converted} />

            </div>

          )}


          {/* KNOWLEDGE */}

          {active === "knowledge" && (

            <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">

              <h2 className="text-xl font-semibold">
                Knowledge Base
              </h2>

              <ContextUpload onUploadSuccess={() => setRefreshKey(prev => prev + 1)} />

              <ContextList refreshKey={refreshKey} />

            </div>

          )}


          {/* LEADS */}

          {active === "leads" && (

            <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-6 md:p-8">

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

        </div>

      </main>

    </div>

  )

}


function SidebarItem({ label, active, onClick }: any) {

  return (

    <button
      onClick={onClick}
      className={`
        w-full text-left px-4 py-3 rounded-lg transition
        ${active
          ? "bg-blue-600 text-white"
          : "text-gray-400 hover:bg-[#111827] hover:text-white"}
      `}
    >
      {label}
    </button>

  )

}


function StatCard({ title, value }: any) {

  return (

    <div className="bg-[#111827] border border-white/10 rounded-xl p-4 md:p-6">

      <p className="text-xs md:text-sm text-gray-400 mb-1 md:mb-2">
        {title}
      </p>

      <h3 className="text-xl md:text-3xl font-bold">
        {value}
      </h3>

    </div>

  )

}