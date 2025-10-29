"use client"

import type React from "react"

import useSWR from "swr"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function EmployerCreateInternshipForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const body = Object.fromEntries(new FormData(e.currentTarget).entries())
    const res = await fetch("/api/internships", { method: "POST", body: JSON.stringify(body) })
    if (!res.ok) {
      setError(await res.text())
      setLoading(false)
      return
    }
    ;(e.currentTarget as HTMLFormElement).reset()
    setLoading(false)
    // Trigger revalidation via SWR mutate by dispatching a custom event
    window.dispatchEvent(new Event("internships:mutate"))
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border bg-card p-5">
      <h3 className="font-medium">Post a New Internship</h3>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required />
        </div>
        <div>
          <Label htmlFor="organization">Organization</Label>
          <Input id="organization" name="organization" required />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" />
        </div>
        <div>
          <Label htmlFor="mode">Mode</Label>
          <select id="mode" name="mode" className="mt-1 w-full rounded-md border bg-background p-2 text-sm">
            <option value="onsite">Onsite</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="stipend">Stipend</Label>
          <Input id="stipend" name="stipend" placeholder="e.g., ₹10,000/month" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={3} />
        </div>
      </div>
      <Button disabled={loading} type="submit" className="mt-4 bg-primary text-primary-foreground">
        {loading ? "Posting..." : "Post Internship"}
      </Button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  )
}

export function EmployerInternshipList() {
  const { data, mutate } = useSWR<{ items: any[] }>("/api/internships", fetcher)
  if (typeof window !== "undefined") {
    window.addEventListener("internships:mutate", () => mutate(), { once: true })
  }
  const items = data?.items || []
  return (
    <div className="rounded-lg border bg-card p-5">
      <h3 className="font-medium">Your Postings</h3>
      <ul className="mt-3 space-y-2">
        {items.length === 0 && <li className="text-sm text-muted-foreground">No internships yet.</li>}
        {items.map((i) => (
          <li key={i.id} className="rounded-md border p-3">
            <div className="font-medium">{i.title}</div>
            <div className="text-sm text-muted-foreground">
              {i.organization} • {i.location || "—"} • {i.mode}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
