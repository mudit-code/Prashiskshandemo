"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/auth/login-form"
import { StudentRegisterForm } from "@/components/auth/student-register"
import { MentorRegisterForm } from "@/components/auth/mentor-register"
import { EmployerRegisterForm } from "@/components/auth/employer-register"
import { AdminRegisterForm } from "@/components/auth/admin-register"
import { useSearchParams } from "next/navigation"

export default function AuthPage() {
  const search = useSearchParams()
  const tabFromUrl = search.get("tab") === "register" ? "register" : "login"
  const roleFromUrl = ((): "student" | "mentor" | "employer" | "administrator" => {
    const r = (search.get("role") || "").toLowerCase()
    return r === "mentor" || r === "employer" || r === "administrator" ? (r as any) : "student"
  })()

  const [tab, setTab] = useState<"login" | "register">(tabFromUrl)
  const [role, setRole] = useState<"student" | "mentor" | "employer" | "administrator">(roleFromUrl)

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Account Access</h1>
      <p className="mt-2 text-muted-foreground">Login or create your account. Choose your role to register.</p>

      <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "register")} className="mt-6">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="mt-4">
          <LoginForm />
        </TabsContent>

        <TabsContent value="register" className="mt-4">
          <div className="mb-4 flex flex-wrap gap-2">
            {(["student", "mentor", "employer", "administrator"] as const).map((r) => (
              <button
                key={r}
                className={`rounded-md border px-3 py-1 text-sm ${role === r ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                onClick={() => setRole(r)}
                aria-pressed={role === r}
              >
                {r[0].toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {role === "student" && <StudentRegisterForm />}
          {role === "mentor" && <MentorRegisterForm />}
          {role === "employer" && <EmployerRegisterForm />}
          {role === "administrator" && <AdminRegisterForm />}
        </TabsContent>
      </Tabs>
    </main>
  )
}
