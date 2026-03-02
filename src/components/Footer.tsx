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
        <footer className="relative bg-black border-t border-white/5 px-6 py-24 overflow-hidden">

            {/* Ambient top glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[200px] bg-gradient-to-b from-accent/10 to-transparent blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-6 gap-16">

                    {/* BRAND */}
                    <motion.div {...fadeUp(0)} className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-accent-light" />
                            <span className="text-lg font-semibold text-white">
                                Synergy AI Solutions
                            </span>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                            AI infrastructure studio building intelligent systems,
                            automation architecture, and custom large language model
                            deployments for forward-thinking enterprises.
                        </p>

                        <div className="flex items-center gap-5 pt-2">
                            <SocialIcon href="https://github.com" icon={<Github />} />
                            <SocialIcon href="https://linkedin.com" icon={<Linkedin />} />
                            <SocialIcon href="https://twitter.com" icon={<Twitter />} />
                            <SocialIcon href="mailto:hello@yourdomain.com" icon={<Mail />} />
                        </div>
                    </motion.div>



                    <FooterColumn title="Solutions" delay={0.1} links={[
                        { label: "Enterprise AI Assistants", href: "/solutions/assistants" },
                        { label: "Workflow Automation", href: "/solutions/automation" },
                        { label: "Decision Intelligence", href: "/automation" },
                        { label: "Predictive Analytics", href: "/solutions/predictive" },
                        { label: "AI Web Platforms", href: "/solutions/web-platforms" },
                        { label: "Internal Knowledge Systems", href: "/solutions/knowledge" },
                    ]} />

                    <FooterColumn title="Company" delay={0.15} links={[
                        { label: "About Us", href: "/company/about" },
                        { label: "Case Studies", href: "/company/case-studies" },
                        { label: "Careers", href: "/company/careers" },
                        { label: "Partners", href: "/company/partners" },
                        { label: "Press", href: "/company/press" },
                        { label: "Contact", href: "/company/contact" },
                    ]} />

                    <FooterColumn title="Resources" delay={0.2} links={[
                        { label: "Documentation", href: "/resources/docs" },
                        { label: "Insights", href: "/insights" },
                        { label: "Architecture Guides", href: "/resources/guides" },
                        { label: "Security Practices", href: "/resources/security" },
                        { label: "Client Portal", href: "/portal" },
                        { label: "FAQ", href: "/resources/faq" },
                    ]} />

                    <FooterColumn title="Legal" delay={0.25} links={[
                        { label: "Privacy Policy", href: "/legal/privacypolicy" },
                        { label: "Terms of Service", href: "/legal/terms" },
                        { label: "Cookie Policy", href: "/legal/cookies" },
                        { label: "Data Processing Agreement", href: "/legal/dpa" },
                        { label: "Compliance", href: "/legal/compliance" },
                        { label: "Accessibility", href: "/legal/accessibility" },
                    ]} />
                </div>

                {/* Bottom bar */}
                <motion.div
                    {...fadeUp(0.3)}
                    className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500"
                >
                    <span>© {new Date().getFullYear()} Synergy AI Solutions. All rights reserved.</span>
                    <div className="flex items-center gap-6">
                        <span>Enterprise-ready AI systems.</span>
                        <span className="text-slate-600">Built for scale.</span>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}

function FooterColumn({
    title,
    links,
    delay,
}: {
    title: string;
    links: { label: string; href: string }[];
    delay?: number;
}) {
    return (
        <motion.div {...fadeUp(delay)} className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                {title}
            </h3>
            <ul className="space-y-3">
                {links.map((link, i) => (
                    <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (delay ?? 0) + i * 0.04, duration: 0.4, ease: "easeOut" }}
                    >
                        <Link
                            href={link.href}
                            className="group relative text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1.5"
                        >
                            <span className="absolute -left-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-accent-light text-[10px]">›</span>
                            {link.label}
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="text-slate-500 hover:text-white transition-colors duration-200"
        >
            <div className="w-5 h-5">{icon}</div>
        </motion.a>
    );
}