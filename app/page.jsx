import LenisProvider from "../components/LenisProvider";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";

export default function Home() {
  return (
    <LenisProvider>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
    </LenisProvider>
  );
}
