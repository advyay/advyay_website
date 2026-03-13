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
                {/* VISITOR SUMMARY ROW */}
                <tr
                  key={v._id}
                  onClick={() =>
                    setOpenVisitor(expanded ? null : v._id)
                  }
                  className="border-t border-white/10 hover:bg-[#111827] cursor-pointer"
                >
                  <td className="px-6 py-4">{v.ip}</td>
                  <td className="px-6 py-4">{v.geo?.country}</td>
                  <td className="px-6 py-4">{v.device?.platform}</td>
                  <td className="px-6 py-4">{v.sessions?.length}</td>
                  <td className="px-6 py-4">
                    {new Date(v.last_seen).toLocaleString()}
                  </td>
                </tr>

                {/* VISITOR DETAILS */}
                {expanded && (

                  <tr className="bg-[#070B14]">
                    <td colSpan={5} className="px-6 py-6">

                      <div className="space-y-8">

                        {/* VISITOR META */}
                        <Section title="Visitor Information">

                          <Grid>

                            <Info label="Visitor ID" value={v.visitor_id}/>
                            <Info label="IP Address" value={v.ip}/>
                            <Info label="Country" value={v.geo?.country}/>
                            <Info label="Region" value={v.geo?.region}/>
                            <Info label="City" value={v.geo?.city}/>
                            <Info label="First Seen" value={format(v.first_seen)}/>
                            <Info label="Last Seen" value={format(v.last_seen)}/>

                          </Grid>

                        </Section>

                        {/* DEVICE */}
                        <Section title="Device">

                          <Grid>

                            <Info label="Platform" value={v.device?.platform}/>
                            <Info label="Language" value={v.device?.language}/>
                            <Info label="Timezone" value={v.device?.timezone}/>
                            <Info label="Screen" value={`${v.device?.screen?.width} × ${v.device?.screen?.height}`}/>

                          </Grid>

                          <div className="mt-4">
                            <p className="text-gray-400 text-xs mb-1">
                              User Agent
                            </p>

                            <p className="text-xs text-gray-300 break-all">
                              {v.device?.userAgent}
                            </p>
                          </div>

                        </Section>

                        {/* SESSIONS */}
                        <Section title="Sessions">

                          <div className="space-y-3">

                            {v.sessions?.map((s:any) => {

                              const open = openSession === s.session_id

                              return (

                                <div
                                  key={s.session_id}
                                  className="border border-white/10 rounded-lg"
                                >

                                  <div
                                    onClick={() =>
                                      setOpenSession(open ? null : s.session_id)
                                    }
                                    className="flex justify-between px-4 py-3 bg-[#111827] cursor-pointer hover:bg-[#1a2235]"
                                  >

                                    <div className="flex gap-10 text-sm">

                                      <Info label="Entry" value={s.entry_page}/>
                                      <Info label="Exit" value={s.exit_page}/>
                                      <Info label="Pages" value={s.pages?.length}/>
                                      <Info label="Events" value={s.events?.length}/>

                                    </div>

                                    <span className="text-xs text-gray-400">
                                      {open ? "▲" : "▼"}
                                    </span>

                                  </div>

                                  {open && (

                                    <div className="p-4 space-y-4">

                                      <Grid>

                                        <Info label="Session ID" value={s.session_id}/>
                                        <Info label="Started At" value={format(s.started_at)}/>
                                        <Info label="Last Activity" value={format(s.last_activity)}/>

                                      </Grid>

                                      <div>
                                        <p className="text-xs text-gray-400 mb-2">
                                          Pages
                                        </p>

                                        <div className="flex flex-wrap gap-2">

                                          {s.pages?.map((p:any,i:number) => (
                                            <span
                                              key={i}
                                              className="px-2 py-1 text-xs bg-[#0B1220] rounded"
                                            >
                                              {p}
                                            </span>
                                          ))}

                                        </div>

                                      </div>

                                      <div>

                                        <p className="text-xs text-gray-400 mb-2">
                                          Events
                                        </p>

                                        {s.events?.map((e:any,i:number)=>(
                                          <div
                                            key={i}
                                            className="border-b border-white/10 py-2 text-xs"
                                          >

                                            <div>
                                              <strong>{e.type}</strong> → {e.page}
                                            </div>

                                            <div className="text-gray-400">
                                              {format(e.created_at)}
                                            </div>

                                          </div>
                                        ))}

                                      </div>

                                    </div>

                                  )}

                                </div>

                              )

                            })}

                          </div>

                        </Section>

                      </div>

                    </td>
                  </tr>

                )}

              </>
            )

          })}

        </tbody>

      </table>

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
    <div className="grid md:grid-cols-4 gap-6 text-sm">
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