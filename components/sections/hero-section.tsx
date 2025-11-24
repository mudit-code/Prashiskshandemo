import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="home" className="border-b bg-card scroll-mt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="text-balance text-3xl font-semibold leading-tight md:text-4xl">
            {"Empower Your Poteintial With Prashishkshan"}
          </h1>
          <p className="mt-4 text-pretty text-justify text-muted-foreground">
            {
              "Forget fake internships and pointless hustle. Prashikshan gives you real industry exposure, verified internships, and mentors who actually care. You start building job-ready skills from Semester 5 — exactly in line with NEP 2020."
            }
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#partners">
              <Button className="bg-primary text-primary-foreground"> Explore Internships</Button>
            </a>
            <Link href="/auth">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 bg-transparent dark:border-white dark:text-white">
                 Join Now
              </Button>
            </Link>
          </div>
        </div>
        <div className="rounded-lg">
          <img
            alt="Placeholder"
            className="h-auto w-full rounded-md themed-placeholder"
          />
        </div>
      </div>
    </section>
  )
}
