"use client"

import { useEffect, useState } from "react"

export default function LeadsList() {

  const [leads, setLeads] = useState<any[]>([])
  const [selectedLead, setSelectedLead] = useState<any | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState<any>({})

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    fetch(`${API}/admin/leads`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setLeads(data))
  }, [])

  const openView = (lead:any)=>{
    setSelectedLead(lead)
    setEditMode(false)
  }

  const openEdit = (lead:any)=>{
    setSelectedLead(lead)
    setEditMode(true)
    setEditData(lead)
  }

  const updateLead = async ()=>{

    await fetch(`${API}/admin/leads/${selectedLead._id}`,{
      method:"PUT",
      headers:{ "Content-Type":"application/json" },
      credentials:"include",
      body:JSON.stringify(editData)
    })

    const updated = leads.map(l =>
      l._id === selectedLead._id ? {...l,...editData} : l
    )

    setLeads(updated)
    setSelectedLead({...selectedLead,...editData})
    setEditMode(false)

  }

  const deleteLead = async(id:string)=>{

    if(!confirm("Delete this lead?")) return

    await fetch(`${API}/admin/leads/${id}`,{
      method:"DELETE",
      credentials:"include"
    })

    setLeads(leads.filter(l=>l._id!==id))
    setSelectedLead(null)

  }


  return(

    <div className="relative space-y-4">

      {/* =============================
         DESKTOP TABLE
      ============================= */}

      <div className="hidden md:block bg-[#0B1220] border border-white/10 rounded-xl overflow-x-auto">

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

            {leads.map(lead=>(
              <tr key={lead._id} className="border-t border-white/10 hover:bg-[#111827]">

                <td className="px-6 py-4">{lead.name}</td>
                <td className="px-6 py-4">{lead.email}</td>
                <td className="px-6 py-4">{lead.phone || "—"}</td>
                <td className="px-6 py-4">{lead.company || "—"}</td>

                <td className="px-6 py-4">
                  <StatusBadge status={lead.status}/>
                </td>

                <td className="px-6 py-4 flex gap-3">

                  <button onClick={()=>openView(lead)} className="text-blue-400">
                    View
                  </button>

                  <button onClick={()=>openEdit(lead)} className="text-yellow-400">
                    Edit
                  </button>

                  <button onClick={()=>deleteLead(lead._id)} className="text-red-400">
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>


      {/* =============================
         MOBILE CARDS
      ============================= */}

      <div className="md:hidden space-y-3">

        {leads.map(lead=>(
          <div
            key={lead._id}
            className="bg-[#0B1220] border border-white/10 rounded-lg p-4 space-y-2"
          >

            <div className="flex justify-between">

              <div>
                <p className="font-semibold">{lead.name}</p>
                <p className="text-xs text-gray-400">{lead.email}</p>
              </div>

              <StatusBadge status={lead.status}/>

            </div>

            <p className="text-xs text-gray-400">
              {lead.company || "No company"}
            </p>

            <div className="flex gap-3 pt-2">

              <button
                onClick={()=>openView(lead)}
                className="text-blue-400 text-sm"
              >
                View
              </button>

              <button
                onClick={()=>openEdit(lead)}
                className="text-yellow-400 text-sm"
              >
                Edit
              </button>

              <button
                onClick={()=>deleteLead(lead._id)}
                className="text-red-400 text-sm"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>


      {/* =============================
         DRAWER
      ============================= */}

      {selectedLead && (

        <div className="
          fixed right-0 top-0
          w-full md:w-[420px]
          h-full
          bg-[#070B14]
          border-l border-white/10
          p-6 md:p-8
          overflow-y-auto
          z-50
        ">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-lg md:text-xl font-semibold">
              Lead Details
            </h2>

            <button
              onClick={()=>{setSelectedLead(null);setEditMode(false)}}
              className="text-gray-400"
            >
              ✕
            </button>

          </div>


          <div className="space-y-4">

            {[
              ["Name","name"],
              ["Email","email"],
              ["Phone","phone"],
              ["Company","company"],
              ["Role","role"],
              ["Use Case","use_case"],
              ["Timeline","timeline"],
              ["Budget","budget_range"],
              ["Intent Stage","intent_stage"],
              ["Readiness Score","readiness_score"],
              ["Summary","lead_summary"]
            ].map(([label,key]:any)=>(
              <EditableField
                key={key}
                label={label}
                value={editMode ? editData[key] : selectedLead[key]}
                editMode={editMode}
                onChange={(v:any)=>setEditData({...editData,[key]:v})}
              />
            ))}


            <div className="pt-6 border-t border-white/10 flex gap-4">

              {editMode ? (

                <button
                  onClick={updateLead}
                  className="bg-green-600 px-4 py-2 rounded"
                >
                  Save
                </button>

              ):(

                <button
                  onClick={()=>openEdit(selectedLead)}
                  className="bg-blue-600 px-4 py-2 rounded"
                >
                  Edit
                </button>

              )}

              <button
                onClick={()=>deleteLead(selectedLead._id)}
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


function EditableField({label,value,editMode,onChange}:any){

  return(

    <div>

      <p className="text-gray-400 text-xs mb-1">{label}</p>

      {editMode ? (

        <input
          value={value || ""}
          onChange={(e)=>onChange(e.target.value)}
          className="w-full p-2 rounded bg-gray-800"
        />

      ):(

        <p>{value || "—"}</p>

      )}

    </div>

  )

}


type LeadStatus = "new" | "converted" | "archived" | "pending"

function StatusBadge({ status }: { status: LeadStatus | string }) {

  const colors: Record<LeadStatus, string> = {
    new: "bg-blue-500/20 text-blue-400",
    converted: "bg-green-500/20 text-green-400",
    archived: "bg-gray-600/20 text-gray-400",
    pending: "bg-yellow-500/20 text-yellow-400"
  }

  const style =
    colors[status as LeadStatus] ||
    "bg-gray-600/20 text-gray-400"

  return (
    <span className={`px-2 py-1 rounded text-xs ${style}`}>
      {status}
    </span>
  )
}