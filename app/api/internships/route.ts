import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { store } from "@/lib/store"

export async function GET() {
  return NextResponse.json({ items: store.listInternships() })
}

export async function POST(req: Request) {
  const s = await getSession()
  if (!s || s.role !== "employer") return new NextResponse("Only employers can post", { status: 403 })
  const body = (await req.json()) as any
  const title = String(body.title || "").trim()
  const organization = String(body.organization || "").trim()
  if (!title || !organization) return new NextResponse("Missing title or organization", { status: 400 })

  const internship = store.createInternship({
    title,
    organization,
    location: body.location || "",
    mode: (body.mode || "onsite") as "onsite" | "remote" | "hybrid",
    stipend: body.stipend || "",
    description: body.description || "",
    createdByEmail: s.email,
  })
  return NextResponse.json({ ok: true, internship })
}
