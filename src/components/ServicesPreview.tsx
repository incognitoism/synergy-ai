"use client";
import { motion } from "framer-motion";
import { Bot, Workflow, BarChart3, Globe } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: Bot,
        title: "AI Chatbots & Assistants",
        description: "Custom chatbots for your website that handle bookings, FAQs, and lead qualification — 24/7, no human needed.",
        price: "From $500",
    },
    {
        icon: Workflow,
        title: "Workflow Automation",
        description: "Connect your CRM, email, invoicing, and scheduling into one seamless automated pipeline using Make, Zapier, or custom code.",
        price: "From $750",
    },
    {
        icon: BarChart3,
        title: "Data & Analytics Dashboards",
        description: "Turn your messy spreadsheets into live, interactive dashboards that give you real-time visibility into your business.",
        price: "From $600",
    },
    {
        icon: Globe,
        title: "AI-Powered Web Presence",
        description: "Modern websites with built-in AI features — smart contact forms, personalized content, and SEO automation.",
        price: "From $900",
    },
];

export default function ServicesPreview() {
    return (
        <section className="py-24 px-6 relative">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        What we <span className="text-gradient">build for you</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Every solution is tailored to your business. No templates, no generic setups — just intelligent systems designed around how you actually work.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {services.map((s, i) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-6 rounded-xl border border-white/5 bg-dark-800/50 hover:border-accent/20 hover:bg-dark-700/50 transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition">
                                <s.icon className="w-5 h-5 text-accent-light" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-4">{s.description}</p>
                            <span className="text-sm font-mono text-accent-light">{s.price}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/services"
                        className="text-sm text-accent-light hover:text-white transition"
                    >
                        View full pricing & details →
                    </Link>
                </div>
            </div>
        </section>
    );
}