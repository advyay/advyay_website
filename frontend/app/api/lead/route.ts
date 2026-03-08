// import { NextRequest, NextResponse } from 'next/server'
// import clientPromise from '../../../lib/mongodb'

// export async function POST(req: NextRequest) {
//   const body = await req.json()

//   const client = await clientPromise
//   const db = client.db()

//   await db.collection('leads').insertOne({
//     ...body,
//     status: 'new',
//     createdAt: new Date()
//   })

//   return NextResponse.json({ success: true })
// }