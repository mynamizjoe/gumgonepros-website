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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Does gum removal damage concrete, brick, or pavers?", "acceptedAnswer": { "@type": "Answer", "text": "No. We apply a heated biodegradable solution through a brush nozzle that gently scrubs the gum away as it dissolves — there's no spray and no pressure washing. This lifts gum without eroding the surface, unlike high-heat pressure washing, which can wear down the top layer of concrete over time. Our process is safe for concrete, brick, asphalt, pavers, and other hard commercial surfaces." } },
    { "@type": "Question", "name": "Is there wastewater runoff or drainage compliance to consider?", "acceptedAnswer": { "@type": "Answer", "text": "No. Our process uses minimal water and produces no wastewater runoff, so there are no drainage or discharge concerns. This makes it a cleaner, lower-liability option than pressure washing, which generates significant runoff that often must be contained or managed." } },
    { "@type": "Question", "name": "Will the service disrupt my tenants, customers, or operations?", "acceptedAnswer": { "@type": "Answer", "text": "No. We work cleanly with no hoses, no spray, and no mess — and no traffic cones or blocked walkways. Our equipment operates quietly, with minimal sound that won't disrupt your tenants or customers, and we can schedule around your operating hours, including early mornings or evenings." } },
    { "@type": "Question", "name": "How is this different from pressure washing?", "acceptedAnswer": { "@type": "Answer", "text": "Pressure washing can remove gum, but it requires high heat and aggressive spray that erodes the top layer of concrete and other surfaces over time, and it creates significant water, mess, and runoff. We use a heated solution applied through a brush nozzle that scrubs the gum away as it dissolves — protecting the surface, leaving no runoff, and avoiding disruption to your property." } },
    { "@type": "Question", "name": "Will gum removal get my surface 100% clean?", "acceptedAnswer": { "@type": "Answer", "text": "Fresh gum is removed completely. Gum that has been left for a long time can leave a faint \"shadow\" — this happens when oils from the gum penetrate the concrete over time, creating a stain beneath where the gum sat. The longer gum remains, the higher the chance of permanent shadowing, which is why we recommend routine removal (at least quarterly) to protect your surfaces before staining sets in. During your free evaluation, we'll assess your surfaces and set clear expectations." } },
    { "@type": "Question", "name": "How often should gum removal be done?", "acceptedAnswer": { "@type": "Answer", "text": "For most commercial properties, quarterly service keeps walkways consistently clean and helps prevent permanent shadow staining. High-traffic locations — entertainment venues, busy retail centers, and hospitality properties — may benefit from monthly maintenance due to faster gum accumulation." } },
    { "@type": "Question", "name": "Do you offer recurring maintenance plans?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We offer recurring maintenance plans (monthly or quarterly) priced lower than one-time service. After an initial deep clean, ongoing visits keep your property consistently clean and are faster and more cost-effective over time." } },
    { "@type": "Question", "name": "What surfaces and areas do you service?", "acceptedAnswer": { "@type": "Answer", "text": "We service exterior walkways, entrances, sidewalks, courtyards, and curbs, on concrete, brick, asphalt, pavers, and other hard commercial surfaces. We also handle interior hard floors and carpeted areas for indoor venues." } },
    { "@type": "Question", "name": "Do you service indoor surfaces and carpets?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We use a quiet, low-moisture process suited for indoor spaces, making us a good fit for entertainment venues, trampoline parks, and family-focused facilities where gum accumulates on floors and carpets." } },
    { "@type": "Question", "name": "Do you remove anything besides gum?", "acceptedAnswer": { "@type": "Answer", "text": "While chewing gum removal is our specialty, our process also removes other sticky residue, food stains, and similar surface marks. We're happy to assess any problem areas during your free evaluation." } },
    { "@type": "Question", "name": "Are you insured?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. GumGone Pros carries general liability insurance, and a Certificate of Insurance is available on request for property managers and ownership groups." } },
    { "@type": "Question", "name": "What does commercial gum removal cost?", "acceptedAnswer": { "@type": "Answer", "text": "Pricing depends on the size of the area, gum density, and service frequency. We offer one-time deep cleans and discounted recurring maintenance plans. Every quote starts with a free on-site evaluation, so you get accurate pricing for your specific property." } },
    { "@type": "Question", "name": "How long does a typical job take?", "acceptedAnswer": { "@type": "Answer", "text": "Job time depends on the size of the area and how much gum is present. A typical storefront entrance or walkway section is often completed in 1 to 2 hours. Heavily trafficked areas with years of buildup take longer on the first visit, while ongoing maintenance visits are much faster. During your free evaluation, we'll give you an accurate time estimate." } }
  ]
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
