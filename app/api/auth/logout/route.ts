import { NextResponse } from "next/server"
import { deleteSession } from "@/lib/auth"

export async function POST(req: Request) {
  await deleteSession()
  const origin = new URL(req.url).origin
  return NextResponse.redirect(new URL("/", origin))
}
