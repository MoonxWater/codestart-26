import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeStart '26 — Your First Steps Into Programming",
  description:
    "Interactive onboarding experience for the 2026 incoming batch of the college programming club. Discover computational thinking and Binary Search through play.",
  keywords: [
    "CodeStart 2026",
    "Programming Club",
    "Onboarding",
    "Binary Search",
    "Interactive Game",
    "Algorithm Intuition",
  ],
  authors: [{ name: "Seraj Muneer Faridy" }],
};

export const viewport: Viewport = {
  themeColor: "#090d16",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
