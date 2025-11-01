import { requireRole } from "@/lib/auth"
import LogoutButton from "@/components/logout-button"

export default async function AdminDashboard() {
  const session = await requireRole("administrator")
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Administrator Dashboard</h1>
        <LogoutButton />
      </div>
      <p className="mt-2 text-muted-foreground">
        Welcome, {session.name ?? session.email}. Verify organizations, monitor activity, and manage credits.
      </p>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <DashboardCard title="Verifications" />
        <DashboardCard title="Reports" />
        <DashboardCard title="System Settings" />
      </section>
    </main>
  )
}

function DashboardCard({ title }: { title: string }) {
  return <div className="rounded-lg border bg-card p-5">{title}</div>
}
