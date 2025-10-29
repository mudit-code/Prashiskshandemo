export function NepGuidelinesSection() {
  return (
    <section id="nep" className="border-b scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl font-semibold">📘 NEP Guidelines</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card
            title="🎓 1. Purpose of Internship"
            items={[
              "Give students real-world experience and practical exposure.",
              "Improve job skills, decision-making, and teamwork.",
              "Develop research skills, creativity, and problem-solving abilities.",
              "Build entrepreneurial thinking and a sense of social responsibility.",
            ]}
          />
          <Card
            title="📚 2. Types of Internships"
            items={[
              "For Employability — practical skills, teamwork, communication, ethics, industry experience.",
              "For Research Aptitude — tools, experiments, analysis, report writing, presentations.",
            ]}
          />
          <Card
            title="🧩 3. Internship Structure"
            items={[
              "HEIs should have R&D cell and a Nodal Officer.",
              "Partner with companies, labs, NGOs, startups, or government bodies.",
              "Open to sectors like IT, agriculture, healthcare, finance, tourism, AI, IoT, etc.",
            ]}
          />
          <Card
            title="📏 4. Duration & Credits"
            items={[
              "After 4th semester — 60–120 hours (2–4 credits).",
              "8th semester research project — ~360 hours (~12 credits).",
              "1 credit = 30 hours of internship work.",
            ]}
          />
          <Card
            title="📌 5. Key Skills You Should Gain"
            items={[
              "Research methods and analysis",
              "Problem-solving and innovation",
              "Technical writing and presentation",
              "Ethics and accountability",
              "Communication and teamwork",
              "Adaptability and collaboration",
            ]}
          />
          <Card
            title="🧑‍🏫 6. Roles and Responsibilities"
            items={[
              "Organisation: training, resources, mentorship.",
              "Nodal Officer: registration, partnerships, placements, support.",
              "Supervisor: monitors, evaluates, certifies.",
              "Mentor: guides work, checks progress, validates reports.",
            ]}
          />
          <Card
            title="🔄 7. How the Internship Works"
            items={[
              "Students apply via college portal or independently.",
              "Organisations select based on criteria.",
              "Physical, digital, or group-based formats.",
              "Regular reports, feedback, and a final mentor-endorsed report.",
            ]}
          />
          <Card
            title="📊 8. Evaluation"
            items={[
              "Effort and research output, viva-voce.",
              "Logbook and report quality.",
              "Skill acquisition and innovation.",
              "Original, plagiarism-free work.",
            ]}
          />
          <Card
            title="📝 9. Extra Points"
            items={[
              "Additional 4 credits for final-year internships (where applicable).",
              "Internships shouldn't affect attendance; use breaks if needed.",
            ]}
          />
        </div>
      </div>
    </section>
  )
}

function Card({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border bg-card p-5">
      <h3 className="font-medium">{title}</h3>
      <ul className="mt-2 space-y-1">
        {items.map((t, i) => (
          <li key={i} className="text-sm text-muted-foreground">
            • {t}
          </li>
        ))}
      </ul>
    </div>
  )
}
