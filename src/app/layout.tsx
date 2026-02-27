import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Synergy AI Solutions | AI Consulting & Business Automation",
  description:
    "We help businesses automate workflows, integrate AI, and scale operations. From chatbots to full automation pipelines — we build intelligent systems that save you time and money.",
  keywords: ["AI consulting", "business automation", "AI integration", "chatbot", "workflow automation"],
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