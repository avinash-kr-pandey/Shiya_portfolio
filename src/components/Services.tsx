"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, ShieldCheck, BarChart3, Users2, FileText, GraduationCap, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "HR Operations & Talent Acquisition",
    desc: "Finding and attracting top-tier talent while managing end-to-end HR workflows, project coordination, and compliance."
  },
  {
    icon: ShieldCheck,
    title: "DDU-GKY Project Management",
    desc: "Managed end-to-end operations for skill development projects under DDU-GKY, ensuring compliance with SRLM and MoRD guidelines."
  },
  {
    icon: GraduationCap,
    title: "e-SOP Training Program",
    desc: "Developed and delivered comprehensive e-SOP training sessions for teams, improving operational efficiency and compliance."
  },
  {
    icon: BarChart3,
    title: "OsheenOracle AI & E-commerce",
    desc: "Conducted comprehensive UI/UX and functional testing for AI astrology services and e-commerce workflows."
  },
  {
    icon: FileText,
    title: "Slanster Website Testing",
    desc: "Executed rigorous manual UI and full-functional testing to identify critical usability issues and maintain system integrity."
  },
  {
    icon: Users2,
    title: "Portfolio Testing & Content",
    desc: "Provided end-to-end cross-browser testing and content support to ensure responsive, user-friendly digital portfolios."
  }
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-white/50 backdrop-blur-md border-y border-white/40 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h4 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#8B2643] font-bold uppercase tracking-[0.2em] text-sm mb-4"
            >
              Our Expertise
            </motion.h4>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-[#4A1525] via-[#8B2643] to-[#C73E5B] bg-clip-text text-transparent"
            >
              Strategic Solutions for <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#8B2643] to-[#4A1525] bg-clip-text text-transparent font-extrabold">Modern Organizations</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-xs text-light-1/80 text-sm leading-relaxed"
          >
            Comprehensive HR and Operational services designed to optimize performance, ensure compliance, and build high-performing teams across the DDU-GKY ecosystem.
          </motion.p>
        </div>
 
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flip-card w-full h-[300px] rounded-[2rem]"
            >
              <div className="flip-card-inner w-full h-full">
                {/* Front of the Card */}
                <div className="flip-card-front w-full h-full glass-card p-8 flex flex-col justify-between items-center text-center border border-white/50 bg-white/60 shadow-sm">
                  <div className="w-16 h-16 bg-accent/5 border border-[#8B2643]/20 rounded-2xl flex items-center justify-center text-[#8B2643] mb-4">
                    <service.icon size={30} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-light-1 mb-2">{service.title}</h3>
                    <p className="text-[#8B2643] text-[10px] font-bold uppercase tracking-widest mt-2">
                      Tap or hover to view details
                    </p>
                  </div>
                </div>
 
                {/* Back of the Card */}
                <div className="flip-card-back w-full h-full glass-card p-8 flex flex-col justify-between items-center text-center border border-[#8B2643]/30 bg-white/90 shadow-md">
                  <div className="flex-grow flex items-center justify-center">
                    <p className="text-light-1/85 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8B2643] hover:text-[#8B2643]/80 transition-colors">
                    Learn More <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
