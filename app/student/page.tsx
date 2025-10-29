import { requireRole } from "@/lib/auth"
import { AvailableInternships, LogbookForm, CreditsWidget, LogbookList } from "@/components/dashboards/student-widgets"
import LogoutButton from "@/components/logout-button"

export default async function StudentDashboard() {
  const session = await requireRole("student")

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Student Dashboard</h1>
        <LogoutButton />
      </div>
      <p className="mt-2 text-muted-foreground">
        Welcome, {session.name ?? session.email}. Track opportunities, logbooks, and credits.
      </p>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <AvailableInternships />
        </div>
        <CreditsWidget />
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <LogbookForm />
        <LogbookList />
      </section>
    </main>
  )
}

function Card({ title }: { title: string }) {
  return <div className="rounded-lg border bg-card p-5">{title}</div>
}
