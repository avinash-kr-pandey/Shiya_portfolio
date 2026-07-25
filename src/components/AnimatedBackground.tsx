"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const AnimatedBackground = () => {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const springConfig = { damping: 40, stiffness: 200, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of the blob size (150px) to keep it centered on the cursor
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20 w-full h-full bg-[#FFF0F3]">
      {/* Cursor Tracking Glow Blob */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-[#8B2643]/8 blur-[80px]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

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
