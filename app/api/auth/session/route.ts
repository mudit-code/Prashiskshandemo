import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

export async function GET() {
  const s = await getSession()
  return NextResponse.json({
    authenticated: !!s,
    role: s?.role ?? null,
    email: s?.email ?? null,
    name: s?.name ?? null,
  })
}
