"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Send, X, Plus } from "lucide-react";

// The backend URL. In production, this should point to your Render URL.
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

type Review = {
  _id?: string;
  name: string;
  projectName: string;
  role: string;
  description: string;
  date?: string;
};

const PeopleSay = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    projectName: "",
    role: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/reviews?t=${Date.now()}`, {
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Limit description to ~150 words
    if (name === 'description') {
      const words = value.trim().split(/\s+/).length;
      if (words > 150) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${BACKEND_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews([newReview, ...reviews]);
        setIsModalOpen(false);
        setFormData({ name: "", projectName: "", role: "", description: "" });
      } else {
        const errData = await res.json();
        setError(errData.message || "Failed to submit review.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-primary relative overflow-hidden">
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
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            onClick={() => setIsModalOpen(true)}
            className="btn-secondary flex items-center gap-2 group text-sm font-bold tracking-widest uppercase"
          >
            <Plus size={16} className="group-hover:rotate-90 transition-transform" /> Write a Review
          </motion.button>
        </div>

        {/* Horizontal Scroller for Cards */}
        <div className="w-full overflow-x-auto pb-10 hide-scrollbar cursor-grab active:cursor-grabbing">
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
                    <label className="text-xs font-bold uppercase tracking-widest text-light-1/80 ml-1">Full Name</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full bg-white/50 border border-[#8B2643]/20 rounded-xl px-4 py-3 text-light-1 focus:outline-none focus:border-[#8B2643] focus:bg-white placeholder-light-1/55 transition-all text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-light-1/80 ml-1">Your Role</label>
                    <input 
                      required
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
                  <label className="text-xs font-bold uppercase tracking-widest text-light-1/80 ml-1">Project Name</label>
                  <input 
                    required
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    type="text" 
                    placeholder="e.g. Slanster Platform Audit"
                    className="w-full bg-white/50 border border-[#8B2643]/20 rounded-xl px-4 py-3 text-light-1 focus:outline-none focus:border-[#8B2643] focus:bg-white placeholder-light-1/55 transition-all text-sm" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-light-1/80 ml-1">Review (Max 150 Words)</label>
                  <textarea 
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your experience working with Shiya..."
                    className="w-full bg-white/50 border border-[#8B2643]/20 rounded-xl px-4 py-3 text-light-1 focus:outline-none focus:border-[#8B2643] focus:bg-white placeholder-light-1/55 transition-all resize-none text-sm" 
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

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

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default PeopleSay;
