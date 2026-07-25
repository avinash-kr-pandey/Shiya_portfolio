import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/About"), { ssr: true });
const Experience = dynamic(() => import("@/components/Experience"), { ssr: true });
const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const Skills = dynamic(() => import("@/components/Skills"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const Blog = dynamic(() => import("@/components/Blog"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const PeopleSay = dynamic(() => import("@/components/PeopleSay"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Services />
      <Skills />
      <Testimonials />
      <Blog />
      <Contact />
      <PeopleSay />
      <Footer />
    </main>
  );
}
