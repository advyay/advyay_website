"use client"

import { useEffect, useState } from "react"

export default function LeadsList() {
  const [leads, setLeads] = useState<any[]>([])

  useEffect(() => {
    fetch("http://localhost:8000/admin/leads", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setLeads(data))
  }, [])

  return (
    <div className="space-y-6">
      {leads.map(lead => (
        <div
          key={lead._id}
          className="bg-[#111827] border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-400">
                {new Date(lead.created_at).toLocaleString()}
              </p>
              <h3 className="text-lg font-semibold mt-1 capitalize">
                {lead.project_type || "Enterprise Inquiry"}
              </h3>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs ${
              lead.status === "new"
                ? "bg-blue-500/20 text-blue-400"
                : lead.status === "converted"
                ? "bg-green-500/20 text-green-400"
                : "bg-gray-600/20 text-gray-400"
            }`}>
              {lead.status}
            </span>
          </div>

          <p className="text-gray-300 mt-4 text-sm">
            {lead.summary}
          </p>

          <div className="grid md:grid-cols-4 gap-4 mt-6 text-sm text-gray-400">
            <div>Industry: {lead.industry || "N/A"}</div>
            <div>Budget: {lead.budget_range || "Undisclosed"}</div>
            <div>Timeline: {lead.timeline || "Unknown"}</div>
            <div>Confidence: {lead.confidence_score}%</div>
          </div>
        </div>
      ))}
    </div>
  )
}