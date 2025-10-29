import { requireRole } from "@/lib/auth"
import { EmployerCreateInternshipForm, EmployerInternshipList } from "@/components/dashboards/employer-widgets"
import LogoutButton from "@/components/logout-button"

export default async function EmployerDashboard() {
  const session = await requireRole("employer")
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Employer Dashboard</h1>
        <LogoutButton />
      </div>
      <p className="mt-2 text-muted-foreground">
        Welcome, {session.name ?? session.email}. Post internships and manage applicants.
      </p>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <EmployerCreateInternshipForm />
        <EmployerInternshipList />
      </section>
    </main>
  )
}

function Card({ title }: { title: string }) {
  return <div className="rounded-lg border bg-card p-5">{title}</div>
}
