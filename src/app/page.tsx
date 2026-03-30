import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { ResumeScanner } from "@/components/resume-scanner";
import { ServicesPreview } from "@/components/services-preview";
import { Testimonials } from "@/components/testimonials";
import { About } from "@/components/about";
import { FinalCTA } from "@/components/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ResumeScanner />
      <ServicesPreview />
      <Testimonials />
      <About />
      <FinalCTA />
    </>
  );
}
