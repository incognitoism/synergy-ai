"use client";
import { motion } from "framer-motion";
import { Bot, Workflow, BarChart3, Globe, CheckCircle } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: Bot,
        title: "AI Chatbots & Assistants",
        description:
            "Custom chatbots for your website that handle bookings, FAQs, and lead qualification — 24/7, no human needed.",
        price: "From $500",
        features: [
            "Natural language understanding",
            "Multi-platform deployment",
            "CRM & calendar integration",
            "Analytics dashboard",
        ],
    },
    {
        icon: Workflow,
        title: "Workflow Automation",
        description:
            "Connect your CRM, email, invoicing, and scheduling into one seamless automated pipeline using Make, Zapier, or custom code.",
        price: "From $750",
        features: [
            "End-to-end process mapping",
            "Custom API integrations",
            "Error handling & alerts",
            "Ongoing support & optimization",
        ],
    },
    {
        icon: BarChart3,
        title: "Data & Analytics Dashboards",
        description:
            "Turn your messy spreadsheets into live, interactive dashboards that give you real-time visibility into your business.",
        price: "From $600",
        features: [
            "Real-time data syncing",
            "Custom KPI tracking",
            "Automated reporting",
            "Mobile-friendly views",
        ],
    },
    {
        icon: Globe,
        title: "AI-Powered Web Presence",
        description:
            "Modern websites with built-in AI features — smart contact forms, personalized content, and SEO automation.",
        price: "From $900",
        features: [
            "Conversion-optimized design",
            "AI-powered lead capture",
            "SEO automation tools",
            "Performance monitoring",
        ],
    },
];

export default function ServicesPage() {
    return (
        <section className="min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Our <span className="text-gradient">Services</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Every solution is tailored to your business. No templates, no generic
                        setups — just intelligent systems designed around how you actually work.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((s, i) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-xl border border-white/5 bg-dark-800/50 hover:border-accent/20 hover:bg-dark-700/50 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <s.icon className="w-6 h-6 text-accent-light" />
                                </div>
                                <span className="text-sm font-mono text-accent-light bg-accent/5 px-3 py-1 rounded-full">
                                    {s.price}
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{s.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                {s.description}
                            </p>
                            <ul className="space-y-2">
                                {s.features.map((f) => (
                                    <li
                                        key={f}
                                        className="flex items-center gap-2 text-sm text-slate-300"
                                    >
                                        <CheckCircle className="w-4 h-4 text-accent-light flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <p className="text-slate-400 mb-6">
                        Not sure what you need? Let&apos;s figure it out together.
                    </p>
                    <Link
                        href="/book"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent hover:bg-accent-dark transition font-semibold text-white text-lg"
                    >
                        Book a Free Strategy Call
                    </Link>
                </div>
            </div>
        </section>
    );
}
