import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HR Executive | Strategic HR Leadership Portfolio",
  description: "Executive HR professional specializing in talent acquisition, organizational development, and employee relations.",
  keywords: ["HR Executive", "Strategic HR", "Talent Management", "HR Consulting"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${outfit.variable} bg-primary text-light-1`}>
        {children}
      </body>
    </html>
  );
}
