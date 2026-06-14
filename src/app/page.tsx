import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PeopleSay from "@/components/PeopleSay";

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
