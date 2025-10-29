"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getBrowserSupabase } from "@/lib/supabase/client"

export function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as any

    // optional client-side pattern check for UX
    const email = String(data.email || "").trim()
    const password = String(data.password || "")
    const selectedRole = String(data.role || "").trim()

    try {
      const supabase = getBrowserSupabase()
      const { error: signInError, data: signInData } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        setError(signInError.message || "Login failed")
        setLoading(false)
        return
      }

      // Ensure profile exists and get role
      const user = signInData.user
      let targetRole = selectedRole
      if (user) {
        // upsert a profile if missing (id must match auth.uid() due to RLS)
        await supabase.from("profiles").upsert(
          {
            id: user.id,
            email: user.email,
            role: selectedRole || "student",
            full_name: user.user_metadata?.full_name || null,
          },
          { onConflict: "id" },
        )

        const { data: prof } = await supabase.from("profiles").select("role").eq("id", user.id).single()
        if (prof?.role) targetRole = prof.role
      }

      const dest =
        targetRole === "student"
          ? "/student"
          : targetRole === "mentor"
            ? "/mentor"
            : targetRole === "employer"
              ? "/employer"
              : "/admin"

      router.replace(dest)
    } catch (err: any) {
      setError(err?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border bg-card p-5">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="role">Role</Label>
          <select id="role" name="role" className="mt-1 w-full rounded-md border bg-background p-2 text-sm">
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
            <option value="employer">Employer</option>
            <option value="administrator">Administrator</option>
          </select>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
      </div>
      <Button disabled={loading} type="submit" className="mt-4 bg-primary text-primary-foreground">
        {loading ? "Signing in..." : "Sign In"}
      </Button>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
