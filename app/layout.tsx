import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-sans",
});

const title = "Insurance Claim Roof Repair in Lakewood, Aurora & Littleton | RUCA";
const description =
  "Storm or hail damage? RUCA Consulting & Construction handles your insurance claim and repairs your roof. Free, often same-day inspections in Lakewood, Aurora, and Littleton, CO. Call 720-927-6697.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-roof-damage.jpg",
        width: 722,
        height: 984,
        alt: "Storm-damaged roof — RUCA Consulting & Construction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to main content
        </a>
        {children}
        <JsonLd />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
