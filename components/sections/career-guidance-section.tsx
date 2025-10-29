import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CareerGuidanceSection() {
  return (
    <section id="career" className="border-b scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl font-semibold">🌐 Career Guidance</h2>

        <div className="mt-6 space-y-10">
          <Block title="🎯 Explore Careers (Official portals)">
            <SimpleList
              items={[
                ["TCS Careers", "https://careers.tcs.com", "View Careers"],
                ["Infosys Careers", "https://careers.infosys.com", "View Careers"],
                ["Wipro Careers", "https://careers.wipro.com", "View Careers"],
                ["Accenture Careers", "https://careers.accenture.com", "View Careers"],
                ["Google Careers", "https://careers.google.com", "View Careers"],
                ["Microsoft Careers", "https://careers.microsoft.com", "View Careers"],
                ["L&T Careers", "https://careers.larsentoubro.com", "View Careers"],
                ["BHEL Careers", "https://careers.bhel.in", "View Careers"],
                ["ONGC Careers", "https://ongcindia.com/careers", "View Careers"],
                ["ISRO Careers", "https://www.isro.gov.in/careers", "View Careers"],
                ["UPSC (Govt Jobs)", "https://www.upsc.gov.in", "Official Site"],
                ["SSC (Govt Exams)", "https://ssc.nic.in", "Official Site"],
              ]}
            />
          </Block>

          <Block title="📚 Learn & Upskill (Direct links)">
            <SimpleList
              items={[
                ["GeeksforGeeks", "https://www.geeksforgeeks.org", "Learn"],
                ["LeetCode", "https://leetcode.com", "Practice"],
                ["HackerRank", "https://www.hackerrank.com", "Practice"],
                ["LinkedIn Learning", "https://www.linkedin.com/learning", "Learn"],
                ["Coursera", "https://www.coursera.org", "Courses"],
                ["Udemy", "https://www.udemy.com", "Courses"],
                ["NPTEL (Govt)", "https://nptel.ac.in", "Free Courses"],
                ["SWAYAM (Govt)", "https://swayam.gov.in", "Free Courses"],
              ]}
            />
          </Block>

          <Block title="📝 Guides & Roadmaps">
            <DownloadList
              items={[
                [
                  "Resume Building",
                  "/assets/resume-guide.pdf",
                  "Download Guide",
                  "1-page crisp resume, highlight projects, use metrics.",
                ],
                [
                  "Interview Prep",
                  "/assets/interview-prep.pdf",
                  "Download Guide",
                  "STAR method answers, mock interviews, common questions.",
                ],
                [
                  "Career Roadmap",
                  "/assets/career-roadmap.pdf",
                  "Download Guide",
                  "Semester-wise checklist: skills → internships → portfolio → placement.",
                ],
                [
                  "Portfolio Tips",
                  "/assets/portfolio-tips.pdf",
                  "Download Guide",
                  "GitHub + personal site + project README templates.",
                ],
              ]}
            />
          </Block>

          <Block title="🤝 Mentorship & Support">
            <p className="text-muted-foreground">
              Faculty Coordinators: Reach out to your college coordinator for one-on-one counseling. Industry Mentors:
              Apply via partner cards or the Request Mentor form. Workshops & Webinars: scheduled each semester.
            </p>
            <div className="mt-3">
              <Link href="mailto:career@prashikshan.in">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 bg-transparent">
                  Email Career Team
                </Button>
              </Link>
            </div>
          </Block>

          <Block title="🌟 Success Stories">
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>“Rahul — B.Tech, Jammu → Internship at Infosys → Full-time offer.”</li>
              <li>“Priya — MBA, Jammu → JKEDI internship → Launched her startup.”</li>
              <li>“Aamir — B.Sc (Remote) → NPTEL + Digital J&K internship → Govt IT role.”</li>
            </ul>
          </Block>
        </div>
      </div>
    </section>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-card p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function SimpleList({ items }: { items: [string, string, string][] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map(([label, href, cta]) => (
        <li key={label} className="flex items-center justify-between rounded-md border p-3">
          <span className="text-sm">{label}</span>
          <a href={href} target="_blank" rel="noreferrer">
            <Button size="sm" className="bg-accent text-accent-foreground hover:opacity-90">
              {cta}
            </Button>
          </a>
        </li>
      ))}
    </ul>
  )
}

function DownloadList({ items }: { items: [string, string, string, string][] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map(([label, href, cta, desc]) => (
        <li key={label} className="rounded-md border p-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">{label}</span>
            <span className="text-xs text-muted-foreground">{desc}</span>
          </div>
          <a className="mt-2 inline-block" href={href} target="_blank" rel="noreferrer">
            <Button
              size="sm"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              {cta}
            </Button>
          </a>
        </li>
      ))}
    </ul>
  )
}
