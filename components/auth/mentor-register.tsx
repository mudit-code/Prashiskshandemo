"use client"

import type React from "react"
import { getBrowserSupabase } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function MentorRegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const body: any = Object.fromEntries(new FormData(e.currentTarget).entries())
    const email = String(body.email || "").trim()
    const password = String(body.password || "")
    const confirmPassword = String(body.confirmPassword || "")
    const fullName = String(body.fullName || "").trim()
    const role = "mentor"

    const pattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*/
    if (!pattern.test(password)) {
      setError("Password must include at least one uppercase letter, one lowercase letter, and one digit.")
      setLoading(false)
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    try {
      const supabase = getBrowserSupabase()
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: (process as any).env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
          data: { full_name: fullName, role, email_confirm: false },
        },
      })
      if (signUpError) throw signUpError

      if (data.user) {
        await supabase
          .from("profiles")
          .upsert({ id: data.user.id, email, full_name: fullName, role }, { onConflict: "id" })
      }
      router.replace("/mentor")
    } catch (err: any) {
      setError(err?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border bg-card p-5">
      <p className="mb-3 text-xs text-muted-foreground">Note: File uploads are not persisted in this preview.</p>
      <div className="grid gap-4">
        <h3 className="font-medium">Professional Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="fullName">Full Name (with title)</Label>
            <Input id="fullName" name="fullName" required />
          </div>
          <div>
            <Label htmlFor="designation">Designation</Label>
            <Input id="designation" name="designation" required />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input id="department" name="department" required />
          </div>
          <div>
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <Input id="profilePicture" name="profilePicture" type="file" accept=".jpg,.jpeg,.png" />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Institutional Details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="institution">Institution/Organization Name</Label>
            <Input id="institution" name="institution" required />
          </div>
          <div>
            <Label htmlFor="institutionWebsite">Institution Website</Label>
            <Input id="institutionWebsite" name="institutionWebsite" type="url" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="officeAddress">Office Address</Label>
            <Textarea id="officeAddress" name="officeAddress" rows={2} />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Contact Details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Official Email Address</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="phone">Contact Number</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Area of Expertise</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="domain">Primary Domain</Label>
            <select id="domain" name="domain" className="mt-1 w-full rounded-md border bg-background p-2 text-sm">
              <option>Technology</option>
              <option>Management</option>
              <option>Research</option>
              <option>Arts</option>
              <option>Other</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="specializations">Specializations / Research Interests</Label>
            <Textarea id="specializations" name="specializations" rows={2} />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Government ID Verification</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="idType">Type of ID</Label>
            <select id="idType" name="idType" className="mt-1 w-full rounded-md border bg-background p-2 text-sm">
              <option>Aadhaar Card</option>
              <option>PAN Card</option>
              <option>Official Institution ID</option>
            </select>
          </div>
          <div>
            <Label htmlFor="idNumber">Government ID Number</Label>
            <Input id="idNumber" name="idNumber" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="idUpload">Upload ID</Label>
            <Input id="idUpload" name="idUpload" type="file" accept=".png,.jpg,.jpeg,.pdf" />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Account Credentials</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="password">Create Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*"
              title="Password must include at least one uppercase letter, one lowercase letter, and one digit."
              aria-describedby="mentor-password-help"
            />
            <p id="mentor-password-help" className="mt-1 text-xs text-muted-foreground">
              Must include an uppercase, a lowercase, and a digit.
            </p>
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*"
              title="Password must include at least one uppercase letter, one lowercase letter, and one digit."
            />
          </div>
        </div>
      </div>
      <Button disabled={loading} type="submit" className="mt-4 bg-primary text-primary-foreground">
        {loading ? "Creating..." : "Create Mentor Account"}
      </Button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  )
}
