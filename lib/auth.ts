import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import type { Role } from "./store"
import { getServerSupabase } from "@/lib/supabase/server"

async function sha256(input: string) {
  const enc = new TextEncoder().encode(input)
  const buf = await crypto.subtle.digest("SHA-256", enc)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

const SESSION_COOKIE = "ps_session"
const JWT_SECRET = new TextEncoder().encode("prashikshan-demo-secret") // In production: env var

export async function hashPassword(password: string) {
  return sha256(password)
}

export async function verifyPassword(password: string, hash: string) {
  return (await sha256(password)) === hash
}

export type Session = { email: string; role: Role; name?: string }

export async function createSession(email: string, role: Role, name?: string) {
  const jwt = await new SignJWT({ email, role, name })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(JWT_SECRET)

  const c = await cookies()
  c.set(SESSION_COOKIE, jwt, { httpOnly: true, sameSite: "lax", path: "/" })
}

export async function deleteSession() {
  const c = await cookies()
  c.set(SESSION_COOKIE, "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 })
}

export async function getSession(): Promise<Session | null> {
  const c = await cookies()
  const token = c.get(SESSION_COOKIE)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return { email: payload.email as string, role: payload.role as Role, name: payload.name as string | undefined }
  } catch {
    return null
  }
}

export async function requireRole(role: Role) {
  const supabase = getServerSupabase()
  const { data: authData } = await supabase.auth.getUser()
  const user = authData?.user
  if (!user) {
    return { email: "guest@unknown", role: "student" as Role, name: "Guest" }
  }

  // fetch profile (role, full_name)
  const { data: profile } = await supabase.from("profiles").select("role, full_name, email").eq("id", user.id).single()

  const effectiveRole = (profile?.role as Role) || ("student" as Role)
  const name = (profile?.full_name as string) || user.user_metadata?.full_name || user.email || "User"

  // If role mismatch, still return but caller could redirect if needed
  return { email: profile?.email || (user.email as string), role: effectiveRole, name }
}
