"use client";

import React from "react";
import { Briefcase, Linkedin, Twitter, Mail, ArrowUp, Send } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary pt-20 pb-10 border-t border-accent/20 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-8 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-accent to-accent/70 flex items-center justify-center text-primary font-bold text-xl shadow-sm shadow-accent/25 group-hover:scale-105 transition-transform">
                SP
              </div>
              <span className="text-lg font-bold tracking-widest text-light-1" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                SHIYA <span className="text-[#8B2643]">PATHANIA</span>
              </span>
            </Link>
            <p className="text-light-1/80 text-sm leading-relaxed mb-8 max-w-xs">
              Strategic human resources consulting for modern organizations seeking to scale their culture and talent.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/in/shiya-pathania-1248702b4/?_l=en_US" },
                { Icon: Twitter, href: "#" },
                { Icon: Mail, href: "mailto:pathaniashiya@gmail.com" }
              ].map(({ Icon, href }, idx) => (
                <a key={idx} href={href} target={href.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/60 text-light-1/70 hover:bg-[#8B2643] hover:text-white transition-all border border-[#8B2643]/20">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
 
          {/* Quick Links */}
          <div>
            <h4 className="text-light-1 font-bold mb-8 uppercase tracking-widest text-xs">Quick Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: "About Me", href: "#about" },
                { name: "My Services", href: "#services" },
                { name: "Career Journey", href: "#experience" },
                { name: "Latest Insights", href: "#blog" },
                { name: "Contact", href: "#contact" }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="text-light-1/80 hover:text-[#8B2643] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-4 h-[1px] bg-[#8B2643] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Contact Details */}
          <div>
            <h4 className="text-light-1 font-bold mb-8 uppercase tracking-widest text-xs">Office Hours</h4>
            <ul className="space-y-4 text-sm text-light-1/80">
              <li>Mon - Fri: 9:00 AM - 6:00 PM</li>
              <li className="pt-4 text-[#8B2643] font-bold uppercase tracking-tighter">Remote / Global</li>
              <li>pathaniashiya@gmail.com</li>
            </ul>
          </div>
 
          {/* Newsletter */}
          <div>
            <h4 className="text-light-1 font-bold mb-8 uppercase tracking-widest text-xs">Stay Informed</h4>
            <p className="text-light-1/80 text-sm mb-6">Receive the latest HR trends and leadership insights directly to your inbox.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                aria-label="Subscribe to newsletter"
                placeholder="Email address"
                className="w-full bg-white/70 border border-[#8B2643]/20 rounded-xl px-5 py-4 text-sm text-light-1 placeholder-light-1/60 focus:outline-none focus:border-[#8B2643] transition-all pr-12"
              />
              <button type="submit" aria-label="Subscribe" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#8B2643] rounded-lg flex items-center justify-center text-white hover:bg-[#4A1525] transition-colors">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
 
        <div className="pt-10 border-t border-accent/15 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-light-1/70 text-[10px] uppercase tracking-[0.3em]">
            © 2025 SHIYA PATHANIA. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-light-1/75">
            <a href="#" className="hover:text-[#8B2643] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#8B2643] transition-colors">Terms of Service</a>
          </div>
 
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-[#8B2643]/25 flex items-center justify-center text-light-1/70 hover:text-[#8B2643] hover:border-[#8B2643] transition-all group bg-white/40"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
