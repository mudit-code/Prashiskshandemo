import { Button } from "@/components/ui/button"
import Link from "next/link"

type Partner = {
  icon: string
  name: string
  tagline: string
  bullets: string[]
}

const partners: Partner[] = [
  {
    icon: "🏛",
    name: "Jammu Municipal Corporation",
    tagline: "Swachh Bharat Mission",
    bullets: [
      "✅ Shape smart cities with real projects.",
      "✅ Internships in urban policy & governance.",
      "✅ Paid experience with government backing.",
      "✅ Drive change at the city level.",
    ],
  },
  {
    icon: "🚀",
    name: "JKEDI",
    tagline: "J&K Entrepreneurship Development Institute",
    bullets: [
      "✅ Turn ideas into startups with JKEDI.",
      "✅ Learn innovation in 10 days.",
      "✅ Mentorship from startup experts.",
      "✅ Build, pitch, and grow your ideas.",
    ],
  },
  {
    icon: "💻",
    name: "Digital J&K",
    tagline: "IT Department",
    bullets: [
      "✅ Code for governance, build for people.",
      "✅ Internships in IT, data & e-gov.",
      "✅ Hybrid roles with stipend.",
      "✅ Create digital impact for J&K.",
    ],
  },
  {
    icon: "📰",
    name: "DIPR",
    tagline: "Information & PR Department",
    bullets: [
      "✅ Learn media, PR & storytelling.",
      "✅ Intern with government communication.",
      "✅ Real campaigns, real experience.",
      "✅ Train for journalism & content careers.",
    ],
  },
]

export function IndustryPartnersSection() {
  return (
    <section id="partners" className="border-b scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl font-semibold">🤝 Industry Partners</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {partners.map((p) => (
            <article key={p.name} className="rounded-lg border bg-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl">{p.icon}</div>
                  <h3 className="mt-2 text-lg font-semibold">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.tagline}</p>
                </div>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {p.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="mt-4">
                <Button asChild className="bg-accent text-accent-foreground hover:opacity-90">
                  <Link href="/auth?tab=register">View Opportunities</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
