export function AboutSection() {
  return (
    <section id="about" className="border-b scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl font-semibold">ℹ️ About</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-5">
            <h3 className="font-medium">Why Prashikshan?</h3>
            <p className="mt-2 text-muted-foreground">
              {
                "The New Education Policy (NEP 2020) emphasizes internships and experiential learning in Semester 5. But in reality, students face limited industry connections, unverified opportunities, and weak monitoring systems."
              }
            </p>
          </div>
          <div className="rounded-lg border bg-card p-5">
            <h3 className="font-medium">Our Solution</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Simplifies finding and applying for internships.</li>
              <li>Provides verified and NEP-compliant opportunities.</li>
              <li>Involves faculty and industry for real mentorship.</li>
              <li>Offers built-in skill modules, logbooks, and reports.</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Together, we ensure students are industry-ready, well-guided, and future-focused.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
