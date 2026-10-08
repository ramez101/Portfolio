import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import StackSection from '@/components/sections/StackSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactSection from '@/components/sections/ContactSection'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <StackSection />
      <ExperienceSection />
      <ContactSection />
    </>
  )
}
