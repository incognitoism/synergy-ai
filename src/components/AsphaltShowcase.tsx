"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const conversation = [
    { role: "user", text: "What was our Q3 churn rate in the enterprise segment?" },
    {
        role: "asphalt",
        text: "Your Q3 enterprise churn was 2.1%, down from 3.4% in Q2. The biggest driver was the onboarding overhaul you shipped in August — retention in the first 90 days improved by 38%.",
    },
    { role: "user", text: "Which accounts are at risk this quarter?" },
    {
        role: "asphalt",
        text: "3 accounts flagged: Vertex (usage down 60%), Helix (support tickets up 4x), and Orbit (no login in 21 days). I'd recommend scheduling check-ins this week — want me to draft the outreach?",
    },
];

export default function AsphaltShowcase() {
    const [visibleMessages, setVisibleMessages] = useState(0);

    useEffect(() => {
        if (visibleMessages < conversation.length) {
            const delay = conversation[visibleMessages]?.role === "asphalt" ? 1800 : 1200;
            const timer = setTimeout(() => setVisibleMessages((prev) => prev + 1), delay);
            return () => clearTimeout(timer);
        }
    }, [visibleMessages]);

    // Restart animation when it comes into view
    const handleViewport = () => setVisibleMessages(0);

    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px]" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        onViewportEnter={handleViewport}
                    >
                        <p className="text-xs tracking-[0.25em] uppercase text-accent-light font-mono mb-4">
                            Introducing
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Meet{" "}
                            <span className="text-gradient">Asphalt</span>
                        </h2>
                        <p className="text-slate-400 leading-relaxed font-light text-lg mb-6">
                            Your custom AI model — trained on your data, your processes, your
                            terminology. It doesn't give generic answers. It gives{" "}
                            <span className="text-white font-normal">your</span> answers.
                        </p>
                        <ul className="space-y-3">
                            {[
                                "Trained exclusively on your internal data",
                                "Understands your KPIs, jargon, and context",
                                "Deploys in days, not months",
                                "Private, secure, and fully yours",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm text-slate-400">
                                    <div className="w-1 h-1 rounded-full bg-accent-light flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right — Chat simulation */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-2xl border border-white/[0.06] bg-dark-800/50 backdrop-blur-sm overflow-hidden"
                    >
                        {/* Window bar */}
                        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <span className="ml-3 text-[11px] text-slate-500 font-mono">asphalt v1.0</span>
                        </div>

                        {/* Messages */}
                        <div className="p-5 space-y-4 min-h-[320px]">
                            <AnimatePresence>
                                {conversation.slice(0, visibleMessages).map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        transition={{ duration: 0.4 }}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                                    ? "bg-white/[0.06] text-slate-300 rounded-br-md"
                                                    : "bg-accent/[0.08] border border-accent/10 text-slate-200 rounded-bl-md"
                                                }`}
                                        >
                                            {msg.role === "asphalt" && (
                                                <span className="text-[10px] font-mono text-accent-light/60 block mb-1.5">
                                                    ASPHALT
                                                </span>
                                            )}
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Typing indicator */}
                            {visibleMessages < conversation.length && visibleMessages > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`flex ${conversation[visibleMessages]?.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div className="flex gap-1 px-4 py-3">
                                        {[0, 1, 2].map((dot) => (
                                            <motion.div
                                                key={dot}
                                                className="w-1.5 h-1.5 rounded-full bg-slate-500"
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 1,
                                                    delay: dot * 0.2,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}