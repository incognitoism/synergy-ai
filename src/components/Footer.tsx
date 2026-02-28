"use client";

import {
    Sparkles,
    Github,
    Linkedin,
    Mail,
    Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bg-black border-t border-white/5 px-6 py-24">

            {/* Subtle Top Fade */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[200px] bg-gradient-to-b from-accent/10 to-transparent blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto">

                {/* MAIN GRID */}
                <div className="grid lg:grid-cols-6 gap-16">

                    {/* BRAND */}
                    <div className="lg:col-span-2 space-y-6">
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

                        {/* SOCIAL */}
                        <div className="flex items-center gap-5 pt-2">
                            <SocialIcon href="https://github.com" icon={<Github />} />
                            <SocialIcon href="https://linkedin.com" icon={<Linkedin />} />
                            <SocialIcon href="https://twitter.com" icon={<Twitter />} />
                            <SocialIcon href="mailto:hello@yourdomain.com" icon={<Mail />} />
                        </div>
                    </div>

                    {/* PLATFORM */}
                    <FooterColumn
                        title="Platform"
                        links={[
                            "AI Infrastructure",
                            "Custom LLM Deployment",
                            "Agent Orchestration",
                            "Vector Databases",
                            "API Integrations",
                            "Security Architecture",
                        ]}
                    />

                    {/* SOLUTIONS */}
                    <FooterColumn
                        title="Solutions"
                        links={[
                            "Enterprise AI Assistants",
                            "Workflow Automation",
                            "Decision Intelligence",
                            "Predictive Analytics",
                            "AI Web Platforms",
                            "Internal Knowledge Systems",
                        ]}
                    />

                    {/* COMPANY */}
                    <FooterColumn
                        title="Company"
                        links={[
                            "About Us",
                            "Case Studies",
                            "Careers",
                            "Partners",
                            "Press",
                            "Contact",
                        ]}
                    />

                    {/* RESOURCES */}
                    <FooterColumn
                        title="Resources"
                        links={[
                            "Documentation",
                            "Insights",
                            "Architecture Guides",
                            "Security Practices",
                            "Client Portal",
                            "FAQ",
                        ]}
                    />

                    {/* LEGAL */}
                    <FooterColumn
                        title="Legal"
                        links={[
                            "Privacy Policy",
                            "Terms of Service",
                            "Cookie Policy",
                            "Data Processing Agreement",
                            "Compliance",
                            "Accessibility",
                        ]}
                    />

                </div>

                {/* BOTTOM BAR */}
                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">

                    <span>
                        © {new Date().getFullYear()} Synergy AI Solutions. All rights reserved.
                    </span>

                    <div className="flex items-center gap-6">
                        <span>Enterprise-ready AI systems.</span>
                        <span className="text-slate-600">Built for scale.</span>
                    </div>

                </div>
            </div>
        </footer>
    );
}

/* ---------- Reusable Components ---------- */

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: string[];
}) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                {title}
            </h3>
            <ul className="space-y-3">
                {links.map((link, i) => (
                    <li key={i}>
                        <Link
                            href="#"
                            className="text-slate-400 hover:text-white transition-colors text-sm"
                        >
                            {link}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SocialIcon({
    href,
    icon,
}: {
    href: string;
    icon: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            className="text-slate-400 hover:text-white transition"
        >
            <div className="w-5 h-5">{icon}</div>
        </a>
    );
}