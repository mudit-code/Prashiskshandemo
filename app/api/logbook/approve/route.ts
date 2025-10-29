import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { store } from "@/lib/store"

export async function POST(req: Request) {
  const s = await getSession()
  if (!s || s.role !== "mentor") return new NextResponse("Only mentors can approve", { status: 403 })
  const { id } = (await req.json()) as { id?: string }
  if (!id) return new NextResponse("Missing id", { status: 400 })
  try {
    const entry = store.approveLogEntry(id)
    return NextResponse.json({ ok: true, entry })
  } catch (e: any) {
    return new NextResponse(e?.message || "Approval failed", { status: 400 })
  }
}
