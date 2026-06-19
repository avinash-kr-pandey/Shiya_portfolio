"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, User } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Bikesh Pandey",
    role: "State Head, Menrol Skills Pvt. Ltd.",
    content: "Shiya demonstrated exceptional skills in HR operations and project coordination. Her attention to detail and ability to manage multiple tasks simultaneously made her an invaluable asset to our team.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&h=150&auto=format&fit=crop"
  },
  {
    name: "Project Manager",
    role: "Slanster Platform",
    content: "Her testing skills brought significant improvements to our web platforms. Shiya's meticulous approach to UI testing helped us identify critical issues before deployment.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop"
  },
  {
    name: "Team Member",
    role: "Menrol Skills Pvt. Ltd.",
    content: "Shiya's training sessions were comprehensive and engaging. She effectively communicated complex SOPs and ensured team members understood and implemented them correctly.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="section-padding bg-white/50 backdrop-blur-md border-y border-white/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 to-transparent opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h4 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#8B2643] font-bold uppercase tracking-[0.3em] text-xs mb-4"
          >
            Success Stories
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Trusted by Leaders
          </motion.h2>
        </div>
 
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="overflow-hidden py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid lg:grid-cols-2 gap-8"
              >
                {[0, 1].map((offset) => {
                  const testimonial = testimonials[(current + offset) % testimonials.length];
                  return (
                    <motion.div
                      key={testimonial.name + offset}
                      whileHover={{ y: -10 }}
                      className={`animated-border-card group hover:shadow-lg transition-all h-full ${
                        offset === 1 ? "hidden lg:block" : ""
                      }`}
                    >
                      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                        <div className="absolute -top-6 right-10 w-12 h-12 bg-[#8B2643] rounded-full flex items-center justify-center text-primary shadow-[0_4px_15px_rgba(139,38,67,0.35)] group-hover:scale-110 transition-transform duration-500">
                          <Quote size={24} fill="currentColor" />
                        </div>
 
                        <div className="flex gap-1 mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < testimonial.stars ? "text-[#8B2643]" : "text-[#8B2643]/15"} 
                              fill={i < testimonial.stars ? "currentColor" : "none"} 
                            />
                          ))}
                        </div>
 
                        <p className="text-base md:text-lg text-light-1/85 italic mb-8 leading-relaxed font-display flex-grow">
                          "{testimonial.content}"
                        </p>
 
                        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[#8B2643]/10">
                          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#8B2643]/20 flex items-center justify-center bg-accent/5 text-[#8B2643] group-hover:border-[#8B2643] transition-colors shrink-0">
                            {testimonial.image ? (
                              <Image 
                                src={testimonial.image} 
                                alt={testimonial.name}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User size={24} />
                            )}
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-light-1 group-hover:text-[#8B2643] transition-colors">{testimonial.name}</h4>
                            <p className="text-xs text-light-1/85 uppercase tracking-widest mt-1">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
 
          {/* Navigation Controls */}
          <div className="flex justify-center gap-6 mt-10">
            <button 
              onClick={prev}
              aria-label="Previous Testimonial"
              className="w-14 h-14 rounded-full border border-[#8B2643]/20 flex items-center justify-center text-light-1 hover:bg-[#8B2643] hover:text-white hover:border-[#8B2643] transition-all group shadow-sm bg-white/40"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={next}
              aria-label="Next Testimonial"
              className="w-14 h-14 rounded-full border border-[#8B2643]/20 flex items-center justify-center text-light-1 hover:bg-[#8B2643] hover:text-white hover:border-[#8B2643] transition-all group shadow-sm bg-white/40"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
 
          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-10 bg-[#8B2643] shadow-[0_0_10px_rgba(139,38,67,0.4)]" : "w-3 bg-[#8B2643]/20 hover:bg-[#8B2643]/45"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
