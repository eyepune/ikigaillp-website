import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import LogoTicker from "../components/home/LogoTicker";
import AboutSection from "../components/home/AboutSection";
import ProgramsSection from "../components/home/ProgramsSection";
import PhilosophySection from "../components/home/PhilosophySection";
import FrameworkSection from "../components/home/FrameworkSection";
import MissionSection from "../components/home/MissionSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import MobileAppSection from "../components/home/MobileAppSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <LogoTicker />
      <AboutSection />
      <ProgramsSection />
      <PhilosophySection />
      <FrameworkSection />
      <MissionSection />
      <TestimonialsSection />
      <MobileAppSection />
      <CTASection />
    </>
  );
}