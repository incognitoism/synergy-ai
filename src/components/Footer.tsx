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

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[200px] bg-gradient-to-b from-accent/10 to-transparent blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto">

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

                        <div className="flex items-center gap-5 pt-2">
                            <SocialIcon href="https://github.com" icon={<Github />} />
                            <SocialIcon href="https://linkedin.com" icon={<Linkedin />} />
                            <SocialIcon href="https://twitter.com" icon={<Twitter />} />
                            <SocialIcon href="mailto:hello@yourdomain.com" icon={<Mail />} />
                        </div>
                    </div>

                    <FooterColumn
                        title="Platform"
                        links={[
                            { label: "AI Infrastructure", href: "/platform/infrastructure" },
                            { label: "Custom LLM Deployment", href: "/platform/llm" },
                            { label: "Agent Orchestration", href: "/platform/agents" },
                            { label: "Vector Databases", href: "/platform/vector-db" },
                            { label: "API Integrations", href: "/platform/integrations" },
                            { label: "Security Architecture", href: "/platform/security" },
                        ]}
                    />

                    <FooterColumn
                        title="Solutions"
                        links={[
                            { label: "Enterprise AI Assistants", href: "/solutions/assistants" },
                            { label: "Workflow Automation", href: "/solutions/automation" },
                            { label: "Decision Intelligence", href: "/solutions/decision-intelligence" },
                            { label: "Predictive Analytics", href: "/solutions/predictive" },
                            { label: "AI Web Platforms", href: "/solutions/web-platforms" },
                            { label: "Internal Knowledge Systems", href: "/solutions/knowledge" },
                        ]}
                    />

                    <FooterColumn
                        title="Company"
                        links={[
                            { label: "About Us", href: "/company/about" },
                            { label: "Case Studies", href: "/company/case-studies" },
                            { label: "Careers", href: "/company/careers" },
                            { label: "Partners", href: "/company/partners" },
                            { label: "Press", href: "/company/press" },
                            { label: "Contact", href: "/company/contact" },
                        ]}
                    />

                    <FooterColumn
                        title="Resources"
                        links={[
                            { label: "Documentation", href: "/resources/docs" },
                            { label: "Insights", href: "/resources/insights" },
                            { label: "Architecture Guides", href: "/resources/guides" },
                            { label: "Security Practices", href: "/resources/security" },
                            { label: "Client Portal", href: "/portal" },
                            { label: "FAQ", href: "/resources/faq" },
                        ]}
                    />

                    <FooterColumn
                        title="Legal"
                        links={[
                            { label: "Privacy Policy", href: "/legal/privacy" },
                            { label: "Terms of Service", href: "/legal/terms" },
                            { label: "Cookie Policy", href: "/legal/cookies" },
                            { label: "Data Processing Agreement", href: "/legal/dpa" },
                            { label: "Compliance", href: "/legal/compliance" },
                            { label: "Accessibility", href: "/legal/accessibility" },
                        ]}
                    />
                </div>

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

/* ---------- Updated FooterColumn ---------- */

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: { label: string; href: string }[];
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
                            href={link.href}
                            className="text-slate-400 hover:text-white transition-colors text-sm"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ---------- Social Icon ---------- */

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
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition"
        >
            <div className="w-5 h-5">{icon}</div>
        </a>
    );
}