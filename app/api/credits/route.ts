import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { store } from "@/lib/store"

export async function GET() {
  const s = await getSession()
  if (!s || s.role !== "student") return new NextResponse("Only students", { status: 403 })
  const hours = store.sumHoursByStudent(s.email)
  const credits = hours / 30 // 1 credit = 30 hours
  return NextResponse.json({ hours, credits })
}
