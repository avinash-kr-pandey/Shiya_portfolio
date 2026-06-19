import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10" />
      
      <div className="glass-card max-w-lg w-full p-8 md:p-12 text-center border border-white/50 bg-white/60 shadow-xl flex flex-col items-center">
        <div className="w-20 h-20 bg-accent/15 rounded-3xl flex items-center justify-center text-[#8B2643] mb-8 animate-bounce">
          <Compass size={40} />
        </div>
        
        <h1 className="text-8xl font-black mb-4 bg-gradient-to-r from-[#4A1525] via-[#8B2643] to-[#C73E5B] bg-clip-text text-transparent font-display">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-light-1 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-light-1/75 text-sm md:text-base leading-relaxed mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
        </p>
        
        <Link 
          href="/" 
          className="btn-primary inline-flex items-center gap-3"
        >
          <ArrowLeft size={18} />
          Back to Portfolio
        </Link>
      </div>
    </main>
  );
}
