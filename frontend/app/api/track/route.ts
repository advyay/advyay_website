import { NextRequest, NextResponse } from "next/server"

import { API_URL } from "../../../lib/config"

console.log("API_URL in track route:", API_URL)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const payload = {
      type: body.type,
      page: body.page,
      metadata: body.metadata || {},

      // normalize naming
      session_id: body.sessionId || body.session_id,
      scrollDepth: body.scrollDepth,
      timeOnPage: body.timeOnPage,

      utm: body.utm,
      referrer: body.referrer
    }

    const res = await fetch(`${API_URL}/analytics/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    console.log("Analytics event sent:", payload)

    const data = await res.json()

    return NextResponse.json(data)

  } catch (error) {
    console.error("Analytics proxy error:", error)

    return NextResponse.json(
      { error: "Analytics tracking failed" },
      { status: 500 }
    )
  }
}