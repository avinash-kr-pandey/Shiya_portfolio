"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Star, TrendingUp } from "lucide-react";
import { formatExperience } from "@/utils/experience";

const experiences = [
  {
    company: "Scalin Service Private Limited",
    position: "Talent Acquisition Specialist / HR Recruiter",
    period: "Feb 2026 - Present",
    desc: "Authoritatively manage end-to-end talent acquisition pipelines and strategic sourcing. Screen, interview, and seamlessly onboard high-caliber candidates across diverse domains. Cultivate robust talent pipelines to proactively address evolving organizational workforce needs.",
    metrics: ["Full-Cycle Recruitment", "Workforce Alignment", "Strategic Sourcing"],
    skills: ["Talent Acquisition", "Onboarding", "Sourcing"]
  },
  {
    company: "Menrol Skills Pvt. Ltd.",
    position: "HR-cum-Operations Executive (Full-Time)",
    period: "July 2025 - Feb 2026",
    desc: "Commanded the HR & Operations ecosystem, driving multi-state workflows and managing the employee lifecycle. Strategically revived long-stalled project courses. Primary representative for Financial and Operational Audits. Directed talent acquisition, leave management, and payroll. Deployed the PRN application process and mentored ground mobilization teams.",
    metrics: ["Autonomous Leadership", "Audit Management", "Operational Excellence"],
    skills: ["HR & Operations", "Compliance", "Strategic Initiatives"]
  },
  {
    company: "Menrol Skills Pvt. Ltd.",
    position: "HR-cum-Operations Executive (Intern)",
    period: "Jan 2025 - July 2025",
    desc: "Spearheaded administration of the DDU-GKY Project across two states. Supervised comprehensive candidate documentation and facilitated fluid onboarding. Maintained coordination between faculties and management to enforce strict compliance. Secured a Pre-Placement Offer (PPO) with an exceptional appraisal.",
    metrics: ["Project Orchestration", "Compliance Onboarding", "Cross-Functional Synergy"],
    skills: ["DDU-GKY Project", "Documentation", "Coordination"]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h4 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#8B2643] font-bold uppercase tracking-[0.3em] text-xs mb-4"
          >
            Professional Journey
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Proven Track Record
          </motion.h2>
          <div className="w-20 h-1 bg-[#8B2643] mx-auto rounded-full" />
        </div>
 
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#8B2643]/20 -translate-x-1/2 hidden md:block" />
 
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center justify-between ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-10 md:top-1/2 w-4 h-4 bg-[#8B2643] rounded-full border-4 border-primary z-20 -translate-x-1/2 hidden md:block" />
 
                {/* Content Card */}
                <div className="w-full md:w-[45%]">
                  <div className="animated-border-card group w-full transition-all duration-500 hover:shadow-lg">
                    <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-accent/5 border border-[#8B2643]/15 flex items-center justify-center text-[#8B2643] shrink-0">
                            <Briefcase size={20} />
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-light-1 group-hover:text-[#8B2643] transition-colors">{exp.company}</h3>
                            <p className="text-xs md:text-sm text-[#8B2643] font-bold">{exp.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-light-1/70 font-mono whitespace-nowrap">
                          <Calendar size={14} className="text-[#8B2643]" />
                          {exp.period}
                        </div>
                      </div>
 
                      <p className="text-light-1/85 text-sm mb-6 leading-relaxed">
                        {exp.desc}
                      </p>
 
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {exp.metrics.map((metric, midx) => (
                          <div key={midx} className="flex items-center gap-2 bg-accent/5 border border-accent/10 p-2 rounded-lg">
                            <TrendingUp size={16} className="text-[#8B2643]" />
                            <span className="text-[11px] font-bold text-light-1 uppercase tracking-tighter">{metric}</span>
                          </div>
                        ))}
                      </div>
 
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, sidx) => (
                          <span key={sidx} className="px-3 py-1 bg-white/70 rounded-full text-[10px] font-bold text-[#8B2643] uppercase tracking-widest border border-[#8B2643]/20 transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty space for timeline alignment on desktop */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
