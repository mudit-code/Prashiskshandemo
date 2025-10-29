import { requireRole } from "@/lib/auth"
import { MentorLogbookApprovals } from "@/components/dashboards/mentor-widgets"
import LogoutButton from "@/components/logout-button"

export default async function MentorDashboard() {
  const session = await requireRole("mentor")
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mentor Dashboard</h1>
        <LogoutButton />
      </div>
      <p className="mt-2 text-muted-foreground">
        Welcome, {session.name ?? session.email}. Review mentees, evaluate progress, and verify reports.
      </p>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <MentorLogbookApprovals />
        <Card title="Approvals Summary" />
      </section>
    </main>
  )
}

function Card({ title }: { title: string }) {
  return <div className="rounded-lg border bg-card p-5">{title}</div>
}
