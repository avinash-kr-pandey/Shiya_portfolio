"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Building2, Globe } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email Me", value: "pathaniashiya@gmail.com" },
  { icon: Phone, label: "Call Me", value: "+91 7876648408" },
  { icon: MapPin, label: "Location", value: "Mohali, Punjab" },
  { icon: Globe, label: "Global Availability", value: "Available Worldwide" },
];

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-white/40 backdrop-blur-md border-t border-white/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-accent/5 blur-[120px] -z-10" />

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Side: Info */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#8B2643] font-bold uppercase tracking-[0.2em] text-sm mb-4"
            >
              Get In Touch
            </motion.h4>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-8 leading-tight bg-gradient-to-r from-[#4A1525] via-[#8B2643] to-[#C73E5B] bg-clip-text text-transparent"
            >
              Let's Discuss Your <br />
              <span className="bg-gradient-to-r from-[#8B2643] to-[#4A1525] bg-clip-text text-transparent font-extrabold">Strategic HR Needs</span>
            </motion.h2>
            <p className="text-light-1/80 text-lg mb-12 max-w-lg">
              Ready to transform your workplace? Fill out the form or reach out directly to schedule a confidential consultation.
            </p>
 
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-12">
              {contactInfo.map((info, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="animated-border-card group flex flex-col transition-all shadow-sm hover:shadow-md"
                >
                  <div className="relative z-10 p-6 flex flex-col gap-4 h-full w-full">
                    <div className="w-12 h-12 rounded-xl bg-accent/5 border border-[#8B2643]/20 flex items-center justify-center text-[#8B2643] group-hover:bg-[#8B2643] group-hover:text-primary transition-colors">
                      <info.icon size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-light-1/75 mb-1">{info.label}</div>
                      <div className="text-light-1 font-bold text-sm md:text-base">{info.value}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
 
          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="animated-border-card"
          >
            <div className="relative z-10 p-6 sm:p-10 md:p-12 w-full h-full">
              <form className="space-y-6 md:space-y-8">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-light-1/85 ml-1">Full Name</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-white/70 border border-[#8B2643]/20 rounded-xl px-5 py-4 text-light-1 placeholder-light-1/60 focus:outline-none focus:ring-2 focus:ring-[#8B2643]/15 focus:border-[#8B2643] transition-all pl-12" 
                      />
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B2643]/60" size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-light-1/85 ml-1">Email Address</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="john@company.com"
                        className="w-full bg-white/70 border border-[#8B2643]/20 rounded-xl px-5 py-4 text-light-1 placeholder-light-1/60 focus:outline-none focus:ring-2 focus:ring-[#8B2643]/15 focus:border-[#8B2643] transition-all pl-12" 
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B2643]/60" size={18} />
                    </div>
                  </div>
                </div>
 
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-light-1/85 ml-1">Company Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Tech Solutions Inc."
                      className="w-full bg-white/70 border border-[#8B2643]/20 rounded-xl px-5 py-4 text-light-1 placeholder-light-1/60 focus:outline-none focus:ring-2 focus:ring-[#8B2643]/15 focus:border-[#8B2643] transition-all pl-12" 
                    />
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B2643]/60" size={18} />
                  </div>
                </div>
 
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-light-1/85 ml-1">Your Message</label>
                  <div className="relative">
                    <textarea 
                      rows={5}
                      placeholder="Tell me about your HR challenges..."
                      className="w-full bg-white/70 border border-[#8B2643]/20 rounded-xl px-5 py-4 text-light-1 placeholder-light-1/60 focus:outline-none focus:ring-2 focus:ring-[#8B2643]/15 focus:border-[#8B2643] transition-all pl-12 resize-none" 
                    />
                    <MessageSquare className="absolute left-4 top-6 text-[#8B2643]/60" size={18} />
                  </div>
                </div>
 
                <button className="btn-primary w-full flex items-center justify-center gap-3 py-4 md:py-5 text-lg shadow-lg hover:shadow-xl shadow-accent/25">
                  Send Message <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
