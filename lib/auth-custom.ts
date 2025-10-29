import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { sql } from "@/lib/db"

const SESSION_COOKIE = "session"
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

function getSecret() {
  const secret = process.env.SUPABASE_JWT_SECRET || process.env.SESSION_SECRET
  if (!secret) throw new Error("Missing secret. Set SUPABASE_JWT_SECRET or SESSION_SECRET.")
  return new TextEncoder().encode(secret)
}

export type SessionUser = {
  id: number
  email: string
  name: string | null
  role: "student" | "mentor" | "employer" | "administrator"
}

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_MAX_AGE_SECONDS}s`)
    .sign(getSecret())

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  })
}

export async function destroySession() {
  cookies().set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    expires: new Date(0),
  })
}

export async function getSession(): Promise<SessionUser | null> {
  const token = cookies().get(SESSION_COOKIE)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecret())
    const user = (payload as any).user as SessionUser
    // refresh latest name/role from DB
    const rows = await sql<[{ name: string | null; role: SessionUser["role"] }]>`
      SELECT name, role FROM users WHERE id = ${user.id}
    `
    if (rows.length) {
      user.name = rows[0].name
      user.role = rows[0].role
    }
    return user
  } catch {
    return null
  }
}

export async function requireSession() {
  const user = await getSession()
  if (!user) throw new Error("Unauthorized")
  return user
}
