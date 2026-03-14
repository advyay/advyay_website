"use client"

import { useState } from "react"

export default function VisitorsList({ visitors = [] }: any) {

  const [openVisitor, setOpenVisitor] = useState<string | null>(null)
  const [openSession, setOpenSession] = useState<string | null>(null)

  return (

    <div className="bg-[#0B1220] border border-white/10 rounded-xl overflow-hidden">

      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">Visitors</h2>
      </div>

      {/* ===============================
         DESKTOP TABLE
      =============================== */}

      <div className="hidden md:block overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-[#111827] text-gray-400">
            <tr>
              <th className="text-left px-6 py-3">IP</th>
              <th className="text-left px-6 py-3">Country</th>
              <th className="text-left px-6 py-3">Device</th>
              <th className="text-left px-6 py-3">Sessions</th>
              <th className="text-left px-6 py-3">Last Seen</th>
            </tr>
          </thead>

          <tbody>

            {visitors.map((v: any) => {

              const expanded = openVisitor === v._id

              return (

                <>
                  <tr
                    key={v._id}
                    onClick={() => setOpenVisitor(expanded ? null : v._id)}
                    className="border-t border-white/10 hover:bg-[#111827] cursor-pointer"
                  >

                    <td className="px-6 py-4">{v.ip}</td>
                    <td className="px-6 py-4">{v.geo?.country}</td>
                    <td className="px-6 py-4">{v.device?.platform}</td>
                    <td className="px-6 py-4">{v.sessions?.length}</td>
                    <td className="px-6 py-4">{format(v.last_seen)}</td>

                  </tr>

                  {expanded && (

                    <tr className="bg-[#070B14]">

                      <td colSpan={5} className="px-6 py-6">

                        <VisitorDetails
                          visitor={v}
                          openSession={openSession}
                          setOpenSession={setOpenSession}
                        />

                      </td>

                    </tr>

                  )}

                </>

              )

            })}

          </tbody>

        </table>

      </div>


      {/* ===============================
         MOBILE VIEW
      =============================== */}

      <div className="md:hidden divide-y divide-white/10">

        {visitors.map((v:any)=>{

          const expanded = openVisitor === v._id

          return (

            <div key={v._id}>

              <div
                onClick={()=>setOpenVisitor(expanded ? null : v._id)}
                className="p-4 cursor-pointer hover:bg-[#111827]"
              >

                <div className="flex justify-between">

                  <div>
                    <p className="font-medium">{v.ip}</p>
                    <p className="text-xs text-gray-400">
                      {v.geo?.country} • {v.device?.platform}
                    </p>
                  </div>

                  <div className="text-right text-xs text-gray-400">
                    <p>{v.sessions?.length} sessions</p>
                    <p>{format(v.last_seen)}</p>
                  </div>

                </div>

              </div>

              {expanded && (

                <div className="p-4 bg-[#070B14]">

                  <VisitorDetails
                    visitor={v}
                    openSession={openSession}
                    setOpenSession={setOpenSession}
                  />

                </div>

              )}

            </div>

          )

        })}

      </div>

    </div>

  )

}


function VisitorDetails({ visitor, openSession, setOpenSession }: any){

  return (

    <div className="space-y-8">

      <Section title="Visitor Information">

        <Grid>

          <Info label="Visitor ID" value={visitor.visitor_id}/>
          <Info label="IP" value={visitor.ip}/>
          <Info label="Country" value={visitor.geo?.country}/>
          <Info label="Region" value={visitor.geo?.region}/>
          <Info label="City" value={visitor.geo?.city}/>
          <Info label="First Seen" value={format(visitor.first_seen)}/>
          <Info label="Last Seen" value={format(visitor.last_seen)}/>

        </Grid>

      </Section>


      <Section title="Device">

        <Grid>

          <Info label="Platform" value={visitor.device?.platform}/>
          <Info label="Language" value={visitor.device?.language}/>
          <Info label="Timezone" value={visitor.device?.timezone}/>
          <Info label="Screen" value={`${visitor.device?.screen?.width} × ${visitor.device?.screen?.height}`}/>

        </Grid>

        <p className="text-xs text-gray-400 mt-3 break-all">
          {visitor.device?.userAgent}
        </p>

      </Section>


      <Section title="Sessions">

        <div className="space-y-3">

          {visitor.sessions?.map((s:any)=>{

            const open = openSession === s.session_id

            return (

              <div key={s.session_id} className="border border-white/10 rounded-lg">

                <div
                  onClick={()=>setOpenSession(open ? null : s.session_id)}
                  className="flex justify-between px-4 py-3 bg-[#111827] cursor-pointer"
                >

                  <div className="text-sm space-x-4">
                    <span>{s.entry_page}</span>
                    <span>{s.exit_page}</span>
                    <span>{s.pages?.length} pages</span>
                  </div>

                  <span className="text-xs text-gray-400">
                    {open ? "▲" : "▼"}
                  </span>

                </div>

                {open && (

                  <div className="p-4 space-y-3 text-xs">

                    <Info label="Session ID" value={s.session_id}/>
                    <Info label="Started" value={format(s.started_at)}/>
                    <Info label="Last Activity" value={format(s.last_activity)}/>

                    <div>

                      <p className="text-gray-400 mb-2">Pages</p>

                      <div className="flex flex-wrap gap-2">

                        {s.pages?.map((p:any,i:number)=>(
                          <span key={i} className="px-2 py-1 bg-[#0B1220] rounded">
                            {p}
                          </span>
                        ))}

                      </div>

                    </div>

                  </div>

                )}

              </div>

            )

          })}

        </div>

      </Section>

    </div>

  )

}


function Section({title, children}:any){
  return(
    <div>
      <h3 className="text-sm font-semibold mb-3 text-blue-400">
        {title}
      </h3>
      {children}
    </div>
  )
}

function Grid({children}:any){
  return(
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      {children}
    </div>
  )
}

function Info({label,value}:any){
  return(
    <div>
      <p className="text-gray-400 text-xs">{label}</p>
      <p>{value || "-"}</p>
    </div>
  )
}

function format(date:any){
  if(!date) return "-"
  return new Date(date).toLocaleString()
}