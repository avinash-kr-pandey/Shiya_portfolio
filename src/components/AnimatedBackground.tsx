"use client";

import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20 w-full h-full bg-[#FFF0F3]">
      {/* Blob 1 - Soft Rose */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/15 blur-[120px] animate-[float-blob-1_25s_infinite_ease-in-out]" 
      />
      {/* Blob 2 - Light Lavender/Pink */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary/35 blur-[130px] animate-[float-blob-2_30s_infinite_ease-in-out]" 
      />
      {/* Blob 3 - Subtle Contrast Accent */}
      <div 
        className="absolute top-[30%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-accent/10 blur-[120px] animate-[float-blob-3_28s_infinite_ease-in-out]" 
      />
      {/* Blob 4 - Bottom Left Plum Blush */}
      <div 
        className="absolute bottom-[20%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-light-1/5 blur-[140px] animate-[float-blob-2_22s_infinite_ease-in-out]" 
      />
      
      {/* Subtle Dot Grid Overlay for Tech/Professional Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(#4A1525 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
