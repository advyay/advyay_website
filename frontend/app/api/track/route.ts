import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
import axios from 'axios'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { type, page, sessionId } = body

  const client = await clientPromise
  const db = client.db()

  const ip =
    req.headers.get('x-forwarded-for') || 'unknown'

  let geo = {}

  try {
    const geoRes = await axios.get(`https://ipapi.co/${ip}/json/`)
    geo = {
      country: geoRes.data.country_name,
      city: geoRes.data.city
    }
  } catch {
    geo = { country: 'unknown' }
  }

  await db.collection('events').insertOne({
    type,
    page,
    sessionId,
    ip,
    geo,
    createdAt: new Date()
  })

  return NextResponse.json({ success: true })
}