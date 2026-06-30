import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GumGone Pros | Professional Gum Removal Services",
  description: "Commercial gum removal for hotels, retail centers, entertainment venues, and commercial properties in Richmond, VA. Low-moisture, no-runoff, surface-safe. Free evaluation.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "GumGone Pros",
  "description": "Commercial chewing gum removal for businesses and commercial properties. A heated biodegradable solution is applied through a brush nozzle that scrubs gum away as it dissolves — no spray, no pressure washing, no wastewater runoff. Safe for concrete, brick, asphalt, pavers, and other hard commercial surfaces.",
  "telephone": "+1-804-600-3641",
  "email": "info@gumgonepros.com",
  "url": "https://www.gumgonepros.com",
  "slogan": "Cleaner Sidewalks. Better Impressions.",
  "logo": "https://www.gumgonepros.com/images/logo.png",
  "image": "https://www.gumgonepros.com/images/logo.png",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Elevation Property Services LLC"
  },
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "VA",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "City", "name": "Richmond",      "addressRegion": "VA", "addressCountry": "US" },
    { "@type": "City", "name": "Chesterfield",  "addressRegion": "VA", "addressCountry": "US" },
    { "@type": "City", "name": "Henrico",       "addressRegion": "VA", "addressCountry": "US" },
    { "@type": "City", "name": "Midlothian",    "addressRegion": "VA", "addressCountry": "US" },
    { "@type": "City", "name": "Mechanicsville","addressRegion": "VA", "addressCountry": "US" },
    { "@type": "City", "name": "Short Pump",    "addressRegion": "VA", "addressCountry": "US" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
