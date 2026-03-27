"use client";
import { motion } from "framer-motion";

const steps = [
    {
        num: "1",
        title: "You tell us what you need",
        desc: "Free 30-minute call. We listen, ask questions, and figure out if we're the right fit. No deck, no pitch.",
    },
    {
        num: "2",
        title: "We build it iteratively",
        desc: "Weekly updates and working demos. You see progress constantly — not a big reveal after 3 months of silence.",
    },
    {
        num: "3",
        title: "You get production-ready software",
        desc: "Clean handoff, docs, and support after launch. We stick around to make sure everything runs smoothly.",
    },
];

export default function HowWeWork() {
    return (
        <section className="py-28 px-6 relative overflow-hidden">
            {/* Subtle background shift */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-[#0c0e18] to-dark-900" />
            <div className="absolute inset-0 bg-grid opacity-30" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 40 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="h-[2px] bg-gradient-to-r from-accent to-purple-500 mb-5 rounded-full"
                    />
                    <p className="text-[10px] tracking-[0.28em] uppercase text-accent-light font-mono mb-4">
                        Process
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
                        How we <span className="text-gradient">work</span>
                    </h2>
                    <p className="text-slate-400 max-w-lg font-light text-lg">
                        Simple process. No mystery timelines.
                    </p>
                </motion.div>

                <div className="space-y-0">
                    {steps.map((s, i) => (
                        <motion.div
                            key={s.num}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 + 0.1, duration: 0.5 }}
                            className="group flex gap-6 md:gap-10 py-8 border-b border-white/[0.04] last:border-0 hover:border-white/[0.08] transition-colors duration-500"
                        >
                            {/* Number */}
                            <div className="text-3xl md:text-4xl font-bold text-white/[0.06] group-hover:text-indigo-500/20 transition-colors duration-500 pt-1 select-none min-w-[48px]">
                                {s.num}
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold text-white/90 mb-2 tracking-tight">
                                    {s.title}
                                </h3>
                                <p className="text-sm md:text-[15px] text-slate-400 leading-relaxed font-light max-w-lg">
                                    {s.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
