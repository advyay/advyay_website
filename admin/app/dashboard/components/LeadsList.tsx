"use client"

import { useEffect, useState } from "react"

import { API_URL } from "../../../lib/config"
console.log("Admin API URL:", API_URL)

export default function LeadsList() {
  const [leads, setLeads] = useState<any[]>([])

  useEffect(() => {
    fetch(`${API_URL}/admin/leads`, {
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
            <div>Timeline: {lead.timeline || "Unknown"}</div>
            <div>Use Case: {lead.use_case || "General Inquiry"}</div>
            <div>Role: {lead.role || "N/A"}</div>
            <div>Decision Maker: {lead.decision_maker ? "Yes" : "No"}</div>
            <div>Company: {lead.company || "N/A"}</div>
            <div>Budget Range: {lead.budget_range || "N/A"}</div>
            <div>Email: {lead.email || "N/A"}</div>
            <div>Phone: {lead.phone || "N/A"}</div>
            <div>Intentb Stage: {lead.intent_stage || "N/A"}</div>
            <div>Readiness Score: {lead.readiness_score || "N/A"}</div>
            <div>Lead Summary: {lead.lead_summary || "N/A"}</div>
            <div>Created At: {new Date(lead.created_at).toLocaleString()}</div>

          </div>
        </div>
      ))}
    </div>
  )
}