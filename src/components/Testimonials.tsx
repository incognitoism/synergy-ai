"use client";
import { motion } from "framer-motion";
import { Database, Cpu, Zap, LayoutDashboard } from "lucide-react";

const layers = [
    {
        icon: Database,
        title: "Your Data",
        desc: "CRM, spreadsheets, booking tools, emails, operations data.",
    },
    {
        icon: Cpu,
        title: "AI Core",
        desc: "Custom-trained intelligence layer designed for your workflows.",
    },
    {
        icon: Zap,
        title: "Automation Engine",
        desc: "Smart triggers, decision systems, and real-time processing.",
    },
    {
        icon: LayoutDashboard,
        title: "Unified Interface",
        desc: "Dashboards, alerts, chat interfaces, and reporting tools.",
    },
];

export default function Architecture() {
    return (
        <section className="relative py-32 px-6 bg-[#070b14] overflow-hidden">

            {/* Ambient radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_60%)]" />

            <div className="relative max-w-6xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-bold tracking-tight"
                    >
                        Your data.
                        <br />
                        <span className="text-gradient">One intelligent layer.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 text-slate-400 max-w-2xl mx-auto"
                    >
                        We don’t replace your systems. We connect them — and build intelligence on top.
                    </motion.p>
                </div>

                {/* Architecture Flow */}
                <div className="relative grid md:grid-cols-4 gap-10">

                    {/* Animated connecting line */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/30 to-cyan-500/20 blur-sm" />

                    {layers.map((layer, i) => {
                        const Icon = layer.icon;

                        return (
                            <motion.div
                                key={layer.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative text-center group"
                            >
                                {/* Glowing circle */}
                                <div className="relative mx-auto w-20 h-20 rounded-2xl bg-[#0d1526] border border-white/5 flex items-center justify-center 
                                    group-hover:border-indigo-500/40 transition-all duration-500 
                                    group-hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]">

                                    {/* Pulsing glow */}
                                    <motion.div
                                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                        className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur-xl"
                                    />

                                    <Icon className="w-8 h-8 text-indigo-400 relative z-10" />
                                </div>

                                <h3 className="mt-6 text-lg font-semibold text-white">
                                    {layer.title}
                                </h3>

                                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                                    {layer.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Statement */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-24 text-center"
                >
                    <p className="text-lg text-slate-300">
                        Built modular. Designed to scale. Architected for clarity.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}