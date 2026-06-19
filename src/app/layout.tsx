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
  metadataBase: new URL("https://pathaniashiya.vercel.app"),
  title: {
    default: "Shiya Pathania | Strategic HR Leader & Operations Specialist",
    template: "%s | Shiya Pathania"
  },
  description: "Executive HR & Operations professional specializing in talent acquisition, organizational development, DDU-GKY compliance, and employee relations.",
  keywords: [
    "Shiya Pathania", "HR Executive", "Strategic HR", "Talent Acquisition", 
    "Operations Specialist", "DDU-GKY", "SOP Training", "HR Compliance", 
    "Talent Management", "HR Consulting", "HR Portfolio"
  ],
  authors: [{ name: "Shiya Pathania" }],
  creator: "Shiya Pathania",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "-SQaHgoILEboymvL2z6nGKfnPs-QL1jHjAg8G0tBzU0",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pathaniashiya.vercel.app",
    title: "Shiya Pathania | Strategic HR Leader & Operations Specialist",
    description: "Executive HR & Operations professional specializing in talent acquisition, organizational development, DDU-GKY compliance, and employee relations.",
    siteName: "Shiya Pathania Portfolio",
    images: [
      {
        url: "/assets/shiyaimage.webp",
        width: 819,
        height: 1024,
        alt: "Shiya Pathania - HR Executive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiya Pathania | Strategic HR Leader & Operations Specialist",
    description: "Executive HR & Operations professional specializing in talent acquisition, organizational development, DDU-GKY compliance, and employee relations.",
    images: ["/assets/shiyaimage.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://pathaniashiya.vercel.app/#person",
      "name": "Shiya Pathania",
      "url": "https://pathaniashiya.vercel.app",
      "jobTitle": "HR & Operations Specialist",
      "sameAs": [
        "https://www.linkedin.com/in/shiya-pathania-1248702b4/"
      ],
      "image": "https://pathaniashiya.vercel.app/assets/shiyaimage.webp",
      "knowsAbout": [
        "Human Resources Management",
        "Talent Sourcing & Recruitment",
        "DDU-GKY Compliance",
        "Standard Operating Procedures (SOP)",
        "Manual UI Testing",
        "Operations Leadership"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://pathaniashiya.vercel.app/#website",
      "url": "https://pathaniashiya.vercel.app",
      "name": "Shiya Pathania Portfolio",
      "description": "Strategic HR Leadership Portfolio",
      "publisher": {
        "@id": "https://pathaniashiya.vercel.app/#person"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://pathaniashiya.vercel.app/#organization",
      "name": "Shiya Pathania Consulting",
      "url": "https://pathaniashiya.vercel.app",
      "logo": "https://pathaniashiya.vercel.app/assets/shiyaimage.webp"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${outfit.variable} bg-primary text-light-1`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
