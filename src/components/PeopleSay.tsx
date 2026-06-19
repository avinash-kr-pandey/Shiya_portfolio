"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Send, X, Plus, ChevronLeft, ChevronRight } from "lucide-react";

type Review = {
  _id: string;
  name: string;
  projectName: string;
  role: string;
  description: string;
  date: string;
};

const initialReviews: Review[] = [
  {
    _id: "1",
    name: "John Smith",
    projectName: "HR System Audit & Compliance",
    role: "Operations Manager",
    description: "Shiya provided an incredibly thorough audit of our systems. Her expertise helped us save time and streamline our entire HR workflow efficiently.",
    date: "2025-10-10"
  },
  {
    _id: "2",
    name: "Sarah Lee",
    projectName: "Talent Acquisition Strategy",
    role: "CEO",
    description: "Working with Shiya completely transformed our hiring process. We are now attracting top-tier talent thanks to her strategic sourcing insights.",
    date: "2025-09-28"
  },
  {
    _id: "3",
    name: "Aman Sharma",
    projectName: "DDU-GKY Project Management",
    role: "State Project Head",
    description: "Her command over DDU-GKY guidelines is exceptional. Shiya managed compliance audits flawlessly, leading to 100% successful project closures.",
    date: "2025-08-15"
  }
];

