"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Send, X, Plus, ChevronLeft, ChevronRight, MessageSquare, Heart } from "lucide-react";

type Review = {
  _id: string;
  name: string;
  projectName: string;
  role: string;
  description: string;
  date: string;
};

const initialReviews: Review[] = [];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://shiya-port-backend.onrender.com/api/reviews';

const PeopleSay = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
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

  // Fetch reviews from Backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(API_URL);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setReviews(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch reviews from API, using initial/fallback reviews:", error);
      }
    };
    fetchReviews();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const clientName = formData.name;

    try {
       const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews((prev) => [newReview, ...prev]);
        setIsModalOpen(false);
        setSubmittedName(clientName);
        setIsThankYouOpen(true);
        setFormData({ name: "", projectName: "", role: "", description: "" });
      } else {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("API error, falling back to local simulated submit:", error);
      
      // Fallback local simulation if API is down
      const newReview: Review = {
        _id: Date.now().toString(),
        name: formData.name,
        projectName: formData.projectName,
        role: formData.role,
        description: formData.description,
        date: new Date().toISOString().split('T')[0],
      };

      setReviews((prev) => [newReview, ...prev]);
      setIsModalOpen(false);
      setSubmittedName(clientName);
      setIsThankYouOpen(true);
      setFormData({ name: "", projectName: "", role: "", description: "" });
    } finally {
      setIsSubmitting(false);
    }
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

            {/* View All Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              onClick={() => setIsViewAllOpen(true)}
              className="px-5 py-3 border border-[#8B2643]/20 rounded-full text-xs font-bold uppercase tracking-widest text-[#8B2643] hover:bg-[#8B2643] hover:text-white transition-all bg-white/40 shadow-sm shrink-0 flex items-center gap-2"
            >
              <MessageSquare size={14} /> View All ({reviews.length})
            </motion.button>

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
                      placeholder="e.g. Shiya Pathania"
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
                  <label htmlFor="review-project" className="text-xs font-bold uppercase tracking-widest text-light-1/80 ml-1">Project / Company Name</label>
                  <input
                    required
                    id="review-project"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    type="text"
                    placeholder="e.g. HR Compliance Audit or Company Name"
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

      {/* View All Reviews Modal */}
      <AnimatePresence>
        {isViewAllOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsViewAllOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#FFF0F3] border border-[#8B2643]/20 rounded-3xl w-full max-w-4xl max-h-[85vh] p-6 md:p-8 relative shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsViewAllOpen(false)}
                className="absolute top-6 right-6 text-light-1/60 hover:text-[#8B2643] transition-colors"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#4A1525] via-[#8B2643] to-[#C73E5B] bg-clip-text text-transparent">All Client Reviews</h3>
              <p className="text-light-1/70 text-sm mb-6">See what everyone has to say about their experience working with Shiya.</p>

              <div className="overflow-y-auto flex-grow pr-2 space-y-4 max-h-[60vh] custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((review, idx) => (
                    <div
                      key={review._id || idx}
                      className="bg-white/60 border border-[#8B2643]/10 rounded-2xl p-6 hover:border-[#8B2643]/30 transition-all flex flex-col relative group"
                    >
                      <div className="absolute top-6 right-6 text-[#8B2643]/10">
                        <Quote size={24} />
                      </div>
                      <p className="text-light-1/85 text-xs sm:text-sm leading-relaxed mb-6 italic">
                        "{review.description}"
                      </p>
                      <div className="mt-auto pt-4 border-t border-[#8B2643]/10">
                        <h4 className="text-sm sm:text-base font-bold text-light-1">{review.name}</h4>
                        <p className="text-[10px] text-[#8B2643] uppercase tracking-widest mt-0.5 font-bold">{review.role}</p>
                        <p className="text-[10px] text-light-1/75 mt-0.5 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#8B2643]" />
                          {review.projectName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thank You Confirmation Modal */}
      <AnimatePresence>
        {isThankYouOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsThankYouOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ 
                scale: 1, 
                y: 0, 
                opacity: 1,
                transition: { type: "spring", damping: 20, stiffness: 100 } 
              }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-gradient-to-b from-[#FFF0F3] to-[#FFE3E8] border border-[#8B2643]/30 rounded-3xl w-full max-w-md p-8 text-center relative shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative background glow */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#8B2643]/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#8B2643]/10 rounded-full blur-xl animate-pulse" />

              <button 
                onClick={() => setIsThankYouOpen(false)}
                className="absolute top-4 right-4 text-light-1/40 hover:text-[#8B2643] transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-16 h-16 rounded-full bg-[#8B2643]/10 flex items-center justify-center text-[#8B2643]"
                >
                  <Heart size={32} className="fill-[#8B2643]" />
                </motion.div>
              </div>

              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-extrabold mb-3 text-light-1"
              >
                Thank You, <span className="bg-gradient-to-r from-[#8B2643] to-[#4A1525] bg-clip-text text-transparent">{submittedName}</span>!
              </motion.h3>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-light-1/80 text-sm leading-relaxed mb-6 italic"
              >
                "Your beautiful words and support mean the world to us. Your feedback helps us build trust, improve, and keep delivering exceptional results."
              </motion.p>

              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsThankYouOpen(false)}
                className="btn-primary px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest"
              >
                Close
              </motion.button>
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

