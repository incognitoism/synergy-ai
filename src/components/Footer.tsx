"use client";

import { Sparkles, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Footer() {
    return (
        <footer className="relative bg-black border-t border-white/5 px-6 py-20 overflow-hidden">

            {/* Ambient top glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[200px] bg-gradient-to-b from-accent/10 to-transparent blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <div className="grid md:grid-cols-12 gap-12 md:gap-8">

                    {/* BRAND */}
                    <motion.div {...fadeUp(0)} className="md:col-span-6 space-y-5">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-accent-light" />
                            <span className="text-lg font-semibold text-white">
                                Synergy AI Solutions
                            </span>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            A small studio that builds web apps, AI integrations, and
                            automation for startups and growing businesses.
                        </p>

                        <div className="flex items-center gap-3 pt-1">
                            <SocialIcon href="https://github.com" icon={<Github />} />
                            <SocialIcon href="https://linkedin.com" icon={<Linkedin />} />
                            <SocialIcon href="https://twitter.com" icon={<Twitter />} />
                            <SocialIcon href="mailto:hello@yourdomain.com" icon={<Mail />} />
                        </div>
                    </motion.div>

                    {/* NAV LINKS */}
                    <motion.div {...fadeUp(0.1)} className="md:col-span-3">
                        <h3 className="text-xs font-semibold text-white uppercase tracking-[0.2em] mb-5">
                            Pages
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: "Home", href: "/" },
                                { label: "Services", href: "/services" },
                                { label: "Contact", href: "/contact" },
                                { label: "Book a Call", href: "/book" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* LEGAL */}
                    <motion.div {...fadeUp(0.15)} className="md:col-span-3">
                        <h3 className="text-xs font-semibold text-white uppercase tracking-[0.2em] mb-5">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: "Privacy Policy", href: "/legal/privacypolicy" },
                                { label: "Terms of Service", href: "/legal/terms" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <motion.div
                    {...fadeUp(0.25)}
                    className="mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600"
                >
                    <span>© {new Date().getFullYear()} Synergy AI Solutions</span>
                    <span>hello@yourdomain.com</span>
                </motion.div>
            </div>
        </footer>
    );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-slate-500 hover:text-white hover:border-white/[0.12] transition-all duration-300"
        >
            <div className="w-4 h-4">{icon}</div>
        </a>
    );
}
