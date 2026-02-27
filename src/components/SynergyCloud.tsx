"use client";
import { motion } from "framer-motion";
import { Cloud, Shield, Gauge, GitBranch } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const features = [
    { icon: Cloud, label: "Deploy anywhere", desc: "Cloud, on-prem, or hybrid — your infrastructure, your rules." },
    { icon: Shield, label: "Enterprise security", desc: "SOC 2 compliant. Your data never leaves your environment." },
    { icon: Gauge, label: "Real-time monitoring", desc: "Track model performance, latency, and drift from one dashboard." },
    { icon: GitBranch, label: "Version control", desc: "Roll back, A/B test, and iterate on models without downtime." },
];

export default function SynergyCloud() {
    return (
        <section className="py-32 px-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <p className="text-xs tracking-[0.25em] uppercase text-accent-light font-mono mb-4">
                        Platform
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
                        The <span className="text-gradient">Synergy Cloud</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto font-light text-lg">
                        One platform to deploy, manage, and scale every AI model across your organization. No DevOps degree required.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group p-6 rounded-2xl border border-white/[0.04] bg-dark-800/30 hover:border-white/[0.08] transition-all duration-500"
                        >
                            <f.icon className="w-5 h-5 text-slate-500 group-hover:text-accent-light transition-colors duration-500 mb-5" />
                            <h3 className="text-sm font-semibold text-white mb-2">{f.label}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-14"
                >
                    <Link
                        href="/book"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition group"
                    >
                        Request early access
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}