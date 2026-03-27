import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Synergy AI Solutions | Web Apps, AI & Automation for Startups",
  description:
    "We're a small studio that builds web apps, AI integrations, and automation for startups and growing businesses. Clean code, modern stack, real results.",
  keywords: ["web development", "AI integration", "startup MVP", "automation", "web apps"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans antialiased bg-dark-900 text-slate-200 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}