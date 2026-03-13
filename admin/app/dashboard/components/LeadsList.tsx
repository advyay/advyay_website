"use client"

import { useEffect, useState } from "react"

export default function LeadsList() {

  const [leads, setLeads] = useState<any[]>([])
  const [selectedLead, setSelectedLead] = useState<any | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState<any>({})
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    fetch(`${API}/admin/leads`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setLeads(data))
  }, [])

  const openView = (lead:any) => {
    setSelectedLead(lead)
    setEditMode(false)
  }

  const openEdit = (lead:any) => {
    setSelectedLead(lead)
    setEditMode(true)
    setEditData(lead)
  }

  const updateLead = async () => {

    await fetch(`${API}/admin/leads/${selectedLead._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(editData)
    })

    const updatedLeads = leads.map(l =>
      l._id === selectedLead._id ? { ...l, ...editData } : l
    )

    setLeads(updatedLeads)
    setSelectedLead({ ...selectedLead, ...editData })
    setEditMode(false)
  }

  const deleteLead = async (id:string) => {

    if (!confirm("Delete this lead?")) return

    await fetch(`${API}/admin/leads/${id}`, {
      method: "DELETE",
      credentials: "include"
    })

    setLeads(leads.filter(l => l._id !== id))
    setSelectedLead(null)
  }

  return (

    <div className="relative">

      {/* TABLE */}

      <div className="bg-[#0B1220] border border-white/10 rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-[#111827] text-gray-400">
            <tr>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Phone</th>
              <th className="text-left px-6 py-3">Company</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>

            {leads.map(lead => (

              <tr
                key={lead._id}
                className="border-t border-white/10 hover:bg-[#111827]"
              >

                <td className="px-6 py-4 font-medium">
                  {lead.name || "Unknown"}
                </td>

                <td className="px-6 py-4">
                  {lead.email}
                </td>

                <td className="px-6 py-4">
                  {lead.phone || "—"}
                </td>

                <td className="px-6 py-4">
                  {lead.company || "—"}
                </td>

                <td className="px-6 py-4">

                  <span className={`px-2 py-1 rounded text-xs ${
                    lead.status === "new"
                      ? "bg-blue-500/20 text-blue-400"
                      : lead.status === "converted"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-600/20 text-gray-400"
                  }`}>
                    {lead.status}
                  </span>

                </td>

                <td className="px-6 py-4 flex gap-3">

                  <button
                    onClick={() => openView(lead)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View
                  </button>

                  <button
                    onClick={() => openEdit(lead)}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteLead(lead._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* RIGHT SIDE DRAWER */}

      {selectedLead && (

        <div className="fixed right-0 top-0 h-full w-[420px] bg-[#070B14] border-l border-white/10 p-8 overflow-y-auto z-50">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-semibold">
              Lead Details
            </h2>

            <button
              onClick={() => {
                setSelectedLead(null)
                setEditMode(false)
              }}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>

          </div>

            <div className="space-y-4 text-sm">

            <EditableField
              label="Name"
              value={editMode ? editData.name : selectedLead.name}
              editMode={editMode}
              onChange={(v:any)=>setEditData({...editData,name:v})}
            />

            <EditableField
              label="Email"
              value={editMode ? editData.email : selectedLead.email}
              editMode={editMode}
              onChange={(v:any)=>setEditData({...editData,email:v})}
            />

            <EditableField
              label="Phone"
              value={editMode ? editData.phone : selectedLead.phone}
              editMode={editMode}
              onChange={(v:any)=>setEditData({...editData,phone:v})}
            />

            <EditableField
              label="Company"
              value={editMode ? editData.company : selectedLead.company}
              editMode={editMode}
              onChange={(v:any)=>setEditData({...editData,company:v})}
            />

            <EditableField
              label="Role"
              value={editMode ? editData.role : selectedLead.role}
              editMode={editMode}
              onChange={(v:any)=>setEditData({...editData,role:v})}
            />

            <EditableField
              label="Use Case"
              value={editMode ? editData.use_case : selectedLead.use_case}
              editMode={editMode}
              onChange={(v:any)=>setEditData({...editData,use_case:v})}
            />

            <EditableField
              label="Timeline"
              value={editMode ? editData.timeline : selectedLead.timeline}
              editMode={editMode}
              onChange={(v:any)=>setEditData({...editData,timeline:v})}
            />

            <EditableField
              label="Budget"
              value={editMode ? editData.budget_range : selectedLead.budget_range}
              editMode={editMode}
              onChange={(v:any)=>setEditData({...editData,budget_range:v})}
            />

            <EditableField
              label="Intent Stage"
              value={editMode ? editData.intent_stage : selectedLead.intent_stage}
              editMode={editMode}
              onChange={(v:any)=>setEditData({...editData,intent_stage:v})}
            />

            <EditableField
              label="Readiness Score"
              value={editMode ? editData.readiness_score : selectedLead.readiness_score}
              editMode={editMode}
              onChange={(v:any)=>setEditData({...editData,readiness_score:v})}
            />

            <EditableField
              label="Summary"
              value={editMode ? editData.lead_summary : selectedLead.lead_summary}
              editMode={editMode}
              onChange={(v:any)=>setEditData({...editData,lead_summary:v})}
            />

            <div className="pt-6 border-t border-white/10 flex gap-4">

              {editMode ? (

              <button
                onClick={updateLead}
                className="bg-green-600 px-4 py-2 rounded"
              >
                Save
              </button>

              ) : (

              <button
                onClick={() => openEdit(selectedLead)}
                className="bg-blue-600 px-4 py-2 rounded"
              >
                Edit
              </button>

              )}

              <button
              onClick={() => deleteLead(selectedLead._id)}
              className="bg-red-600 px-4 py-2 rounded"
              >
              Delete
              </button>

            </div>

            </div>

        </div>

      )}

    </div>

  )

}


function EditableField({ label, value, editMode, onChange }: any) {

  return (

    <div>

      <p className="text-gray-400 text-xs mb-1">
        {label}
      </p>

      {editMode ? (

        <input
          value={value || ""}
          onChange={(e)=>onChange(e.target.value)}
          className="w-full p-2 rounded bg-gray-800"
        />

      ) : (

        <p>{value || "—"}</p>

      )}

    </div>

  )

}