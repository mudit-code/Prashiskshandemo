"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getBrowserSupabase } from "@/lib/supabase/client"

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onLogout() {
    try {
      setLoading(true)
      const supabase = getBrowserSupabase()
      await supabase.auth.signOut()
      // Optional: also hit our API logout to clear any legacy cookies
      await fetch("/api/auth/logout", { method: "POST" })
      router.replace("/")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={onLogout} variant="outline" className="text-sm bg-transparent" disabled={loading}>
      {loading ? "Logging out..." : "Log out"}
    </Button>
  )
}
