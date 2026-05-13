import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  HeroSection,
  ProcessSection,
  ProjectsSection,
  ServicesSection,
  SkillsSection,
  TestimonialsSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ServicesSection />
      <ProcessSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
