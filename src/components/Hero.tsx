"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Linkedin, Twitter, Mail, Award, Users, Briefcase, TrendingUp } from "lucide-react";
import { formatExperience } from "@/utils/experience";
import Image from "next/image";
import shiyaImg from "@/assets/images/shiyaimage.jpg";

const Hero = () => {
  const [expText, setExpText] = useState("Loading...");

  useEffect(() => {
    setExpText(formatExperience("2025-01-01"));
  }, []);

  const stats = [
    { icon: Award, label: `${expText} Experience`, value: "Expertise" },
    { icon: Users, label: "500+ Hires", value: "Successful" },
    { icon: TrendingUp, label: "95% Employee Retention", value: "Impact" },
    { icon: Briefcase, label: "50+ Corporate Clients", value: "Trusted" },
  ];

  const socialLinks = [
    { Icon: Linkedin, href: "https://www.linkedin.com/in/shiya-pathania-1248702b4/?_l=en_US" },
    { Icon: Twitter, href: "#" },
    { Icon: Mail, href: "mailto:pathaniashiya@gmail.com" },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-premium-gradient opacity-20 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/2 bg-accent/10 blur-[100px]" />

      <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6 animate-fade-in">
            <span className="w-2.5 h-2.5 bg-[#8B2643] rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B2643]">Available for Strategic Consulting</span>
          </div>
 
          <div className="mb-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl block mb-4 font-display italic bg-gradient-to-r from-[#4A1525] to-[#8B2643] bg-clip-text text-transparent"
              style={{ fontFamily: 'Georgia, serif', fontWeight: 900 }}
            >
              Shiya Pathania
            </motion.span>
            <h1 className="text-3xl sm:text-4.5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-[#4A1525] via-[#8B2643] to-[#B53551] bg-clip-text text-transparent">
              Turning <span className="bg-gradient-to-r from-[#8B2643] to-[#4A1525] bg-clip-text text-transparent font-extrabold">Operational Challenges</span> <br />
              into Scalable <br />
              <span className="bg-gradient-to-r from-[#8B2643] to-[#4A1525] bg-clip-text text-transparent font-extrabold">Success.</span>
            </h1>
          </div>
 
          <p className="text-base md:text-lg text-light-1/85 mb-8 max-w-xl leading-relaxed">
            From leading national-level projects like DDU-GKY to handling critical audits, I leverage 360-degree HR expertise to acquire top talent and accelerate business growth.
          </p>
 
          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#contact" className="btn-primary flex items-center gap-2">
              Get Started <ChevronRight size={20} />
            </a>
            <a href="#experience" className="btn-secondary">View My Journey</a>
          </div>
 
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 md:mb-0">
            <span className="text-xs font-bold text-light-1/70 uppercase tracking-widest">Follow Professional Insights:</span>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href }, idx) => (
                <a key={idx} href={href} target={href.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-secondary/20 text-light-1/75 hover:text-[#8B2643] hover:border-[#8B2643] transition-all bg-white/40">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Stats Display on Mobile */}
          <div className="grid grid-cols-2 gap-4 mt-8 md:hidden">
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-card p-4 flex items-center gap-3 border border-white/50 bg-white/50">
                <div className="w-9 h-9 bg-accent/15 rounded-lg flex items-center justify-center text-[#8B2643] shrink-0">
                  <stat.icon size={18} />
                </div>
                <div>
                  <div className="text-base font-bold text-[#4A1525] leading-none">{stat.label.split(' ')[0]}</div>
                  <div className="text-[9px] uppercase text-[#8B2643] font-bold tracking-wider mt-1">{stat.label.split(' ').slice(1).join(' ')}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
 
        {/* Right Content - Visuals */}
        <div className="relative mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="relative w-full aspect-[4/5] max-w-sm sm:max-w-md mx-auto flex items-end justify-center rounded-[2.5rem] overflow-hidden border border-white/40 shadow-[0_0_50px_rgba(182,182,213,0.15)] bg-gradient-to-b from-white/20 to-transparent p-2 group">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                <Image
                  src={shiyaImg}
                  alt="Shiya Pathania - HR Professional"
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
            </div>
 
            {/* Floating Stats Cards - Desktop Only */}
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                className={`absolute glass-card p-4 flex items-center gap-4 hidden md:flex ${idx === 0 ? "-top-6 -left-6" :
                  idx === 1 ? "top-1/4 -right-10" :
                    idx === 2 ? "bottom-1/4 -left-12" :
                      "bottom-0 -right-6"
                  }`}
              >
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center text-[#8B2643]">
                  <stat.icon size={20} />
                </div>
                <div>
                  <div className="text-lg font-bold text-light-1 leading-none">{stat.label.split(' ')[0]}</div>
                  <div className="text-[10px] uppercase text-[#8B2643] font-bold tracking-wider">{stat.label.split(' ').slice(1).join(' ')}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/5 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
