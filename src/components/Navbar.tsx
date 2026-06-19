"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Briefcase } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // If at the absolute bottom of the page, force "contact" as active
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        setActiveSection("contact");
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Setup Intersection Observer for Scroll Spy
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when the section occupies the center of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navLinks.forEach((link) => {
      const id = link.href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/50 backdrop-blur-xl border-b border-white/40 shadow-sm"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-accent/70 flex items-center justify-center text-primary font-bold text-lg shadow-sm shadow-accent/25 group-hover:scale-105 transition-transform">
            SP
          </div>
          <span className="text-base font-bold tracking-widest text-light-1" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
            SHIYA <span className="text-[#8B2643]">PATHANIA</span>
          </span>
        </Link>
 
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold tracking-wide relative py-1 transition-colors ${
                  isActive ? "text-[#8B2643]" : "text-light-1/80 hover:text-[#8B2643]"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B2643] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
 
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-light-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
 
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+12px)] left-4 right-4 bg-white/75 backdrop-blur-xl border border-white/60 rounded-3xl py-6 px-5 flex flex-col gap-3 lg:hidden shadow-[0_20px_50px_rgba(139,38,67,0.15)] overflow-hidden"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-bold px-4 py-3 rounded-2xl flex items-center justify-between transition-all duration-300 ${
                    isActive
                      ? "bg-[#8B2643]/10 text-[#8B2643] border-l-4 border-[#8B2643]"
                      : "text-light-1/80 hover:bg-[#8B2643]/5 hover:text-[#8B2643] border-l-4 border-transparent"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B2643] animate-pulse" />
                  )}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
