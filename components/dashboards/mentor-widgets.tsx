"use client"

import useSWR from "swr"
import { Button } from "@/components/ui/button"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function MentorLogbookApprovals() {
  const { data, mutate } = useSWR<{ items: any[] }>("/api/logbook", fetcher)
  const items = data?.items || []

  async function approve(id: string) {
    const res = await fetch("/api/logbook/approve", { method: "POST", body: JSON.stringify({ id }) })
    if (!res.ok) {
      alert(await res.text())
      return
    }
    mutate()
  }

  return (
    <div className="rounded-lg border bg-card p-5">
      <h3 className="font-medium">Logbook Approvals</h3>
      <ul className="mt-3 space-y-2">
        {items.length === 0 && <li className="text-sm text-muted-foreground">No entries to review.</li>}
        {items.map((e) => (
          <li key={e.id} className="rounded-md border p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <div className="font-medium">
                  {e.studentEmail} • {e.date}
                </div>
                <div className="text-muted-foreground">{e.hours} hours</div>
              </div>
              <Button
                size="sm"
                disabled={e.approved}
                onClick={() => approve(e.id)}
                className="bg-primary text-primary-foreground disabled:opacity-50"
              >
                {e.approved ? "Approved" : "Approve"}
              </Button>
            </div>
            {e.description && <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