const PeopleSay = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    projectName: "",
    role: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Scroll by 80% of container width for context continuity
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Limit description to ~150 words
    if (name === 'description') {
      const words = value.trim().split(/\s+/).length;
      if (words > 150) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database write delay
    setTimeout(() => {
      const newReview: Review = {
        _id: Date.now().toString(),
        name: formData.name,
        projectName: formData.projectName,
        role: formData.role,
        description: formData.description,
        date: new Date().toLocaleDateString(),
      };

      setReviews((prev) => [newReview, ...prev]);
      setIsModalOpen(false);
      setFormData({ name: "", projectName: "", role: "", description: "" });
      setIsSubmitting(false);

      // Trigger Toast Alert
      setToast({
        show: true,
        message: "Review submitted successfully! Thank you for your feedback.",
      });

      // Auto-hide toast after 4 seconds
      setTimeout(() => {
        setToast((t) => t.message === "Review submitted successfully! Thank you for your feedback." ? { ...t, show: false } : t);
      }, 4000);
    }, 1000);
  };

  return (
    <section id="peoplesay" className="section-padding bg-primary relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-accent/5 blur-[120px] -z-10" />

      <div className="container mx-auto relative z-10 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h4 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#8B2643] font-bold uppercase tracking-[0.3em] text-xs mb-4"
            >
              Client Feedback
            </motion.h4>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-[#4A1525] via-[#8B2643] to-[#C73E5B] bg-clip-text text-transparent"
            >
              People <span className="bg-gradient-to-r from-[#8B2643] to-[#4A1525] bg-clip-text text-transparent font-extrabold">Say</span>
            </motion.h2>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end flex-wrap md:flex-nowrap">
            {/* Slider Navigation Arrows */}
            {reviews.length > 0 && (
              <div className="flex gap-2.5">
                <button 
                  onClick={() => scroll("left")}
                  className="w-10 h-10 rounded-full border border-[#8B2643]/20 flex items-center justify-center text-light-1 hover:bg-[#8B2643] hover:text-white hover:border-[#8B2643] transition-all bg-white/40 shadow-sm"
                  aria-label="Scroll reviews left"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={() => scroll("right")}
                  className="w-10 h-10 rounded-full border border-[#8B2643]/20 flex items-center justify-center text-light-1 hover:bg-[#8B2643] hover:text-white hover:border-[#8B2643] transition-all bg-white/40 shadow-sm"
                  aria-label="Scroll reviews right"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
            
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              onClick={() => setIsModalOpen(true)}
              className="btn-secondary flex items-center gap-2 group text-sm font-bold tracking-widest uppercase shrink-0"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform" /> Write a Review
            </motion.button>
          </div>
        </div>

        {/* Horizontal Scroller for Cards */}
        <div 
          ref={scrollRef}
          className="w-full overflow-x-auto pb-10 hide-scrollbar cursor-grab active:cursor-grabbing scroll-smooth"
        >
          <div className="flex gap-6 min-w-max">
            {reviews.length === 0 ? (
              <div className="w-full text-center py-20 text-light-1/70">
                No reviews yet. Be the first to write one!
              </div>
            ) : (
              reviews.map((review, idx) => (
                <motion.div
                  key={review._id || idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="animated-border-card shrink-0 transition-all relative group"
                >
                  <div className="relative z-10 p-6 md:p-8 flex flex-col h-full w-[290px] sm:w-[320px] md:w-[380px]">
                    <div className="absolute top-6 right-6 text-[#8B2643]/20 group-hover:text-[#8B2643]/40 transition-colors">
                      <Quote size={40} />
                    </div>
                    
                    <p className="text-light-1/85 text-sm leading-relaxed mb-8 flex-grow relative z-10 italic">
                      "{review.description}"
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-[#8B2643]/10 relative z-10">
                      <h4 className="text-base md:text-lg font-bold text-light-1 group-hover:text-[#8B2643] transition-colors">{review.name}</h4>
                      <p className="text-xs text-[#8B2643] uppercase tracking-widest mt-1 font-bold">{review.role}</p>
                      <p className="text-xs text-light-1/75 mt-1 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B2643]" />
                        {review.projectName}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#FFF0F3] border border-[#8B2643]/20 rounded-3xl w-full max-w-xl p-6 md:p-8 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-light-1/60 hover:text-[#8B2643] transition-colors"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-bold mb-2">Share Your Experience</h3>
              <p className="text-light-1/70 text-sm mb-6 md:mb-8">Your feedback will be displayed publicly on this portfolio.</p>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="review-name" className="text-xs font-bold uppercase tracking-widest text-light-1/80 ml-1">Full Name</label>
                    <input 
                      required
                      id="review-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full bg-white/50 border border-[#8B2643]/20 rounded-xl px-4 py-3 text-light-1 focus:outline-none focus:border-[#8B2643] focus:bg-white placeholder-light-1/55 transition-all text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="review-role" className="text-xs font-bold uppercase tracking-widest text-light-1/80 ml-1">Your Role</label>
                    <input 
                      required
                      id="review-role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      type="text" 
                      placeholder="e.g. Project Manager"
                      className="w-full bg-white/50 border border-[#8B2643]/20 rounded-xl px-4 py-3 text-light-1 focus:outline-none focus:border-[#8B2643] focus:bg-white placeholder-light-1/55 transition-all text-sm" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="review-project" className="text-xs font-bold uppercase tracking-widest text-light-1/80 ml-1">Project Name</label>
                  <input 
                    required
                    id="review-project"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    type="text" 
                    placeholder="e.g. Slanster Platform Audit"
                    className="w-full bg-white/50 border border-[#8B2643]/20 rounded-xl px-4 py-3 text-light-1 focus:outline-none focus:border-[#8B2643] focus:bg-white placeholder-light-1/55 transition-all text-sm" 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="review-desc" className="text-xs font-bold uppercase tracking-widest text-light-1/80 ml-1">Review (Max 150 Words)</label>
                  <textarea 
                    required
                    id="review-desc"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your experience working with Shiya..."
                    className="w-full bg-white/50 border border-[#8B2643]/20 rounded-xl px-4 py-3 text-light-1 focus:outline-none focus:border-[#8B2643] focus:bg-white placeholder-light-1/55 transition-all resize-none text-sm" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 text-sm font-bold uppercase tracking-widest"
                >
                  {isSubmitting ? "Submitting..." : (
                    <>Submit Review <Send size={18} /></>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 right-10 z-[110] glass-card px-6 py-4 border border-[#8B2643]/30 bg-white/90 shadow-2xl flex items-center gap-3 rounded-2xl max-w-sm"
          >
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping shrink-0" />
            <div className="text-sm font-bold text-light-1">{toast.message}</div>
            <button 
              onClick={() => setToast({ show: false, message: "" })}
              className="text-light-1/40 hover:text-accent ml-2 text-xs"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PeopleSay;
