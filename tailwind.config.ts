import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFF0F3", // Soft Lavender Blush Pink
        secondary: "#FFE3E8", // Light Rose Pink
        light: {
          1: "#4A1525", // Deep Plum for matching contrast
          2: "#FFFBFB", // Light Card Background
        },
        accent: "#FF758F", // Coral/Rose Pink Accent
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "Sora", "sans-serif"],
      },
      backgroundImage: {
        "premium-gradient": "linear-gradient(135deg, #FFF0F3 0%, #FFE3E8 100%)",
        "glass-gradient": "linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3))",
      },
    },
  },
  plugins: [],
};
export default config;
