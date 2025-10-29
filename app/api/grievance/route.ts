import { NextResponse } from "next/server"

// Simple echo endpoint for demo purposes.
export async function POST(req: Request) {
  const data = await req.json()
  // In a real app, send an email, store to DB, or create a ticket.
  return NextResponse.json({ ok: true, received: data })
}
