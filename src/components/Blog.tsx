"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, User } from "lucide-react";

const blogPosts = [
  {
    title: "Best Practices in HR Operations for Skill Development",
    category: "Operations",
    date: "Oct 15, 2025",
    author: "Shiya Pathania",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop",
    desc: "Exploring effective strategies for managing HR operations in government skill development initiatives like DDU-GKY."
  },
  {
    title: "Manual UI Testing: A Comprehensive Guide",
    category: "Testing",
    date: "Sep 28, 2025",
    author: "Shiya Pathania",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    desc: "A step-by-step guide to effective manual UI testing, covering methodologies, tools, and best practices."
  },
  {
    title: "Effective SOP Training for Compliance",
    category: "Training",
    date: "Aug 12, 2025",
    author: "Shiya Pathania",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    desc: "Strategies for creating engaging and effective SOP training sessions that ensure team compliance and understanding."
  }
];

const Blog = () => {
  return (
    <section id="blog" className="section-padding bg-light-2/70 text-light-1 border-t border-accent/15">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.h4 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#8B2643] font-bold uppercase tracking-[0.2em] text-sm mb-4"
            >
              HR Insights
            </motion.h4>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-[#4A1525] via-[#8B2643] to-[#C73E5B] bg-clip-text text-transparent"
            >
              Latest Professional <span className="bg-gradient-to-r from-[#8B2643] to-[#4A1525] bg-clip-text text-transparent font-extrabold">Articles</span>
            </motion.h2>
          </div>
          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="btn-secondary"
          >
            View All Insights
          </motion.button>
        </div>
 
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="animated-border-card group flex flex-col transition-all duration-500 shadow-sm hover:shadow-lg"
            >
              <div className="relative z-10 flex flex-col h-full overflow-hidden rounded-[22px]">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-primary/95 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-[#8B2643] shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
 
                <div className="p-8 flex flex-col flex-grow bg-white/40 backdrop-blur-md">
                  <div className="flex items-center gap-6 mb-4 text-[11px] font-bold text-light-1/75 uppercase tracking-tighter">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#8B2643]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={14} className="text-[#8B2643]" />
                      {post.author}
                    </span>
                  </div>
 
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[#8B2643] transition-colors text-light-1">
                    {post.title}
                  </h3>
                  
                  <p className="text-light-1/80 text-sm leading-relaxed mb-8">
                    {post.desc}
                  </p>
 
                  <div className="mt-auto">
                    <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-light-1 group-hover:text-[#8B2643] transition-colors">
                      Read Article <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform text-[#8B2643]" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
