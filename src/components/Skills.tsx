"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Briefcase, Users, Wrench, Bug } from "lucide-react";

const skillsData = [
  {
    id: "professional",
    label: "Professional Skills",
    icon: Briefcase,
    skills: [
      { name: "Strategic Sourcing & Recruitment", level: 95 },
      { name: "Project Management (DDU-GKY)", level: 95 },
      { name: "Government Audits & Compliance", level: 92 },
      { name: "Data Management & MIS", level: 90 },
      { name: "Training Coordination (e-SOP)", level: 88 },
      { name: "Operating Efficiency", level: 90 },
      { name: "Scheduling Coordination", level: 85 },
      { name: "Written Communication", level: 90 },
    ]
  },
  {
    id: "interpersonal",
    label: "Interpersonal Skills",
    icon: Users,
    skills: [
      { name: "Team Collaboration", level: 95 },
      { name: "Communication Skills", level: 90 },
      { name: "Grievance Handling", level: 92 },
      { name: "Problem Solving", level: 90 },
      { name: "Conflict Management", level: 88 },
      { name: "Time Management", level: 95 },
      { name: "Attention to Detail", level: 92 },
      { name: "Stakeholder Management", level: 90 },
    ]
  },
  {
    id: "tools",
    label: "Tools & Technologies",
    icon: Wrench,
    skills: [
      { name: "Kaushal Bharat Portal", level: 95 },
      { name: "AEBAS System", level: 90 },
      { name: "Microsoft Excel (Advanced)", level: 95 },
      { name: "Google Sheets & Workspace", level: 90 },
      { name: "MS Word & PowerPoint", level: 88 },
      { name: "Gmail & Communications", level: 95 },
    ]
  },
  {
    id: "testing",
    label: "Testing Skills",
    icon: Bug,
    skills: [
      { name: "Manual UI Testing", level: 95 },
      { name: "Functional Testing", level: 92 },
      { name: "Usability Testing", level: 90 },
      { name: "Cross-browser Testing", level: 88 },
      { name: "Test Case Creation", level: 85 },
      { name: "Bug Reporting & Tracking", level: 90 },
      { name: "Regression Testing", level: 85 },
    ]
  }
];

const certifications = [
  {
    title: "E-SOP Master Trainer",
    issuer: "Certified Master Level",
    file: null
  },
  {
    title: "Organizational Behavior",
    issuer: "Swayam",
    file: "/assets/swayam_certificate.pdf"
  },
  {
    title: "Project Management",
    issuer: "Great Learning",
    file: "/assets/Project_Management.pdf"
  },
  {
    title: "Excel for Beginners",
    issuer: "Great Learning",
    file: "/assets/Excel_Completion.pdf"
  }
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState(skillsData[0].id);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  return (
    <section id="skills" className="section-padding bg-primary overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#8B2643] font-bold uppercase tracking-[0.3em] text-xs mb-4"
          >
            Capabilities
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Professional Competencies
          </motion.h2>
          <p className="max-w-2xl mx-auto text-light-1/80 text-base md:text-lg">
            A comprehensive blend of technical HR mastery, rigorous quality testing, and strategic leadership.
          </p>
        </div>
 
        {/* Custom Tabbed UI */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {skillsData.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider md:tracking-widest transition-all ${
                    isActive 
                      ? "text-white bg-[#8B2643]" 
                      : "text-light-1 bg-white/60 border border-[#8B2643]/15 hover:bg-white/90"
                    }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 rounded-full shadow-[0_4px_20px_rgba(139,38,67,0.25)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
 
          <div className="glass-card p-6 md:p-10 min-h-[350px] md:min-h-[400px]">
            <AnimatePresence mode="wait">
              {skillsData.map((category) => {
                if (category.id !== activeTab) return null;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-24 gap-y-8 md:gap-y-10"
                  >
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="w-full min-w-0 pr-0">
                        <div className="flex justify-between items-center mb-2.5">
                          <span className="text-light-1 font-semibold truncate mr-4 text-sm md:text-base">{skill.name}</span>
                          <span className="text-[#8B2643] font-mono text-sm shrink-0 font-bold">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-accent/10 border border-accent/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            style={{ originX: 0, width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: sIdx * 0.05 }}
                            className="h-full bg-gradient-to-r from-[#8B2643]/70 to-[#8B2643] relative"
                          >
                            <div className="absolute top-0 right-0 w-2 h-full bg-white blur-[2px]" />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
 
        {/* Certifications Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-light-1 mb-4">Certifications & Achievements</h3>
            <div className="w-12 h-1 bg-[#8B2643] mx-auto rounded-full" />
          </div>
 
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => (
              <motion.button
                key={idx}
                onClick={() => cert.file && setSelectedCert(cert.file)}
                whileHover={{ y: -5 }}
                className={`animated-border-card group transition-all text-center shadow-sm hover:shadow-md ${cert.file ? 'cursor-pointer' : 'cursor-default opacity-90'}`}
              >
                <div className="relative z-10 p-6 flex flex-col items-center justify-center gap-4 h-full w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8B2643]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 rounded-full bg-[#8B2643]/10 border border-[#8B2643]/20 flex items-center justify-center text-[#8B2643]">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-light-1 mb-1 group-hover:text-[#8B2643] transition-colors">{cert.title}</h4>
                    <p className="text-xs text-light-1/80 uppercase tracking-wider">{cert.issuer}</p>
                  </div>
 
                  {cert.file ? (
                    <div className="absolute top-4 right-4 text-light-1/30 group-hover:text-[#8B2643] transition-colors">
                      <ExternalLink size={16} />
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4">
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-[#8B2643]/15 text-[#8B2643] px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#111111] w-full h-full md:w-[95vw] md:h-[95vh] md:rounded-2xl max-w-7xl overflow-hidden flex flex-col relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-5 border-b border-white/10 bg-black/50">
                <h3 className="text-white font-bold tracking-widest uppercase text-sm">Certificate Viewer</h3>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 bg-white">
                <iframe
                  src={selectedCert}
                  className="w-full h-full border-none"
                  title="Certificate Viewer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
