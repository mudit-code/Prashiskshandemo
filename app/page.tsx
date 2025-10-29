import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { NepGuidelinesSection } from "@/components/sections/nep-guidelines-section"
import { IndustryPartnersSection } from "@/components/sections/industry-partners-section"
import { CareerGuidanceSection } from "@/components/sections/career-guidance-section"

export default function LandingPage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <NepGuidelinesSection />
      <IndustryPartnersSection />
      <CareerGuidanceSection />
    </main>
  )
}
