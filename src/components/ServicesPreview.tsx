"use client";

import { motion } from "framer-motion";
import {
    Bot,
    Workflow,
    BarChart3,
    Globe,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: Bot,
        category: "Conversational AI Systems",
        title: "Enterprise AI Assistants",
        description:
            "Private, context-aware AI agents trained on your internal knowledge base.",
        capabilities: [
            "RAG architecture",
            "Custom LLM tuning",
            "CRM integration",
            "Multi-channel deployment",
        ],
        impact: "Reduce support load by 40–70%",
    },
    {
        icon: Workflow,
        category: "Process Automation",
        title: "Intelligent Workflow Orchestration",
        description:
            "AI-driven pipelines connecting CRM, billing, and operational systems.",
        capabilities: [
            "API integrations",
            "Event-driven systems",
            "Agent routing logic",
            "Automation scaling",
        ],
        impact: "Eliminate manual bottlenecks",
    },
    {
        icon: BarChart3,
        category: "Data Intelligence",
        title: "Real-Time Decision Infrastructure",
        description:
            "Live analytics and predictive modeling pipelines for executive insight.",
        capabilities: [
            "Data pipelines",
            "Predictive modeling",
            "KPI dashboards",
            "Forecast systems",
        ],
        impact: "Increase decision velocity",
    },
    {
        icon: Globe,
        category: "Digital Infrastructure",
        title: "AI-Integrated Web Platforms",
        description:
            "Modern web architecture with embedded AI logic and personalization.",
        capabilities: [
            "Next.js architecture",
            "AI personalization",
            "Conversion logic",
            "Performance engineering",
        ],
        impact: "Increase qualified inbound",
    },
];

export default function ServicesPreview() {
    return (
        <section className="py-28 px-6 relative">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="max-w-3xl mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        AI Systems & Infrastructure
                        <br />
                        <span className="text-gradient">
                            Built for Operational Leverage
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        We engineer intelligent systems that integrate directly into your
                        workflows — driving measurable efficiency and strategic advantage.
                    </p>
                </div>

                {/* Dynamic Grid */}
                <div className="grid md:grid-cols-2 gap-10">

                    {services.map((s, i) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -6 }}
                            className="group relative rounded-2xl border border-white/10 bg-dark-800/40 p-8 overflow-hidden transition-all duration-300"
                        >

                            {/* Animated Border Sweep */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500">
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-accent/40 to-transparent blur-xl animate-pulse" />
                                </div>
                            </div>

                            {/* Radial Glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_70%)]" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">

                                {/* Top */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="relative w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition">
                                        <s.icon className="w-6 h-6 text-accent-light" />
                                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-light animate-pulse" />
                                    </div>

                                    <span className="text-xs uppercase tracking-widest text-slate-500">
                                        {s.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {s.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    {s.description}
                                </p>

                                {/* Capabilities */}
                                <ul className="space-y-2 mb-6">
                                    {s.capabilities.map((c, idx) => (
                                        <li
                                            key={idx}
                                            className="text-sm text-slate-300 flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent-light" />
                                            {c}
                                        </li>
                                    ))}
                                </ul>

                                {/* Bottom */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <span className="text-sm font-mono text-accent-light">
                                        {s.impact}
                                    </span>

                                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition" />
                                </div>

                            </div>
                        </motion.div>
                    ))}

                </div>

                {/* CTA */}
                <div className="mt-24 text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white hover:border-accent/40 hover:bg-accent/10 transition-all duration-300"
                    >
                        Explore Full Service Architecture
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>
        </section>
    );
}