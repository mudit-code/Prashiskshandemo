import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { store } from "@/lib/store"

export async function POST(req: Request) {
  const s = await getSession()
  if (!s || s.role !== "student") return new NextResponse("Only students can apply", { status: 403 })
  const { internshipId } = (await req.json()) as { internshipId?: string }
  if (!internshipId || !store.getInternship(internshipId))
    return new NextResponse("Invalid internship", { status: 400 })
  try {
    const app = store.applyToInternship(internshipId, s.email)
    return NextResponse.json({ ok: true, application: app })
  } catch (e: any) {
    return new NextResponse(e?.message || "Apply failed", { status: 400 })
  }
}
