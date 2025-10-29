"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function GrievancePage() {
  const [sent, setSent] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    // Post to a simple echo endpoint or store locally for demo.
    await fetch("/api/grievance", {
      method: "POST",
      body: JSON.stringify(data),
    })
    setSent(true)
    form.reset()
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">🛟 Grievance & Helpdesk</h1>
      <p className="mt-2 text-muted-foreground">
        Share feedback or request help. Our team will reach you by email or phone.
      </p>

      <section className="mt-6 grid gap-6 md:grid-cols-2">
        <form onSubmit={onSubmit} className="rounded-lg border bg-card p-5">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" placeholder="Login, Internship, Verification, Other" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" required rows={6} />
            </div>
          </div>
          <Button type="submit" className="mt-4 bg-primary text-primary-foreground">
            Submit
          </Button>
          {sent && <p className="mt-2 text-sm text-green-600">Thanks! We received your request.</p>}
        </form>

        <div className="rounded-lg border bg-card p-5">
          <h2 className="font-medium">Helpdesk</h2>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            <li>
              Email:{" "}
              <a className="underline" href="mailto:help@prashikshan.in">
                help@prashikshan.in
              </a>
            </li>
            <li>
              Phone:{" "}
              <a className="underline" href="tel:+911234567890">
                +91 12345 67890
              </a>
            </li>
            <li>Hours: Mon–Fri, 9am–6pm IST</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
