"use client";
 
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Target, Heart, Zap } from "lucide-react";
import dynamic from "next/dynamic";

const Glass3DAnimation = dynamic(() => import("./Glass3DAnimation"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square max-w-[420px] mx-auto relative rounded-3xl overflow-hidden border border-white/40 bg-white/30 backdrop-blur-md shadow-[0_20px_50px_rgba(255,117,143,0.1)] flex items-center justify-center text-[#8B2643] font-bold text-sm">
      Loading 3D Experience...
    </div>
  ),
});
 
const highlights = [
  { icon: Target, title: "Mission", desc: "To revolutionize human capital management through data-driven insights and people-first leadership." },
  { icon: Heart, title: "Philosophy", desc: "I believe that an organization's greatest asset is not just its people, but the culture that empowers them." },
  { icon: Zap, title: "Impact", desc: "Consistently delivering strategies that reduce turnover, enhance productivity, and drive growth." },
];
 
const timelineData = [
  { year: "2023 - 2025", event: "MBA (HR) - Govt. PG College, Dharamshala" },
  { year: "2020 - 2023", event: "Bsc (Mathematics) - MCM DAV College, Kangra" },
];
 
const About = () => {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-padding bg-white/50 backdrop-blur-md border-y border-white/40 text-light-1 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: 3D WebGL Canvas */}
          <motion.div
            ref={observerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center min-h-[350px] md:min-h-[420px] w-full"
          >
            {isInView ? <Glass3DAnimation /> : (
              <div className="w-full aspect-square max-w-[420px] mx-auto relative rounded-3xl overflow-hidden border border-white/40 bg-white/30 backdrop-blur-md shadow-[0_20px_50px_rgba(255,117,143,0.1)] flex items-center justify-center text-[#8B2643] font-bold text-sm">
                Loading 3D Experience...
              </div>
            )}
            {/* Decorative Gradients */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-[#8B2643]/15 rounded-[2.5rem] -z-10 translate-x-3 translate-y-3 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
 
          {/* Right: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-[#8B2643] font-bold uppercase tracking-[0.2em] text-sm mb-4">About Me</h4>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight bg-gradient-to-r from-[#4A1525] via-[#8B2643] to-[#C73E5B] bg-clip-text text-transparent">
                Shiya Pathania: <br />
                <span className="bg-gradient-to-r from-[#8B2643] to-[#4A1525] bg-clip-text text-transparent font-extrabold">Driving HR Excellence</span>
              </h2>
              <p className="text-base md:text-lg text-light-1/90 mb-10 leading-relaxed">
                Result-oriented HR & Operations Specialist with extensive experience in the DDU-GKY ecosystem. Proven track record of managing end-to-end project lifecycles, including Financial and Operational closures and representing organizations in SRLM/MoRD audits. A versatile professional who has successfully bridged gaps across HR, MIS, and Quality Assurance functions. Expert in high-volume recruitment for new project launches and maintaining 100% compliance in government-funded skill development programs.
              </p>
 
              <div className="space-y-6 mb-12">
                {highlights.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 border border-[#8B2643]/20 rounded-xl shadow-sm flex items-center justify-center text-[#8B2643]">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-1 text-light-1">{item.title}</h5>
                      <p className="text-sm text-light-1/75">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
 
              {/* Timeline Reveal */}
              <div className="pt-8 border-t border-accent/15">
                <h5 className="font-bold text-xs uppercase tracking-widest mb-6 text-light-1/70">Career Milestone Timeline</h5>
                <div className="relative pl-6 space-y-8">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent/30" />
                  {timelineData.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary border-2 border-[#8B2643]" />
                      <div className="text-xs font-bold text-[#8B2643] mb-1">{item.year}</div>
                      <div className="text-sm font-semibold text-light-1">{item.event}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
 
export default About;
