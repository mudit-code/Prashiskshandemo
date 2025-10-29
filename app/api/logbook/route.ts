import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { store } from "@/lib/store"

export async function GET() {
  const s = await getSession()
  if (!s) return new NextResponse("Unauthorized", { status: 401 })
  if (s.role === "student") {
    return NextResponse.json({ items: store.listLogEntriesByStudent(s.email) })
  }
  if (s.role === "mentor") {
    return NextResponse.json({ items: store.listAllLogEntries() })
  }
  return NextResponse.json({ items: [] })
}

export async function POST(req: Request) {
  const s = await getSession()
  if (!s || s.role !== "student") return new NextResponse("Only students can log hours", { status: 403 })
  const { date, hours, description } = (await req.json()) as any
  const h = Number(hours)
  if (!date || isNaN(h) || h <= 0) return new NextResponse("Invalid date or hours", { status: 400 })
  const entry = store.addLogEntry({ studentEmail: s.email, date, hours: h, description: String(description || "") })
  return NextResponse.json({ ok: true, entry })
}
