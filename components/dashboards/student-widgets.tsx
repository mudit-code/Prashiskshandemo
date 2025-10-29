"use client"

import type React from "react"

import useSWR from "swr"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function AvailableInternships() {
  const { data, mutate } = useSWR<{ items: any[] }>("/api/internships", fetcher)
  const items = data?.items || []

  async function apply(id: string) {
    const res = await fetch("/api/internships/apply", { method: "POST", body: JSON.stringify({ internshipId: id }) })
    if (!res.ok) {
      alert(await res.text())
      return
    }
    alert("Applied successfully")
    mutate()
  }

  return (
    <div className="rounded-lg border bg-card p-5">
      <h3 className="font-medium">Available Internships</h3>
      <ul className="mt-3 space-y-2">
        {items.length === 0 && <li className="text-sm text-muted-foreground">No internships available yet.</li>}
        {items.map((i) => (
          <li key={i.id} className="rounded-md border p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{i.title}</div>
                <div className="text-sm text-muted-foreground">
                  {i.organization} • {i.location || "—"} • {i.mode}
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => apply(i.id)}
                className="bg-accent text-accent-foreground hover:opacity-90"
              >
                Apply
              </Button>
            </div>
            {i.description && <p className="mt-2 text-sm text-muted-foreground">{i.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function LogbookForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const body = Object.fromEntries(new FormData(e.currentTarget).entries())
    const res = await fetch("/api/logbook", { method: "POST", body: JSON.stringify(body) })
    if (!res.ok) {
      setError(await res.text())
      setLoading(false)
      return
    }
    ;(e.currentTarget as HTMLFormElement).reset()
    setLoading(false)
    window.dispatchEvent(new Event("logbook:mutate"))
    window.dispatchEvent(new Event("credits:mutate"))
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border bg-card p-5">
      <h3 className="font-medium">Add Logbook Entry</h3>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" required />
        </div>
        <div>
          <Label htmlFor="hours">Hours</Label>
          <Input id="hours" name="hours" type="number" min={1} step={0.5} required />
        </div>
        <div className="md:col-span-3">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={2} required />
        </div>
      </div>
      <Button disabled={loading} type="submit" className="mt-4 bg-primary text-primary-foreground">
        {loading ? "Saving..." : "Save Entry"}
      </Button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  )
}

export function CreditsWidget() {
  const { data, mutate } = useSWR<{ hours: number; credits: number }>("/api/credits", fetcher)
  if (typeof window !== "undefined") {
    window.addEventListener("credits:mutate", () => mutate(), { once: true })
  }
  return (
    <div className="rounded-lg border bg-card p-5">
      <h3 className="font-medium">Credits Progress</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Hours logged: <span className="font-medium text-foreground">{data?.hours ?? 0}</span>
      </p>
      <p className="text-sm text-muted-foreground">
        Credits (1 = 30h): <span className="font-medium text-foreground">{(data?.credits ?? 0).toFixed(2)}</span>
      </p>
    </div>
  )
}

export function LogbookList() {
  const { data, mutate } = useSWR<{ items: any[] }>("/api/logbook", fetcher)
  if (typeof window !== "undefined") {
    window.addEventListener("logbook:mutate", () => mutate(), { once: true })
  }
  const items = data?.items || []
  return (
    <div className="rounded-lg border bg-card p-5">
      <h3 className="font-medium">My Logbook</h3>
      <ul className="mt-3 space-y-2">
        {items.length === 0 && <li className="text-sm text-muted-foreground">No entries yet.</li>}
        {items.map((e) => (
          <li key={e.id} className="rounded-md border p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <div className="font-medium">{e.date}</div>
                <div className="text-muted-foreground">{e.hours} hours</div>
              </div>
              <div className="text-xs">{e.approved ? "Approved" : "Pending"}</div>
            </div>
            {e.description && <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
