"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import AmbientGlow from "./AmbientGlow";

const words = [
    "business",
    "workflow",
    "customer support",
    "sales pipeline",
    "operations",
];

export default function Hero() {
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[105vh] flex items-center justify-center overflow-hidden bg-dark-900">

            {/* Ambient Background */}
            <AmbientGlow />

            {/* Softer noise */}
            <div
                className="absolute inset-0 z-[1] opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "160px 160px",
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pointer-events-none">

                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-xs tracking-[0.28em] uppercase text-slate-500 mb-8 font-medium"
                >
                    AI infrastructure for modern teams
                </motion.p>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-[86px] font-semibold tracking-[-0.03em] leading-[1.02]"
                >
                    <span className="text-white/95">
                        One AI, built
                    </span>
                    <br />
                    <span className="text-white/95">
                        entirely for your
                    </span>
                    <br />

                    <span className="relative inline-block mt-2 min-h-[1.2em]">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={wordIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.45 }}
                                className="bg-gradient-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent"
                            >
                                {words[wordIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="mt-10 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
                >
                    Bespoke, scalable and automated agentic AI models tailored for your individual requirements.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5 pointer-events-auto"
                >
                    <Link
                        href="/book"
                        className="group px-9 py-4 rounded-full bg-accent transition-all duration-300 font-medium text-white text-sm tracking-wide flex items-center gap-2 hover:shadow-[0_0_40px_rgba(99,102,241,0.18)]"
                    >
                        Step in
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>

                    <Link
                        href="/services"
                        className="px-9 py-4 rounded-full border border-accent/20 text-accent-light font-medium text-sm tracking-wide hover:border-accent/40 hover:text-white transition-all duration-300"
                    >
                        See how it works
                    </Link>
                </motion.div>

                {/* Subtle scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                        className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5"
                    >
                        <div className="w-1 h-1.5 rounded-full bg-white/30" />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}