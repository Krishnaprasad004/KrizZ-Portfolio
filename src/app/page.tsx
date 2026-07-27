import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroProfile from "@/components/HeroProfile";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import EngineeringSystems from "@/components/EngineeringSystems";
import TechMarquee from "@/components/TechMarquee";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HeroProfile />
      <About />
      <Skills />
      <Projects />
      <EngineeringSystems />
      <TechMarquee />
      <Experience />
      <Certifications />
      <Education />
      <Contact />
    </>
  );
}
